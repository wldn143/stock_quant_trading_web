import {Route, Routes} from 'react-router-dom';



import BalancePage from './pages/Balance';
import ChartPage from './pages/Chart';
import HomePage from './pages/Home';
import PopolPage from './pages/Popol';
import SearchPage from './pages/Search';
import LoginPage from './pages/Login';
import SignupPage from './pages/SignUp';





function App() {
  

  return (
    <> 
      
      <Routes>

        <Route path='/' element={<LoginPage/>} />

        <Route path='/signup' element={<SignupPage/>} />

        <Route path='/home' element={<HomePage/>} />
          
        <Route path='/home/chart' element={<ChartPage/>} />

        <Route path='/home/balance' element={<BalancePage/>} />

        <Route path='/home/popol' element={<PopolPage/>} />

        <Route path='/home/search' element={<SearchPage/>} />

      </Routes>
      
    </>
    
  )
}

export default App;
