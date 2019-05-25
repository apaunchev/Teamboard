import moment from "moment-timezone";
import { modularScale } from "polished";
import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";
import Widget from "../../widget";

const Time = styled.div`
  color: ${props => props.theme.palette.accentColor};
  font-size: ${modularScale(4)};
  font-weight: 700;
  overflow: hidden;
  text-overflow: ellipsis;
`;

class LocalTime extends React.PureComponent {
  static defaultProps = {
    title: "Local time",
    interval: 1000 * 10,
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
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
      <Widget title={title} loading={false} error={false}>
        <Time>{date.tz(timezone).format("LT")}</Time>
      </Widget>
    );
  }
}

LocalTime.propTypes = {
  title: PropTypes.string,
  interval: PropTypes.number,
  timezone: PropTypes.string
};

export default LocalTime;
