import React from "react";
import fetch from "unfetch";
import { basicAuthHeader } from "../../../lib/auth";
import Widget from "../../widget";
import Counter from "../../counter";
import { db } from "../../../db";
import aggregate from "../../../lib/aggregate";

class GithubSearchCount extends React.PureComponent {
  static defaultProps = {
    interval: 1000 * 60 * 60,
    title: "GitHub search count",
    trackHistory: false,
    trendDirection: "down"
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
    const { id, authKey, query, trackHistory } = this.props;
    const opts = authKey ? { headers: basicAuthHeader(authKey) } : {};

    try {
      const res = await fetch(
        `https://api.github.com/search/issues?q=${query}`,
        opts
      );
      const json = await res.json();
      const count = json.total_count;

      if (trackHistory) {
        if (!id) {
          console.warn(
            "[search-count] unable to track history, missing widget id"
          );
          return;
        }

        if (!db.has(id).value()) {
          db.set(id, []).write();
        }

        db.get(id)
          .push({ date: Date.now(), count })
          .write();
      }

      this.setState({ count, loading: false, error: false });
    } catch (error) {
      this.setState({ loading: false, error: true });
    }
  }

  render() {
    const { count, loading, error } = this.state;
    const { id, title, onClick, trackHistory, trendDirection } = this.props;

    return (
      <Widget loading={loading} error={error} title={title} onClick={onClick}>
        {trackHistory ? (
          <Counter
            value={count}
            history={{
              data: aggregate(
                db
                  .get(id)
                  .orderBy("date", "desc")
                  .value()
              ),
              direction: trendDirection
            }}
          />
        ) : (
          <Counter value={count} />
        )}
      </Widget>
    );
  }
}

export default GithubSearchCount;
