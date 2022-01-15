import { FETCH_ALBUMS, FETCH_USER } from "./actionTypes";

const initState = {
  user: {},
  albums: [],
};

const reducer = (state = initState, { type, payload }) => {
  switch (type) {
    case FETCH_USER: {
      return {
        ...state,
        user: { ...payload },
      };
    }

    case FETCH_ALBUMS: {
      return {
        ...state,
        albums: [...payload],
      };
    }

    default:
      return state;
  }
};

export default reducer;
