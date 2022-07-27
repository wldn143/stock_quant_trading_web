

import classes from './SearchBar.module.css';
import {useState} from 'react';

function SearchBar(){



    


    return(

        <section className={classes.searchbox}>
            <input
                className={classes.searchbar}
                placeholder="검색어를 입력하세요"
            >
            </input>

            
        </section>


    )
}

export default SearchBar;