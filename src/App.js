import './App.css';
import Home from './components/Home'
import Movie from './components/Movie'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from 'react-redux';
import store from './redux/store'


require('dotenv').config();



function App() {
  
  return (
    <Provider store={store}>
    <Router>
      <Switch>
        <Route path="/" exact component={Home}/>
        <Route path="/movie-details/*" exact component={Movie}/>
      </Switch>
    </Router>
  </Provider>
  )
}
export default App;
