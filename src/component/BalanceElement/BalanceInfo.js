import classes from './BalanceInfo.module.css';

function BalanceInfo(){
return(
    <div style={{height:"350px"}}>
        <table className={classes.table}>
            <tbody className={classes.tbody}>
                <tr>
                    <td className={classes.title}>
                        총자산(원)
                    </td>
                    <td>
                    3,000,000
                    </td>
                </tr>
                <tr>
                <td className={classes.title}>
                        운용중인 자산(원)
                    </td>
                    <td>
                    1,300,000 / 1,500,000
                    </td>
                </tr>
                <tr>
                <td className={classes.title}>
                        수익률
                    </td>
                    <td>
                        -30%
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
)
}
export default BalanceInfo;