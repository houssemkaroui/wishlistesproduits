import './App.css';
import React,{useEffect} from "react";
import { BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Login  from "./components/login";
import Acceuil from "./components/acceuil";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function App() {
  const [path,setPath] =React.useState("/")
  const location =window.location.pathname
  useEffect(()=>{
    setPath(location)
  },'')
  return (

    <div className="App">
        <Router>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route exact path="/aceuil" component={Acceuil} />
         
        </Switch>
        </Router>
       
        <ToastContainer />
    </div>
  );
}

export default App;
