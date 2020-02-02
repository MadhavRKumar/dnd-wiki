import React, { Component } from 'react';
import Article from './components/ViewArticle';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import './App.css';
import EditArticle from './components/EditArticle';
import Home from './components/Home';

class App extends Component {


  render() {
    return (
      <Router>
        <Switch>
          <Route path='/article/:pageTitle'>
            <Article />
          </Route>
          <Route path='/edit/:pageTitle'>
            <EditArticle/>
          </Route>
          <Route path='/'>
              <Home/>
          </Route>
        </Switch>
      </Router>
    );
  }

}

export default App;
