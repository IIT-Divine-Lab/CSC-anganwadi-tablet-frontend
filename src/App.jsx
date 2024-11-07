import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './Login';
import QuestionStructures from './QuestionStructures';
import Structure8 from './QuestionStructures/Structure8';
import RedBall from "./Images/RedBall.png"

function App() {
   return (
      <div className='Container'>
         <div className='TabletContainer'>
            <Router>
               <Routes>
                  <Route path='/' Component={Login} />
                  <Route path='/start-assessment' Component={QuestionStructures} />
                  <Route path='/struct8' element={<Structure8 question={{ questionText: "Test", questionImage: { after: RedBall } }} />} />
               </Routes>
            </Router>
         </div>
      </div>
   );
}

export default App;
