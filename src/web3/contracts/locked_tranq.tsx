import { BigNumber, ethers } from "ethers";
import { SetStateCallback } from "../harmony";

// locked_tranq uses a Proxy, so use the proxy ADR, but the ABI from the underlying contract
const Address = "0x55aE07Bb8Bae1501F9aEBF35801B5699eAE63bb7";
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

class LockedTranq {

    public contract: ethers.Contract;
    public decimals: ethers.BigNumberish;


    public constructor(provider: ethers.providers.Provider) {
        this.contract = new ethers.Contract(Address, ABI, provider);

        this.decimals = 18;

        // Build up an mapping of rewrads by fetching their ADDR and matching it to addr 
        // TODO
        // Begin by fetching token count, then Read all Addresses related to it
        // Map them against an ENUM and then Use that Mapping to fetch from all Indexes
        let tokensRewarded = this.contract.rewardTokenAddresses(7).then((data:any) => {
            console.log("REWARDTOKENADDRESSES: ", data);
        });
        let tokensCOUNT = this.contract.rewardTokenCount().then((data:BigNumber) => {
            console.log("TOKEN COUNT: ", data.toNumber());
        });

    }

    /**
     * balanceOf looks up the amount of locked tranq using @supplyAmount
     * @param wallet 
     * @returns 
     */
    public balanceOf(wallet: string, callback: SetStateCallback): void {
        let decimals = this.decimals;
        this.contract.supplyAmount(wallet).then((balance: string) => {
            callback(ethers.utils.formatUnits(balance, decimals));
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
        })
    }

    /**
     * getClaimableRewards returns the amount of Token rewards for EACH token rewarded
     * @param wallet 
     * @param callback 
     */
         public getClaimableRewards(wallet: string, callback: SetStateCallback): void {
            let decimals = this.decimals;

            
            this.contract.getClaimableRewards(wallet, Rewards.REWARD_ONE).then((data: BigNumber) => {
                console.log("Pending ONE Reward: ", ethers.utils.formatUnits(data, 18));
            })
            this.contract.getClaimableRewards(wallet, Rewards.REWARD_TRANQ).then((data: BigNumber) => {
                console.log("Pending TRANQ Reward: ", ethers.utils.formatUnits(data, 18));
            })

            this.contract.getClaimableRewards(wallet, 6).then((data: BigNumber) => {
                console.log("Pending Stone Reward: ", ethers.utils.formatUnits(data, 18));
            })

            this.contract.getClaimableRewards(wallet, 7).then((data: BigNumber) => {
                console.log("Pending FIRA Reward: ", ethers.utils.formatUnits(data, 18));
            })
        }
    

}

export default LockedTranq;