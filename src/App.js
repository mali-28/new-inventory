import "./firebase";
import { BrowserRouter , Switch, Route} from "react-router-dom";
import Topbar from "./components/Topbar";
import Home from "./routes/home/Home"
import Work from "./routes/Work";
import Accounts from "./routes/admins/Accounts";
import Context from "./context/context";
const App = () =>{
  return <>
  <BrowserRouter>
  <Context>
  <Topbar/>
  <Switch>
    <Route exact path="/" component={Home}/>
    <Route exact path="/accounts" component={Accounts}/>
    <Route exact path="/work" component={Work}/>
  </Switch>
  </Context>
  </BrowserRouter>
  </>
}

export default App;
