import classes from './StocksInfo.module.css';

function StocksInfo(){
    const headerData = [
        "종목",
        "현재가",
        "총단가",
        "평단",
        "수량",
        "수익률",
    ];

    const data=[
        {stock: "삼성전자",
        currnetPrice: 55000,
        totalPrice: 1000000,
        averagePrice: 70000,
        quantity: 15,
        rate: "-30%"},
    ];

    return(
        <>
            <p style={{fontSize:"22px", fontWeight:"600"}}>
            상세자산정보
            </p>
            <table className={classes.table}>
            <thead className={classes.thead}>
        <tr>
          {headerData.map((item) => {
            return <th>{item}</th>;
          })}
        </tr>
      </thead>
      <tbody tbody className={classes.tbody}>
        {data.map((item) => {
          return (
            <tr>
            <td>{item.stock}</td>
            <td>{item.currnetPrice}</td>
            <td>{item.totalPrice}</td>
            <td>{item.averagePrice}</td>
            <td>{item.quantity}</td>
            <td>{(item.rate.includes('-'))? <p style={{color:"blue"}}>{item.rate}</p>:<p style={{color:"red"}}>{item.rate}</p>}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
        </>
    )
    }
    export default StocksInfo;