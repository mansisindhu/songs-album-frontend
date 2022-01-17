import axios from "axios";
import { FETCH_ALBUMS, FETCH_USER, GET_TOTAL_PAGES } from "./actionTypes";

const getUser = (data) => {
  return {
    type: FETCH_USER,
    payload: data,
  };
};

const login = (loginData) => async (dispatch) => {
  try {
    const { data } = await axios.post(
      `${process.env.REACT_APP_BACKEND_URL}/artist/login`,
      { ...loginData },
      { withCredentials: true }
    );
    dispatch(getUser(data));
  } catch (err) {
    console.log(err);
  }
};

const getAlbums = (data) => {
  return {
    type: FETCH_ALBUMS,
    payload: data,
  };
};

const getPages = (data) => {
  return {
    type: GET_TOTAL_PAGES,
    payload: data,
  };
};

const fetchAlbums = (query) => async (dispatch) => {
  try {
    if (!query) query = "";
    const {
      data: { albums, totalPages },
    } = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/albums${query}`, {
      withCredentials: true,
    });
    dispatch(getAlbums(albums));
    dispatch(getPages(totalPages));
  } catch (err) {
    console.log(err);
  }
};

export { fetchAlbums, getAlbums, getUser, login };
