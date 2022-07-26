
import classes from "./MainChart.module.css";

import DrawChart from "./DrawChart";

import {useState, useEffect} from 'react';

import Loading from "../layout/Loading";

function MainChart(){

    // /* test 용 dummy data */
    
    // const dateArr = ["2022-07-22", "2022-07-23", "2022-07-24", "2022-07-25", "2022-07-26", "2022-07-27", "2022-07-28", "2022-07-29","2022-07-22", "2022-07-23", "2022-07-24", "2022-07-25", "2022-07-26", "2022-07-27", "2022-07-28", "2022-07-29"]
    // const openArr = [35000, 40000, 30000, 40000, 20000, 10000, 50000, 40000,35000, 40000, 30000, 40000, 20000, 10000, 50000, 40000]
    // const highArr = [40000, 70000, 40000, 80000, 30000, 20000, 80000, 60000,40000, 70000, 40000, 80000, 30000, 20000, 80000, 60000]
    // const lowArr = [25000, 20000, 10000, 30000, 10000, 5000, 40000, 30000,25000, 20000, 10000, 30000, 10000, 5000, 40000, 30000]
    // const closeArr = [37000, 30000,30000, 50000, 20000, 15000, 80000, 30000,37000, 30000,30000, 50000, 20000, 15000, 80000, 30000]

    // const Obj={
    //     date: dateArr,
    //     open: openArr,
    //     high: highArr,
    //     low: lowArr,
    //     close: closeArr
    // }
    
    let [loading, setLoading] = useState(true);


    let [chartData1, setchartData1] = useState({    // 코스피 차트 데이터
        Open: {'keys':'values'},
        High: {'keys':'values'},
        Low:{'keys':'values'},
        Close:{'keys': 'values'}
    });
    let [chartData2, setchartData2] = useState({    // 코스닥 차트 데이터
        Open: {'keys':'values'},
        High: {'keys':'values'},
        Low:{'keys':'values'},
        Close:{'keys': 'values'}
    });
    let [chartData3, setchartData3] = useState({    // 원/환율 차트 데이터
        Open: {'keys':'values'},
        High: {'keys':'values'},
        Low:{'keys':'values'},
        Close:{'keys': 'values'}
    });


    let [chartDataObj1, setchartDataObj1] = useState(null); // 코스피 차트 데이터 객체
    let [chartDataObj2, setchartDataObj2] = useState(null); // 코스닥 차트 데이터 객체
    let [chartDataObj3, setchartDataObj3] = useState(null); // 원/환율 차트 데이터 객체

    
    
    


    /* 서버로부터 받은 주가데이터 객체를 dateData, openData, highData, lowData, closeData 별로 각각 배열로 parsing.
    parsing 된 배열을 DataObj 객체에 삽입후, DataObjArr 배열에 push
    DrawChart에 전달될 차트용 데이터 객체 생성.*/



    /* 각 차트 데이터 DrawChart.js 에 보내는 형태로 parsing 함수 */

    function parsing1(){       // 코스피 
        
        setchartDataObj1({
            date: Object.keys(chartData1.Open),
            open: Object.values(chartData1.Open),
            high: Object.values(chartData1.High),
            low: Object.values(chartData1.Low),
            close: Object.values(chartData1.Close)
        })

    }

    function parsing2(){    // 코스닥 
        
        setchartDataObj2({
            date: Object.keys(chartData2.Open),
            open: Object.values(chartData2.Open),
            high: Object.values(chartData2.High),
            low: Object.values(chartData2.Low),
            close: Object.values(chartData2.Close)
        })

    }

    function parsing3(){    // 원/환율 
        
        setchartDataObj3({
            date: Object.keys(chartData3.Open),
            open: Object.values(chartData3.Open),
            high: Object.values(chartData3.High),
            low: Object.values(chartData3.Low),
            close: Object.values(chartData3.Close)
        })

    }



    /* render 되기 전 각 차트 데이터 서버로부터 받아오기 */

    useEffect(()=>{


        // 코스피 
        fetch('http://54.215.210.171:8000/getPrice',{
            method: 'POST',
            body: JSON.stringify({
                'code': '005930',
                'start': '2022-06-25'
            }),
            headers:{
                'Content-Type': 'application/json'
            }
        }).then(response => {return response.json()})
        .then(data => {
            setchartData1(data);
            
            
        }) 


        // 코스닥
        fetch('http://54.215.210.171:8000/getPrice',{
            method: 'POST',
            body: JSON.stringify({
                'code': '005935',
                'start': '2022-06-25'
            }),
            headers:{
                'Content-Type': 'application/json'
            }
        }).then(response => {return response.json()})
        .then(data => {
            setchartData2(data);
            
        }) 


        // 원/환율
        fetch('http://54.215.210.171:8000/getPrice',{
            method: 'POST',
            body: JSON.stringify({
                'code': '009830',
                'start': '2022-06-25'
            }),
            headers:{
                'Content-Type': 'application/json'
            }
        }).then(response => {return response.json()})
        .then(data => {
            setchartData3(data);
            setLoading(false);
        }) 
        
    },[])



    /* 각 차트 데이터 변경시, parsing 후 차트데이터 객체에 저장. */


    useEffect(()=>{
       parsing1(); 
       
    },[chartData1])

    useEffect(()=>{
        parsing2(); 
        
     },[chartData2])

     useEffect(()=>{
        parsing3(); 
        
     },[chartData3])
    
    



    return<>
        {loading ? <Loading/> : 
        
        
        
        <section className={classes.frame1}>

            
            <section className={classes.firstblock}>
                

                <h2 className={classes.headline}> 주요지수 </h2>

                <section className={classes.item}>
                    <section className={classes.itemDetail}>
                        <h2>Kospi</h2>
                        <h2 className={classes.itemPrice}>Price</h2>
                    </section>

                    <section className={classes.chart}>
                        
                        {chartDataObj1 && <DrawChart props={chartDataObj1}/>}
                        
                    </section>

                </section>
                    
                    
                

            </section>


            <section className={classes.item}>

                <section className={classes.itemDetail}>
                    <h2>Kosdak</h2>
                    <h2 className={classes.itemPrice}>Price</h2>
                </section>
                
                <section className={classes.chart}>
                    {chartDataObj2 && <DrawChart props={chartDataObj2}/>}
                </section>

            </section>


            <section className={classes.item}>

                <section className={classes.itemDetail}>
                    <h2>원/환율</h2>
                    <h2 className={classes.itemPrice}>Price</h2>
                </section>
                
                <section className={classes.chart}>
                    {chartDataObj3 && <DrawChart props={chartDataObj3}/>}
                </section>

            </section>

            
            
        </section>
        
        
        }
        
        
    </>
}

export default MainChart;