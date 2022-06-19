
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

/**
 * Walllet fulfill
 * and holds the actual implementation
 * Create Harmony Client right here so it is created on startup
 */
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



