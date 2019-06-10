import moment from "moment";
import React from "react";
import Widget from "../../widget";
import Counter from "../../counter";

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

const TestWidget = ({ title = "Test Widget", showGraph, graphColors }) => {
  const history = [...new Array(45)]
    .map((point, index) => ({
      date: moment()
        .subtract(index, "days")
        .format("YYYY-MM-DD"),
      value: getRandomInt(0, 20)
    }))
    .slice(0, 30);

  console.log("[test-widget] history", history);

  return (
    <Widget loading={false} error={false} title={title}>
      <Counter
        value={history[history.length - 1].value}
        history={history}
        showGraph={showGraph}
        graphColors={graphColors}
      />
    </Widget>
  );
};

export default TestWidget;
