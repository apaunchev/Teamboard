import React from "react";
import Widget from "./Widget";
import styled from "styled-components";
import tinytime from "tinytime";

const TimeItem = styled.div`
  font-size: 4em;
  text-align: center;
`;

const DateItem = styled.div`
  font-size: 1.5em;
  text-align: center;
`;

class DateTime extends React.PureComponent {
  static defaultProps = {
    interval: 1000
  };

  state = {
    date: new Date()
  };

  componentDidMount() {
    this.interval = setInterval(
      () => this.setState({ date: new Date() }),
      this.props.interval
    );
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    const { date } = this.state;

    return (
      <Widget>
        <TimeItem>{tinytime("{H}:{mm}").render(date)}</TimeItem>
        <DateItem>{tinytime("{DD}.{Mo}.{YYYY}").render(date)}</DateItem>
      </Widget>
    );
  }
}

export default DateTime;
