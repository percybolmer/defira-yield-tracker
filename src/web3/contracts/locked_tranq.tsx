import { ethers } from "ethers";
import { SetStateCallback } from "../harmony";

// locked_tranq uses a Proxy, so use the proxy ADR, but the ABI from the underlying contract
const Address = "0x55aE07Bb8Bae1501F9aEBF35801B5699eAE63bb7";
const ABI = require("../abis/lockedTranq.json");

class LockedTranq {

    public contract: ethers.Contract;
    public decimals: ethers.BigNumberish;


    public constructor(provider: ethers.providers.Provider){
        this.contract = new ethers.Contract(Address, ABI, provider);
    
        this.decimals = 18;
    }

    /**
     * balanceOf looks up the amount of locked tranq using @supplyAmount
     * @param wallet 
     * @returns 
     */
    public balanceOf(wallet:string, callback:SetStateCallback): void {
        let decimals = this.decimals;
        this.contract.supplyAmount(wallet).then((balance:string) => {
            callback(ethers.utils.formatUnits(balance, decimals));
        })
    }
}

export default LockedTranq;