
import TextField from "@mui/material/TextField";
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import Box from "@mui/material/Box";
import InputAdornment from '@mui/material/InputAdornment';

import { useContext } from 'react';
import TranqIcon from '../icons/tranq.svg';
import LockIcon from '../icons/lock.svg';

import { WalletContext } from '../context/WalletContext';
import { ContractNames } from '../web3/contract';
import './Wallet.css';

import { TokenTable, DataRow,Transaction } from './DataTable';


function Wallet() {

    /**
     * Grab WalletContext 
     */
    const wallet = useContext(WalletContext);
    // Below is a example of desctructuring, if another component need wallet but only a few fields in the future
    if (!wallet) return null;
    const { TranqBalance, LockedTranqBalance } = wallet;

    function createRows():DataRow[] {

        let transactions: Transaction[] = [new Transaction("2021-06-15")];
        return [
            new DataRow("Tranq", TranqIcon, TranqBalance, 0, transactions),
            new DataRow("Locked Tranq", TranqIcon, LockedTranqBalance, 0, transactions)
        ];
    }

    return (
        <Box>
            <Box sx={{ m: "2rem" }}>
                <TextField
                    id="outlined-search"
                    label="Tranq Amount"
                    disabled={true}
                    value={wallet?.TranqBalance}
                    color="warning"
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <img src={TranqIcon} alt="Tranq" width={25} height={25} />
                            </InputAdornment>
                        ),
                    }}
                />
                <TextField
                    id="outlined-search"
                    label="Locked Tranq"
                    disabled={true}
                    value={wallet?.LockedTranqBalance}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <img src={TranqIcon} alt="Tranq" width={25} height={25} />
                                <img src={LockIcon} alt="Lock" width={20} height={20} className="LockIcon" />
                            </InputAdornment>
                        ),
                    }}
                />
            </Box>
            <TokenTable rows={createRows()}></TokenTable>
        </Box>
    )
}

export default Wallet


/**
 * HarmonyWallet fulfill
 * and holds the actual implementation
 * Create Harmony Client right here so it is created on startup
 */
//  export class HarmonyWallet {
//     private Client: HarmonyClient

//     public constructor(props: WalletProps){
//         super(props);
//         this.Client = new HarmonyClient();

//         // Reload previous Addr set
//         let oldWallet = localStorage.getItem("harmony_wallet");
//         if (oldWallet === null) {
//             console.log("oldwallet", oldWallet);
//             // this.state.Address = oldWallet;
//             // this.setState({Address: oldWallet});
//             // this.UpdateBalance();
//             oldWallet = ""
//         }
//         this.state = {
//             TranqBalance: "",
//             LockedTranqBalance: "",
//             Address: oldWallet
//         }
//         this.updateBalance = this.updateBalance.bind(this);
//     }

//     /**
//      * SetAddress will update the related address to the wallet
//      * Make sure this is called, or it will not work for the rest of hte functions
//      */
//     SetAddress(address:string): void{
//         localStorage.setItem("harmony_wallet", address);
//     }

//     /**
//      * UpdateBalance will load balance for all tokens and set them
//      */
//     UpdateBalance(): void{
//         console.log("Starting search for balance");
//         if (!this.state.Address) {
//             return
//         }
//         this.Client?.balanceOf(ContractNames.Tranq, this.state.Address, (balance:string) => {this.updateBalance(balance); console.log("Got Balance: ",balance, "Set into: ", this.state.TranqBalance);})
//         // this.Client?.balanceOf(ContractNames.LockedTranq, this.state.Address, (balance:string) => {this.LockedTranqBalance = balance;})
//     }

//     updateBalance(balance:string): void {
//         this.setState({TranqBalance: balance});
//     }


//     render () {
//         return (
//         <Box>
//         <Box sx={{ m: "2rem" }}>
//           <TextField
//             id="outlined-search"
//             label="Tranq Amount"
//             disabled={true}
//             value={this.state.TranqBalance}
//             color="warning"
//             InputProps={{
//               startAdornment: (
//                 <InputAdornment position="start">
//                   <img src={TranqIcon} alt="Tranq" width={25} height={25}/>
//                 </InputAdornment>
//               ),
//             }}
//           />
//         <TextField
//           id="outlined-search"
//           label="Locked Tranq"
//           disabled={true}
//           value={this.state.LockedTranqBalance}
//           InputProps={{
//             startAdornment: (
//               <InputAdornment position="start">
//                 <img src={TranqIcon} alt="Tranq" width={25} height={25}/>
//                 <img src={LockIcon} alt="Lock" width={20} height={20} className="LockIcon"/>
//               </InputAdornment>
//             ),
//           }}
//         />
//       </Box>
//       </Box>
//       )
//     }
//  }


// export default HarmonyWallet