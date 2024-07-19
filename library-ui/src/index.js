import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import App from "./App";
import * as serviceWorker from "./serviceWorker";

ReactDOM.render(
  <BrowserRouter>
          <Routes>
            <Route path='/*' element = {<App></App>}></Route>


          </Routes>
  </BrowserRouter>,
  document.getElementById("root")
);

serviceWorker.unregister();
