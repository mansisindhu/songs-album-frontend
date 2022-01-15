import axios from "axios";

import { FETCH_ALBUMS, FETCH_USER } from "./actionTypes";

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
    // console.log(data);
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

const fetchAlbums = () => async (dispatch) => {
  try {
    const { data } = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/albums`,
      {
        withCredentials: true,
      }
    );
    console.log(data);
    dispatch(getAlbums(data));
  } catch (err) {
    console.log(err);
  }
};

export { fetchAlbums, getAlbums, getUser, login };
