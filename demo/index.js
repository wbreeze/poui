import React from "react";
import ReactDOM from "react-dom";
import Poui from "../src/Poui.js";
import ListItemsFixtures from '../src/fixtures/ListItemsFixtures';

ReactDOM.render(
  <Poui
    itemList={ListItemsFixtures.salad}
    parto={['T','L',['M','P'],'A']}
  />,
  document.getElementById("root")
);
