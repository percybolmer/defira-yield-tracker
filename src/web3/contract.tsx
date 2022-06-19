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
    Fira = "fira",
    Stone = "stONE",
    TetherUSD = "1USDT",
    USDCoin = "1USDC",
    WrappedBTC = "1BTC",
    WrappedETH = "1ETH",
    Dai = "1DAI",
    ONE = "ONE",
    Contract = "0xdc54046c0451f9269FEe1840aeC808D36015697d" // What is this one lol? 
}
/**
 * ContractAddresses is a list of all the addresses
 */
export enum ContractAddresses {
  Tranq = "0xCf1709Ad76A79d5a60210F23e81cE2460542A836",
  LockedTranq = "0x55aE07Bb8Bae1501F9aEBF35801B5699eAE63bb7",
  Fira = "0x2A719aF848bf365489E548BE5edbEC1D65858e59",
  Stone = "0x22D62b19b7039333ad773b7185BB61294F3AdC19",
  TetherUSD = "0x3C2B8Be99c50593081EAA2A724F0B8285F5aba8f",
  USDCoin = "0x985458E523dB3d53125813eD68c274899e9DfAb4",
  WrappedBTC = "0x3095c7557bCb296ccc6e363DE01b760bA031F2d9",
  WrappedETH = "0x6983D1E6DEf3690C4d616b13597A09e6193EA013",
  Dai = "0xEf977d2f931C1978Db5F6747666fa1eACB0d0339",
  ONE = "0xcF664087a5bB0237a0BAd6742852ec6c8d69A27a",
  Contract = "0xdc54046c0451f9269FEe1840aeC808D36015697d", // This is rewarded by the smart contraact but no idea what it is
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


