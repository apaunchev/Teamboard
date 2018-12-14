import React from "react";
import lightTheme from "./themes/lightTheme";
import Dashboard from "./Dashboard";
import DateTime from "./DateTime";
import GithubIssueCount from "./GithubIssueCount";

export default () => (
  <div className="App">
    <Dashboard theme={lightTheme}>
      <DateTime />
      <GithubIssueCount authKey="github" owner="facebook" repository="react" />
    </Dashboard>
  </div>
);
