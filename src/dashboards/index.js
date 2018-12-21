import React from "react";
import Dashboard from "../components/dashboard";
import DateTime from "../components/widgets/datetime";
import lightTheme from "../themes/light-theme";

export default () => (
  <div className="App">
    <Dashboard theme={lightTheme}>
      <DateTime timezone="Europe/London" title="London" />
    </Dashboard>
  </div>
);
