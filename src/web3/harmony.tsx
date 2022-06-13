import { ethers } from "ethers";
import { Contract } from "./contract";
import Tranq from "./contracts/tranq";
import LockedTranq from "./contracts/locked_tranq";

/**
 * SetStateCallback can be used by useState etc as callbacks
 */
 export interface SetStateCallback{
    (value:any): void;
}

class HarmonyClient {
    public address: string;
    private provider: ethers.providers.Provider;

    /**
     * contracts holds contracts that has been setup
     * @see loadContracts
     * @TODO add so the RPCprovider is an input
     */
    private contracts = new Map<string, Contract>();

    public constructor(address: string){
        this.address = address;

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
        this.contracts.set("tranq", new Tranq(this.provider))
        this.contracts.set("locked_tranq", new LockedTranq(this.provider));
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
    public async balanceOf(token:string, wallet:string, callback:SetStateCallback){
        if (this.contracts && this.contracts.has(token)){
            let contract = this.contracts.get(token);
            // Note this is the typescript interface balanceOf function, not the smartcontract
            let balance = await contract?.balanceOf(wallet);
            return callback(balance);
        }
        return callback('');
        
    }
}

export default HarmonyClient;
