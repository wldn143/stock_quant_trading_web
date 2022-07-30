import SearchBar from "../PopolElement/SearchBar";
import {useState, useEffect} from 'react';
import classes from './SearchLayout.module.css';
import {useNavigate} from 'react-router-dom';
import Loading from "../layout/Loading";

function SearchLayout(){    
    const navigate = useNavigate();

    const [isLoading, setisLoading] = useState(true);


    const [SearchresultList, setSearchresultList] = useState([]);         //  검색리스트 저장 변수
    const [SearchresultPriceList, setSearchresultPriceList] = useState([]);        //  검색리스트의 {name:, price} 저장 변수


    function selectHandler(params){             
        navigate('/home/chart',{state:{
            code: params
        }}
            
        )
    }

    function EnjoySearchHandler(params){             
         fetch('',{
            method:'POST',
            body:JSON.stringify({
                code: params
            }),
            headers:{
                'Content-Type' : 'application/json'
            }
         }).then()
    }


    useEffect(()=>{
        setisLoading(true);

        fetch('http://54.215.210.171:8000/getPreview',{
            method: 'POST',
            body:JSON.stringify({    
                code: SearchresultList        
            }),
            headers:{
                'Content-Type' : './application.json'
            }
        }).then( response => response.json())
        .then( data => {
            let temp = [];
            for(let i = 0; i < SearchresultList.length; i++){
                temp.push({name: SearchresultList[i], prcie: data[i]});
            }

            setSearchresultPriceList(temp);
            console.log(temp);
            setisLoading(false);
            
        })


    },[SearchresultList]);





    return(
        <>
            
            <SearchBar setsearchResult={setSearchresultList}/>
            {isLoading ? <Loading/> : 
            <section className={classes.Searchbox} >
                <ul className={classes.SearchresultList}>
                    
                    { SearchresultPriceList.map((item) =>{
                        return(
                            
                            <li onClick={()=>selectHandler(item.name)}>
                                <span>{item.name}</span>
                                <section>
                                    <span>{item.price}</span>
                                    <button className={classes.Enjoybtn} onClick={()=>EnjoySearchHandler(item.name)}>ㅇ</button> 
                                </section>
                                
                            </li>
                        )
                    }) }

                </ul>
        
            </section>
            }
        </>
    )
}

export default SearchLayout;