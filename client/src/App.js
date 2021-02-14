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
import SearchResult from './components/SearchResult';
import CreateArticle from './components/CreateArticle';
import NavBar from './components/NavBar';
import Search from './components/Search';

class App extends Component {


  render() {
    return (
      <Router>
        <Switch>
          <Route path='/article/:pageTitle'>
            <NavBar />
            <Search />
            <Article />
          </Route>
          <Route path='/edit/:pageTitle'>
            <NavBar />
            <Search />
            <EditArticle />
          </Route>
          <Route path='/search/:query'>
            <NavBar />
            <Search />
            <SearchResult />
          </Route>
          <Route path='/create'>
            <CreateArticle />
          </Route>
          <Route path='/'>
            <Home />
          </Route>
        </Switch>
      </Router>
    );
  }

}

export default App;
