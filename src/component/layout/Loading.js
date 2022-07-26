
import classes from './Loading.module.css';
import Spinner from './Spinner.gif';

function Loading(){
    return(
        
        <div className={classes.LoadingText}>
            <h1> Loading...</h1>
            <img src={Spinner} alt='로딩중' width='70px' />
        </div>
        
    )
}

export default Loading;