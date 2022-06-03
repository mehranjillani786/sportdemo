import { Tabs, UnderGroups,UnderGroupDetail } from "./components";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Hidden } from "@material-ui/core"; 

function App() {
  return (
    <>
    <h1>Hello</h1>
    <h5>Author: Mehran</h5>
      {/* <Tabs /> */}
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        {/* <Hidden smUp> */}
          <Routes>
            {/* <Route path='/' element={ <Navigate to="/group" replace={true} />}/> */}
            <Route path="/" element={<Tabs />} />
            <Route path="/group/:id" element={<UnderGroups />} />
            <Route path="/sports/:id" element={<UnderGroupDetail />} />
          </Routes>
        {/* </Hidden> */}
        {/* <Hidden xsDown>
          <Routes>
          <Route path='/' element={ <Navigate to="/group" replace={true} />}/>
            <Route path="/group" element={<Tabs />}>
              <Route path=":id" element={<UnderGroups />} />
            </Route>
          </Routes>
        </Hidden> */}
      </BrowserRouter>
    </>
  );
}

export default App;
