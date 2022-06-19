import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { WalletProvider } from "./context/WalletContext";
import HarmonyClient from './web3/harmony';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
/**
 * We create the client here to load abis and everything on start of the App
 */
const client = new HarmonyClient();

root.render(
  <React.StrictMode>
    <WalletProvider client={client} wallet={localStorage.getItem("selected_wallet") || ""}>
      <App />
    </WalletProvider>
    
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
