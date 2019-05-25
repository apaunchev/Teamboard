import PropTypes from "prop-types";
import React from "react";
import fetch from "unfetch";
import { db } from "../../../db";
import aggregate from "../../../lib/aggregate";
import { basicAuthHeader } from "../../../lib/auth";
import BarChart from "../../bar-chart";
import Counter from "../../counter";
import Widget from "../../widget";

class JiraIssueCount extends React.Component {
  static defaultProps = {
    interval: 1000 * 60 * 60,
    title: "Jira issue count",
    trackHistory: false,
    trendDirection: "down"
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
    const {
      id,
      authKey,
      url,
      query,
      groupBy,
      countBy,
      trackHistory
    } = this.props;
    let { groups } = this.props;
    const opts = authKey ? { headers: basicAuthHeader(authKey) } : {};
    const endpoint = `${url}/rest/api/3/search?jql=${query}`;

    try {
      const res = await fetch(endpoint, opts);
      const json = await res.json();
      const countByEnabled = typeof countBy === "function";
      let count = json.total;
      let issues = json.issues;
      let groupsMap;

      // group by field
      if (groupBy) {
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

      this.setState({ count, groupsMap, error: false, loading: false });
    } catch (error) {
      this.setState({ error: true, loading: false });
    }
  }

  render() {
    const { count, groupsMap, error, loading } = this.state;
    const {
      id,
      title,
      groupBy,
      onClick,
      trackHistory,
      trendDirection
    } = this.props;
    const groupByEnabled = typeof groupBy === "function";

    return (
      <Widget loading={loading} error={error} title={title} onClick={onClick}>
        {trackHistory ? (
          <>
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
            {groupByEnabled ? (
              <BarChart data={groupsMap} total={count} />
            ) : null}
          </>
        ) : (
          <>
            <Counter value={count} />
            {groupByEnabled ? (
              <BarChart data={groupsMap} total={count} />
            ) : null}
          </>
        )}
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
  onClick: PropTypes.string,
  trackHistory: PropTypes.bool,
  trendDirection: PropTypes.string,
  groupBy: PropTypes.func,
  groups: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      color: PropTypes.string.isRequired,
      value: PropTypes.number.isRequired
    })
  ),
  countBy: PropTypes.func
};

export default JiraIssueCount;
