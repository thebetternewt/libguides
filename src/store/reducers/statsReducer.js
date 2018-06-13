import {
  GET_GUIDES_BY_HIT_COUNT,
  GET_GUIDES_BY_UPDATED_DATE,
  GET_GUIDES_BEGIN
} from '../actions/types';

const initialState = {
  guidesByHitCount: [],
  guidesByUpdatedDate: [],
  loading: false
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_GUIDES_BEGIN:
      return {
        ...state,
        loading: true
      };
    case GET_GUIDES_BY_HIT_COUNT:
      return {
        ...state,
        guidesByHitCount: action.guides,
        loading: false
      };
    case GET_GUIDES_BY_UPDATED_DATE:
      return {
        ...state,
        guidesByUpdatedDate: action.guides,
        loading: false
      };
    default:
      return state;
  }
};

export default reducer;
