import { modularScale } from "polished";
import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";
import Counter from "./counter";

const PercentChange = styled.span`
  padding-left: 10px;
  font-size: ${modularScale(-2)};
  color: ${props => props.color};
  cursor: help;
`;

const getPercentChange = data => {
  if (!data || !data.length) return;
  const first = data[0].value;
  const last = data[data.length - 1].value;
  const periodLength = data.length;
  return (((last - first) / first / periodLength) * 100).toFixed(2);
};

const getSymbol = percentChange => {
  const UPWARDS_CHAR = "▲";
  const DOWNWARDS_CHAR = "▼";
  const LEVEL_CHAR = "⎻";
  
  if (percentChange > 0) {
    return UPWARDS_CHAR;
  }
  else if (percentChange < 0) {
    return DOWNWARDS_CHAR;
  }
  else {
    return LEVEL_CHAR;
  }
};

const getColor = (percentChange, inverseTrend) => {
  const POSITIVE_COLOR = "#45B29D";
  const LEVEL_COLOR = "#EFC94C";
  const NEGATIVE_COLOR = "#DF5A49";

  let color;
  if (percentChange > 0) {
    color = inverseTrend ? POSITIVE_COLOR : NEGATIVE_COLOR;
  } else if (percentChange < 0) {
    color = inverseTrend ? NEGATIVE_COLOR : POSITIVE_COLOR;
  } else {
    color = LEVEL_COLOR;
  }

  return color;
};

const CounterWithHistory = ({ value, history, inverseTrend = false }) => {
  const percentChange = getPercentChange(history);
  const symbol = getSymbol(percentChange);
  const color = getColor(percentChange, inverseTrend);

  return (
    <Counter value={value}>
      <PercentChange
        color={color}
        title={`Average percent change over ${history.length} data points`}
      >
        <small style={{ fontSize: "24px" }}>{symbol}</small>
        {Math.abs(percentChange)}
        <small style={{ fontSize: "24px" }}>%</small>
      </PercentChange>
    </Counter>
  );
};

CounterWithHistory.propTypes = {
  value: PropTypes.number.isRequired,
  history: PropTypes.arrayOf(
    PropTypes.shape({
      date: PropTypes.string,
      value: PropTypes.number
    })
  ),
  inverseTrend: PropTypes.bool
};

export default CounterWithHistory;
