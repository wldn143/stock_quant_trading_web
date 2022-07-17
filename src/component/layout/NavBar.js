import {Link} from 'react-router-dom';


import classes from './NavBar.module.css';

function NavBar(){
    

    return (
        <div className={classes.NavBar}>
            <li className={classes.Home}>
                <Link to ='/home'> Home </Link>
            </li>

            <ul className={classes.Menu}>
                <li>
                    <Link to ='/home/chart'> chart </Link>
                </li>
                    
                <li>
                    <Link to ='/home/balance'> balance </Link>    
                </li>

                <li>
                    <Link to ='/home/popol'> popol </Link>
                </li>

                <li>
                    <Link to ='/home/search'> search </Link>
                </li>
            </ul>

            <section className={classes.dropdown}>
                <button className={classes.dropbtn}>Menu</button>

                <ul className={classes.dropdownList}>
                    
                    <Link to ='/home/chart'> chart </Link>
                    

                    
                    <Link to ='/home/balance'> balance </Link> 
                    

                    
                    <Link to ='/home/popol'> popol </Link>
                    


                    <Link to ='/home/search'> search </Link>
                    
                </ul>
            </section>
            

            
            
        </div>
    

    )
}

export default NavBar;