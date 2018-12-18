import React from "react";
import fetch from "unfetch";
import { basicAuthHeader } from "../../../lib/auth";
import Widget from "../../widget";
import Counter from "../../counter";

class GithubIssueCount extends React.PureComponent {
  static defaultProps = {
    interval: 1000 * 60 * 5,
    title: "Open GitHub Issues"
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
    const { authKey, owner, repository } = this.props;
    const opts = authKey ? { headers: basicAuthHeader(authKey) } : {};

    try {
      const res = await fetch(
        `https://api.github.com/repos/${owner}/${repository}`,
        opts
      );
      const json = await res.json();

      this.setState({
        count: json.open_issues_count,
        loading: false,
        error: false
      });
    } catch (error) {
      this.setState({ loading: false, error: true });
    }
  }

  render() {
    const { count, loading, error } = this.state;
    const { title } = this.props;

    return (
      <Widget loading={loading} error={error} title={title}>
        <Counter value={count} />
      </Widget>
    );
  }
}

export default GithubIssueCount;
