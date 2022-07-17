
import React, { useState } from "react";
import { BsFillCaretUpFill, BsFillCaretDownFill } from "react-icons/bs";

const items = [
  { title: "1. WHAT HAPPENS WHEN I HIRE FARMERS?", text: "When you hire farmers, your BNB is locked in the BNB Cherries smart contract and rewards you with a daily income of 8% on the average. Sometimes your reward can be higher or lower but it's 8% on the average. Keep in mind that if you are hiring farmers and you already have a BNB reward, then your reward will be automatically reinvested." },
  { title: "2. CAN I TAKE MY INITIAL BNB BACK?", text: "Over time! Farmers take care of cherries and cherries need some time to repen. Every day a part of the cherries ripens, giving you a BNB reward with a rate of 8 % daily on the average." },
  { title: "3. HOW MUCH ARE MY FEES?", text: "There is a small 5% fee in order to pay for marketing costs and developing the BNB Cherries ecosystem." },
  { title: "4. WHEN IS THE BEST TIME TO HIRE FARMERS?", text: "Always! No matter when you hire farmers, you will begin with a return rate of 8% daily." },
  { title: "5. HOW OFTEN SHOULD I REINVEST (COMPOUND)?", text: "We recommend that you compound at least once per day but you are free to do so as often as you wish." },
  { title: "6. HOW IS BNB CHERRIES SUSTAINABLE? ", text: "BNB Cherries is sustained by continued community support, just as every other crypto coin, token or project. The difference is that since there is no token, there is no price to dump. As long as BNB is in the contract, there will be rewards!" },
  { title: "7. HOW DO REFERRALS WORK?", text: "Once your BSC wallet is connected to the BNB Cherries website, you will notice your referral address appear at the bottom of the page. When a new user buys cherries after clicking your personal referral link, the contract will send a BNB value equal to 12% instantly to your wallet. When user reinvest in Cherries, you also get a 12% reward. Be smart, use it to buy Cherries and build yourself a stream of passive income." },
  { title: "8. WHEN DID BNB CHERRIES LAUNCH?", text: "We launched 21.04.2022 15:00 UTC" },
]


const About = () => {
  const [ isShow, setIsShow ] = useState(0);
  const [ isShowTrue, setIsShowTrue ] = useState(true)

  const handleShow = (i) => {
    setIsShow(i);
    setIsShowTrue(!isShowTrue);
  }

  return (
    <div className="d-flex justify-content-center about">
      <div className="about_body">
        <div className="title">
          INFO ABOUT THE PROJECT
        </div>
          {
            items.map((item, i) => (
              <>
                <div className="d-flex justify-content-between item">
                  <div className="d-flex justify-content-between">
                    <h4 className="item_title">
                      {item.title}
                    </h4>
                    <div 
                      className="d-flex justify-content-between align-items-center item_more"
                      onClick={() => handleShow(i)}
                    >
                      <strong className="item_detail_text">Details</strong>
                      { isShow === i && isShowTrue === true ? <BsFillCaretUpFill color="white" /> : <BsFillCaretDownFill color="white" /> }
                    </div>
                  </div>
                  { isShow === i && isShowTrue === true ?
                    <div className="item_detail_text">
                      {item.text}
                    </div> : ""
                  }
         
                </div>
                {/* <div className="divider"></div> */}
              </>
            ))
          }
      </div>
    </div>
  )
}

export default About