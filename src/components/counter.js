import React from "react";
import styled from "styled-components";
import { modularScale } from "polished";
import PropTypes from "prop-types";
import Trend from "react-trend";

const Container = styled.div`
  font-size: ${modularScale(4)};
  font-weight: 700;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Counter = ({ title, value, history, showGraph, graphColors }) => (
  <Container title={title}>
    {value}
    {showGraph ? (
      <Trend
        data={history}
        strokeWidth={2}
        smooth
        gradient={graphColors}
        style={{ position: "absolute", right: 0, bottom: 0, left: 0 }}
      />
    ) : null}
  </Container>
);

Counter.propTypes = {
  title: PropTypes.string,
  value: PropTypes.number.isRequired,
  history: PropTypes.arrayOf(
    PropTypes.shape({
      date: PropTypes.string,
      value: PropTypes.number
    })
  ),
  showGraph: PropTypes.bool,
  graphColors: PropTypes.arrayOf(PropTypes.string)
};

export default Counter;
