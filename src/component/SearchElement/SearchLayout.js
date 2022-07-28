import SearchBar from "../PopolElement/SearchBar";
import {useState} from 'react';
import classes from './SearchLayout.module.css';
import {useNavigate} from 'react-router-dom';

function SearchLayout(){    
    const navigate = useNavigate();


    const [SearchresultList, setSearchresultList] = useState([]);         //  검색리스트 저장 변수


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

    return(
        <>
            <SearchBar setsearchResult={setSearchresultList}/>
            <section className={classes.Searchbox} >
                <ul className={classes.SearchresultList}>
                    {SearchresultList.map((item) =>{
                        return(
                            <li onClick={()=>selectHandler(item)}>
                                <span >{item}</span> 
                                <button className={classes.Enjoybtn} onClick={()=>EnjoySearchHandler(item)}>ㅇ</button> 
                            </li>
                        )
                    }) }

                </ul>
            

                
            </section>
        </>
    )
}

export default SearchLayout;