import React from "react";
import { Link } from "react-router-dom"


function Footer () {

    const handleClick = () => {

    }

    return(
        <>
            <div className="mobile-menu">
                <div className="body mobile-contact">
                    <Link to="/">
                        <button className="action button footer-button">
                            <img src="/svgs/home.svg" />
                            <p>Home</p>
                        </button>
                    </Link>
                    <Link to="/about">
                        <button className="button action footer-button">
                            <img src="/svgs/about.svg" />
                            <p>About</p>
                        </button>
                    </Link>

                    <div class="dropdown">
                        <span><img src="/svgs/contact.svg" /></span>
                        <div class="dropdown-content">
                            <li>
                                <a>Twitter</a>
                            </li>
                            <hr />
                            <li>
                                <a href="https://github.com/devCrypto715/CthulhuStaking" style={{ textDecoration: 'none' }}>Github</a>
                            </li>
                            <hr />
                            <li>
                                <a>Docs</a>
                            </li>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Footer;