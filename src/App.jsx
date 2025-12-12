import { useState } from 'react';

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Body from './components/Body';
import Login from './components/Login';
import Feed from './components/Feed';
import Profile from './components/Profile';
import Connection from './components/Connection';
import Requests from './components/Requests';
import Premium from './components/Premium';
import { Provider } from "react-redux";
import appStore from "./utils/appStore";



function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <Provider store={appStore}>
    <BrowserRouter basename='/'>
    <Routes>
     <Route path="/" element={<Body />}>
     <Route path="/" element={<Feed />} />
     <Route path="/login" element={<Login />} />
     <Route path="/profile" element={<Profile />} />
     <Route path="/connection" element={<Connection />} />
     <Route path="/requests" element={<Requests />} />
      <Route path="/premium" element={<Premium />} />
    </Route>   
    </Routes>
    </BrowserRouter>
   </Provider>
   
     
    </>
  )
}

export default App
