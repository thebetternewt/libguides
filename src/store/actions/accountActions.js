import { db } from '../../firebase';
import { GET_SAVED_GUIDES_BEGIN, GET_SAVED_GUIDES } from './types';

// Save Guide (id) to favorites
export const saveGuide = (guideId, guideName, guideUrl) => dispatch => {
  db.doSaveGuide(guideId, guideName, guideUrl);

  console.log(`Saved guide ${guideId} to favorites`);
};

// Delete Guide (id) from favorites
export const deleteSavedGuide = guideId => {
  db.doDeleteGuide(guideId);

  console.log(`Delete guide ${guideId} from favorites`);
};

// Fetch all saved guide ids
export const getSavedGuides = () => dispatch => {
  dispatch({
    type: GET_SAVED_GUIDES_BEGIN
  });

  db.doGetSavedGuides().then(user => {
    console.log(user.data());

    const { savedGuides } = user.data();

    if (user.data().savedGuides) {
      // Convert savedGuides object to array of guide objects
      const guidesArray = Object.keys(savedGuides).map(key => {
        return {
          id: key,
          name: savedGuides[key].name,
          url: savedGuides[key].url
        };
      });

      dispatch({
        type: GET_SAVED_GUIDES,
        savedGuides: guidesArray
      });
    } else {
      dispatch({
        type: GET_SAVED_GUIDES
      });
    }
  });
};
