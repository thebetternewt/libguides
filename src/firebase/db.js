import firebase from 'firebase/app';
import { auth, db } from './firebase';

// User Account API

export const doCreateUser = (id, name, email) =>
  db
    .collection('users')
    .doc(id)
    .set({
      name,
      email
    });

export const doGetUser = id => {
  const userRef = db.collection('users').doc(id);

  return userRef.get();
};

// Saved Guides

export const doSaveGuide = (guideId, guideName, guideUrl) => {
  const userId = auth.currentUser.uid;
  const userRef = db.collection('users').doc(userId);

  return userRef.update({
    [`savedGuides.${guideId}`]: { name: guideName, url: guideUrl }
  });
};

export const doDeleteGuide = guideId => {
  const userId = auth.currentUser.uid;
  const userRef = db.collection('users').doc(userId);

  return userRef.update({
    [`savedGuides.${guideId}`]: firebase.firestore.FieldValue.delete()
  });
};

export const doGetSavedGuides = () => {
  const userId = auth.currentUser.uid;
  const userRef = db.collection('users').doc(userId);

  return userRef.get();
};
