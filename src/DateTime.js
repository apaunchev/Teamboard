import React from "react";
import Widget from "./Widget";
import styled from "styled-components";
import moment from "moment-timezone";

const TimeItem = styled.div`
  font-size: 4em;
  text-align: center;
`;

const DateItem = styled.div`
  font-size: 1.5em;
  text-align: center;
`;

class DateTime extends React.PureComponent {
  static defaultProps = {
    interval: 1000
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
        <TimeItem>{date.tz(timezone).format("LT")}</TimeItem>
        <DateItem>{date.tz(timezone).format("LL")}</DateItem>
      </Widget>
    );
  }
}

export default DateTime;
