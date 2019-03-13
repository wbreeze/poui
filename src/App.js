import React, { Component } from "react";
import Parto from "./components/Parto";
import ListItems from "./ListItems";
import "./App.css";

class App extends Component {
  render() {
    return(
      <div className="poui-root">
        <h1>Partial Order User Interface</h1>
        <Parto
          itemList={ListItems.sample}
          parto={['Z','C']}
        />
      </div>
    );
  }
}

export default App;
