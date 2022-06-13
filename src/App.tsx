import React from 'react';
import './App.css';
import SearchAddressPanel from './components/SearchAddressPanel';
import Container from '@mui/material/Container';



function App() {
  return (
    <div className="App">
      <header className="App-header">
      <Container>
        <SearchAddressPanel></SearchAddressPanel>
      </Container>
      </header>
    </div>
  );
}

export default App;
