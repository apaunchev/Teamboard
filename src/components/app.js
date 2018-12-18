import React from "react";
import Dashboard from "./dashboard";
import DateTime from "./widgets/datetime";
import GithubIssueCount from "./widgets/github/issue-count";
import lightTheme from "../themes/light-theme";

export default () => (
  <div className="App">
    <Dashboard theme={lightTheme}>
      <DateTime timezone="Europe/Sofia" title="Sofia" />
      <DateTime timezone="Europe/Madrid" title="Madrid" />
      <DateTime timezone="America/Costa_Rica" title="San Jose" />
      <GithubIssueCount authKey="github" owner="facebook" repository="react" />
    </Dashboard>
  </div>
);
