import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const AlbumPage = () => {
  const { id } = useParams();
  const [album, setAlbum] = useState();

  const getAlbum = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/albums/${id}`,
        { withCredentials: true }
      );

      setAlbum({ ...data });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getAlbum();
  }, []);

  return (
    <>
      {album ? (
        <div className="main">
          <div className="album-info">
            <div>
              <img className="album-img" src={album.url} alt="" />
              <div>
                <p className="name">{album.name}</p>
                <div className="more-info">
                  <p>{album.genre}</p>
                  <p>{album.year}</p>
                </div>
              </div>
            </div>
            <div className="artist-info">
              <img className="artist" src={album.artist.url} alt="" />
              <div>{album.artist.name}</div>
            </div>
          </div>

          <h2>Songs</h2>
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
      ) : (
        <div>Loading...</div>
      )}

      <style jsx>
        {`
          .artist-info > img {
            height: 200px;
            width: 200px;
            border-radius: 50%;
            object-fit: cover;
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
            margin-top: 20px;
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
            padding: 20px;
            margin: 0 48px;
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
            align-items: flex-start;
            margin-bottom: 40px;
            justify-content: space-between;
            width: 50%;
            flex-wrap: wrap;
          }

          .album-img {
            height: 300px;
            width: 300px;
            object-fit: cover;
          }
        `}
      </style>
    </>
  );
};

export default AlbumPage;
