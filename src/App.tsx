
import './App.css';
import SearchAddressPanel from './components/SearchAddressPanel';
import Container from '@mui/material/Container';
import { WalletContext, WalletContextInterface } from "./context/WalletContext";
import HarmonyClient from 'web3/harmony';

/**
 * Create Harmony Client right here so it is created on startup
 * TODO Grab addr from localstorage
 */
const walletAppContext: WalletContextInterface = {
  HarmonyClient: new HarmonyClient(""),
};


function App() {
  return (
    <div className="App">
      <header className="App-header">
      <WalletContext.Provider value={walletAppContext}>
        <Container>
          <SearchAddressPanel></SearchAddressPanel>
        </Container>
      </WalletContext.Provider>
      </header>
    </div>
  );
}

export default App;
