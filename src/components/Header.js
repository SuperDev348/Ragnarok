import React, { useState, useEffect, useContext } from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import * as Web3 from 'web3'
import { ethers } from "ethers";
import ContractUtils from '../utils/contractUtils';
import { StoreContext } from '../store';
import { WalletContext } from '../context/wallet';

const Header = () => {
  const global = useContext(StoreContext);
  const [walletAddress, setWalletAddress] = useContext(WalletContext);
  
  useEffect(() => {
    const address = localStorage.getItem("walletLocalStorageKey");
    if(address)
      setWalletAddress(address);
  }, [walletAddress, setWalletAddress])

  const onClickConnect = async () => {
    let res = await ContractUtils.connectWallet();
    if (res.address) {
        global.setShowToast(true);
        setWalletAddress(res.address);
        window.localStorage.setItem('walletLocalStorageKey', res.address);
    }
    else {
        global.setShowToast(true);
        // setToastType(2)
        // setToastMessage(res.status)
        setWalletAddress("");
    }
}

const onClickDisconnect = async () => {
    await ContractUtils.disconnectWallet();
    await window.localStorage.removeItem('walletLocalStorageKey');
    setWalletAddress("");
}


  return (
    <Navbar collapseOnSelect expand="lg" className='header'>
      <Navbar.Brand className='logo' href="/">CTHULHU</Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="nav-left">
          <Nav.Link className='nav-text' href="/">home</Nav.Link>
          <Nav.Link className='nav-text' href="/about">about</Nav.Link>
        </Nav>
      </Navbar.Collapse>
      <Navbar.Collapse className='justify-content-right'>
        <Nav className='nav-right'>
          <Nav.Link className='nav-twitter me-2' href='twitter.com'><i className='fa fa-twitter'></i></Nav.Link>
          <Nav.Link className='nav-send me-2' href='telegram.com'><i className='fa fa-send'></i></Nav.Link>
          <Nav.Link className='nav-user me-2'>
               <img src='/svgs/Path3.svg' alt=''/>
          </Nav.Link>
          <Nav.Link className='nav-telegram ms-4'>
            {walletAddress == '' ?
              <>
                  <button className='connectWallet' onClick={onClickConnect}>CONNECT WALLET</button>
              </>
              :
              <>
                  <button className='connectWallet' onClick={onClickDisconnect}>{walletAddress.substr(0, 6)}...{walletAddress.slice(30)}</button>
              </>}
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default Header;
