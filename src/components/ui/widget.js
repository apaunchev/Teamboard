import { modularScale, size, transparentize } from "polished";
import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";
import ErrorIcon from "./error-icon";
import LoadingIndicator from "./loading-indicator";

const Container = styled.div`
  ${size("20em")}
  background-color: ${props =>
    transparentize(0.95, props.theme.palette.textColor)};
  margin: 0.33em;
  position: relative;
`;

const Title = styled.h1`
  margin: 0;
  padding: 1em;
  color: ${props => props.theme.palette.textColor};
  font-size: ${modularScale(0)};
  font-weight: 300;
  letter-spacing: 6px;
  text-transform: uppercase;
`;

const Content = styled.div`
  padding: 1em;
`;

const Widget = ({ children, error = false, loading = false, title = "" }) => {
  let content;

  if (loading) {
    content = <LoadingIndicator />;
  } else if (error) {
    content = <ErrorIcon />;
  } else {
    content = <>{children}</>;
  }

  return (
    <Container>
      {title ? <Title>{title}</Title> : null}
      <Content>{content}</Content>
    </Container>
  );
};

Widget.propTypes = {
  title: PropTypes.string,
  error: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired
};

export default Widget;
