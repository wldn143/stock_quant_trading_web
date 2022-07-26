import classes from './BalanceInfo.module.css';
import {useState, useEffect} from 'react';

function BalanceInfo(){
let dd={"state":1,
"kakaoid":"12181577",
"nickname":"asdfasdfasdf",
"apikey":"PSSAea3iLDbZlD2IY8mxtlMKQaO5VsbhQJ2H",
"secret":"FhJBvBzeZ+/vKVLv7Lv9Oj1d4B9H9HClLbuXQ2mS+61ectcTqBmnVoxodth5jM3c/Bg78dB/sMkV/TOUgctjZYzXmTFY/TtC0G3M/lsdt++DLvhQkCdswdYtt2BBCIRmTtExcqlHRgBiRPMbSveYL905XP8ZrDe/V958uSCs67Rh/7z09Tw=",
"quantity":7000000,
"cano":"50067576",
"acnt":"01",
"curpricedic":{"003550":78800,"005930":61700,"091170":6010},
"ratio":{"005930":0.5,"003550":0.3,"091170":0.2,"code":1},
"total":500093933,"deposit":488107343,"eval":11986590,
"sumofprch":11890765,"sumofern":95825,"assticdc":52315,
"assticdcrt":0.01046213,
"curaccount":
[
{"pdno":"003550","prdt_name":"LG","hldg_qty":54,"pchs_avg_pric":77464.814,"pchs_amt":4183100,"prpr":78800,"evlu_amt":4255200,"evlu_pfls_amt":72100,"evlu_pfls_rt":1.72},
{"pdno":"005930","prdt_name":"삼성전자","hldg_qty":103,"pchs_avg_pric":61290.291,"pchs_amt":6312900,"prpr":61700,"evlu_amt":6355100,"evlu_pfls_amt":42200,"evlu_pfls_rt":0.67},
{"pdno":"091170","prdt_name":"KODEX 은행","hldg_qty":229,"pchs_avg_pric":6090.676,"pchs_amt":1394765,"prpr":6010,"evlu_amt":1376290,"evlu_pfls_amt":-18475,"evlu_pfls_rt":-1.32}
],
"token":"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ0b2tlbiIsImF1ZCI6ImNiMjkwMTFjLTVkYjUtNGExYi1hMTVjLTBmMGM5NDNlZDU5NSIsImlzcyI6InVub2d3IiwiZXhwIjoxNjU4OTExNjMxLCJpYXQiOjE2NTg4MjUyMzEsImp0aSI6IlBTU0FlYTNpTERiWmxEMklZOG14dGxNS1FhTzVWc2JoUUoySCJ9.kjRxVRbkC_XxTYSmfvD9THmpuPUx9uerIbxUWQP40dkyX7YT5RPFpifXAq-BT8hUNzw91Xc0IWvae0jdbNhx3Q",
"code":1}

    const[totalAssets, setTotalAssets]=useState("");
    const[manageAssets, setManageAssets]=useState("");
    const[rateOfReturn, setRateOfReturn]=useState([]);
    const[curAccount,setCurAccount]=useState([]);
    const headerData = [
        "종목",
        "현재가",
        "총단가",
        "평단",
        "수량",
        "수익률",
    ];
//   useEffect(()=>{
//     fetch("https://haniumproject.com/getUserAccount/{uuid}")
//     .then((response) => response.json())
//     .then((data) => console.log(data));
// },[])

  useEffect(()=>{
    setTotalAssets(dd.total)
    setManageAssets(dd.eval+' / '+dd.sumofprch)
    setRateOfReturn(parseFloat(dd.assticdcrt)*100)
    setCurAccount(dd.curaccount);
},[])

return(
    <>
    <div style={{height:"320px"}}>
        <table className={classes.balancetable}>
            <tbody className={classes.balancetbody}>
                <tr>
                    <td className={classes.title}>
                        총자산(원)
                    </td>
                    <td>
                    {totalAssets}
                    </td>
                </tr>
                <tr>
                <td className={classes.title}>
                        운용중인 자산(원)
                    </td>
                    <td>
                    {manageAssets}
                    </td>
                </tr>
                <tr>
                <td className={classes.title}>
                        수익률
                    </td>
                    <td>
                        {rateOfReturn} %
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
        <div>
        <p style={{fontSize:"22px", fontWeight:"600", }}>
            상세자산정보
            </p>
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
            <td>{(item.evlu_pfls_rt<0)? <p style={{color:"blue"}}>{item.evlu_pfls_rt}</p>:<p style={{color:"red"}}>{item.evlu_pfls_rt}</p>}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
    </div>
    </>
)
}
export default BalanceInfo;