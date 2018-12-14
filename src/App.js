import React, { Component } from "react";
import Dashboard from "./Dashboard";
import DateTime from "./DateTime";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Dashboard>
          <DateTime />
        </Dashboard>
      </div>
    );
  }
}

export default App;
