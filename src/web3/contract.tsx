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
/**
 * ContractAddresses is a list of all the addresses
 */
export enum ContractAddresses {
  Tranq = "0xCf1709Ad76A79d5a60210F23e81cE2460542A836",
  LockedTranq = "0x55aE07Bb8Bae1501F9aEBF35801B5699eAE63bb7"
}
/**
 * AddressToName will take the Name from the Address list
 * @param address 
 */
export function AddressToName(address:string):string  {
  const names = Object.keys(ContractAddresses);
  const values = Object.values(ContractAddresses);

  let foundValue = "";
  values.forEach((value, index) => {
    if (value === address) {
      foundValue =  names[index];
    }
  })
  return foundValue;
}


