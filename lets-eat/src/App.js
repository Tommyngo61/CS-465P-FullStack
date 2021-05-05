import "./App.css";
import LandingPage from "./Landingpage/LandingPage";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import Login from "./Login/Login";
import SignUp from "./SignUp/SignUp";
import Profile from "./ProfilePage/ProfilePage";
import { AuthProvider } from "./contexts/AuthContext";

function App() {
  return (
    <Router>
      <AuthProvider>
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/signup" component={SignUp} />
          <Route path="/profilepage" component={Profile} />
          <Route path="/" component={LandingPage} />
        </Switch>
      </AuthProvider>
   </Router>
  );
}

export default App;
