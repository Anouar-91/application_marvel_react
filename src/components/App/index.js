import React from 'react'
import Header from "../Header"
import Landing from '../Landing';
import Footer from '../Footer'
import Welcome from '../Welcome'
import Login from '../Login'
import Signup from '../Signup'
import ErrorPage from '../ErrorPage';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import '../../App.css'

function App() {
  return (
    <Router>
      <Header />
      <Switch>
        <Route exact path="/" component={Landing} />
        <Route exact path="/welcome" component={Welcome} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/signup" component={Signup} />
        <Route component={ErrorPage} />
      </Switch>
      <Footer></Footer>
    </Router>
  );
}

export default App;
