import MainChart from "../component/etc/MainChart";
import Enjoysearch from "../component/etc/Enjoysearch";

function HomePage(){
    return <div> 
        {<MainChart/>} 
        {<Enjoysearch/>}
    </div>
}

export default HomePage;