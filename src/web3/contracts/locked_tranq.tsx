import { ethers } from "ethers";

// locked_tranq uses a Proxy, so use the proxy ADR, but the ABI from the underlying contract
const Address = "0x55aE07Bb8Bae1501F9aEBF35801B5699eAE63bb7";
const ABI = require("../abis/lockedTranq.json");

class LockedTranq {

    public contract: ethers.Contract;

    public constructor(provider: ethers.providers.Provider){
        this.contract = new ethers.Contract(Address, ABI, provider);
    }

    /**
     * balanceOf looks up the amount of locked tranq using @supplyAmount
     * @param wallet 
     * @returns 
     */
    public async balanceOf(wallet:string): Promise<string> {
        let response = await this.contract.supplyAmount(wallet);
        // TODO how to find Decimals for Locked tranq?
        // let decimals = await this.contract.decimals();
        return ethers.utils.formatUnits(response, 18);
    }
}

export default LockedTranq;