import React from 'react';
import { BrowserRouter } from "react-router-dom";
import { library } from '@fortawesome/fontawesome-svg-core'
import {faThumbsUp} from '@fortawesome/free-solid-svg-icons'
import MainRouter from "./MainRouter";

const App = () => {
  return (
      <BrowserRouter>
        <MainRouter/>
      </BrowserRouter>
  );
};

library.add(faThumbsUp);

export default App;