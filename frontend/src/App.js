import "./App.css";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Dashboard from "./Dashboard/Dashboard";
import NotFound from "./Pages/NotFound";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <div>
      <Router>
        <Switch>
          <Route path="/" exact>
            <Login />
          </Route>
          <Route path="/register" exact>
            <Register />
          </Route>
          <Route path="/viewartist" exact>
            <Dashboard />
          </Route>
          <Route path="/addartist" exact>
            <Dashboard />
          </Route>
          <Route component={NotFound} />
        </Switch>
      </Router>
      <ToastContainer icon={false} />
    </div>
  );
}

export default App;
