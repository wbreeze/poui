import React, { Component } from "react";
import Parto from "./components/Parto"
import "./App.css";

class App extends Component {
  render() {
    return(
      <div className="poui-root">
        <h1>Partial Order User Interface</h1>
        <Parto
          itemList={['Fresa', 'Durazno', 'Mandarina', 'Zarzamora', 'Frambuesa']}
        />
      </div>
    );
  }
}

export default App;
