import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './components/Login';
import Admin from './components/Admin';
import User from './components/User';
import ErrorPage from './components/ErrorPage';
import Agreements from './components/Agreements';

function App() {
  return (
        <div className="App">
          {
      // user ?
      <Router>
        <Routes>
          <Route exact path = "/" element = { <Login/> } />
          <Route exact path = "/admin" element = { <Admin/> } />
          <Route exact path = "/user" element = { <User/> } />
          <Route exact path = "/agreements" element = { <Agreements/> } />
          <Route path = "*" element = { <ErrorPage/> } />
          {/* <Route exact path = "/createuser" element = { <CreateUser/> } />
          <Route exact path = "/creatagreement" element = { <CreateAgreement/> } />
          <Route exact path = "/editagreement" element = { <EditAgreement/> } />
        </Routes>
      </Router>
      :
      <Router>
        <Routes>
          <Route exact path = "/" element = { <Login/> } />
          <Route exact path = "/admin" element = { <Login/> } />
          <Route exact path = "/user" element = { <Login/> } />
          <Route exact path = "/agreements" element = { <Login/> } />
          <Route exact path = "/createuser" element = { <Login/> } />
          <Route exact path = "/creatagreement" element = { <Login/> } />
          <Route exact path = "/editagreement" element = { <Login/> } />
          <Route path = "*" element = { <ErrorPage/> } /> */}
        </Routes>
      </Router>
      }
        </div>
    );
}

export default App;