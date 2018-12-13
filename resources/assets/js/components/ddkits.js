import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Header from './Header'
import NewProject from './NewProject'
import ProjectsList from './ProjectsList'
import SingleProject from './SingleProject'

class ddkits extends Component {
  render () {
    return (
      <BrowserRouter>
        <div>
          <Header />
          <Switch>
            <Route exact path='/' component={ProjectsList} />
            <Route path='/create' component={NewProject} />
          </Switch>
        </div>
      </BrowserRouter>
    )
  }
}

ReactDOM.render(<ddkits />, document.getElementById('ddkits'))