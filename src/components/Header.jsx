import paths from '../utils/assetsPath';
import logoImg from "url:../../resources/logo/delLogo.png";

const Logo = () => {
  return <img className="logo-img" src={logoImg} alt="DeliveryLogo" />;
};

const NavItems = () => (
  <ul className="nav-items-list">
    <li>Home</li>
    <li>About</li>
    <li>Cart</li>
    <li>Support</li>
  </ul>
);

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

export default   HeaderComponent;