import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import Box from "@mui/material/Box";

import { useState,useEffect, useContext, ChangeEvent } from 'react';
import { ethers } from "ethers";

import { WalletContext } from '../context/WalletContext';


function SearchAddressPanel() {

  const wallet = useContext(WalletContext);
  const [localAddress, setLocalAddress] = useState(localStorage.getItem("selected_wallet") || "");
  const [validAddress, setInvalidAddress] = useState(true);
  /**
   * States used by the SearchPanel
   */
  useEffect(() => {
    // Validate the address
    if (localAddress !== undefined && !ethers.utils.isAddress(localAddress)) {
      setInvalidAddress(true);
    } else {
      setInvalidAddress(false);
    }
  }, [localAddress]);

  if (!wallet) return null;
  const {SetAddress } = wallet;
  /**
   * handleAddressChange is used to verify that its a legit addr and and
   * open up the Search btn
   * @param event 
   */
  const handleAddressChange = (event: ChangeEvent<HTMLInputElement>) => {
    setLocalAddress(event.target.value);
  };
  /**
   * searchWallet is used to search for the given address and update set wallet
   */
  const searchWallet = () => {
    if (localAddress !== undefined) {
      console.log("SearchAddressPanel searches for wallet");
      SetAddress(localAddress);
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
          value={localAddress}
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