import moment from "moment";
import React from "react";
import Widget from "../../widget";
import Counter from "../../counter";

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

const TestWidget = () => {
  const history = [...new Array(45)]
    .map((point, index) => ({
      date: moment()
        .subtract(index, "days")
        .format("YYYY-MM-DD"),
      value: getRandomInt(0, 20)
    }))
    .slice(0, 30);

  return (
    <Widget loading={false} error={false} title={"Test Widget"}>
      <Counter
        value={history[history.length - 1].value}
        history={history}
        trendEnabled={true}
        trendDirection={"downwards"}
      />
    </Widget>
  );
};

export default TestWidget;
