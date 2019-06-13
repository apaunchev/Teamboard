import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { transparentize } from "polished";

const Container = styled.div`
  position: absolute;
  right: 0;
  bottom: 0;
  left: 0;
  height: 1em;
  background-color: ${props =>
    transparentize(0.95, props.theme.palette.textColor)};
`;

const Indicator = styled.div`
  height: 100%;
  background-color: ${props => props.theme.palette.l4Color};
`;

const ProgressBar = ({ value = 0 }) => {
  return (
    <Container>
      <Indicator style={{ width: `${(value / 100) * 100}%` }} />
    </Container>
  );
};

ProgressBar.propTypes = {
  value: PropTypes.number
};

export default ProgressBar;
