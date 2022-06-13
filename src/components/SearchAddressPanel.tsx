import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import Box from "@mui/material/Box";
import InputAdornment from '@mui/material/InputAdornment';

import { useState, ChangeEvent } from 'react';
import { ethers } from "ethers";
import HarmonyClient from "../web3/harmony";
import TranqIcon from '../icons/tranq.svg';
import LockIcon from '../icons/lock.svg';

import './SearchAddressPanel.css';


function SearchAddressPanel() {
  const [address, setAddress] = useState('');
  const [validAddress, setInvalidAddress] = useState(true);

  // TODO make a WalletContext instead and store these there
  const [tranq, setTranq] = useState('');
  const [lockedTranq, setLockedTranq] = useState('');

  /**
   * handleAddressChange is used to verify that its a legit addr and and
   * open up the Search btn
   * @param event 
   */
  const handleAddressChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (!ethers.utils.isAddress(event.target.value)) {
      setInvalidAddress(true);
    } else {
      setInvalidAddress(false);
    }
    setAddress(event.target.value);

  };
  /**
   * searchWallet is used to search for the given address
   * TODO make it so we populate a wallet instead (WalletContext) which we can display instead of textfields
   */
  const searchWallet = async () => {

    // TODO Convert HC into a Context, so we are not confined into a certain local one
    const hc = new HarmonyClient(address);
    // TODO make a array of all token names, export it from somewhere, and run through them in a loop
    hc.balanceOf("tranq", address, setTranq);
    hc.balanceOf("locked_tranq", address, setLockedTranq);

  }


  return (
    <Box>
      <Box sx={{
        m: "2rem",
      }}>
        <AccountBalanceWalletIcon sx={{ color: 'action.active', mr: 1, my: 2 }} />
        <TextField
          id="outlined-search"
          label="Address"
          type="search"
          value={address}
          error={validAddress}
          helperText={validAddress && "invalid address"}
          onChange={handleAddressChange}
        />
      </Box>

      <Box sx={{ m: "2rem" }}>
        <Button
          variant="contained"
          color="primary"
          type="submit"
          disabled={validAddress}
          onClick={searchWallet}

        >
          Search
        </Button>
      </Box>
      <Box sx={{ m: "2rem" }}>
        

        <TextField
          id="outlined-search"
          label="Tranq Amount"
          disabled={true}
          value={tranq}
          color="warning"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <img src={TranqIcon} alt="Tranq" width={25} height={25}/>
              </InputAdornment>
            ),
          }}
        />
      </Box>
      <TextField
        id="outlined-search"
        label="Locked Tranq"
        disabled={true}
        value={lockedTranq}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <img src={TranqIcon} alt="Tranq" width={25} height={25}/>
              <img src={LockIcon} alt="Lock" width={20} height={20} className="LockIcon"/>
            </InputAdornment>
          ),
        }}
      />
    </Box>
  )
}

export default SearchAddressPanel