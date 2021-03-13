import React from 'react';

import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import './App.css';
import HomePage  from './pages/homepage/homepage.component';
import ShopPage  from './pages/shop/shop.component';
import Header from './components/header/header.component';
import SignInPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import { auth, createUserProfileDocuments } from './firebase/firebase.utils';


class App extends React.Component {
  constructor() {
    super(); 

    this.state = {
      currentUser: null
    }
  };

  unsubscribeFromAuth = null;

  componentDidMount() {
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        const userRef = await createUserProfileDocuments(userAuth);

        userRef.onSnapshot(snapshot => {
          this.setState({
            currentUser: {
              id: snapshot.id,
              ...snapshot.data()
            }
          });
          console.log(this.state );
        });
      } else {
        this.setState({ currentUser: userAuth });

      }
    });
  };

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }
  
  render() {
    return (
      <div>
      <Router>
        <Header currentUser={this.state.currentUser} />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/shop" component={ShopPage} />
          <Route exact path="/signin" component={SignInPage} />
        </Switch>
      </Router>
      </div>
    );
  }
}

export default App;
