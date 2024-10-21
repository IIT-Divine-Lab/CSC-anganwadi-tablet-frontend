import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './Login';
import QuestionStructures from './QuestionStructures';
import Struct2 from './QuestionStructures/Struct2';
import Struct3 from './QuestionStructures/Struct2/index copy';

function App() {
   const question = {
      structure: 4
   }

   return (
      <div className='Container'>
         <div className='TabletContainer'>
            <Router>
               <Routes>
                  <Route path='/' Component={Login} />
                  <Route path='/start-assessment' Component={QuestionStructures} />
                  <Route path='/develop' element={<Struct2 question={question} />} />
                  <Route path='/develop2' element={<Struct3 question={question} />} />
               </Routes>
            </Router>
         </div>
      </div>
   );
}

export default App;
