import { Chart } from "react-google-charts";

function DrawMonthChart({ props }) {
  const totalArr = [["date", "", "", "", ""]];
  const MonthChartArr = [["date", "", "", "", ""]];
  /* 실제 데이터배열 받아오기 */
  const dateArr = props.date;
  const openArr = props.open;
  const highArr = props.high;
  const lowArr = props.low;
  const closeArr = props.close;

  let dummyData = [
    ["2022-06-27", 59900, 59000, 58800, 58300],
    ["2022-06-28", 59500, 59200, 59400, 58700],
    ["2022-06-29", 58800, 58500, 58000, 58000],
    ["2022-06-30", 57600, 57200, 57000, 57000],
    ["2022-07-01", 57500, 56900, 56200, 55900],
    ["2022-07-04", 57400, 56100, 57100, 55700],
    ["2022-07-05", 58200, 57600, 57200, 57200],
    ["2022-07-06", 57300, 57300, 56400, 56400],
    ["2022-07-07", 58700, 56400, 58200, 56300],
    ["2022-07-08", 59300, 58600, 58700, 58200],
    ["2022-07-11", 59600, 59300, 58800, 58700],
    ["2022-07-12", 58700, 58600, 58100, 58100],
    ["2022-07-13", 58600, 58300, 58000, 58000],
    ["2022-07-14", 58200, 57500, 57500, 57400],
    ["2022-07-15", 60000, 58400, 60000, 58100],
    ["2022-07-18", 62000, 60600, 61900, 60500],
    ["2022-07-19", 61500, 61400, 60900, 60200],
    ["2022-07-20", 62100, 61800, 60500, 60500],
    ["2022-07-21", 61900, 61100, 61800, 60700],
    ["2022-07-22", 62200, 61800, 61300, 61200],
    ["2022-07-25", 61900, 60900, 61100, 60800],
    ["2022-07-26", 61900, 60800, 61700, 60800],
    ["2022-07-27", 61900, 61300, 61800, 61200],
    ["2022-07-28", 62600, 62300, 61900, 61600],
    ["2022-07-29", 62600, 62400, 61400, 61300],
    ["2022-08-01", 61700, 61000, 61300, 60300],
    ["2022-08-02", 61900, 61200, 61700, 61000],
    ["2022-08-03", 61600, 61600, 61300, 61000],
    ["2022-08-04", 61800, 61700, 61500, 61200],
    ["2022-08-05", 61900, 61700, 61500, 61200],
    ["2022-08-08", 61400, 61400, 60800, 60600],
    ["2022-08-09", 60700, 60600, 60000, 59600],
    ["2022-08-10", 59200, 58900, 59100, 58600],
    ["2022-08-11", 60000, 59600, 59900, 59300],
    ["2022-08-12", 60700, 59500, 60200, 59400],
  ];

  for (let i = 0; i < dateArr.length; i++) {
    totalArr.push([dateArr[i], highArr[i], openArr[i], closeArr[i], lowArr[i]]);
  }
  function compareNum(a, b) {
    return a - b;
  }

  for (let j = 0; j < totalArr.length; j++) {
    let curMonth = totalArr[j + 1][0].slice(0, 7); //시작하는 달의 문자열 추출

    let curMonthDataArr = totalArr.filter(
      (data) => data[0].slice(0, 7) === curMonth
    );
    let length = curMonthDataArr.length - 1;

    let curMonthHigh = curMonthDataArr.map((el) => el[1]).sort(compareNum); //curMonth 고가 배열
    let curMonthLow = curMonthDataArr.map((el) => el[4]).sort(compareNum); //curMonth 저가 배열
    let curMonthClose = curMonthDataArr[length][3]; //curMonth 종가
    let curMonthOpen = curMonthDataArr[0][2]; //curMonth 시가
    let curMonthStartDate = curMonthDataArr[0][0]; //curMonth start날짜
    MonthChartArr.push([
      curMonthStartDate,
      curMonthHigh[curMonthHigh.length - 1],
      curMonthOpen,
      curMonthClose,
      curMonthLow[0],
    ]);
    j = j + curMonthDataArr.length; //j curMonthDataArr의 Length만큼 증가
  }

  return (
    <>
      <section>
        <Chart
          width={"100%"}
          height={300}
          chartType="CandlestickChart"
          loader={<div>LoadingChart</div>}
          data={MonthChartArr}
          options={{
            legend: "none",
            colors: ["gray"],
            candlestick: {
              fallingColor: { strokeWidth: 0, fill: "blue", color: "red" },
              risingColor: { strokeWidth: 0, fill: "red" },
            },
          }}
        />
      </section>
    </>
  );
}

export default DrawMonthChart;
