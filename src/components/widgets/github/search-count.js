import React from "react";
import fetch from "unfetch";
import { basicAuthHeader } from "../../../lib/auth";
import Widget from "../../widget";
import Counter from "../../counter";

class GithubSearchCount extends React.PureComponent {
  static defaultProps = {
    interval: 1000 * 60 * 5
  };

  state = {
    count: 0,
    loading: true,
    error: false
  };

  componentDidMount() {
    this.fetchData();
  }

  async fetchData() {
    const { authKey, query } = this.props;
    const opts = authKey ? { headers: basicAuthHeader(authKey) } : {};

    try {
      const res = await fetch(
        `https://api.github.com/search/issues?q=${query}`,
        opts
      );
      const json = await res.json();

      this.setState({
        count: json.total_count || 0,
        loading: false,
        error: false
      });
    } catch (error) {
      this.setState({ loading: false, error: true });
    }
  }

  render() {
    const { count, loading, error } = this.state;
    const { title, urlToOpen } = this.props;

    return (
      <Widget
        loading={loading}
        error={error}
        title={title}
        urlToOpen={urlToOpen}
      >
        <Counter value={count.toLocaleString()} />
      </Widget>
    );
  }
}

export default GithubSearchCount;
