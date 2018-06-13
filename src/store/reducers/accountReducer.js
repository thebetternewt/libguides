import { GET_SAVED_GUIDES, GET_SAVED_GUIDES_BEGIN } from '../actions/types';

const initialState = {
  savedGuides: [],
  loading: false
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_SAVED_GUIDES_BEGIN:
      return {
        ...state,
        loading: true
      };
    case GET_SAVED_GUIDES:
      return {
        ...state,
        savedGuides: action.savedGuides,
        loading: false
      };
    default:
      return state;
  }
};

export default reducer;
