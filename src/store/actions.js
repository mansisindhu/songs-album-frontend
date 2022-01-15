import axios from "axios";

import { FETCH_ALBUMS, FETCH_USER } from "./actionTypes";

const fetchUser = () => async (dispatch) => {
  try {
    const { data } = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/user`,
      {
        withCredentials: true,
      }
    );
    dispatch(getUser(data.user));
  } catch (err) {
    console.log(err);
  }
};

const getUser = (data) => {
  return {
    type: FETCH_USER,
    payload: data,
  };
};

const logoutUser = () => async (dispatch) => {
  try {
    await axios.get(`${process.env.REACT_APP_BACKEND_URL}/logout`, {
      withCredentials: true,
    });
    dispatch(getUser({}));
  } catch (err) {
    console.log(err);
  }
};

const login = (data) => async (dispatch) => {
  try {
    await axios.post(
      `${process.env.REACT_APP_BACKEND_URL}/artist/login`,
      { ...data },
      { withCredentials: true }
    );

    dispatch(fetchUser());
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

export { fetchAlbums, getAlbums, getUser, fetchUser, login, logoutUser };
