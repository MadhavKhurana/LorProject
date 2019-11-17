import React from "react";
// import logo from "./logo.svg";
import HomePage from "./Components/Home.jsx";
import AdminAuth from "./Components/Auth/AdminAuth.jsx";
import UserAuth from "./Components/Auth/UserAuth.jsx";
import UserPanel from "./Components/UserDashboard/UserPanel.jsx";
import AdminPanel from "./Components/AdminDashboard/AdminPanel.jsx";
import ApproveLor from "./Components/AdminDashboard/ApproveLOR.jsx";
import ApprovedLor from "./Components/AdminDashboard/ApprovedLOR.jsx";
import LorPage from "./Components/UserDashboard/LorPage.jsx";
import SubmittedLors from "./Components/UserDashboard/SubmittedLors.jsx";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import setAuthToken from "./utils/setAuthToken.js";
import stores from "./store.js";
import jwt_decode from "jwt-decode";
import PrivateRoute from "./utils/PrivateRoute";
import { setCurrentUser } from "./redux/actions/authActions";

if (localStorage.jwtTokenMujLor) {
  setAuthToken(localStorage.jwtTokenMujLor);
  const decoded = jwt_decode(localStorage.jwtTokenMujLor);
  stores.dispatch(setCurrentUser(decoded));
}

class App extends React.Component {
  render() {
    return (
      <Provider store={stores}>
        <div className="App">
          <Router>
            <Route exact path="/" component={HomePage} />
            <Route exact path="/student-login" component={UserAuth} />
            <Route exact path="/admin-login" component={AdminAuth} />
            <Switch>
              <PrivateRoute exact path="/admin-panel" component={AdminPanel} />
              <PrivateRoute exact path="/user-panel" component={UserPanel} />
              <PrivateRoute exact path="/generate-lor" component={LorPage} />
              <PrivateRoute exact path="/approve-lor" component={ApproveLor} />
              <PrivateRoute
                exact
                path="/approved-lors"
                component={ApprovedLor}
              />
              <PrivateRoute
                exact
                path="/submitted-lors"
                component={SubmittedLors}
              />
            </Switch>
          </Router>
        </div>
      </Provider>
    );
  }
}

export default App;
