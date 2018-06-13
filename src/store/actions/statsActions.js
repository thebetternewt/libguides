import axios from 'axios';
import {
  GET_ALL_GUIDES,
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

  const guidesUrl =
    'https://lgapi-us.libapps.com/1.1/guides?site_id=8488&key=0b8da796b00334ae3471f60e6a10e8c6&status=1';

  axios
    .get(guidesUrl)
    .then(res => {
      // Sort guides by last updated date
      let guides = res.data.sort(
        (a, b) => new Date(a.updated) - new Date(b.updated)
      );

      // Limit to 20 guides
      guides = guides.slice(0, 20);
      dispatch({
        type: GET_GUIDES_BY_UPDATED_DATE,
        guides
      });
    })
    .catch(err => console.log(err));
};

// Get all guides
export const getAllGuides = () => dispatch => {
  dispatch({ type: GET_GUIDES_BEGIN });

  const guidesUrl =
    'https://lgapi-us.libapps.com/1.1/guides?site_id=8488&key=0b8da796b00334ae3471f60e6a10e8c6';

  axios
    .get(guidesUrl)
    .then(res => {
      // Sort guides by last updated date
      const guides = res.data;

      dispatch({
        type: GET_ALL_GUIDES,
        guides
      });
    })
    .catch(err => console.log(err));
};
