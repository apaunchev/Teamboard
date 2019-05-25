import { modularScale, transparentize } from "polished";
import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1em;
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

const Widget = ({
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
    content = <>{children}</>;
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

Widget.propTypes = {
  title: PropTypes.string,
  onClick: PropTypes.string,
  error: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired
};

export default Widget;
