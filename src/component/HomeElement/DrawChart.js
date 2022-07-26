
import {Chart} from 'react-google-charts';

function DrawChart({props}){

    const totalArr = [["date", "", "", "", ""] ];



    

    /* 실제 데이터배열 받아오기 */
    const dateArr = props.date;
    const openArr = props.open;
    const highArr = props.high;
    const lowArr = props.low;
    const closeArr = props.close;

    
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