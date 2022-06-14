
import './App.css';
import SearchAddressPanel from './components/SearchAddressPanel';
import Container from '@mui/material/Container';
import { WalletContext, HarmonyWallet } from "./context/WalletContext";

const hw = new HarmonyWallet();

function App() {
  return (
    <div className="App">
      <header className="App-header">
      <WalletContext.Provider value={hw}>
        <Container>
          <SearchAddressPanel></SearchAddressPanel>
        </Container>
      </WalletContext.Provider>
      </header>
    </div>
  );
}

export default App;
