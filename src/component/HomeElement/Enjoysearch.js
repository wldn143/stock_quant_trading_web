import classes from './Enjoysearch.module.css';


function Enjoysearch(){
    return <section className={classes.frame2}>
        <h2> 즐겨찾기 </h2>
        
        <table className={classes.table}>
            <thead className={classes.thead}>
                <tr>
                    <th className={classes.tobject}>종목명</th>
                    <th className={classes.tprice}>가격</th>
                </tr>
            </thead>

            <tbody className={classes.tbody}>
                <tr>
                    <th className={classes.tobject}>삼성전자</th>
                    <th className={classes.tprice}>35000</th>
                </tr>
                <tr>
                    <th className={classes.tobject}>LG화학</th>
                    <th className={classes.tprice}>25000</th>
                </tr>
                <tr>
                    <th className={classes.tobject}>SK이노베이션</th>
                    <th className={classes.tprice}>150000</th>
                </tr>
            </tbody>
        </table>
        
    </section>
    
}


export default Enjoysearch;