import React from "react";
import Dashboard from "./dashboard";
import DateTime from "./widgets/datetime";
import GithubSearchCount from "./widgets/github/search-count";
import lightTheme from "../themes/light-theme";

export default () => (
  <div className="App">
    <Dashboard theme={lightTheme}>
      <DateTime timezone="Europe/Sofia" title="Sofia" />

      <DateTime timezone="America/Costa_Rica" title="San Jose" />

      <GithubSearchCount
        authKey="github"
        query="is:open+is:issue"
        title="Open GitHub Issues"
      />

      <GithubSearchCount
        authKey="github"
        query="is:open+is:pr"
        title="Open Pull Requests"
      />
    </Dashboard>
  </div>
);
