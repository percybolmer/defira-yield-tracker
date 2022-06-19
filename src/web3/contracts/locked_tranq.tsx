import { BigNumber, ethers } from "ethers";
import { SetStateCallback, ZeroAddress } from "../harmony";
import { ContractAddresses, AddressToName } from "../contract";

// locked_tranq uses a Proxy, so use the proxy ADR, but the ABI from the underlying contract
const Address = ContractAddresses.LockedTranq;
const ABI = require("../abis/lockedTranq.json");


/**
 * Rewards are the rewards from the Different Tokens
 */
enum Rewards {
    REWARD_TRANQ = 0,
    REWARD_ONE = 1,
    REWARD_WBTC = 2,
    REWARD_ETH = 3,
    REWARD_USDC = 4,
    REWARD_USDT = 5
}
/**
 * LockedSupply is the Amount and Unlock date for LockedTranq
 */
type LockedSupply = {
    stakedTokenAmount: BigNumber
    /**
     * unlocktime is sent as Unix timestamp in Seconds, needs to be mutiplied by 1000 when creating date
     */
    unlockTime: BigNumber
}

class LockedTranqReward {
    public contractAddress: string;
    public contractName: string;
    public rewardIndex: Number;

    public constructor(contractAddress: string, contractName: string, rewardIndex: Number) {
        this.contractAddress = contractAddress;
        this.contractName = contractName;
        this.rewardIndex = rewardIndex;
    }
}

class LockedTranq {

    public contract: ethers.Contract;
    public decimals: ethers.BigNumberish;

    public contractRewards: Map<string, LockedTranqReward>;


    public constructor(provider: ethers.providers.Provider) {
        this.contract = new ethers.Contract(Address, ABI, provider);
        this.contractRewards = new Map<string,LockedTranqReward>();
        this.decimals = 18;

        // Fetch Token Count, this return an Number of the amount of contracts that rewards
        this.Setup();
    }
    /**
     * Setup is an async function because we require many updates here and we want the UI to await this to be fully loaded before proceeding
     */
    Setup = async () => {
        try {
            let amountOfTokens = await this.contract.rewardTokenCount();
            for (let i = 0; i<= amountOfTokens.toNumber(); i++) {
                let rewardAddress = await this.contract.rewardTokenAddresses(i);
                if (rewardAddress === ZeroAddress) {
                    // This maybe is updated rewards that are removed? Skip them, 2 occurs atm
                    return
                }
                let contractName = AddressToName(rewardAddress);
                this.contractRewards.set(rewardAddress, new LockedTranqReward(rewardAddress, contractName, i));
            }   
        }catch(error) {
          console.log(error); // TODO fix this with popup     
        } 
    }

    /**
     * balanceOf looks up the amount of locked tranq using @supplyAmount
     * @param wallet 
     * @returns 
     */
    public balanceOf(wallet: string, callback: SetStateCallback): void {
        let decimals = this.decimals;
        console.log("getting balanceof");
        this.contract.supplyAmount(wallet).then((balance: string) => {
            callback(ethers.utils.formatUnits(balance, decimals));
        }).catch((error:Error) => {
            console.error(error);
        })
        this.getClaimableRewards(wallet, callback);
    }
    /**
     * unlockedBalance returns the amount of available unlocked Tranq
     * @param wallet 
     * @param callback 
     */
    public unlockedBalance(wallet: string, callback: SetStateCallback): void {
        let decimals = this.decimals;
        this.contract.getUnlockedBalance(wallet).then((balance: string) => {
            callback(ethers.utils.formatUnits(balance, decimals));
        }).catch((error:Error) => {
            console.error(error);
        })
    }

    /**
     * getLockedSupplies returns the amount of available Locked Tranq History
     * @param wallet 
     * @param callback 
     */
    public getLockedSupplies(wallet: string, callback: SetStateCallback): void {
        let decimals = this.decimals;
        this.contract.getLockedSupplies(wallet).then((data: Array<LockedSupply>) => {
            console.log(ethers.utils.formatUnits(data[0].stakedTokenAmount, decimals));
            console.log(new Date(data[0].unlockTime.toNumber()*1000));
        }).catch((error:Error) => {
            console.error(error);
        })
    }

    /**
     * getClaimableRewards returns the amount of Token rewards for EACH token rewarded
     * @param wallet 
     * @param callback 
     */
         public getClaimableRewards(wallet: string, callback: SetStateCallback): void {
            let decimals = this.decimals;
            console.log("rewards map : ", this.contractRewards);
            for (let value of this.contractRewards.values()) {
                console.log(value);                 //37 35 40
            }
            for (const [key, reward] of Object.entries(this.contractRewards)) { 
                console.log("inside");
                this.contract.getClaimableRewards(wallet, reward.rewardIndex).then((data: BigNumber) => {
                    console.log("Pending ", reward.contractName, " : ", ethers.utils.formatUnits(data, 18));
                }).catch((error:Error) => {
                    console.error(error);
                })
            }
            
        }
    

}

export default LockedTranq;