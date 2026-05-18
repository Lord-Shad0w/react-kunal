import React from "react";
import ReactDOM from "react-dom/client";

// const heading1 = (i) =>
//   React.createElement("h1", { id: "head1" + i }, "Hello World!");

// const heading2 = (i) =>
//   React.createElement("h2", { id: "head2" + i }, "Namaste React!");

// const div1 = React.createElement("div", { id: "container1" }, [
//   heading1(1),
//   heading2(1),
// ]);

// const div2 = React.createElement("div", { id: "container2" }, [
//   heading1(2),
//   heading2(2),
// const heading = React.createElement("div", { id: "parent" }, [div1, div2]);
// ]);

//React Elements
const headingEl = (
  <div>
    <h2 className="head">Hello! React using react elements</h2>
  </div>
);

//React Component- 2 types:
//Class Based Component (lrgacy, old way of writing components ) generally not used now a days
// Function based component (Modern way of writing components, generally used now a days)

//Function based component
const Title = ({ children }) => (
  <h1 className="headComp">
    Namaste React using nested Functional Component
    {children}
  </h1>
);
const Span = () => (
  <span className="spanComp">
    Namaste React using nested Functional Component span
  </span>
);
const HeadingComponent = () => (
  <div>
    <Title />
    <Title>
      <Span />
    </Title>
    {Title({ children: <Span /> })}
    <h2 className="headComponent">Hello! Functional React Component </h2>
  </div>
); // This is component composition, we are using one component inside another component

const RenderElInComponent = () => (
  <div>
    {headingEl}
    <HeadingComponent />
  </div>
);

const root = ReactDOM.createRoot(document.getElementById("root"));

// root.render(headingEl);
root.render(<HeadingComponent />);
// root.render(<RenderElInComponent />);
