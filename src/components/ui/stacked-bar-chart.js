import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
`;

const Bar = styled.div`
  display: flex;
  flex-direction: column;
  align-self: center;
  height: 128px;
  width: 48px;
`;

const Segment = styled.div`
  display: block;
  min-height: 20px;
`;

const DataTable = styled.table`
  height: 128px;
  margin-left: 10px;
`;

const DataRow = styled.tr`
  padding: 15px 0;
  vertical-align: center;
  text-align: left;
`;

const DataItemValue = styled.td`
  width: 32px;
  max-width: 64px;
  font-size: 26px;
`;

const DataItemName = styled.td`
  font-size: 14px;
`;

const StackedBarChart = ({ data, total }) => (
  <Container>
    <Bar>
      {data.map(({ name, color, value }) => (
        <Segment
          key={name}
          style={{
            backgroundColor: color,
            height: `${(value / total) * 100}%`
          }}
        />
      ))}
    </Bar>
    <DataTable>
      <tbody>
        {data.map(({ name, color, value }) => (
          <DataRow key={name}>
            <DataItemValue style={{ color }}>{value}</DataItemValue>
            <DataItemName>{name}</DataItemName>
          </DataRow>
        ))}
      </tbody>
    </DataTable>
  </Container>
);

StackedBarChart.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      color: PropTypes.string.isRequired,
      value: PropTypes.number.isRequired
    })
  ),
  total: PropTypes.number
};

export default StackedBarChart;
