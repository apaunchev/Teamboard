import React from "react";
import Dashboard from "../components/dashboard";
import LocalTime from "../components/widgets/local-time";
import theme from "../themes/dark-theme";

export default () => (
  <div className="App">
    <Dashboard theme={theme}>
      <LocalTime timezone="Europe/London" title="London" />
      <LocalTime timezone="Europe/Paris" title="Paris" />
      <LocalTime timezone="Europe/Moscow" title="Moscow" />
    </Dashboard>
  </div>
);
