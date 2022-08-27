import {
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
} from 'firebase/firestore';
import { eventRef, usersRef } from './Firebase';
import { denullify } from './Helper';
import { User } from './Model/User';

export const addUser = async (user, token) => {
  user.email = denullify(user.email);
  user.displayName = denullify(user.displayName);
  user.uid = denullify(user.uid);
  user.photoURL = denullify(user.photoURL);
  user.token = denullify(user.token);

  const newUser = new User(
    user.uid,
    user.email,
    user.displayName,
    user.photoURL,
    0,
    0,
    token,
  );

  await setDoc(doc(usersRef, user.uid), Object.assign({}, newUser));
};

export const updateToken = async (newToken, user) => {
  newToken = denullify(newToken);
  console.log("token uid", user.uid)
  await updateDoc(doc(usersRef, user.uid), {
    token: newToken,
  });
};

export const updatePosition = async (uid, pos) => {
  await updateDoc(doc(usersRef, uid), {
    longitude: pos.lng,
    latitude: pos.lat,
  });
};

export const getUserByUID = async (uid) => {
  const userSnap = await getDoc(doc(usersRef, uid));
  return userSnap.exists() ? userSnap.data() : null;
};

export const getAllUsers = async () => {
  const userSnap = await getDocs(usersRef);
  return userSnap;
};

export const addEvent = async (newEvent) => {
  await setDoc(doc(eventRef, newEvent.uid), Object.assign({}, newEvent));
};

export const deleteEvent = async (uid) => {
  await deleteDoc(doc(eventRef, uid));
};

export const getEventByUID = async (uid) => {
  const eventSnap = await getDoc(doc(eventRef, uid));
  return eventSnap.exists() ? eventSnap.data() : null;
};

export const updateAccepted = async (uid, accepted_uids) => {
  await updateDoc(doc(eventRef, uid), {
    accepted_uids: accepted_uids,
  });
};
