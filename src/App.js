import React from "react";
import lightTheme from "./themes/lightTheme";
import Dashboard from "./Dashboard";
import DateTime from "./DateTime";
import GithubIssueCount from "./GithubIssueCount";

export default () => (
  <div className="App">
    <Dashboard theme={lightTheme}>
      <DateTime timezone="Europe/Sofia" title="Sofia" />
      <DateTime timezone="America/Costa_Rica" title="San Jose" />
      <GithubIssueCount authKey="github" owner="facebook" repository="react" />
    </Dashboard>
  </div>
);
