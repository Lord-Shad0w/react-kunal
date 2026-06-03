import React from "react";
import ReactDOM from "react-dom/client";
import HeaderComponent from "./components/Header";
import Body from "./components/Body"; 

const AppLayout = () => (
  <>
    <header>
      <div className="main-header">
        <HeaderComponent />
      </div>
    </header>
    <main>
      <Body />
    </main>
  </>
);
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<AppLayout />);
