import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './Login';
import QuestionStructures from './QuestionStructures';
import Loading from './Loading';
import { useDispatch, useSelector } from 'react-redux';
import { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import apiUrl from './apiUrl';
import toggleLoading from './redux/actions/loadingActions';

function App() {
   const loading = useSelector((state) => state.loading);
   const [serverWorking, setServerWorking] = useState(false);
   const dispatch = useDispatch();


   const checkServer = useCallback(async () => {
      let interval = setInterval(() => {
         axios.get(apiUrl)
            .then(() => {
               setServerWorking(true);
               dispatch(toggleLoading(false));
               clearInterval(interval);
            })
            .catch(() => {
               setServerWorking(false);
            })
      }, 2000);
   }, [dispatch])

   useEffect(() => {
      if (serverWorking !== true) {
         checkServer();
      }
   }, [checkServer, serverWorking])

   return (
      <div className='Container'>
         <div className='TabletContainer'>
            {
               loading ?
                  <Loading />
                  :
                  <Router>
                     <Routes>
                        <Route path='/' Component={Login} />
                        <Route path='/start-assessment' Component={QuestionStructures} />
                     </Routes>
                  </Router>
            }
         </div>
      </div>
   );
}

export default App;
