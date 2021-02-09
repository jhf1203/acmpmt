import React, { useState, useEffect } from 'react';
import { Route, Switch, useParams } from 'react-router-dom';
import LoginForm from './pages/Auth/LoginForm';
import SignupForm from './pages/Auth/SignupForm';
import Nav from "./components/Nav";
import Profile from './pages/Profile';
import Detail from "./pages/Detail";
import Search from "./pages/Search";
import NoMatch from "./pages/NoMatch";
import Album from "./pages/Album"
import AUTH from './utils/AUTH';

const dotenv = require("dotenv").config()

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    AUTH.getUser().then(response => {
        if (!!response.data.user) {
          setLoggedIn(true);
          setUser(response.data.user);
        } else {
          setLoggedIn(false);
          setUser(null);
        }
      });

      return () => {
        setLoggedIn(false);
        setUser(null);
      };
  }, []);

	const logout = (event) => {
    event.preventDefault();
    
		AUTH.logout().then(response => {
			// console.log(response.data);
			if (response.status === 200) {
				setLoggedIn(false);
        setUser(null);
        window.location.replace("/")
			}
		});
	};

	const login = (username, password) => {
		AUTH.login(username, password).then(response => {
      console.log(response.data);
      if (response.status === 200) {
        // update the state
        setLoggedIn(true);
        setUser(response.data.user);
      }
    });
	};

  return (
    <div className="App">
      { loggedIn && (
        <div>
          <Nav user={user} logout={logout}/>
          <div className="main-view">
            <Switch> 
              <Route exact path="/" render={() => <Profile user={user} />} />
              <Route exact path="/login" render={() => <LoginForm />} />
              <Route exact path="/profile/:id" render={() => <Profile />} />
              <Route exact path="/profile" render={() => <Profile user={user}/>} />
              <Route exact path="/other" render={() => <Detail />} />
              <Route exact path="/search" render={() => <Search user={user} />} />
              <Route exact path="/album" render={() => <Album user={user} />} />
              <Route exact path="/user" render={() => <Profile/>} />
              <Route component={NoMatch} />
              {/* <Route exact path="/" component={Profile} user={user} />
              <Route exact path="/profile" component={Profile} user={user} />
              <Route exact path="/profile/:id" component={Detail} user={user} />
              <Route exact path="/search" component={Search} user={user} />
              <Route exact path="/album" component={Album} user={user} />
              <Route component={NoMatch} /> */}
            </Switch>
            
          </div>
        </div>
      )}
      { !loggedIn && (
        <div className="auth-wrapper" style={{paddingTop:40}}>
          <Route exact path="/" component={() => <LoginForm login={login}/>} />
          <Route exact path="/profile" component={() => <LoginForm user={login} />} />
          <Route exact path="/signup" component={SignupForm} />
        </div>
      )}
    </div>
  );
}

export default App;
