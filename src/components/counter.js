import React from "react";
import styled from "styled-components";
import { modularScale } from "polished";
import PropTypes from "prop-types";
import Trend from "react-trend";

const Container = styled.div`
  color: ${props => props.theme.palette.textColor};
  font-size: ${modularScale(5)};
  font-weight: 400;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const PercentChange = styled.span`
  padding-left: 10px;
  font-size: ${modularScale(-2)};
  color: ${props => props.color};
`;

const getPercentChange = data => {
  if (!data || !data.length) return;
  const first = data[0].value;
  const last = data[data.length - 1].value;
  const periodLength = data.length;
  return (((last - first) / first / periodLength) * 100).toFixed(2);
};

const getSymbol = percentChange => {
  const UPWARDS_ARROW = "▲";
  const DOWNWARDS_ARROW = "▼";
  return percentChange > 0 ? UPWARDS_ARROW : DOWNWARDS_ARROW;
};

const getColor = (percentChange, inverseGraph) => {
  let color;
  if (percentChange > 0) {
    color = inverseGraph ? "#45B29D" : "#DF5A49";
  } else {
    color = inverseGraph ? "#DF5A49" : "#45B29D";
  }
  return color;
};

const Counter = ({
  title,
  value,
  history,
  showGraph,
  graphColors = ["#558fed"],
  inverseGraph
}) => {
  const percentChange = getPercentChange(history);
  const symbol = getSymbol(percentChange);
  const color = getColor(percentChange, inverseGraph);

  return (
    <Container title={title}>
      {value}
      {showGraph ? (
        <>
          <PercentChange color={color}>
            <small style={{ fontSize: "24px" }}>{symbol}</small>
            {Math.abs(percentChange)}
            <small style={{ fontSize: "24px" }}>%</small>
          </PercentChange>
          <Trend
            data={history}
            strokeWidth={2}
            gradient={graphColors}
            style={{ position: "absolute", right: 0, bottom: 0, left: 0 }}
          />
        </>
      ) : null}
    </Container>
  );
};

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
  graphColors: PropTypes.arrayOf(PropTypes.string),
  inverseGraph: PropTypes.bool
};

export default Counter;
