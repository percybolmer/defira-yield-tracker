import { ethers } from "ethers";
import { Contract } from "./contract";
import Tranq from "./contracts/tranq";
import LockedTranq from "./contracts/locked_tranq";
import { ContractNames } from "./contract";
/**
 * SetStateCallback can be used by useState etc as callbacks
 */
 export interface SetStateCallback{
    (value:any): void;
}

/**
 * HarmonyClient is used to access the Harmony Blockchain
 */
class HarmonyClient {
    private provider: ethers.providers.Provider;

    /**
     * contracts holds contracts that has been setup
     * @see loadContracts
     * @TODO add so the RPCprovider is an input
     */
    private contracts = new Map<string, Contract>();

    /**
     * constructor will handle setting up everything needed to communicate with the Network
     * and load all Defira Contracts so they are ready
     */
    public constructor(){
        console.log("Constructor Initiated");
        this.connectNetwork();
        this.provider = new ethers.providers.JsonRpcProvider("https://api.s0.t.hmny.io");
        this.loadContracts();

    }
    /**
     * loadContracts will load all the abis and set up contracts
     * make sure you have connected network first
     * @see connectNetwork
     */
    private loadContracts(){
        // I made it this way so I have more control of each individual contract
        // This is because it can differ on how to extract data from them and I want to make it abstract
        // At first I made a generic function that loaded the contracts, but we cannot call getBalance on them since not all contracts
        // has that, instead I made a custom interface that enables lower level control
        this.contracts.set(ContractNames.Tranq, new Tranq(this.provider))
        this.contracts.set(ContractNames.LockedTranq, new LockedTranq(this.provider));
    }
    /**
     * connectNetwork will connect to harmony
     */
    private connectNetwork(){ 
        // TODO, Should I not use hardcoded RPC`
        this.provider = new ethers.providers.JsonRpcProvider("https://api.s0.t.hmny.io");
    }
    /**
     * balanceOf is a proxy into the contract. How to retrieve balance is based on the underlying contract
     * @param token -- the name of the token
     * @param wallet - the address to lookup
     * @param callback - the function to apply the value on, usually a setState()
     */
    public balanceOf(token:ContractNames, wallet:string, callback:SetStateCallback){
        if (this.contracts && this.contracts.has(token)){
            let contract = this.contracts.get(token);
            // Note this is the typescript interface balanceOf function, not the smartcontract
            return contract?.balanceOf(wallet, callback);

        }
        return callback('');
    }
}

export default HarmonyClient;
