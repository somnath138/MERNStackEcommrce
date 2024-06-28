import React from "react";
import playStore from "../../../images/playstore.png";
import appStore from "../../../images/Appstore.png";
import "./Footer.css";
const Footer = () => {
  return (
    <footer>
      <div className="leftFooter">
        <h4>DOWNLOAD OUR APP</h4>
        <p>DOWNLOAD App for Android and IOS mobile phone</p>
        <img src={playStore} alt="Playstore" />
        <img src={appStore} alt="Appsote" />
      </div>
      <div className="midFooter">
        <h1>MediCo</h1>

        <p>Copyrights 2021 &copy; MeSomnath</p>
      </div>

      <div className="rightFooter">
        <h4>Follow Us</h4>
        <a href="https://www.instagram.com/">Instagram</a>
        <a href="https://www.youtube.com/channel/UCTJQ3ns20vOEOx4te2Loi6w">
          Youtube
        </a>
        <a href="https://www.facebook.com/">Facebook</a>
      </div>
    </footer>
  );
};

export default Footer;
