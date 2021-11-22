import React, { useState } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import "material-icons/iconfont/material-icons.css";

import { SongsFetchContext } from "./api/deezerApi";

ReactDOM.render(
  <React.StrictMode>
    <SongsFetchContext>
      <App />
    </SongsFetchContext>
  </React.StrictMode>,
  document.getElementById("root")
);
