import React from "react";
import styled from "styled-components";
import { modularScale } from "polished";

const Counter = styled.div`
  font-size: ${modularScale(5)};
  font-weight: 500;
  color: ${props => props.theme.palette.accentColor};
`;

export default ({ value }) => <Counter>{value}</Counter>;
