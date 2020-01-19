import React, { Component } from 'react';
import Article from './components/Article';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {title: "test2"}
  }

  callAPI = async (pageTitle) => {
    const response = await fetch(`/${pageTitle}`);
    const body = await response.json();
    if(response.status !== 200) throw Error(body.message);

    return body;
  }

  componentDidMount() {
    this.callAPI(this.state.title).then(res => this.setState({text: res.text})).catch(err => console.error(err));
  }


  render() {
    return (
      <div className="App">
        <Article title={this.state.title} text={this.state.text} />
      </div>
    );
  }

}

export default App;
