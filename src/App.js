import React, { Component } from "react";
import Dashboard from "./Dashboard";
import DateTime from "./DateTime";
import GithubIssueCount from "./GithubIssueCount";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Dashboard>
          <DateTime />
          <GithubIssueCount owner="facebook" repository="react" />
        </Dashboard>
      </div>
    );
  }
}

export default App;
