import moment from "moment";
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
    title: "Sprint days remaining"
  };

  state = {
    days: 0,
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

  calculateDays(date) {
    const currentDate = new Date();
    const endDate = new Date(date);
    const timeDiff = endDate.getTime() - currentDate.getTime();
    const diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));

    return diffDays < 0 ? 0 : diffDays;
  }

  calculatePercentCompleted(startDate, endDate) {
    const now = moment();
    const start = moment(startDate, "YYYY-MM-DDTHH:mm:ss.SSSSZ");
    const end = moment(endDate, "YYYY-MM-DDTHH:mm:ss.SSSSZ");

    return ((now - start) / (end - start)) * 100;
  }

  async fetchInformation() {
    const { authKey, boardId, url } = this.props;
    const opts = authKey ? { headers: basicAuthHeader(authKey) } : {};

    try {
      const res = await fetch(
        `${url}/rest/agile/1.0/board/${boardId}/sprint?state=active`,
        opts
      );
      const json = await res.json();
      const { startDate, endDate } = json.values[0];
      const days = this.calculateDays(endDate);
      const percentCompleted = this.calculatePercentCompleted(
        startDate,
        endDate
      );

      this.setState({
        days,
        startDate,
        endDate,
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
      days,
      startDate,
      endDate,
      percentCompleted,
      error,
      loading
    } = this.state;
    const { title } = this.props;

    return (
      <Widget title={title} loading={loading} error={error}>
        <Counter value={days} />
        <ProgressBar
          value={percentCompleted}
          title={`Started ${moment(startDate).format("LLL")}, ends ${moment(
            endDate
          ).format("LLL")}`}
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
  boardId: PropTypes.number.isRequired
};

export default JiraSprintDaysRemaining;
