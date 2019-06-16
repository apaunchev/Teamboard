import moment from "moment";
import PropTypes from "prop-types";
import React from "react";
import fetch from "unfetch";
import { db } from "../../../db";
import { basicAuthHeader } from "../../../lib/auth";
import Widget from "../../ui/widget";
import Counter from "../../ui/counter";
import CounterWithHistory from "../../ui/counter-with-history";

class GithubSearchCount extends React.PureComponent {
  static defaultProps = {
    interval: 1000 * 60 * 60,
    title: "GitHub search count",
    showGraph: true
  };

  state = {
    count: 0,
    loading: true,
    error: false
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
    const { id, authKey, query } = this.props;
    const opts = authKey ? { headers: basicAuthHeader(authKey) } : {};

    try {
      const res = await fetch(
        `https://api.github.com/search/issues?q=${query}`,
        opts
      );
      const json = await res.json();
      const count = json.total_count;

      if (id) {
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
      } else {
        console.warn(
          "[search-count] unable to save history, missing widget id"
        );
      }

      this.setState({ count, loading: false, error: false });
    } catch (error) {
      this.setState({ loading: false, error: true });
    }
  }

  render() {
    const { count, loading, error } = this.state;
    const { id, title, inverseTrend = false } = this.props;
    const history = db
      .get(id)
      .orderBy("date", "asc")
      .take(30)
      .value();

    if (history.length > 1) {
      return (
        <Widget loading={loading} error={error} title={title}>
          <CounterWithHistory
            value={count}
            history={history}
            inverseTrend={inverseTrend}
          />
        </Widget>
      );
    }

    return (
      <Widget loading={loading} error={error} title={title}>
        <Counter value={count} />
      </Widget>
    );
  }
}

GithubSearchCount.propTypes = {
  id: PropTypes.string,
  interval: PropTypes.number,
  title: PropTypes.string,
  authKey: PropTypes.string.isRequired,
  query: PropTypes.string.isRequired,
  inverseTrend: PropTypes.bool
};

export default GithubSearchCount;
