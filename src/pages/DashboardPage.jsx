import axios from "axios";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../store/actions";

const DashboardPage = () => {
  const user = useSelector((state) => state.user);

  const [userData, setUserData] = useState({
    name: user.name,
    email: user.email,
    url: user.url,
  });

  const handleUpdate = (e) => {
    setUserData((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };

  const dispatch = useDispatch();

  const updateData = async () => {
    const { data } = await axios.patch(
      `${process.env.REACT_APP_BACKEND_URL}/artist/${user._id}`,
      { ...userData },
      { withCredentials: true }
    );

    dispatch(getUser(data));
    window.alert("Updated");
  };

  return (
    <>
      <div className="dashboard">
        <div className="info">
          <img src={user.url} alt="" />
          <div className="data">
            <input
              name="name"
              type="text"
              value={userData.name}
              onChange={handleUpdate}
            />
            <input
              name="email"
              type="text"
              value={userData.email}
              onChange={handleUpdate}
            />
            <input
              type="text"
              name="url"
              value={userData.url}
              onChange={handleUpdate}
            />
            <button onClick={updateData} className="submit">
              Edit
            </button>
          </div>
        </div>
        <div className="albums">
          {user.albums.map((album, i) => {
            return (
              <div key={i} className="main">
                <div className="album-info">
                  <div>
                    <p className="name">{album.name}</p>
                    <div className="more-info">
                      <p>{album.genre}</p>
                      <p>{album.year}</p>
                    </div>
                  </div>
                </div>

                <div className="songs">
                  {album.songs.map((el) => {
                    return (
                      <div key={el._id} className="song">
                        <img src={el.url} alt="" />
                        <div className="song-info">
                          <p>{el.name}</p>
                          <p>Duration: {el.duration}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <style jsx>
        {`
          .dashboard {
            margin: 20px 80px;
            display: flex;
            gap: 32px;
          }

          .data {
            display: flex;
            gap: 8px;
            flex-direction: column;
          }

          .data > input {
            padding: 12px;
            font-size: 16px;
            width: 100%;
            border: 1px solid black;
          }

          .submit {
            padding: 16px;
            background-color: black;
            color: white;
            border: none;
            width: 100%;
            font-size: 16px;
            text-transform: uppercase;
          }

          .song-info {
            display: flex;
            justify-content: space-between;
          }

          .song-info > p:first-child {
            font-weight: 500;
          }

          .song-info > p:last-child {
            color: gray;
          }

          .songs {
            display: flex;
            flex-wrap: wrap;
            gap: 20px;
            align-items: center;
            justify-content: center;
          }
          .song {
            border: 1px solid black;
            padding: 8px;
          }

          .song > img {
            width: 250px;
            height: 100px;
            object-fit: cover;
          }

          .main {
            display: flex;
            flex-direction: column;
            align-items: center;
          }

          .name {
            font-weight: 700;
            font-size: 24px;
          }

          .album-info {
            display: flex;
            flex-wrap: wrap;
            align-items: center;
            margin-bottom: 40px;
            gap: 16px;
          }

          .album-info > img {
            height: 200px;
            width: 200px;
            object-fit: cover;
          }
        `}
      </style>
    </>
  );
};

export default DashboardPage;
