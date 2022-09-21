const {ethers} = require('ethers');
const prompt = require("prompt-sync")();

let balanceOf = prompt("Input your address: ");

async function getBalance(_address) {
    const provider = new ethers.providers.AlchemyProvider("goerli", "eo788akRJSIdQe_SEURhwLlgnWl3WQhR");

    let accauntBalance = await provider.getBalance(_address);
    
    console.log("The address balance on goerli testnet is: ", ethers.utils.formatEther(accauntBalance));

    rl.close();
}

getBalance(balanceOf);