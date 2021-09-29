import "./firebase";
import { BrowserRouter , Switch, Route} from "react-router-dom";
import Topbar from "./components/Topbar";
import Login from "./features/Login";
import Home from "./routes/home/Home"
const App = () =>{
  return <>
  <BrowserRouter>
  <Topbar/>
  <Switch>
    <Route exact path="/" component={Home}/>
    <Route exact path="/login" component={Login} />
  </Switch>
  </BrowserRouter>
  </>
}

export default App;
