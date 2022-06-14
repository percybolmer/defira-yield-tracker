/**
 * Local contract implmentation that holds all the needed methods
 * inside a Contract class
 */
 import { ethers } from "ethers";
 import { SetStateCallback } from "./harmony";

export interface Contract{
    contract: ethers.Contract;
    balanceOf(wallet:string, callback:SetStateCallback): void;
}

/**
 * ContractNames enums are used to make sure we use the same Naming for the contracts accross the application
 */
 export enum ContractNames {
    Tranq = "tranq",
    LockedTranq = "locked_tranq",
  }

