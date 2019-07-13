import { lightFormat } from "date-fns";
import PropTypes from "prop-types";
import React from "react";
import fetch from "unfetch";
import { db } from "../../../db";
import { basicAuthHeader } from "../../../lib/auth";
import Widget from "../../ui/widget";
import StackedBarChart from "../../ui/stacked-bar-chart";
import Counter from "../../ui/counter";
import CounterWithHistory from "../../ui/counter-with-history";

class JiraIssueCount extends React.Component {
  static defaultProps = {
    interval: 1000 * 60 * 60,
    title: "Jira issue count"
  };

  state = {
    count: 0,
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
    const { id, authKey, url, query, groupBy, countBy } = this.props;
    let { groups } = this.props;
    const opts = authKey ? { headers: basicAuthHeader(authKey) } : {};
    const endpoint = `${url}/rest/api/3/search?jql=${query}`;

    try {
      const res = await fetch(endpoint, opts);
      const json = await res.json();
      const groupByEnabled = typeof groupBy === "function";
      const countByEnabled = typeof countBy === "function";
      let count = json.total;
      let issues = json.issues;
      let groupsMap;

      // group by field
      if (groupByEnabled) {
        // paginated requests
        let totalReceived = issues.length;
        if (totalReceived < count) {
          let paginate = true;
          while (paginate) {
            const paginatedResults = await fetch(
              endpoint + `&startAt=${totalReceived}`,
              opts
            );
            const paginatedJson = await paginatedResults.json();
            issues = [...issues, ...paginatedJson.issues];
            totalReceived += paginatedJson.issues.length;
            paginate = totalReceived < count;
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
          count = groupsMap.reduce((acc, group) => (acc += group.value), 0);
        }
      }

      if (id) {
        if (!db.has(id).value()) {
          db.set(id, []).write();
        }

        const today = lightFormat(new Date(), "yyyy-MM-dd");
        const isTodayCaptured = db
          .get(id)
          .find({ date: today })
          .value();

        if (!isTodayCaptured) {
          db.get(id)
            .push({ date: today, value: count })
            .write();
        } else {
          db.get(id)
            .find({ date: today })
            .assign({ value: count })
            .write();
        }
      } else {
        console.warn("[issue-count] unable to save history, missing widget id");
      }

      this.setState({ count, groupsMap, error: false, loading: false });
    } catch (error) {
      this.setState({ error: true, loading: false });
    }
  }

  render() {
    const { count, groupsMap, error, loading } = this.state;
    const { id, title, groupBy, inverseTrend } = this.props;
    const groupByEnabled = typeof groupBy === "function";
    const history = db
      .get(id)
      .orderBy("date", "asc")
      .take(30)
      .value();

    if (groupByEnabled) {
      return (
        <Widget loading={loading} error={error} title={title}>
          <StackedBarChart data={groupsMap} total={count} />
        </Widget>
      );
    }

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

JiraIssueCount.propTypes = {
  id: PropTypes.string,
  interval: PropTypes.number,
  title: PropTypes.string,
  authKey: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  query: PropTypes.string.isRequired,
  groupBy: PropTypes.func,
  groups: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      color: PropTypes.string.isRequired,
      value: PropTypes.number.isRequired
    })
  ),
  countBy: PropTypes.func,
  inverseTrend: PropTypes.bool
};

export default JiraIssueCount;
