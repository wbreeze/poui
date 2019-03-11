import React, { Component } from "react";
import Item from "./components/Item"
import "./App.css";

class App extends Component {
  render() {
    return(
      <div className="poui-root">
        <h1>Partial Order User Interface</h1>
        <Item itemLabel='An item' />
      </div>
    );
  }
}

export default App;
