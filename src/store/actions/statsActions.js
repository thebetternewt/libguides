import axios from 'axios';
import {
  GET_GUIDES_BY_HIT_COUNT,
  GET_GUIDES_BY_UPDATED_DATE,
  GET_GUIDES_BEGIN
} from './types';

// Get top 20 guides by hit count
export const getGuidesByHitCount = () => dispatch => {
  dispatch({ type: GET_GUIDES_BEGIN });

  const countHitUrl = `https://lgapi-us.libapps.com/1.1/guides?site_id=8488&key=0b8da796b00334ae3471f60e6a10e8c6
    &sort_by=count_hit`;

  axios
    .get(countHitUrl)
    .then(res => {
      // Limit to top 20 guides
      const guides = res.data.slice(0, 20);
      dispatch({
        type: GET_GUIDES_BY_HIT_COUNT,
        guides
      });
    })
    .catch(err => console.log(err));
};

// Get 20 oldest guides (since last update date)
export const getGuidesByUpdatedDate = () => dispatch => {
  dispatch({ type: GET_GUIDES_BEGIN });

  const updatedUrl = `https://lgapi-us.libapps.com/1.1/guides?site_id=8488&key=0b8da796b00334ae3471f60e6a10e8c6
    &sort_by=updated`;

  axios
    .get(updatedUrl)
    .then(res => {
      // Limit to top 20 guides
      const guides = res.data.slice(0, 20);
      dispatch({
        type: GET_GUIDES_BY_UPDATED_DATE,
        guides
      });
    })
    .catch(err => console.log(err));
};
