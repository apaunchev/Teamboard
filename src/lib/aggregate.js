// aggregate data points to one per day
export default function aggregate(data) {
  if (!data.length) {
    return [];
  }

  return [...data]
    .reverse()
    .map(point => {
      const date = new Date(point.date);
      const key = `${date.getFullYear()}-${date.getMonth() +
        1}-${date.getDate()}`;
      return {
        key,
        ...point
      };
    })
    .reduce((accumulator, currentPoint) => {
      if (!accumulator.find(point => point.key === currentPoint.key)) {
        return [...accumulator, currentPoint];
      }
      return accumulator;
    }, [])
    .reverse();
}
