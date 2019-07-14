# Teamboard

Teamboard is a tool to help you aggregate and visualize metrics about your development team.

![Teamboard](https://user-images.githubusercontent.com/150465/61183387-5deac080-a649-11e9-9912-46f0f84eb4ad.png)

Built on top of [React](https://reactjs.org/), [lowdb](https://github.com/typicode/lowdb), and [styled-components](https://www.styled-components.com/). Architecture inspired by [Dashboard](https://github.com/danielbayerlein/dashboard); widget design inspired by [Geckoboard](https://geckoboard.com).

## Setup

1. [Download](https://github.com/apaunchev/Teamboard/archive/master.zip) or clone the repository.
2. Install the dependencies with `yarn`.
3. Create your dashboard; for an example, see [src/dashboards/index.js](./src/dashboards/index.js).
4. Run `yarn start` and go to http://localhost:3000.

## Available widgets

### [Local Time](./src/components/widgets/local-time/index.js)

#### Example

```javascript
import LocalTime from "../components/widgets/local-time";

<LocalTime title="Costa Rica" timeZone="America/Costa_Rica" />
```

#### Props

- `title`: widget title (default: "Local time")
- `interval`: refresh interval in milliseconds (default: `10000`)
- `timeZone`: the time zone to use, must be a valid name from [IANA time zone database](https://www.iana.org/time-zones) such as `"America/New_York"` (default: the runtime’s default time zone)
- `showDate`: indicates if the date should be shown below the time (default: `true`)

### [GitHub Search Count](./src/components/widgets/github/search-count.js)

#### Example

```javascript
import GithubSearchCount from "../components/widgets/github/search-count";

<GithubSearchCount
  id="gh-open-prs"
  title="Open pull requests"
  authKey="github"
  query="org:facebook is:pr is:open"
/>
```

#### Props

- `id`: widget ID to be used if storing data locally (default: none)
- `interval`: refresh interval in milliseconds (default: `60000`)
- `title`: widget title (default: "GitHub search count")
- `authKey`: credential key, defined in [auth.js](./auth.js)
- `query`: GitHub [query](https://help.github.com/en/articles/about-searching-on-github)
- `inverseTrend`: inverses indicator so that a downward trend will be displayed in green (default: `false`)

### [Jira Issue Count](./src/components/widgets/jira/issue-count.js)

#### Example

```javascript
import JiraIssueCount from "../components/widgets/jira/issue-count";

<JiraIssueCount
  id="j-sprint-progress"
  title="Sprint progress"
  authKey="jira"
  url="https://my-company.atlassian.net"
  query="type != Bug AND sprint in openSprints()"
  groupBy={issue => issue.status.statusCategory.name}
  groups={[
    { name: "To Do", color: "red", value: 0 },
    { name: "In Progress", color: "yellow", value: 0 },
    { name: "Done", color: "green", value: 0 }
  ]}
  countBy={issue => issue.story_points}
/>
```

#### Props

- `id`: widget ID to be used if storing data locally (default: none)
- `interval`: refresh interval in milliseconds (default: `60000`)
- `title`: widget title (default: "Jira issue count")
- `authKey`: credential key, defined in [auth.js](./auth.js)
- `url`: Jira server URL (e.g. `https://my-company.atlassian.net`)
- `query`: Jira query in `JQL`
- `groupBy`: specify which field to group the issues by (default: none)
- `groups`: provide an array of groups (default: none)
- `countBy`: specify which field to count the issues by (default: none)
- `inverseTrend`: inverses indicator so that a downward trend will be displayed in green (default: `false`)

### [Jira Sprint Days Remaining](./src/components/widgets/jira/sprint-days-remaining.js)

#### Example

```javascript
import JiraSprintDaysRemaining from "../components/widgets/jira/sprint-days-remaining";

<JiraSprintDaysRemaining
  id="j-sprint-days"
  title="Sprint days left"
  authKey="jira"
  url="https://my-company.atlassian.net"
  boardId={42}
/>
```

#### Props

- `interval`: refresh interval in milliseconds (default: `60000`)
- `title`: widget title (default: "Jira issue count")
- `authKey`: credential key, defined in [auth.js](./auth.js)
- `url`: Jira server URL (e.g. `https://your-company.atlassian.net`)
- `boardId`: Jira board ID (e.g. `42`)
- `useBusinessDays`: counts business days instead of calendar days (default: `true`)
