import { StockTitle } from "./shared/StockTitle";
import DrawChart from "../HomeElement/DrawChart";
import classes from "./Chart.module.css";

function DayChart({ props }) {
  const selectedStock = props[0];
  const selectedCodePrice = props[1];
  const chartDataObj1 = props[2];
  return (
    <section className={classes.item}>
      <section className={classes.itemDetail}>
        <StockTitle>
          <div className="stockName">{selectedStock[0]}</div>

          <div className="stockCode">{selectedStock[1]}</div>
        </StockTitle>
        <h2 className={classes.itemPrice}>{selectedCodePrice[0]}</h2>
      </section>
      <section className={classes.chart}>
        <DrawChart props={chartDataObj1} />
      </section>
    </section>
  );
}
export default DayChart;
