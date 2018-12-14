import React from "react";
import styled, { ThemeProvider, createGlobalStyle } from "styled-components";
import { normalize } from "polished";

const GlobalStyle = createGlobalStyle`
  ${normalize()}

  html {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica,
      Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  }
`;

const Container = styled.main`
  display: flex;
  align-items: center;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  min-height: calc(100vh - 2em);
  padding: 1em;
  background-color: ${props => props.theme.palette.backgroundColor};
  color: ${props => props.theme.palette.textColor};
`;

export default ({ children, theme }) => (
  <ThemeProvider theme={theme}>
    <Container>
      {children}

      <GlobalStyle />
    </Container>
  </ThemeProvider>
);
