import { modularScale } from "polished";
import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";

const Container = styled.div`
  color: ${props => props.theme.palette.textColor};
  font-size: ${modularScale(5)};
  font-weight: 400;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Counter = ({ title = "", value = 0, children }) => (
  <Container title={title}>
    {value}
    {children}
  </Container>
);

Counter.propTypes = {
  title: PropTypes.string,
  value: PropTypes.number.isRequired
};

export default Counter;
