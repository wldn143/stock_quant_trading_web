
import classes from "./MainChart.module.css";




function MainChart(){

    return<div className={classes.component}>
        <ul className={classes.frame1}>
            <h2 > 주요지수 </h2>
            <div className={classes.item}>
                <div className={classes.itemDetail}>
                    <h2>Kospi</h2>
                    <h2 className={classes.itemPrice}>Price</h2>
                </div>
                
                <div>
                    차트
                </div>
            </div>

            <div className={classes.item}>
                <div className={classes.itemDetail}>
                    <h2>Kosdak</h2>
                    <h2 className={classes.itemPrice}>Price</h2>
                </div>
                
                <div>
                    차트
                </div>
            </div>

            <div className={classes.item}>
                <div className={classes.itemDetail}>
                    <h2>원/환율</h2>
                    <h2 className={classes.itemPrice}>Price</h2>
                </div>
                
                <div>
                    차트
                </div>
            </div>

        </ul>
        

    </div>


}

export default MainChart;