import React, { Component } from "react";
import PartoWithSelection from "./components/PartoWithSelection";
import ListItemsFixtures from './fixtures/ListItemsFixtures';
import "./Poui.css";

class Poui extends Component {
  render() {
    return(
      <div className="poui-root">
        <PartoWithSelection
          itemList={ListItemsFixtures.salad}
          parto={['T','L',['M','P'],'A']}
        />
      </div>
    );
  }
}

export default Poui;
