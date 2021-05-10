import React, { useEffect } from "react";
import "./App.css";
import { initWallet, sendMoney } from "./wallet/wallet";

function App() {
  useEffect(() => {
    initWallet().then(() => sendMoney());
  }, []);

  return <div className="App"></div>;
}

export default App;
