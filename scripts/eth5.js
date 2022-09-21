import {ethers} from "./ethers-5.2.umd.min.js";

document.getElementById("addAddressButton").addEventListener("click", addAddressButton);
document.getElementById("connectToTokenButton1").addEventListener("click", connectToTokenContract);
document.getElementById("hideAddressesButton").addEventListener("click", hideAddresses);

let tokenContract;

async function addAddressButton(){
    const provider = new ethers.providers.Web3Provider(window.ethereum);

    await provider.send("eth_requestAccounts", []);

    const signer = provider.getSigner();

    const newAddress = document.getElementById("addressForCheck").value;

    let balanceInToken = await tokenContract.balanceOf(newAddress);
    balanceInToken /= 10 ** (await tokenContract.decimals());

    document.getElementById("addressList").innerText += `For "${newAddress}": ${balanceInToken} ${await tokenContract.symbol()}\n`;

    document.getElementById("addressForCheck").value = "";
}

function hideAddresses(){
    document.getElementById("addressList").innerText = "";
}

async function connectToTokenContract() {
    const provider = new ethers.providers.Web3Provider(window.ethereum);

    await provider.send("eth_requestAccounts", []);

    const signer = provider.getSigner();

    const tokenAddress = document.getElementById("tokenContractAddress1").value;

    const tokenAbi = [
        "function name() view returns (string)",
        "function symbol() view returns (string)",
        "function decimals() view returns(uint8)",

        "function balanceOf(address) view returns (uint)",

        "function transfer(address to, uint amount)",
    ]

    tokenContract = new ethers.Contract(tokenAddress, tokenAbi, signer);

    const tokenName = await tokenContract.name();
    const tokenSymbol = await tokenContract.symbol();
    const signerBalance = await tokenContract.balanceOf(signer.getAddress());

    document.getElementById("tokenInfo1").innerText = `Token name: ${tokenName}\nToken symbol: ${tokenSymbol}\nBalance of your account: ${ethers.utils.formatEther(signerBalance)}\n`
}
