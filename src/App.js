import "./App.css";
import React, {useContext,useEffect } from "react";
import { Route, Routes,Navigate } from "react-router-dom";
import ClientAuth from "./pages/client/ClientAuth";
import FreelancerAuth from "./pages/freelancer/FreelancerAuth";
import Freelancers from "./pages/client/Freelancers";
import Addpost from "./pages/client/Addpost";
import Projects from "./pages/freelancer/Projects";
import { MyContext } from "./components/context";
import axios from "./Axios";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";

function App() {
  const {cuser,setCuser}= useContext(MyContext);
  const {fuser,setFuser}= useContext(MyContext);




useEffect(()=> {
  const clientUser=JSON.parse(localStorage.getItem('cuser'));
  setCuser(clientUser)
},[cuser]);

useEffect(()=>{
  const freelanceUser=JSON.parse(localStorage.getItem('fuser'));
  setFuser(freelanceUser)
},[fuser]);

  return (
    <div className="App">
     <Routes>
        
        <Route path="/" element={<Home/>}/>
        <Route path="/c-auth" element={<ClientAuth />} exact />
        <Route path="/f-auth" element={<FreelancerAuth/>} />
        {cuser&&<Route path="/freelancers" element={<Freelancers/>} />}
        {fuser&&<Route path="/projects" element={<Projects/>} />}
        {cuser&&<Route path="/addpost" element={<Addpost/>}/>}
        <Route path="/404" element={<NotFound />} />
        <Route path="*" element={<Navigate replace to="/404" />} />
        {/* { (!cuser||!fuser)&&(<Route path="*" element={<Navigate replace to="/" />}/>)} */}
      </Routes>
    </div>
  );
}

export default App;