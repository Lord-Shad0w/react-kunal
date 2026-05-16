import React from "react";
import ReactDOM from "react-dom/client";


const heading1 = (i) => React.createElement("h1", { id: "head1" + i }, "Hello World!");

const heading2 = (i) => React.createElement("h2", { id: "head2" + i }, "Namaste React!");

const div1 = React.createElement("div", { id: "container1" }, [
  heading1(1),
  heading2(1),
]);

const div2 = React.createElement("div", { id: "container2" }, [
  heading1(2),
  heading2(2),
]);

const heading = React.createElement("div", { id: "parent" }, [div1, div2]);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(heading);
