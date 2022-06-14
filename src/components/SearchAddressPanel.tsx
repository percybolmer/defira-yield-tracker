import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import Box from "@mui/material/Box";
import InputAdornment from '@mui/material/InputAdornment';

import { useState,useEffect, useContext, ChangeEvent } from 'react';
import { ethers } from "ethers";
import TranqIcon from '../icons/tranq.svg';
import LockIcon from '../icons/lock.svg';

import { WalletContext } from '../context/WalletContext';

import './SearchAddressPanel.css';


function SearchAddressPanel() {

  let wallet = useContext(WalletContext);
  /**
   * States used by the SearchPanel
   */
  const [address, setAddress] = useState(wallet?.Address);
  const [validAddress, setInvalidAddress] = useState(true);

  useEffect(() => {
    // Validate the address
    if (address !== undefined && !ethers.utils.isAddress(address)) {
      setInvalidAddress(true);
    } else {
      setInvalidAddress(false);
    }
  }, [address]);

  /**
   * handleAddressChange is used to verify that its a legit addr and and
   * open up the Search btn
   * @param event 
   */
  const handleAddressChange = (event: ChangeEvent<HTMLInputElement>) => {
    setAddress(event.target.value);
  };
  /**
   * searchWallet is used to search for the given address and update set wallet
   */
  const searchWallet = async () => {
    if (address !== undefined) {
      wallet?.SetAddress(address);
      wallet?.UpdateBalance();
    }
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
          value={wallet?.TranqBalance}
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
        value={wallet?.LockedTranqBalance}
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