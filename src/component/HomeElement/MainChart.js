
import classes from "./MainChart.module.css";

import DrawChart from "./DrawChart";




function MainChart(){
    


    let arr = [];
    let DataObjArr = [];

    // async function getPrice(code){    
    //     let response = await fetch('http://haniumproject.com/getPrice',{
    //         method: 'POST',
    //         body: JSON.stringify({
    //             'interval': 'YEAR',
    //             'code': `${code}`,
    //             'start': '2021'
    //         }),
    //         headers:{
    //             'Content-Type': 'application/json'
    //         }
    //     })
    //     let data = await response.json();
    //     console.log(arr)
    //     return data;
    // }

    

    // function getPrice(){    
    //     fetch('http://haniumproject.com/getPrice',{
    //         method: 'POST',
    //         body: JSON.stringify({
    //             'interval': 'YEAR',
    //             'code': 'KS11',
    //             'start': '2021'
    //         }),
    //         headers:{
    //             'Content-Type': 'application/json'
    //         }
    //     }).then(response => {response.json()})
    //     .then((data) => console.log(data))
        
    // }

    


    /* 서버로부터 받은 주가데이터 객체를 dateData, openData, highData, lowData, closeData 별로 각각 배열로 parsing.
    parsing 된 배열을 DataObj 객체에 삽입후, DataObjArr 배열에 push
    DrawChart에 전달될 차트용 데이터 객체 생성.*/
    
    // for(let i = 0; i < arr.length; i++){
    //     let dateData = arr[i].Open.keys
    //     let openData = arr[i].Open.values
    //     let highData = arr[i].High.values
    //     let lowData = arr[i].Low.values
    //     let closeData = arr[i].Close.values  

    //     let DataObj = {
    //         date: dateData,
    //         open: openData,
    //         high: highData,
    //         low: lowData,
    //         close: closeData
    //     }

    //     DataObjArr.push(DataObj);
    // }

    /* 추후 props 요소로 DataObjArr[index] 형태로 전달하면 됨 */
      


    
    

    return<>
        {/* <div className=classes.none>{arr.push(getPrice('KS11'))}</div>
        <div className=classes.none>{arr.push(getPrice('KQ11'))}</div>  
        <div className=classes.none>{arr.push(getPrice('USD/KRW'))}</div> */}
        
        
        
        
        <section className={classes.frame1}>

            

            <section className={classes.firstblock}>
                

                <h2 className={classes.headline}> 주요지수 </h2>



                <section className={classes.item}>
                    <section className={classes.itemDetail}>
                        <h2>Kospi</h2>
                        <h2 className={classes.itemPrice}>Price</h2>
                    </section>

                    <section className={classes.chart}>
                        
                        <DrawChart />
                        
                    </section>

                </section>
                    
                    
                

            </section>


            <section className={classes.item}>

                <section className={classes.itemDetail}>
                    <h2>Kosdak</h2>
                    <h2 className={classes.itemPrice}>Price</h2>
                </section>
                
                <section className={classes.chart}>
                      <DrawChart />
                </section>

            </section>


            <section className={classes.item}>

                <section className={classes.itemDetail}>
                    <h2>원/환율</h2>
                    <h2 className={classes.itemPrice}>Price</h2>
                </section>
                
                <section className={classes.chart}>
                    <DrawChart />
                </section>

            </section>

            
            
        </section>
    </>
}

export default MainChart;