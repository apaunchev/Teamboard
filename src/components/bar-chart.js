import React from "react";
import styled from "styled-components";

const BarChart = styled.div`
  display: flex;
  margin: 1em auto;
  width: 300px;
`;

const BarChartBlock = styled.div`
  display: flex;
  flex-direction: column;
`;

const BarChartValue = styled.span`
  color: ${props => props.theme.palette.whiteColor};
  font-weight: 700;
  text-shadow: 1px 1px 1px black;
`;

export default ({ data, total }) => (
  <BarChart>
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
  </BarChart>
);
