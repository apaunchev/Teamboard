import { transparentize } from "polished";
import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";

const Container = styled.div`
  position: absolute;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: ${props =>
    transparentize(0.95, props.theme.palette.textColor)};
  border-top-right-radius: 20px;
  border-bottom-right-radius: 20px;
  overflow: hidden;
  cursor: help;
`;

const Indicator = styled.div`
  min-width: 30px;
  padding-left: 5px;
  background: linear-gradient(
    90deg,
    ${props => props.theme.palette.progressBar1} 0%,
    ${props => props.theme.palette.progressBar2} 100%
  );
  border-top-right-radius: 20px;
  border-bottom-right-radius: 20px;
`;

const ProgressBar = ({ value = 0, title = "" }) => (
  <Container title={title}>
    <Indicator style={{ width: `${Math.floor((value / 100) * 100)}%` }}>
      {Math.floor(value)}%
    </Indicator>
  </Container>
);

ProgressBar.propTypes = {
  value: PropTypes.number,
  title: PropTypes.string
};

export default ProgressBar;
