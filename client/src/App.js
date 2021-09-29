import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import HomeScreen from "./screens/HomeScreen";
import AppNavbar from "./components/AppNavbar";
import { UserProvider } from "./context/UserContext";
import Dashboard from "./screens/Dashboard";
import Add from "./components/Add";

function App() {
  const [user, setUser] = useState(null);

  return (
    <div className="App">
      <UserProvider value={{ user, setUser }}>
        <Router>
          <AppNavbar />
          <Switch>
            <Route path="/" exact component={HomeScreen} />
            <Route path="/dashboard" exact component={Dashboard} />
            <Route path="/add" exact component={Add} />
          </Switch>
        </Router>
      </UserProvider>
    </div>
  );
}

export default App;
