import MainChart from "../component/HomeElement/MainChart";
import Enjoysearch from "../component/HomeElement/Enjoysearch";
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