import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './Login';
import QuestionStructures from './QuestionStructures';
// import Struct2 from './QuestionStructures/Struct2';
// import Structure1to4 from './QuestionStructures/Structure1-4';
// import Structure5 from './QuestionStructures/Structure5';
// import Structure6 from './QuestionStructures/Structure6';
// import questionImage from './questions/q1s2.png'
// import answerImage from './questions/q1s2ans.png'
// import active from './questions/q1s2active.png'
// import inactive from './questions/q1s2inactive.png'

function App() {
   // let s6question = {
   //    questionText: "Choose the spot of the egg.",
   //    questionImage,
   //    answerImage,
   //    option: {
   //       active,
   //       inactive
   //    }
   // }

   return (
      <div className='Container'>
         <div className='TabletContainer'>
            <Router>
               <Routes>
                  <Route path='/' Component={Login} />
                  <Route path='/start-assessment' Component={QuestionStructures} />
                  {/* <Route path='/develop' element={<Struct2 question={question} />} /> */}
                  {/* <Route path='/1to4' element={<Structure1to4 />} />
                  <Route path='/5' element={<Structure5 />} />
                  <Route path='/6' element={<Structure6 question={s6question} />} /> */}
               </Routes>
            </Router>
         </div>
      </div>
   );
}

export default App;
