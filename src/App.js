import "./firebase";
import { BrowserRouter,Redirect, Switch, Route} from "react-router-dom";
import Topbar from "./components/Topbar";
import Home from "./routes/home/Home"
import Work from "./routes/Work";
import Accounts from "./routes/admins/Accounts";
import Context from "./context/context";
import WorkContext from "./context/WorkContext";
const App = () =>{
  return <>
  <BrowserRouter>
  <Context>
    <WorkContext>
  <Topbar/>
  <Switch>
    <Route exact path="/" component={Home}/>
    <Route exact path="/accounts" component={Accounts}/>
    <Route exact path="/work" component={Work}/>
    <Redirect to="/"/>
  </Switch>
  </WorkContext>
  </Context>
  </BrowserRouter>
  </>
}

export default App;
