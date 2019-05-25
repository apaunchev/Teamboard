import { modularScale, transparentize } from "polished";
import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";
import ErrorIcon from "./error-icon";
import LoadingIndicator from "./loading-indicator";

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1em;
  border-radius: 4px;
  transition: all 0.3s ease;
  text-align: center;

  :hover,
  :focus {
    background-color: ${props =>
      transparentize(0.95, props.theme.palette.textColor)};
    outline: none;
  }
`;

const Title = styled.h1`
  margin: 1em 0;
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
  margin: 1em 0;
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
    content = <LoadingIndicator />;
  } else if (error) {
    content = <ErrorIcon />;
  } else {
    content = <>{children}</>;
  }

  return (
    <Container tabIndex="0">
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
