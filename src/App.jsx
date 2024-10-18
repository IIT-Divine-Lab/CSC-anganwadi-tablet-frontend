import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './Login';
import QuestionStructures from './QuestionStructures';

function App() {
   return (
      <div className='Container'>
         <div className='TabletContainer'>
            <Router>
               <Routes>
                  <Route path='/' Component={Login} />
                  <Route path='/start-assessment' Component={QuestionStructures} />
               </Routes>
            </Router>
         </div>
      </div>
   );
}

export default App;
