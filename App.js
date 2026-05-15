const heading1 = React.createElement("h1", { id: "head1" }, "Hello World!");

const heading2 = React.createElement("h2", { id: "head2" }, "Namaste React!");

const div1 = React.createElement("div", { id: "container1" }, [
  heading1,
  heading2,
]);

const div2 = React.createElement("div", { id: "container2" }, [
  heading1,
  heading2,
]);

const heading = React.createElement("div", { id: "parent" }, [div1, div2]);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(heading);
