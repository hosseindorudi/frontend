
import "./app.scss";

import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Main from "./Main";
import Posts from "./components/posts/Posts";
import Videos from "./components/videos/Videos";
import RequiredAuth from "./components/RequiredAuth";
function App() {
  return (
    
    <Routes>
      
      <Route path="" element={<Layout />}>
        
          <Route exact path="" element={<Main/>}/>
          <Route exact path="post" element={<Posts/>}/>
          <Route element={<RequiredAuth/>}>
            <Route exact path="video" element={<Videos/>}/>
          </Route>
          
      </Route>
     
    </Routes>
  );
}

export default App;
