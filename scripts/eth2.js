/*const {ethers, utils} = require('ethers');

const prompt = require("prompt-sync")();

let myAccountPrivateKey = prompt("Input your private key: ");
let addressTransferingTo = prompt("Input address, you transfering to: ");
let amountOfEthers = prompt("Input amount of ethers: ");

*/

import {ethers} from "./ethers-5.2.umd.min.js";

document.getElementById("transferButton").addEventListener("click", transferTo);

async function transferTo() {
    await window.ethereum.enable();
    const provider = new ethers.providers.Web3Provider(window.ethereum);


    const signer = provider.getSigner();

    const myPrivateKey = document.getElementById("privateKey").value;

    let myWallet = new ethers.Wallet(myPrivateKey, provider);

    let tx = {
        to: document.getElementById("transferToAddress").value,
        value: ethers.utils.parseEther(document.getElementById("transferToAmount").value)
    }

    await myWallet.signTransaction(tx);
    const transaction = await myWallet.sendTransaction(tx);
    document.getElementById("resultHash").innerText = `Transaction hash: ${transaction.hash}`
};