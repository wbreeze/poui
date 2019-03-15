import React, { Component } from "react";
import PartoWithSelection from "./components/SelectInOrder";
import ListItems from "./ListItems";
import "./App.css";

class App extends Component {
  render() {
    return(
      <div className="poui-root">
        <h1>Partial Order User Interface</h1>
        <PartoWithSelection
          itemList={ListItems.sample}
        />
      </div>
    );
  }
}

export default App;
