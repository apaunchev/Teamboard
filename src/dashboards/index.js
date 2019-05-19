import React from "react";
import Dashboard from "../components/dashboard";
import DateTime from "../components/widgets/datetime";
import theme from "../themes/dark-theme";

export default () => (
  <div className="App">
    <Dashboard theme={theme}>
      <DateTime timezone="Europe/London" title="London" />
    </Dashboard>
  </div>
);
