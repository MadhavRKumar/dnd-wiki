import React from 'react';
import Article from '../ViewArticle';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import './App.css';
import EditArticle from '../EditArticle';
import Home from '../Home';
import SearchResult from '../SearchResult';
import CreateArticle from '../CreateArticle';
import NavBar from '../NavBar';
import Search from '../Search';

export default function App() {
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
          <Route path='/search'>
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

