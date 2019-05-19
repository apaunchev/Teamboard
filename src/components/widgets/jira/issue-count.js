import React from "react";
import fetch from "unfetch";
import { basicAuthHeader } from "../../../lib/auth";
import Counter from "../../counter";
import Widget from "../../widget";

export default class JiraIssueCount extends React.Component {
  static defaultProps = {
    interval: 1000 * 60 * 5,
    title: "Issue count"
  };

  state = {
    count: 0,
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
    const { authKey, url, query } = this.props;
    const opts = authKey ? { headers: basicAuthHeader(authKey) } : {};

    try {
      const res = await fetch(`${url}/rest/api/3/search?jql=${query}`, opts);
      const json = await res.json();

      this.setState({ count: json.total, error: false, loading: false });
    } catch (error) {
      this.setState({ error: true, loading: false });
    }
  }

  render() {
    const { count, error, loading } = this.state;
    const { title } = this.props;

    return (
      <Widget title={title} loading={loading} error={error}>
        <Counter value={count} />
      </Widget>
    );
  }
}
