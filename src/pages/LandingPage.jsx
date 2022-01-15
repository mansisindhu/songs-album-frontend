import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useDebouncedCallback } from "use-debounce";

const LandingPage = () => {
  const data = useSelector((state) => state.albums);
  const [search, setSearch] = useState("");

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const [albums, setAlbums] = useState([]);

  const searchHandler = () => {
    const newData = data.filter((el) => {
      const name = el.name.toLowerCase();
      const genre = el.genre.toLowerCase();
      if (name.includes(search) || genre.includes(search)) {
        return el;
      }
    });
    setAlbums(newData);
  };

  const debounced = useDebouncedCallback(searchHandler, 500);

  useEffect(() => {
    setAlbums(data);
  }, [data]);

  useEffect(() => {
    debounced();
  }, [search]);

  return (
    <>
      <div className="albums-main">
        <div className="search">
          <input
            value={search}
            onChange={handleSearch}
            type="text"
            placeholder="Search albums"
          />
        </div>
        <div className="genre"></div>

        <div className="albums">
          {albums.length ? (
            <>
              {albums.map((el) => {
                return (
                  <Link key={el._id} className="album" to={`/albums/${el._id}`}>
                    <img src={el.url} alt="" />
                    <div className="info">
                      <div className="name">{el.name}</div>
                      <div className="album-genre">{el.genre}</div>
                    </div>
                  </Link>
                );
              })}
            </>
          ) : (
            <div>Sorry, no albums</div>
          )}
        </div>
      </div>

      <style jsx>
        {`
          .info {
            display: flex;
            justify-content: space-between;
            padding: 12px;
          }

          .name {
            text-transform: uppercase;
            font-weight: 500;
          }

          .album-genre {
            color: gray;
          }
          .search > input {
            outline: none;
            border: 1px solid black;
            padding: 14px;
          }

          .albums {
            display: flex;
            flex-wrap: wrap;
            gap: 16px;
            justify-content: space-around;
            align-items: center;
          }

          .album {
            border: 1px solid black;
          }

          .album > img {
            height: 400px;
            width: 300px;
            object-fit: cover;
          }

          .albums-main {
            margin: auto;
            padding: 20px;
            gap: 45px;
            margin: 0 48px;
          }

          .search {
            margin-bottom: 24px;
          }
        `}
      </style>
    </>
  );
};

export default LandingPage;
