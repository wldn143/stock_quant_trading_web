import spinner from './spinner2.gif';

function Loading2(){
    return(
        <div style={{display:"flex",alignItems:"center"}}>
            <img style={{height:"25px",width:"25px"}} src={spinner} alt='로딩중' width='70px' />
        </div>
    )
}
export default Loading2;