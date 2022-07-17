import './App.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from './components/Home';
import About from './components/About';
import Header from './components/Header.js';
import Footer from './components/Footer.js';
import "./components/About/about.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import 'font-awesome/css/font-awesome.min.css';
import React, {useState} from 'react';
import { StoreContext } from './store';
import { WalletProvider } from './context/wallet';

const App = () => {
  const [showToast, setShowToast] = useState(false)
  const value = {
    showToast, setShowToast,
  }

  return (
    <WalletProvider>
      <StoreContext.Provider value= {value}>
        <Header />
        <Router>
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/about" exact component={About} />
                <Route path="/home" exact component={Home} />
            </Switch>
            <Footer />
        </Router>
      </StoreContext.Provider>
    </WalletProvider>
  );
}

export default App;
