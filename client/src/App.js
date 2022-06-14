import { useState } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
// Css
import "./bootstrap.css";
// utlities
import NavBar from "./utils/NavBar";
// components
import Register from "./components/Register";
import Landing from "./components/Landing";
import Dashboard from "./components/Dashboard";
import AddItem from "./components/AddItem";
import ItemDetail from "./components/ItemDetail";
import LogIn from "./components/LogIn";
import ItemUpdate from "./components/ItemUpdate";
import NoMatch from "./utils/NoMatch";

function App() {
  const [toggleSwitch, setToggleSwitch] = useState(false);
  const [newUserToggle, setNewUserToggle] = useState(false);
  const [deleteToggle, setDeleteToggle] = useState(false);
  const [loggedInUserToggle, setLoggedInUserToggle] = useState(false);
  const [updatedInventoryToggle, setUpdatedInventoryToggle] = useState(false);

  return (
    <>
      <BrowserRouter>
        <NavBar toggleSwitch={toggleSwitch} setToggleSwitch={setToggleSwitch} />
        <Switch>
          <Route exact path="/">
            <Landing />
          </Route>
          <Route exact path="/mhi">
            <Landing />
          </Route>
          <Route exact path="/logIn">
            <LogIn loggedInUserToggle={loggedInUserToggle} setLoggedInUserToggle={setLoggedInUserToggle} />
          </Route>
          <Route exact path="/register">
            <Register newUserToggle={newUserToggle} setNewUserToggle={setNewUserToggle} className="bgImgRegister" loggedInUserToggle={loggedInUserToggle} setLoggedInUserToggle={setLoggedInUserToggle} />
          </Route>
          <Route exact path="/dashboard">
            <Dashboard loggedInUserToggle={loggedInUserToggle} setLoggedInUserToggle={setLoggedInUserToggle} updatedInventoryToggle={updatedInventoryToggle}>
              {/* <ItemsList deleteToggle={deleteToggle} setDeleteToggle={setDeleteToggle}>
                <Category />
              </ItemsList> */}
            </Dashboard>
          </Route>
          <Route exact path="/addItem">
            <AddItem loggedInUserToggle={loggedInUserToggle} setLoggedInUserToggle={setLoggedInUserToggle} />
          </Route>
          <Route exact path="/itemDetail/:_id">
            <ItemDetail deleteToggle={deleteToggle} setDeleteToggle={setDeleteToggle} />
          </Route>
          <Route exact path="/itemUpdate/:_id">
            <ItemUpdate updatedInventoryToggle={updatedInventoryToggle} setUpdatedInventoryToggle={setUpdatedInventoryToggle} />
          </Route>
          <Route path="*">
            <NoMatch />
          </Route>
        </Switch>
      </BrowserRouter>
    </>
  );
}

export default App;
