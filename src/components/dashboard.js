import { normalize } from "polished";
import PropTypes from "prop-types";
import React from "react";
import styled, { createGlobalStyle, ThemeProvider } from "styled-components";

const GlobalStyle = createGlobalStyle`
  ${normalize()}

  html {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica,
      Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  }
`;

const Container = styled.main`
  display: grid;
  grid: repeat(3, 1fr) / repeat(3, 1fr);
  grid-gap: 1vh;
  padding: 1vh;
  min-height: calc(100vh - 2vh);
  background-color: ${props => props.theme.palette.backgroundColor};
  color: ${props => props.theme.palette.textColor};
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
