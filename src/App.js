import React from 'react';
import './App.css';
import Header from './components/Header.js'
import Boards from './components/Boards.js'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.bundle.js'
import { Route, Switch, Redirect} from 'react-router-dom'
import BoardId from './components/BoardId.js'
import 'bootstrap/dist/css/bootstrap.min.css'

class App extends React.Component {
  render() {
    return (
      <div className='App'>
        <Switch>
          <Route exact path="/">
            <Redirect to="/boards" />
          </Route>
          <Route exact path='/boards'>
            <Route component={Header} />
            <Route component={Boards} />
          </Route>
          <Route exact path='/boards/:id' component={BoardId} />
        </Switch>
      </div>
    )
  }
}

export default App
