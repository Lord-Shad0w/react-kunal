import { useState } from "react";
import { Link } from "react-router";
import paths from "../utils/assetsPath";
import logoImg from "url:../../resources/logo/delLogo.png";

const Logo = () => {
  return <img className="logo-img" src={logoImg} alt="DeliveryLogo" />;
};

const NavItems = () => {
  const [btnName, setBtnName] = useState("Login");
  return (
    <ul className="nav-items-list">
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/about">About</Link>
      </li>
      <li>Cart</li>
      <li>
        <Link to="/support">Support</Link>
      </li>
      <button
        className={btnName.toLowerCase()}
        onClick={() => {
          btnName === "Login" ? setBtnName("Logout") : setBtnName("Login");
        }}
      >
        {btnName}
      </button>
    </ul>
  );
};

const HeaderComponent = () => (
  <div className="header">
    <div className="logo">
      <Logo />
    </div>
    <div className="nav-items">
      <NavItems />
    </div>
  </div>
);

export default HeaderComponent;
