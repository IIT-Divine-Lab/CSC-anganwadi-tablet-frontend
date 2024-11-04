import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './Login';
import QuestionStructures from './QuestionStructures';
import Structure7 from './QuestionStructures/Structure7';
import { useEffect } from 'react';

function App() {

   useEffect(() => {
      window.addEventListener("beforeunload", (e) => {
         e.preventDefault();
      })

      return () => {
         window.removeEventListener("beforeunload", (e) => {
            e.preventDefault();
         })
      }
   }, [])

   return (
      <div className='Container'>
         <div className='TabletContainer'>
            <Router>
               <Routes>
                  <Route path='/' Component={Login} />
                  <Route path='/start-assessment' Component={QuestionStructures} />
                  <Route path='/struct7' element={<Structure7 />} />
               </Routes>
            </Router>
         </div>
      </div>
   );
}

export default App;
