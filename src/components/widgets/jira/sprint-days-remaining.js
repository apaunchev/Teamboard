import React from "react";
import fetch from "unfetch";
import { basicAuthHeader } from "../../../lib/auth";
import Counter from "../../counter";
import Widget from "../../widget";

export default class JiraSprintDaysRemaining extends React.Component {
  static defaultProps = {
    interval: 1000 * 60 * 60,
    title: "Sprint days remaining"
  };

  state = {
    days: 0,
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

  async fetchInformation() {
    const { authKey, boardId, url } = this.props;
    const opts = authKey ? { headers: basicAuthHeader(authKey) } : {};

    try {
      const res = await fetch(
        `${url}/rest/agile/1.0/board/${boardId}/sprint?state=active`,
        opts
      );
      const json = await res.json();
      const days = this.calculateDays(json.values[0].endDate);

      this.setState({ days, error: false, loading: false });
    } catch (error) {
      this.setState({ error: true, loading: false });
    }
  }

  render() {
    const { days, error, loading } = this.state;
    const { title } = this.props;
    return (
      <Widget title={title} loading={loading} error={error}>
        <Counter value={days} />
      </Widget>
    );
  }
}
