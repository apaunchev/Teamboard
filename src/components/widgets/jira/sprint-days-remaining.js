import {
  parseISO,
  differenceInCalendarDays,
  differenceInBusinessDays,
  format
} from "date-fns";
import PropTypes from "prop-types";
import React from "react";
import fetch from "unfetch";
import { basicAuthHeader } from "../../../lib/auth";
import Counter from "../../ui/counter";
import ProgressBar from "../../ui/progress-bar";
import Widget from "../../ui/widget";

class JiraSprintDaysRemaining extends React.Component {
  static defaultProps = {
    interval: 1000 * 60 * 60,
    title: "Sprint days remaining",
    useBusinessDays: true
  };

  state = {
    daysRemaining: 0,
    endDate: null,
    percentCompleted: 0,
    error: false,
    loading: true
  };

  componentDidMount() {
    this.fetchInformation();
    this.interval = setInterval(
      () => this.fetchInformation(),
      this.props.interval
    );
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  async fetchInformation() {
    const { authKey, boardId, url, useBusinessDays } = this.props;
    const opts = authKey ? { headers: basicAuthHeader(authKey) } : {};

    try {
      const res = await fetch(
        `${url}/rest/agile/1.0/board/${boardId}/sprint?state=active`,
        opts
      );
      const json = await res.json();
      const startDate = parseISO(json.values[0].startDate);
      const endDate = parseISO(json.values[0].endDate);
      const now = new Date();
      const sprintLength = useBusinessDays
        ? differenceInBusinessDays(startDate, endDate)
        : differenceInCalendarDays(startDate, endDate);
      const daysFromStart = useBusinessDays
        ? differenceInBusinessDays(startDate, now)
        : differenceInCalendarDays(startDate, now);
      const daysToEnd = useBusinessDays
        ? differenceInBusinessDays(now, endDate)
        : differenceInCalendarDays(now, endDate);
      const daysRemaining = Math.max(0, Math.abs(daysToEnd));
      const percentCompleted = Math.min(
        100,
        (100 * daysFromStart) / sprintLength
      );

      this.setState({
        startDate,
        endDate,
        daysRemaining,
        percentCompleted,
        error: false,
        loading: false
      });
    } catch (error) {
      this.setState({ error: true, loading: false });
    }
  }

  render() {
    const {
      daysRemaining,
      startDate,
      endDate,
      percentCompleted,
      error,
      loading
    } = this.state;
    const { title } = this.props;

    return (
      <Widget title={title} loading={loading} error={error}>
        <Counter value={daysRemaining} />
        <ProgressBar
          value={percentCompleted}
          title={`Started ${startDate &&
            format(startDate, "PP")}, expected to end ${endDate &&
            format(endDate, "PP")}`}
        />
      </Widget>
    );
  }
}

JiraSprintDaysRemaining.propTypes = {
  interval: PropTypes.number.isRequired,
  title: PropTypes.string,
  authKey: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  boardId: PropTypes.number.isRequired,
  useBusinessDays: PropTypes.bool
};

export default JiraSprintDaysRemaining;
