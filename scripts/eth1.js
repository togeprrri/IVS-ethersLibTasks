
import {ethers} from "./ethers-5.2.umd.min.js"


document.getElementById("checkBalanceButton").addEventListener("click", getBalance);

async function getBalance() {
    const provider = new ethers.providers.AlchemyProvider("goerli", "eo788akRJSIdQe_SEURhwLlgnWl3WQhR");

    let _address = document.getElementById("inputedAddress").value;

    let accauntBalance = await provider.getBalance(_address);
    
    //console.log("The address balance on goerli testnet is: ", ethers.utils.formatEther(accauntBalance));
    let resultBalance = ethers.utils.formatEther(accauntBalance);
    document.getElementById("resultBalance").innerText = `The address balance on goerli testnet is: ${resultBalance}`
}
