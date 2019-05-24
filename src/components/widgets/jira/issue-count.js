import React from "react";
import fetch from "unfetch";
import { basicAuthHeader } from "../../../lib/auth";
import BarChart from "../../bar-chart";
import Counter from "../../counter";
import Widget from "../../widget";

export default class JiraIssueCount extends React.Component {
  static defaultProps = {
    interval: 1000 * 60 * 5,
    title: "Issue count"
  };

  state = {
    total: 0,
    groupsMap: [],
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
    const { authKey, url, query, groupBy, countBy } = this.props;
    let { groups } = this.props;
    const opts = authKey ? { headers: basicAuthHeader(authKey) } : {};
    const endpoint = `${url}/rest/api/3/search?jql=${query}`;

    try {
      const res = await fetch(endpoint, opts);
      const json = await res.json();
      const countByEnabled = typeof countBy === "function";
      let total = json.total;
      let issues = json.issues;
      let groupsMap;

      if (groupBy) {
        // if we are grouping issues, then we need to paginate through all of them
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
            totalReceived += paginatedJson.issues.length;
            paginate = totalReceived < total;
          }
        }

        groups = groups.map(g => ({ ...g, value: 0 }));

        groupsMap = issues
          .map(issue => issue.fields)
          .reduce((acc, issue) => {
            const key = groupBy(issue);
            const incrementer = countByEnabled ? parseInt(countBy(issue)) : 1;
            const index = acc.findIndex(s => s.name === key);
            if (index > -1) acc[index].value += incrementer;
            return acc;
          }, groups);

        if (countByEnabled) {
          total = groupsMap.reduce((acc, group) => (acc += group.value), 0);
        }
      }

      this.setState({ total, groupsMap, error: false, loading: false });
    } catch (error) {
      this.setState({ error: true, loading: false });
    }
  }

  render() {
    const { total, groupsMap, error, loading } = this.state;
    const { title, groupBy, onClick } = this.props;

    return (
      <Widget loading={loading} error={error} title={title} onClick={onClick}>
        <Counter value={total} />
        {typeof groupBy === "function" && (
          <BarChart data={groupsMap} total={total} />
        )}
      </Widget>
    );
  }
}
