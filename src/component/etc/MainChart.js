
import classes from "./MainChart.module.css";

function MainChart(){
    return<div className={classes.main}>
        <div className={classes.kos}>
            <h2>Kospi</h2>
            <img src="https://pds.joongang.co.kr/news/component/htmlphoto_mmdata/202109/22/4c62e004-2685-402b-bf32-8e5c18ba30b6.jpg"></img>
        </div>

        <div className={classes.kos}>
            <h2>Kosdak</h2>
            <img src="https://pds.joongang.co.kr/news/component/htmlphoto_mmdata/202109/22/4c62e004-2685-402b-bf32-8e5c18ba30b6.jpg"></img>
        </div>
    </div>


}

export default MainChart;