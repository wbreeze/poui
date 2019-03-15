import React, { Component } from "react";
import PartoWithSelection from "./components/SelectInOrder";
import ListItemsFixtures from './fixtures/ListItemsFixtures';
import "./App.css";

class App extends Component {
  render() {
    return(
      <div className="poui-root">
        <h1>Partial Order User Interface</h1>
        <PartoWithSelection
          itemList={ListItemsFixtures.salad}
          parto={['T','L',['M','P'],'A']}
        />
      </div>
    );
  }
}

export default App;
