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
    const { authKey, query } = this.props;
    const opts = authKey ? { headers: basicAuthHeader(authKey) } : {};

    try {
      const res = await fetch(
        `https://api.github.com/search/issues?q=${query}`,
        opts
      );
      const json = await res.json();

      this.setState({
        count: json.total_count,
        loading: false,
        error: false
      });
    } catch (error) {
      this.setState({ loading: false, error: true });
    }
  }

  render() {
    const { count, loading, error } = this.state;
    const { title, onClick } = this.props;

    return (
      <Widget loading={loading} error={error} title={title} onClick={onClick}>
        <Counter value={count} />
      </Widget>
    );
  }
}

export default GithubSearchCount;
