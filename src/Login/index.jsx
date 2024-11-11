import React, { useEffect, useState } from 'react'
import './style.css'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import apiUrl from '../apiUrl';
import { setUser } from '../redux/actions/userActions';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import toggleLoading from '../redux/actions/loadingActions';

const Login = () => {
   const navigate = useNavigate();
   const user = useSelector((state) => state.user);

   const [name, setName] = useState("");
   const [age, setAgeGroup] = useState("");
   const [rollno, setRollno] = useState(0);
   const [gender, setGender] = useState("");
   const [awcentre, setAwCentre] = useState("");
   const dispatch = useDispatch();

   const fullScreenMode = () => {
      const element = document.documentElement;
      if (element.requestFullscreen) {
         element.requestFullscreen();
      } else if (element.mozRequestFullScreen) { // For Firefox
         element.mozRequestFullScreen();
      } else if (element.webkitRequestFullscreen) { // For Safari
         element.webkitRequestFullscreen();
      } else if (element.msRequestFullscreen) { // For IE/Edge
         element.msRequestFullscreen();
      }
   }

   const submitUserDetails = async () => {
      if (name === "" || age === "" || rollno === 0 || gender === "" || awcentre === "") {
         toast("Fill all details to proceed", {
            type: "warning",
            autoClose: 2000,
            theme: "colored",
            hideProgressBar: true
         })
      }
      else {
         dispatch(toggleLoading(true))
         let userData = {
            name,
            age,
            rollno,
            gender,
            awcentre
         }
         await axios.post(apiUrl + "user", userData)
            .then(({ data }) => {
               if (data.message === "Success") {
                  dispatch(setUser(data.user));
                  dispatch(toggleLoading(false));
                  toast("Registered. Starting assessment", {
                     type: "success",
                     autoClose: 3000,
                     theme: "colored",
                     hideProgressBar: true
                  })
                  fullScreenMode();
                  navigate('/start-assessment');
               }
               else {
                  dispatch(toggleLoading(false));
                  console.log("Error in submitting form");
                  toast("Error in registering", {
                     type: "error",
                     autoClose: 3000,
                     theme: "colored",
                     hideProgressBar: true
                  })
               }
            })
            .catch(({ message }) => {
               dispatch(toggleLoading(false));
               toast(message, {
                  type: "error",
                  autoClose: 3000,
                  theme: "colored",
                  hideProgressBar: true
               })
            })
      }
   }

   useEffect(() => {
      if (user?.name !== undefined) navigate("/start-assessment/")
   }, [user, navigate])

   return (
      <>

         <div className='form-container'>
            <div className="form-subcontainer">
               <div className="form-heading-container">
                  <h1 className="form-heading">Welcome 👋</h1>
                  <h3 className="form-subheading">Today is a new day. It's your day. You shape it.</h3>
               </div>
               <div className="form" id='userForm'>
                  <div className='form-field-container'>
                     <label className="form-field-label">Name</label>
                     <input type="text" value={name} onChange={(e) => setName(e.currentTarget.value)} name="name" id="name" className="form-field" placeholder='Enter your full name' />
                  </div>
                  <div className='form-field-container'>
                     <label className="form-field-label">Age Group</label>
                     <select name="ageGroup" id="ageGroup" className='form-field' value={age} onChange={(e) => setAgeGroup(e.currentTarget.value)}>
                        <option value="none">Select your age group</option>
                        <option value="3-4">3 - 4</option>
                        <option value="4-5">4 - 5</option>
                        <option value="5-6">5 - 6</option>
                     </select>
                  </div>
                  <div className='form-field-container'>
                     <label className="form-field-label">Roll Number</label>
                     <input type="number" value={rollno} onChange={(e) => setRollno(e.currentTarget.value)} name="rollno" id="rollno" className="form-field" placeholder='Enter your roll number' />
                  </div>
                  <div className='form-field-container'>
                     <label className="form-field-label">Gender</label>
                     <select name="gender" id="gender" className='form-field' value={gender} onChange={(e) => setGender(e.currentTarget.value)}>
                        <option value="none">Select your gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                     </select>
                  </div>
                  <div className='form-field-container'>
                     <label className="form-field-label">Anganwadi Center</label>
                     <input type="text" name="awcentre" value={awcentre} onChange={(e) => setAwCentre(e.currentTarget.value)} id="awcentre" className="form-field" placeholder='Enter your Anganwadi Centre' />
                  </div>
               </div>
               <div className="form-submit" onClick={submitUserDetails}>
                  Start Assessment
               </div>
            </div>
         </div>
      </>
   )
}

export default Login