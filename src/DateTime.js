import React from "react";
import Widget from "./Widget";

class DateTime extends React.PureComponent {
  static defaultProps = {
    interval: 1000 * 60 // 60 seconds
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
    return <Widget>{this.state.date.toLocaleString()}</Widget>;
  }
}

export default DateTime;
