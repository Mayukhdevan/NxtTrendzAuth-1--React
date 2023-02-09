import {Route, Switch} from 'react-router-dom'
import './App.css'
import LoginForm from './components/LoginForm'

const App = () => (
  <Switch>
    <Route exact path="/login" component={LoginForm} />
  </Switch>
)

export default App
