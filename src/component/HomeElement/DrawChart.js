
import {Chart} from 'react-google-charts';

function DrawChart({props}){

    const totalArr = [["date", "", "", "", ""]];



    /* test 용 dummy data */
    const dateArr = ["2022-07-22", "2022-07-23", "2022-07-24", "2022-07-25", "2022-07-26", "2022-07-27", "2022-07-28", "2022-07-29","2022-07-22", "2022-07-23", "2022-07-24", "2022-07-25", "2022-07-26", "2022-07-27", "2022-07-28", "2022-07-29"]
    const openArr = [35000, 40000, 30000, 40000, 20000, 10000, 50000, 40000,35000, 40000, 30000, 40000, 20000, 10000, 50000, 40000]
    const highArr = [40000, 70000, 40000, 80000, 30000, 20000, 80000, 60000,40000, 70000, 40000, 80000, 30000, 20000, 80000, 60000]
    const lowArr = [25000, 20000, 10000, 30000, 10000, 5000, 40000, 30000,25000, 20000, 10000, 30000, 10000, 5000, 40000, 30000]
    const closeArr = [37000, 30000,30000, 50000, 20000, 15000, 80000, 30000,37000, 30000,30000, 50000, 20000, 15000, 80000, 30000]


    /* 실제 데이터배열 받아오기 */
    // const dateArr = props.date;
    // const openArr = props.open;
    // const highArr = props.high;
    // const lowArr = props.low;
    // const closeArr = props.close;


    for(let i = 0; i < dateArr.length; i++){
        totalArr.push([
            dateArr[i],
            highArr[i],
            openArr[i],
            closeArr[i],
            lowArr[i],
        ])
    }



    return <>
        <section>
            <Chart
                width={"100%"}
                height={300}
                chartType="CandlestickChart"
                loader={<div>LoadingChart</div>}
                data={totalArr}
                options={{
                    legend: "none",
                    candlestick:{
                        fallingColor: {strokeWidth: 0, fill: "blue"},
                        risingColor: {strokeWidth:0, fill: "red"}
                    }
                }}
            />
        </section>
    </>
}

export default DrawChart;