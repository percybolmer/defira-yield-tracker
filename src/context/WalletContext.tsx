import {createContext} from "react";
import HarmonyClient from "../web3/harmony";
import { ContractNames } from "../web3/contract";
/**
 * WalletContextInterface defines the interface needed to fulfill to be a wallet
 */
export interface WalletContextInterface {
    /**
     * Address related to the Wallet
     */
    Address:string
    /**
     * Balance fields inside the Wallet
     */
    TranqBalance:string,
    LockedTranqBalance:string

    /**
     * Web3 Functions for loading WalletBalance
     */
    SetAddress(address:string):void
    UpdateBalance(): void

}

/**
 * WalletContext is used to wrap the app
 */
export const WalletContext = createContext<WalletContextInterface | null>(null);

/**
 * HarmonyWallet fulfills @WalletContextInterface
 * and holds the actual implementation
 * Create Harmony Client right here so it is created on startup
 */
export class HarmonyWallet implements WalletContextInterface {
    private Client: HarmonyClient
    public TranqBalance: string
    public LockedTranqBalance: string
    public Address: string

    public constructor(){
        this.Client = new HarmonyClient();
        this.TranqBalance = "";
        this.LockedTranqBalance = "";
        this.Address = "";

        // Reload previous Addr set
        let oldWallet = localStorage.getItem("harmony_wallet");
        if (oldWallet !== null) {
            console.log("oldwallet", oldWallet);
            this.Address = oldWallet;
            this.UpdateBalance();
        }
    }

    /**
     * SetAddress will update the related address to the wallet
     * Make sure this is called, or it will not work for the rest of hte functions
     */
    SetAddress(address:string): void{
        localStorage.setItem("harmony_wallet", address);
    }

    /**
     * UpdateBalance will load balance for all tokens and set them
     */
    UpdateBalance(): void{
        console.log("Starting search for balance");
        if (!this.Address) {
            return
        }
        this.Client?.balanceOf(ContractNames.Tranq, this.Address, (balance:string) => {this.TranqBalance = balance; console.log("Got Balance: ", this.TranqBalance);})
        this.Client?.balanceOf(ContractNames.LockedTranq, this.Address, (balance:string) => {this.LockedTranqBalance = balance;})
    }



 }
  
