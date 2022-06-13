/**
 * Local contract implmentation that holds all the needed methods
 * inside a Contract class
 */
 import { ethers } from "ethers";

export interface Contract{
    contract: ethers.Contract;
    balanceOf(wallet:string): Promise<string>;
}

