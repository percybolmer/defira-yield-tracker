import { ethers } from "ethers";
import { SetStateCallback } from "../harmony";
import { ContractAddresses } from "../contract";

const TranqAddress = ContractAddresses.Tranq;
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
        }).catch((error:Error) => {
            console.error(error);
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
        }).catch((error:Error) => {
            console.error(error);
        })
        
    }
}

export default Tranq;