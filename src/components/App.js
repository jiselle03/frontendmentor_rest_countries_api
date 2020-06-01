import React, { useState } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import IndexPage from './pages/IndexPage';
import ShowPage from './pages/ShowPage';
import NotFoundPage from './pages/NotFoundPage';

const App = () => {
  const [darkMode, setDarkMode] = useState(false);

  const switchMode = mode => {
    if (mode) {
      setDarkMode(true);
      document.body.classList.remove("light");
      document.body.classList.add("dark");
    } else {
      setDarkMode(false);
      document.body.classList.remove("dark");
      document.body.classList.add("light");
    };
  };

  return (
    <BrowserRouter>
        <header>
          <h1>Where in the world?</h1>
          {
            darkMode ? 
              <button 
                className="mode"
                onClick={() => switchMode(false)}
              >
              <i className="fas fa-moon"></i>
                Dark Mode
              </button>
            :
              <button 
                className="mode"
                onClick={() => switchMode(true)}
              >
                <i className="far fa-moon"></i>
                Light Mode
              </button>
          }
        </header>

        <Switch>
          <Route exact path="/" component={IndexPage} />
          <Route exact path="/:country" component={ShowPage} />
          <Route component={NotFoundPage} />
        </Switch>
    </BrowserRouter>
  );
};

export default App;
