import auth from '@react-native-firebase/auth';
import {err} from 'react-native-svg/lib/typescript/xml';
import store from '../redux/store';
import {updateToken} from '../redux/reducers/User';

export const createUser = async (firstName, lastName, email, password) => {
  try {
    const user = await auth().createUserWithEmailAndPassword(email, password);
    await user.user.updateProfile({displayName: firstName + ' ' + lastName});

    return user;
  } catch (error) {
    return {error: 'Error in Registration'};
  }
};

export const loginUser = async (email, password) => {
  try {
    const response = await auth().signInWithEmailAndPassword(email, password);
    const token = await response.user.getIdToken();
    return {
      status: true,
      data: {
        displayName: response.user.displayName,
        email: response.user.email,
        token,
      },
    };
  } catch (error) {
    return {status: false, error: error.message};
  }
};

export const logOut = async () => {
  return await auth().signOut();
};

export const checkToken = async () => {
  try {
    let res = await auth().currentUser.getIdToken(true);
    store.dispatch(updateToken(res));
    console.log(res);
    return res;
  } catch (error) {
    return error;
  }
};
