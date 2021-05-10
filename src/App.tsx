import React, { useEffect } from "react";
import "./App.css";
import { initWallet, sendMoney } from "./helpers/wallet";

function App() {
  useEffect(() => {
    initWallet().then(() =>
      sendMoney("4rqzpkNu7LrFqntX45JTzjtTw35JUvwTb4TYNnE7BbA1")
    );
  }, []);

  return <div className="App"></div>;
}

export default App;
