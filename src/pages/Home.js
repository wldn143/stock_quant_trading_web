import MainChart from "../component/etc/MainChart";
import Enjoysearch from "../component/etc/Enjoysearch";
import AfterLogin from "../component/layout/AfterLogin";

function HomePage(){
    return <div> 
        <AfterLogin>
            {<MainChart/>} 
            {<Enjoysearch/>}
        </AfterLogin>
        
    </div>
}

export default HomePage;