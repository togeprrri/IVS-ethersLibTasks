const {ethers, utils} = require('ethers');

const prompt = require("prompt-sync")();

let myAccountPrivateKey = prompt("Input your private key: ");
let addressTransferingTo = prompt("Input address, you transfering to: ");
let amountOfEthers = prompt("Input amount of ethers: ");


async function transferTo(_myAccountPrivateKey, _addressTransferingTo, _amountOfEthers) {
    const provider = new ethers.providers.AlchemyProvider("goerli", "eo788akRJSIdQe_SEURhwLlgnWl3WQhR");

    let myWallet = new ethers.Wallet(_myAccountPrivateKey, provider);

    tx = {
        to: _addressTransferingTo,
        value: utils.parseEther(_amountOfEthers)
    }

    await myWallet.signTransaction(tx);
    const transaction = await myWallet.sendTransaction(tx);
    console.log("Transaction hash: ", transaction.hash);
};


transferTo(myAccountPrivateKey, addressTransferingTo, amountOfEthers);