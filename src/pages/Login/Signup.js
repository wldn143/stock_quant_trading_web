import { useLocation} from 'react-router-dom';

import Signuplayout from '../../component/SignupElement/Signuplayout';



function SignupPage(){
    

    const location = useLocation();
    

    return<>
        {<Signuplayout props={location}/>}
    </>
}

export default SignupPage;