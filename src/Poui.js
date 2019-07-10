import React, { Component } from "react";
import PartoWithSelection from "./components/PartoWithSelection";
import "./Poui.css";

function Poui(props) {
  return(
    <div className="poui-root">
      <PartoWithSelection {...props} />
    </div>
  );
}

export default Poui;
