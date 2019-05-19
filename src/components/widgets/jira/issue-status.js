import React from "react";
import fetch from "unfetch";
import { basicAuthHeader } from "../../../lib/auth";
import theme from "../../../themes/dark-theme";
import BarChart from "../../bar-chart";
import Counter from "../../counter";
import Widget from "../../widget";

export default class JiraIssueStatus extends React.Component {
  static defaultProps = {
    interval: 1000 * 60 * 5,
    title: "Issue status"
  };

  state = {
    total: 0,
    statusMap: null,
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
    const endpoint = `${url}/rest/api/3/search?jql=${query}`;

    try {
      const res = await fetch(endpoint, opts);
      const json = await res.json();
      const total = json.total;
      let issues = json.issues;
      let totalReceived = issues.length;
      if (totalReceived < total) {
        let paginate = true;
        while (paginate) {
          const paginatedResults = await fetch(
            endpoint + `&startAt=${totalReceived}`,
            opts
          );
          const paginatedJson = await paginatedResults.json();
          issues = [...issues, ...paginatedJson.issues];
          totalReceived += issues.length;
          paginate = totalReceived < total;
        }
      }

      const statusMap = issues
        .map(issue => issue.fields)
        .reduce(
          (acc, issue) => {
            const name = issue.status.statusCategory.name;
            const index = acc.findIndex(s => s.name === name);
            if (index > -1) acc[index].value = acc[index].value + 1;
            return acc;
          },
          [
            { name: "To Do", color: theme.palette.redColor, value: 0 },
            { name: "In Progress", color: theme.palette.yellowColor, value: 0 },
            { name: "Done", color: theme.palette.greenColor, value: 0 }
          ]
        );

      this.setState({ total, statusMap, error: false, loading: false });
    } catch (error) {
      this.setState({ error: true, loading: false });
    }
  }

  render() {
    const { total, statusMap, error, loading } = this.state;
    const { title, onClick } = this.props;
    return (
      <Widget loading={loading} error={error} title={title} onClick={onClick}>
        <Counter value={total} />
        <BarChart data={statusMap} total={total} />
      </Widget>
    );
  }
}
