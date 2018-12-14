import React from "react";
import styled from "styled-components";
import { size } from "polished";

const Container = styled.div`
  ${size("20em")}
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 1em;
  padding: 1em;
  background-color: ${props => props.theme.palette.canvasColor};
  border: 1px solid ${props => props.theme.palette.borderColor};
`;

const Title = styled.h1`
  margin-bottom: 0;
  text-align: center;
`;

export default ({ children, error = false, loading = false, title = "" }) => {
  let content;

  if (loading) {
    content = <div className="Loading">Loading...</div>;
  } else if (error) {
    content = <div className="Error">{error}</div>;
  } else {
    content = <div>{children}</div>;
  }

  return (
    <Container>
      {title ? <Title>{title}</Title> : null}
      {content}
    </Container>
  );
};
