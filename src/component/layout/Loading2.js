import spinner from './spinner2.gif';

function Loading2(){
    return(
        <div style={{display:"flex",alignItems:"center", justifyContent: "center", width:"405px", height:"100px"}}>
            <img style={{height:"25px",width:"25px"}} src={spinner} alt='로딩중' width='70px' />
        </div>
    )//loading in search result container
    // height 0px error
    //focus off
}
export default Loading2;