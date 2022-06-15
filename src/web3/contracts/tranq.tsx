import { ethers } from "ethers";
import { SetStateCallback } from "../harmony";

const TranqAddress = "0xCf1709Ad76A79d5a60210F23e81cE2460542A836";
const tranqABI = require("../abis/tranq.json");

class Tranq {

    public contract: ethers.Contract;
    public decimals: ethers.BigNumberish;

    public constructor(provider: ethers.providers.Provider){
        this.contract = new ethers.Contract(TranqAddress, tranqABI, provider);
        // default 18
        this.decimals = 18;

        this.contract.decimals().then((decimals:ethers.BigNumberish) => {
            this.decimals = decimals;
        })
    }
    /**
     * balanceOf looks up the amount of Tranq
     * @param wallet 
     * @returns 
     */
    public balanceOf(wallet:string, callback:SetStateCallback): void {
        let decimals = this.decimals
        this.contract.balanceOf(wallet).then((balance:string) => {
            callback(ethers.utils.formatUnits(balance, decimals));
        })
        
    }
}

export default Tranq;