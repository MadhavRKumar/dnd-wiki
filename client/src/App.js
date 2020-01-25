import React, { Component } from 'react';
import Article from './components/Article';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import './App.css';
import EditArticle from './components/EditArticle';

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
        </Switch>
      </Router>
    );
  }

}

export default App;
