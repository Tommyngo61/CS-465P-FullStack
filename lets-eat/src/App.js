import "./App.css";
import LandingPage from "./Landingpage/LandingPage";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import Login from "./Login/Login";
import SignUp from "./SignUp/SignUp";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/signup" component={SignUp} />
        <Route path="/" component={LandingPage} />
      </Switch>
    </Router>
  );
}

export default App;
