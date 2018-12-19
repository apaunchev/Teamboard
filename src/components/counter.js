import React from "react";
import styled from "styled-components";
import { modularScale } from "polished";

const Counter = styled.div`
  font-size: ${modularScale(5)};
  font-weight: 500;
  color: ${props => props.theme.palette.accentColor};
  overflow: hidden;
  text-overflow: ellipsis;
`;

export default ({ value }) => <Counter>{value}</Counter>;
