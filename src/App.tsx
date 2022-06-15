
import './App.css';
import SearchAddressPanel from './components/SearchAddressPanel';
import Container from '@mui/material/Container';
import Wallet from './components/Wallet';


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Container>
          <SearchAddressPanel></SearchAddressPanel>
          <Wallet></Wallet>
        </Container>
      </header>
    </div>
  );
}

export default App;
