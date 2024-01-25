import {Switch, Route} from 'react-router-dom'

import Login from './components/Login'
import Home from './components/Home'
import Header from './components/Header'
import Trending from './components/Trending'
import Gaming from './components/Gaming'
import './App.css'

// Replace your code here
const App = () => (
  <>
    <Switch>
      <Route exact path="/login" component={Login} />
      <Route exact path="/" component={Home} />
      <Route exact path="/header" component={Header} />
      <Route exact path="/trending" component={Trending} />
      <Route exact path="/gaming" component={Gaming} />
    </Switch>
  </>
)

export default App
