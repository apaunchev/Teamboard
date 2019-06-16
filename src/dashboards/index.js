import React from "react";

// Widgets
import Dashboard from "../components/ui/dashboard";
import LocalTime from "../components/widgets/local-time";

// Theme
import theme from "../themes/dark-theme";
// import theme from "../themes/light-theme";

export default () => (
  <Dashboard theme={theme}>
    <LocalTime timezone="Europe/London" title="London" />

    <LocalTime timezone="Europe/Paris" title="Paris" />

    <LocalTime timezone="Europe/Moscow" title="Moscow" />
  </Dashboard>
);
