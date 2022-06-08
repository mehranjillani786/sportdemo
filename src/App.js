import { Tabs, UnderGroups,UnderGroupDetail } from "./components";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Hidden } from "@material-ui/core"; 
import SessionDetails from "./components/sessions/SessionDetail";

function App() {
  return (
    <>
      {/* <Tabs /> */}
      <h1>Hello</h1>
      <BrowserRouter basename={process.env.PUBLIC_URL}>
         
        {/* <Hidden smUp> */}
          <Routes>
            <Route path='/' element={ <Navigate to="/group" replace={true} />}/>
            <Route path="/group" element={<Tabs />} />
            <Route path="/group/:id" element={<UnderGroups />} />
            <Route path="/sports/:id" element={<UnderGroupDetail />} />
            <Route path="/session/:id" element={<SessionDetails />} />
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
