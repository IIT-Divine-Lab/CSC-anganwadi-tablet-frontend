import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './Login';
import QuestionStructures from './QuestionStructures';
import Structure7 from './QuestionStructures/Structure7';

function App() {
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
