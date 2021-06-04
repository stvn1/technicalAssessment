

//router stuff
import{ BrowserRouter as Router, Switch, Route} from 'react-router-dom';



//components
import Login from './components/SignIn'
import Dashboard from './components/Dashboard'
import PrivateRoute from './components/PrivateRoute'
import DataList from './components/DataList'


function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Login} /> 
        <PrivateRoute exact path="/dashboard" component={Dashboard} />
        <PrivateRoute exact path="/dataList" component={DataList} />
    </Switch>
    </Router>
  );
}

export default App;
