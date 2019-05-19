import React from "react";
import Widget from "../../widget";
import styled from "styled-components";
import { modularScale } from "polished";
import moment from "moment-timezone";

const Time = styled.div`
  color: ${props => props.theme.palette.accentColor};
  font-size: ${modularScale(4)};
  font-weight: 700;
  overflow: hidden;
  text-overflow: ellipsis;
`;

class DateTime extends React.PureComponent {
  static defaultProps = {
    interval: 1000 * 10
  };

  state = {
    date: moment()
  };

  componentDidMount() {
    this.interval = setInterval(
      () => this.setState({ date: moment() }),
      this.props.interval
    );
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    const { date } = this.state;
    const { timezone, title } = this.props;

    return (
      <Widget title={title}>
        <Time>{date.tz(timezone).format("LT")}</Time>
      </Widget>
    );
  }
}

export default DateTime;
