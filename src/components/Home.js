import React, { useState, useEffect, useContext } from "react";
import { StoreContext } from "../store";
import * as Web3 from 'web3'
import { BUSD_ADDRESS, STAKING_CONTRACT_ADDRESS, ALLOWANCE_MOUNT } from '../constant';
import { WalletContext } from "../context/wallet";
import { BUSDABI, STAKING_POOL } from '../abi';
import { anySeries } from "async";
import BigNumber from "bignumber.js";
import ContractUtils from '../utils/contractUtils';

const Home = () => {
    const global = useContext(StoreContext);
    const [balance, setBalance] = useState('0');
    const [ walletAddress, setWalletAddress ] = useContext(WalletContext);
    const [link, setLink] = useState("https://cthulhu-staking.vercel.app/?ref=");
    const [amount, setAmount] = useState('0');
    const [isInvestor, setIsInvestor] = useState(false);
    const [stakingData, setStakingData] = useState({invests: 0, rewards: 0});

    const web3 = new Web3(window.ethereum);

    useEffect(() => {
        const getBalance = async () => {
            if(walletAddress === "" || walletAddress === null){
                setBalance('0');
                
            }else{
                const contract = new web3.eth.Contract(BUSDABI, BUSD_ADDRESS);
                const userBalance = await contract.methods.balanceOf(walletAddress).call();
                setBalance((userBalance / (10 ** 18)).toFixed(4));
            }
        }
        getBalance();
    }, [web3?.eth?.Contract, walletAddress])

    useEffect(() => {
        const getInit = async() => {
            const stakingContract = new web3.eth.Contract(STAKING_POOL, STAKING_CONTRACT_ADDRESS);
            const res = await stakingContract.methods.getStakingData(walletAddress).call({from: walletAddress});
            setStakingData(res);
            if(res?.invests != '0' || res?.rewards != '0')
                setIsInvestor(true);
        }
        if(walletAddress !== '')
            getInit();
    }, [walletAddress, web3?.eth])

    const copyLink = () => {
        alert('copied!');
    }

    const approve = async () => {
        try{
            const busdContract = new web3.eth.Contract(BUSDABI, BUSD_ADDRESS);
            const depositContract = new web3.eth.Contract(STAKING_POOL, STAKING_CONTRACT_ADDRESS);
            const allowance = await busdContract.methods.allowance(walletAddress, STAKING_CONTRACT_ADDRESS).call();
            if(allowance == '0'){
                await busdContract.methods.approve(STAKING_CONTRACT_ADDRESS, (BigNumber(amount)*10**18).toString()).send({from: walletAddress});
                await depositContract.methods.deposit((BigNumber(amount)*10**18).toString()).send({
                    from: walletAddress,
                }) 
            }
        }catch(err){
            console.log(err);
        }
    }

    const getReward = async() => {
        const stakingContract = new web3.eth.Contract(STAKING_POOL, STAKING_CONTRACT_ADDRESS);
        await stakingContract.methods.claimRewards().send({from: walletAddress});
    }

    const withdrawAll = async() => {
        if(amount !== '0'){
            const stakingContract = new web3.eth.Contract(STAKING_POOL, STAKING_CONTRACT_ADDRESS);
            await stakingContract.methods.withdraw((BigNumber(amount)*10**18).toString()).send({from: walletAddress});
        }else{
            alert("Please enter invalid number!");
        }
    }

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
        <>
            <div className="mobile-header">
                <div className="logo">
                    <h1 className="text-center">CTHULHU</h1>
                    <img src="/svgs/index.svg" alt=""/>
                    {walletAddress == '' ?
                    <>
                        <button className='connectWallet2' onClick={onClickConnect}>CONNECT WALLET</button>
                    </>
                    :
                    <>
                        <button className='connectWallet2' onClick={onClickDisconnect}>{walletAddress.substr(0, 6)}...{walletAddress.slice(30)}</button>
                    </>}
                </div>
            </div>
            <div className="home">
                <div className="image">
                    <img src="/svgs/index.svg" alt=""/>
                </div>
                <div className="staking">
                    <div className="staking-body">
                        <div className="info">
                            <div className="spacebetween">
                                <p>wallet</p>
                                <p>{balance} BUSD</p>
                            </div>
                            <div className="spacebetween">
                                <p>DAILY RETURN</p>
                                <p>2.5%</p>
                            </div>
                        </div>
                        <div className="input-bnb">
                            <input type="number" className="input hire-bnb-input" value={amount} onChange={(e) => setAmount(e.target.value)}/>
                            <span>BUSD</span>
                        </div>
                        <div className="hire-cthulhu">
                            <button 
                                type="button" 
                                className={amount&& amount !== '0'?"button hire-cthulhu-btn":"button hire-cthulhu-btn disabled"}
                                onClick={() => approve()}
                            >
                                Approve
                            </button>
                        </div>
                        <div className="get-cthulhu">
                            <button 
                                type="button" 
                                className={isInvestor?"button hire-cthulhu-btn":"button hire-cthulhu-btn disabled"}
                                style={{ display: 'flex', justifyContent: 'center' }}
                                onClick={() => getReward()}
                            >
                                Get Reward
                            </button>
                            <button 
                                type="button" 
                                className={amount&& amount !== '0' && stakingData?.invests !== '0'?"button hire-cthulhu-btn":"button hire-cthulhu-btn disabled"}
                                style={{ display: 'flex', justifyContent: 'center' }}
                                onClick={() => withdrawAll()}
                            >
                                Withdraw
                            </button>
                        </div>
                        <p className="bnb-daily">{`Total Deposit: ${(stakingData?.invests / (10 ** 18)).toFixed(2)} BUSD, Rewards: ${(stakingData?.rewards / ( 10 ** 18)).toFixed(4)} BUSD`} </p>
                    </div>
                </div>
                <div className="referal">
                    <div className="referal-body">
                        <h5>referal program</h5>
                        <div className="referal-url">
                            <input type="text" className="input referal-url-input" value={ link + walletAddress} />
                            <img src="/svgs/chain.svg" className="button" onClick={copyLink} alt=''/>
                        </div>
                        <p>Earn 12% of the BNB from anyone who uses yout referral link used to open the farm</p>
                        {/* <div className="your-referal">
                            <h5>your referrals</h5>
                            <span>0</span>
                        </div> */}
                    </div>
                </div>
            </div>
            
            <img className="position pc vector1" src="/svgs/Vector1.svg" alt="f"/>
            <img className="position pc vector2" src="/svgs/Vector1.svg" />
            <img className="position pc vector3" src="/svgs/Vector3.svg" />
            <img className="position pc back1" src="/svgs/back1.svg" />
            <img className="position pc back2" src="/svgs/back2.svg" />
            <img className="position pc back3" src="/svgs/back3.svg" />
            <img className="position pc back4" src="/svgs/back2.svg" />
            <img className="position pc back5" src="/svgs/back5.svg" />
            <img className="position pc back6" src="/svgs/back6.svg" />
            <img className="position pc back7" src="/svgs/back7.svg" />
            <img className="position mobile vector8" src="/svgs/vector8.svg" />
            <img className="position mobile vector9" src="/svgs/vector9.svg" />
            <img className="position mobile back8" src="/svgs/back8.svg" style={{ visibility: "visible" }} />
            <img className="position mobile back9" src="/svgs/back9.svg" style={{ visibility: "visible" }} />
            <img className="position mobile back10" src="/svgs/back10.svg" style={{ visibility: "visible" }} />
            <img className="position mobile back11" src="/svgs/back11.svg" style={{ visibility: "visible" }} />

           
        </>
    )
}

export default Home;