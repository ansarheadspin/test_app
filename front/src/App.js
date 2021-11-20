import { useState } from 'react';
import './App.css';
import Activities from './components/Activities';
import Login from './components/Login';
import SignUp from './components/SignUp';
import UserSpace from './components/UserSpace';
import { AccountContext } from "./components/accountContext";

function App() {
  const [currentUser,setCurrentUser] = useState("")
  const [active,setActive] =  useState("login")
  const switchToSignup = () => {
    setActive("signup"); };
  const switchToSignin = () => {
    setActive("login");  };
  const switchToUserSpace = () => {
    setActive("active"); };
  const switchToLogin = () => {
    setActive("login");  };
  const setUser = (username) => {
    setCurrentUser(username)
  }
  const contextValue = { 
    switchToSignup,
    switchToSignin,
    switchToUserSpace,
    switchToLogin,
    currentUser,
    setUser
  };
  return (
    <AccountContext.Provider value ={contextValue} >
    <div className="App">
      <h1>Acivity Streams App</h1>
      <div className="app-content">
        <div className="activities">
        <Activities/>
        </div>
        <div>
          {active == "login" && (
          <Login/>
          )}
          {active == "signup" && (
          <SignUp/>
          )}
          {active == "active" && (
          <UserSpace/>
          )}

        </div>
      </div>
    </div>
    </AccountContext.Provider>
  );
}

export default App;
