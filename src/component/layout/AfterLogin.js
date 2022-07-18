import NavBar from "./NavBar";

function AfterLogin(props){
    return(
        <div>
            
            <NavBar/>
            <div>
                {props.children}
            </div>
        
        </div>
    )
}

export default AfterLogin;