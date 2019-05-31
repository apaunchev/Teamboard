import moment from "moment";
import PropTypes from "prop-types";
import React from "react";
import fetch from "unfetch";
import { db } from "../../../db";
import { basicAuthHeader } from "../../../lib/auth";
import Counter from "../../counter";
import Widget from "../../widget";

class JiraIssueCount extends React.Component {
  static defaultProps = {
    interval: 1000 * 60 * 60,
    title: "Jira issue count",
    trendEnabled: true,
    trendDirection: "upwards"
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
    const { id, authKey, url, query } = this.props;
    const opts = authKey ? { headers: basicAuthHeader(authKey) } : {};
    const endpoint = `${url}/rest/api/3/search?jql=${query}`;

    try {
      const res = await fetch(endpoint, opts);
      const json = await res.json();
      const count = json.total;

      if (!id) {
        console.warn("[search-count] unable to track trend, missing widget id");
        return;
      }

      if (!db.has(id).value()) {
        db.set(id, []).write();
      }

      const today = moment().format("YYYY-MM-DD");
      if (
        !db
          .get(id)
          .find(point => point.date === today)
          .value()
      ) {
        db.get(id)
          .push({ date: today, value: count })
          .write();
      }

      this.setState({ count, error: false, loading: false });
    } catch (error) {
      this.setState({ error: true, loading: false });
    }
  }

  render() {
    const { count, error, loading } = this.state;
    const { id, title, trendEnabled, trendDirection } = this.props;
    const history = db
      .get(id)
      .orderBy("date", "desc")
      .value();

    return (
      <Widget loading={loading} error={error} title={title}>
        <Counter
          value={count}
          history={history}
          trendEnabled={trendEnabled}
          trendDirection={trendDirection}
        />
      </Widget>
    );
  }
}

JiraIssueCount.propTypes = {
  id: PropTypes.string,
  interval: PropTypes.number,
  title: PropTypes.string,
  authKey: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  query: PropTypes.string.isRequired,
  trendEnabled: PropTypes.bool,
  trendDirection: PropTypes.oneOf(["upwards", "downwards"])
};

export default JiraIssueCount;
