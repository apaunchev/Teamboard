import React from "react";
import styled from "styled-components";
import { modularScale } from "polished";

const Counter = styled.div`
  color: ${props => props.theme.palette.accentColor};
  font-size: ${modularScale(4)};
  font-weight: 700;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export default ({ value }) => <Counter>{value}</Counter>;
