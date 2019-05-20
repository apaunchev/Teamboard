import React from "react";
import styled from "styled-components";
import { modularScale } from "polished";

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1em;
  background-color: ${props => props.theme.palette.canvasColor};
  transition: all 0.3s ease;
  text-align: center;

  :hover {
    background-color: hsla(0, 0%, 100%, 0.05);
  }
`;

const Title = styled.h1`
  color: ${props => props.theme.palette.textColor};
  font-family: system-ui;
  font-size: ${modularScale(0)};
  font-weight: 300;
  letter-spacing: 6px;
  text-align: center;
  text-transform: uppercase;
`;

const Link = styled.a`
  display block;
  width: 100%;
  color: ${props => props.theme.palette.textColor};
  text-decoration: none;
`;

const Content = styled.div`
  width: 100%;
`;

export default ({
  children,
  error = false,
  loading = false,
  title = "",
  onClick
}) => {
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
      <Link href={onClick}>
        {title ? <Title>{title}</Title> : null}
        <Content>{content}</Content>
      </Link>
    </Container>
  );
};
