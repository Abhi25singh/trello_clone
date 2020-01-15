import React from 'react';
import './App.css';
import Header from './components/Header.js'
import Boards from './components/Boards.js'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.bundle.js'
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import BoardId from './components/BoardId.js'
import 'bootstrap/dist/css/bootstrap.min.css'

class App extends React.Component {
  render() {
    return (
      <div className='App'>
      <Router>
        <Switch>
          <Route exact path='/boards'>
            <Route component={Header} />
            <Route component={Boards} />
          </Route>
          <Route path='/boards/:id' component={BoardId} />
        </Switch>
      </Router>
      </div>
    )
  }
}

export default App