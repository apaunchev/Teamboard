import { utcToZonedTime, format } from "date-fns-tz";
import { modularScale } from "polished";
import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";
import Widget from "../../ui/widget";

const StyledTime = styled.div`
  margin-bottom: 10px;
  color: ${props => props.theme.palette.textColor};
  font-size: ${modularScale(5)};
  font-weight: 400;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const StyledDate = styled.div`
  font-size: ${modularScale(1)};
`;

class LocalTime extends React.PureComponent {
  static defaultProps = {
    title: "Local time",
    interval: 1000 * 10,
    timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    showDate: true
  };

  state = {
    date: new Date()
  };

  componentDidMount() {
    this.interval = setInterval(
      () => this.setState({ date: new Date() }),
      this.props.interval
    );
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    const { date } = this.state;
    const { timeZone, title, showDate } = this.props;

    return (
      <Widget title={title} loading={false} error={false}>
        <StyledTime>
          {format(utcToZonedTime(date, timeZone), "p", { timeZone })}
        </StyledTime>
        {showDate ? (
          <StyledDate>
            {format(utcToZonedTime(date, timeZone), "PP", { timeZone })}
          </StyledDate>
        ) : null}
      </Widget>
    );
  }
}

LocalTime.propTypes = {
  title: PropTypes.string,
  interval: PropTypes.number,
  timeZone: PropTypes.string,
  showDate: PropTypes.bool
};

export default LocalTime;
