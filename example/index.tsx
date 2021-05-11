import "react-app-polyfill/ie11";
import * as React from "react";
import * as ReactDOM from "react-dom";
import "../index.css";
import "./style.css";
import { useRipple } from "../src";

const App = () => {
  const { styles, onClick } = useRipple();

  return (
    <button className="ripple-parent" onClick={onClick}>
      Ripple
      {styles?.map((style, index) => (
        <span key={index} className="ripple ripple-color" style={style} />
      ))}
    </button>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
