import React from "react";
import styled, { css } from "styled-components";
import { modularScale } from "polished";
import PropTypes from "prop-types";

const ARROW_UP = "↑";
const ARROW_DOWN = "↓";
const ARROW_LINE = "–";

const Container = styled.div`
  font-size: ${modularScale(4)};
  font-weight: 700;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Arrow = styled.small`
  padding-left: 0.25rem;
  font-size: 70%;
  color: ${props => props.theme.palette.mutedTextColor};

  ${props =>
    props.red &&
    css`
      color: ${props => props.theme.palette.redColor};
    `}

  ${props =>
    props.green &&
    css`
      color: ${props => props.theme.palette.greenColor};
    `}
`;

const renderHistoryArrow = ({ data, direction }) => {
  if (!data.length) {
    console.warn("[counter] data is empty");
    return "";
  }

  if (direction && (direction !== "up" && direction !== "down")) {
    console.warn("[counter] direction is invalid");
    return "";
  }

  const count0 = data[0].count;
  const count1 = data[1].count;

  if (direction === "up") {
    if (count0 > count1) {
      return <Arrow green>{ARROW_UP}</Arrow>;
    } else if (count0 < count1) {
      return <Arrow red>{ARROW_DOWN}</Arrow>;
    } else {
      return <Arrow>{ARROW_LINE}</Arrow>;
    }
  }

  if (direction === "down") {
    if (count0 > count1) {
      return <Arrow red>{ARROW_UP}</Arrow>;
    } else if (count0 < count1) {
      return <Arrow green>{ARROW_DOWN}</Arrow>;
    } else {
      return <Arrow>{ARROW_LINE}</Arrow>;
    }
  }

  return "";
};

const Counter = ({ value, history, title = "" }) => (
  <Container>
    <span title={title}>{value}</span>
    {history && history.data.length ? renderHistoryArrow(history) : null}
  </Container>
);

Counter.propTypes = {
  title: PropTypes.string,
  value: PropTypes.number.isRequired,
  history: PropTypes.shape({
    data: PropTypes.arrayOf(PropTypes.object).isRequired,
    direction: PropTypes.oneOf(["up", "down"]).isRequired
  })
};

export default Counter;
