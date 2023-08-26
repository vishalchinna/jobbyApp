import {Switch, Route} from 'react-router-dom'
import LoginForm from './Component/LoginForm'
import Home from './Component/Home'
import Jobs from './Component/Jobs'
import ProtectedRoute from './Component/ProtectedRoute'
import './App.css'

// These are the lists used in the application. You can move them to any component needed.

// Replace your code here
const App = () => (
  <Switch>
    <Route exact path="/login" component={LoginForm} />
    <ProtectedRoute exact path="/" component={Home} />
    <ProtectedRoute exact path="/jobs" component={Jobs} />
  </Switch>
)

export default App
