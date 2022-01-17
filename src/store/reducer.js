import { FETCH_ALBUMS, FETCH_USER, GET_TOTAL_PAGES } from "./actionTypes";

const initState = {
  user: {},
  albums: [],
  totalPages: 0,
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

    case GET_TOTAL_PAGES: {
      return {
        ...state,
        totalPages: payload,
      };
    }

    default:
      return state;
  }
};

export default reducer;
