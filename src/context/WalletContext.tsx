import {createContext} from "react";
import HarmonyClient from "../web3/harmony";

export interface WalletContextInterface {
    HarmonyClient:HarmonyClient
}
  
export const WalletContext = createContext<WalletContextInterface | null>(null);
