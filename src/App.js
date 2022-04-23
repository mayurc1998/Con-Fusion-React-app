
import { Component } from 'react';
import Main from './components/MainComponent';
import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configurestore } from './redux/configureStore';
const store=configurestore();
class App extends Component {
  
  render() {
    return (
      <Provider store={store}>
      <Router>
      <div className="App">
        <Main />
      </div>
      </Router>
      </Provider>
    );
  }
}

export default App;
