
import classes from "./MainChart.module.css";

import DrawChart from "./DrawChart";

import {useState, useEffect} from 'react';


function MainChart(){
    
    let [chartData, setchartData] = useState({});
    let [chartDataArr, setchartDataArr] = useState([]);
    let [chartDataObj, setchartDataObj] = useState({});
    let [chartDataObjArr, setchartDataObjArr] = useState([]);

    function getPrice(code){    
        fetch('http://haniumproject.com/getPrice',{
            method: 'POST',
            body: JSON.stringify({
                'interval': 'YEAR',
                'code': `${code}`,
                'start': '2021'
            }),
            headers:{
                'Content-Type': 'application/json'
            }
        }).then(response => {response.json()})
        .then((data) => {
            setchartData(data);
            setchartDataArr(...chartDataArr, chartData);
            
            
        }) 
    }


    /* 서버로부터 받은 주가데이터 객체를 dateData, openData, highData, lowData, closeData 별로 각각 배열로 parsing.
    parsing 된 배열을 DataObj 객체에 삽입후, DataObjArr 배열에 push
    DrawChart에 전달될 차트용 데이터 객체 생성.*/

    function parsing(){
        for(let i = 0; i < chartDataArr.length; i++){
            setchartDataObj({
                date: chartDataArr[i].Open.keys,
                open: chartDataArr[i].Open.values,
                high: chartDataArr[i].High.values,
                low: chartDataArr[i].Low.values,
                close: chartDataArr[i].Close.values
            })

            setchartDataObjArr([...chartDataObjArr, chartDataObj]);
        }
    }

    useEffect(()=>{
        getPrice('KS11');
        getPrice('KQ11');
        getPrice('USD/KRW');

        parsing();

    },[])
    




    return<>
        
        
        <section className={classes.frame1}>

            <section className={classes.firstblock}>
                

                <h2 className={classes.headline}> 주요지수 </h2>

                <section className={classes.item}>
                    <section className={classes.itemDetail}>
                        <h2>Kospi</h2>
                        <h2 className={classes.itemPrice}>Price</h2>
                    </section>

                    <section className={classes.chart}>
                        
                        <DrawChart props={chartDataObjArr[0]}/>
                        
                    </section>

                </section>
                    
                    
                

            </section>


            <section className={classes.item}>

                <section className={classes.itemDetail}>
                    <h2>Kosdak</h2>
                    <h2 className={classes.itemPrice}>Price</h2>
                </section>
                
                <section className={classes.chart}>
                      <DrawChart props={chartDataObjArr[1]}/>
                </section>

            </section>


            <section className={classes.item}>

                <section className={classes.itemDetail}>
                    <h2>원/환율</h2>
                    <h2 className={classes.itemPrice}>Price</h2>
                </section>
                
                <section className={classes.chart}>
                    <DrawChart props={chartDataObjArr[2]}/>
                </section>

            </section>

            
            
        </section>
    </>
}

export default MainChart;