import classes from "./BalanceInfo.module.css";
import { useState, useEffect } from "react";

function BalanceInfo() {
  const [totalAssets, setTotalAssets] = useState("");
  const [manageAssets, setManageAssets] = useState("");
  const [rateOfReturn, setRateOfReturn] = useState([]);
  const [curAccount, setCurAccount] = useState([]);
  const headerData = ["종목", "현재가", "총단가", "평단", "수량", "수익률"];
  const uuid = sessionStorage.getItem("uuid");

  useEffect(() => {
    fetch(`http://haniumproject.com:8000/getUserAccount`,{
      method: 'POST',
      headers:{
        'Content-Type' : 'application/json',
        'Authorization' : `Bearer ${uuid}`
      }
    })
      .then((response) => response.json())
      .then((data) => {
        setTotalAssets(data.total);
        setManageAssets(data.eval + " / " + data.sumofprch);
        setRateOfReturn(parseFloat(data.assticdcrt) * 100);
        setCurAccount(data.curaccount);
      });
  }, []);

  return (
    <>
      <div style={{ height: "320px" }}>
        <table className={classes.balancetable}>
          <tbody className={classes.balancetbody}>
            <tr>
              <td className={classes.title}>총자산(원)</td>
              <td>{totalAssets}</td>
            </tr>
            <tr>
              <td className={classes.title}>운용중인 자산(원)</td>
              <td>{manageAssets}</td>
            </tr>
            <tr>
              <td className={classes.title}>수익률</td>
              <td>{rateOfReturn} %</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div>
        <p style={{ fontSize: "22px", fontWeight: "600" }}>상세자산정보</p>
        <table className={classes.stocktable}>
          <thead className={classes.stockthead}>
            <tr>
              {headerData.map((item) => {
                return <th key={headerData.indexOf(item)}>{item}</th>;
              })}
            </tr>
          </thead>
          <tbody className={classes.stocktbody}>
            {curAccount.map((item) => {
              return (
                <tr key={item.prdt_name}>
                  <td>{item.prdt_name}</td>
                  <td>{item.prpr}</td>
                  <td>{item.evlu_amt}</td>
                  <td>{item.pchs_avg_pric}</td>
                  <td>{item.hldg_qty}</td>
                  <td>
                    {item.evlu_pfls_rt < 0 ? (
                      <p style={{ color: "blue" }}>{item.evlu_pfls_rt}</p>
                    ) : (
                      <p style={{ color: "red" }}>{item.evlu_pfls_rt}</p>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}
export default BalanceInfo;
