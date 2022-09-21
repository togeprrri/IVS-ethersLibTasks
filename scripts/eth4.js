import {ethers} from "./ethers-5.2.umd.min.js";

document.getElementById("addTransactionButton").addEventListener("click", addTansaction);
document.getElementById("connectToTokenButton").addEventListener("click", connectToTokenContract);
document.getElementById("checkTransactionsButton").addEventListener("click", showTransactions);
document.getElementById("sendButton").addEventListener("click", transferTokensToAccounts);


let transactionsArray = new Array();
let tokenContract;

function addTansaction(){
    let _to = document.getElementById("tokensTransferToAddress").value;
    let _amount = document.getElementById("tokensTransferToAmount").value;
    transactionsArray.push({to:_to, amount:_amount});

    document.getElementById("tokensTransferToAddress").value = "";
    document.getElementById("tokensTransferToAmount").value = "";
}

function showTransactions(){
    document.getElementById("transactionsList").innerText = "";
    transactionsArray.forEach(element => {
        document.getElementById("transactionsList").innerText += `To: ${element.to}, Amount: ${element.amount}\n`;
    });
}

async function connectToTokenContract() {
    await window.ethereum.enable();
    const provider = new ethers.providers.Web3Provider(window.ethereum);

    const signer = provider.getSigner();

    const tokenAddress = document.getElementById("tokenContractAddress").value;

    const tokenAbi = [
        "function name() view returns (string)",
        "function symbol() view returns (string)",

        "function balanceOf(address) view returns (uint)",

        "function transfer(address to, uint amount)",
    ]

    tokenContract = new ethers.Contract(tokenAddress, tokenAbi, signer);

    const tokenName = await tokenContract.name();
    const tokenSymbol = await tokenContract.symbol();
    const signerBalance = await tokenContract.balanceOf(signer.getAddress());

    document.getElementById("tokenInfo").innerText = `Token name: ${tokenName}\nToken symbol: ${tokenSymbol}\nBalance of your account: ${ethers.utils.formatEther(signerBalance)}\n`
}

async function transferTokensToAccounts() {
    await window.ethereum.enable();
    const provider = new ethers.providers.Web3Provider(window.ethereum);

    const signer = provider.getSigner();

    transactionsArray.forEach(element => {
        tokenContract.transfer(element.to, ethers.utils.parseEther(element.amount));
    });
};
