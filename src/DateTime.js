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
    this.timeout = setTimeout(
      () => this.setState({ date: new Date() }),
      this.props.interval
    );
  }

  componentWillUnmount() {
    clearTimeout(this.timeout);
  }

  render() {
    return <Widget>{this.state.date.toLocaleString()}</Widget>;
  }
}

export default DateTime;
