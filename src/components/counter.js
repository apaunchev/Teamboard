import React from "react";
import styled from "styled-components";
import { modularScale } from "polished";
import PropTypes from "prop-types";
import Trend from "react-trend";

const TREND_UPWARDS_COLORS = ["#DF5A49", "#EFC94C", "#45B29D"];
const TREND_DOWNWARDS_COLORS = ["#45B29D", "#EFC94C", "#DF5A49"];

const Container = styled.div`
  font-size: ${modularScale(4)};
  font-weight: 700;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Counter = ({ title, value, history, trendEnabled, trendDirection }) => (
  <Container title={title}>
    {value}
    {trendEnabled ? (
      <Trend
        data={history}
        strokeWidth={2}
        smooth
        gradient={
          trendDirection === "upwards"
            ? TREND_UPWARDS_COLORS
            : TREND_DOWNWARDS_COLORS
        }
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
  trendEnabled: PropTypes.bool,
  trendDirection: PropTypes.oneOf(["upwards", "downwards"])
};

export default Counter;
