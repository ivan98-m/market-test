import React from 'react';
import { UnsupportedChainIdError, useWeb3React } from "@web3-react/core";
import { connector } from "../config/web3";
import { useCallback, useEffect, useState } from "react";
import Tabs from './Tabs';
/**
   * Deploying contract with the account: 0x37F0147E189369A0fb4cB92ef8c5F35FDbe5fd6b
   * Test Novoos nft is deployed at: 0x3B2f1fA749E4D76609c2f7815e9B9Efd0D2C48FB
*/

function Boton(props) {
  return (
    <button
    onClick={props.nombre}
    >
      conectar
    </button>
  )
}

function ConnectWallet() {

  const [balance, setBalance] = useState(0);
  const { active, activate, deactivate, account, error, library } =
    useWeb3React();

  const isUnsupportedChain = error instanceof UnsupportedChainIdError;

  const connect = useCallback(() => {
    activate(connector);
    localStorage.setItem("previouslyConnected", "true");
  }, [activate]);

  const disconnect = () => {
    deactivate();
    localStorage.removeItem("previouslyConnected");
  };

  const getBalance = useCallback(async () => {
    const toSet = await library.eth.getBalance(account);
    setBalance((toSet / 1e18).toFixed(2));
  }, [library?.eth, account]);

  useEffect(() => {
    if (active) getBalance();
  }, [active, getBalance]);

  useEffect(() => {
    if (localStorage.getItem("previouslyConnected") === "true") connect();
  }, [connect]);

  
  return (
    <>
      {active ? (
        <>
          <button
          onClick={disconnect}
          >
            desconectar
          </button>
          <Tabs  account={account} />
        </>
      ) : (
        <Boton nombre={connect}/>
      )}
    </>

  )
}


export default ConnectWallet;
