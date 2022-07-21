
import classes from "./MainChart.module.css";




function MainChart(){

    let arr = [];

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
                        
                        Loading...
                        
                    </section>

                </section>
                    
                    
                

            </section>


            <section className={classes.item}>

                <section className={classes.itemDetail}>
                    <h2>Kosdak</h2>
                    <h2 className={classes.itemPrice}>Price</h2>
                </section>
                
                <section className={classes.chart}>
                      Loading...
                </section>

            </section>


            <section className={classes.item}>

                <section className={classes.itemDetail}>
                    <h2>원/환율</h2>
                    <h2 className={classes.itemPrice}>Price</h2>
                </section>
                
                <section className={classes.chart}>
                    Loading...
                </section>

            </section>

            
            
        </section>
    </>
}

export default MainChart;