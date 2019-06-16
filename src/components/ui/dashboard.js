import { normalize } from "polished";
import PropTypes from "prop-types";
import React from "react";
import styled, { createGlobalStyle, ThemeProvider } from "styled-components";

const GlobalStyle = createGlobalStyle`
  ${normalize()}

  html {
    background-color: ${props => props.theme.palette.backgroundColor};
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica,
      Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  }
`;

const Container = styled.main`
  background-color: ${props => props.theme.palette.backgroundColor};
  color: ${props => props.theme.palette.textColor};
  min-height: 100vh;
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  align-content: center;
`;

const Dashboard = ({ children, theme, style }) => (
  <ThemeProvider theme={theme}>
    <Container style={style}>
      {children}
      <GlobalStyle />
    </Container>
  </ThemeProvider>
);

Dashboard.propTypes = {
  theme: PropTypes.object.isRequired,
  style: PropTypes.object
};

export default Dashboard;
