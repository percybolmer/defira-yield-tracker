import { ethers } from "ethers";


const TranqAddress = "0xCf1709Ad76A79d5a60210F23e81cE2460542A836";
const tranqABI = require("./abis/tranq.json");

class Tranq {

    public contract: ethers.Contract;

    public constructor(provider: ethers.providers.Provider){
        this.contract = new ethers.Contract(TranqAddress, tranqABI, provider);
    }
    /**
     * balanceOf looks up the amount of Tranq
     * @param wallet 
     * @returns 
     */
    public async balanceOf(wallet:string): Promise<string> {
        let balance = await this.contract.balanceOf(wallet);
        let decimals = await this.contract.decimals();
        return ethers.utils.formatUnits(balance, decimals);
    }
}

export default Tranq;