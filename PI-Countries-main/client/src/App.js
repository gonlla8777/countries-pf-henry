import { Route, Switch } from "react-router-dom";
import LandingPage from "./components/Screens/LandingPage/LandingPage.jsx";
import Home from "./components/Screens/Home/Home.jsx";
import CountryDetail from "./components/Screens/IdCard/IdCard.jsx";
import ActivityForm from "./components/Screens/ActivityAdd/ActivityAdd.jsx";

function App() {
  return (
    <Switch>
      <Route exact path="/" component={LandingPage} />
      <Route exact path="/home" component={Home} />
      <Route exact path="/country2/:idPais" component={CountryDetail} />
      <Route exact path="/AddActivity" component={ActivityForm} />
      <Route path="*" />
    </Switch>
  );
}

export default App;
