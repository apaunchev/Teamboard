import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const Container = styled.div`
  position: absolute;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
`;

const BarChartBlock = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 20px;
`;

const BarChartValue = styled.span`
  color: ${props => props.theme.palette.textColor};
  font-weight: 700;
  line-height: 1.25;
`;

const BarChart = ({ data, total }) => (
  <Container>
    {data.map(({ name, color, value }) => (
      <BarChartBlock
        key={name}
        title={name}
        style={{
          width: `${(value / total) * 100}%`,
          backgroundColor: color
        }}
      >
        <BarChartValue>{value}</BarChartValue>
      </BarChartBlock>
    ))}
  </Container>
);

BarChart.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      color: PropTypes.string.isRequired,
      value: PropTypes.number.isRequired
    })
  ).isRequired,
  total: PropTypes.number.isRequired
};

export default BarChart;
