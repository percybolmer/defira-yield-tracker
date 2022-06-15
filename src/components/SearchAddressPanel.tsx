import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import Box from "@mui/material/Box";

import { useState,useEffect, useContext, ChangeEvent } from 'react';
import { ethers } from "ethers";

import { WalletContext } from '../context/WalletContext';


function SearchAddressPanel() {

  const wallet = useContext(WalletContext);
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
  const searchWallet = () => {
    if (address !== undefined) {
      wallet?.SetAddress(address);
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
    </Box>
  )
}

export default SearchAddressPanel