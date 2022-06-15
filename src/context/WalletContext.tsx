import { createContext, useEffect, useState } from "react";
import HarmonyClient from "../web3/harmony";
import { ContractNames } from "../web3/contract";
/**
 * WalletInterface defines the interface needed to fulfill to be a wallet
 */
export interface WalletInterface {
    /**
     * Address related to the Wallet
     */
    Address: string
    /**
     * Balance fields inside the Wallet
     */
    TranqBalance: string
    LockedTranqBalance: string
    /**
     * Web3 Functions for loading WalletBalance
     */
    SetAddress(address: string): void
    UpdateBalance(): void

}

/**
 * WalletContext is used to wrap the app
 */
export const WalletContext = createContext<WalletInterface | null>(null);


type WalletProps = {
    children?: JSX.Element;
    client: HarmonyClient;
    wallet: string;
}
/**
 * WalletProvider is the Provider of the wallet
 * @param param0 
 * @returns 
 */
export const WalletProvider = ({ children, client, wallet }: WalletProps) => {
    const [Address, setAddress] = useState(wallet);
    const [TranqBalance, setTranqBalance] = useState('');
    const [LockedTranqBalance, setLockedTranqBalance] = useState('');

    /**
     * SetAddress will update the address related to the wallet and the localstorage
     * @param address is the wallet
     */
    const SetAddress = (address: string) => {
        localStorage.setItem("selected_wallet", address);
        setAddress(address);
    };
    /**
     * useEffect that triggers a reload on the Wallet incase addr changes
     */
    useEffect(() => {
        if (Address !== '') {
            UpdateBalance();
        }
    }, [Address])

    /**
     * UpdateBalance will load balance for all tokens and set them
     */
    const UpdateBalance = () => {
        client?.balanceOf(ContractNames.Tranq, Address, (balance: string) => { setTranqBalance(balance); })
        client?.balanceOf(ContractNames.LockedTranq, Address, (balance: string) => { setLockedTranqBalance(balance); })
    }

    return (
        <WalletContext.Provider
            value={{
                Address: Address,
                TranqBalance: TranqBalance,
                LockedTranqBalance: LockedTranqBalance,
                SetAddress: SetAddress,
                UpdateBalance: UpdateBalance,
            }}
        >
            {children}
        </WalletContext.Provider>
    );
}




