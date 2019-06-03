import firebase from 'firebase/app';
import 'bootstrap';
import '../styles/main.scss';
import auth from './components/auth/auth';
import MyNavBar from './components/MyNavbar/MyNavbar';
import authData from './helpers/data/authData';

import apiKeys from './helpers/apiKeys.json';

const init = () => {
  firebase.initializeApp(apiKeys.firebaseKeys);
  MyNavBar.navbarEvents();
  authData.checkLoginStatus();
  auth.authStringBuilder();
};

init();
