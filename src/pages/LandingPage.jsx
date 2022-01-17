import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { useDebouncedCallback } from "use-debounce";
import { fetchAlbums } from "../store/actions";

const LandingPage = () => {
  const data = useSelector((state) => state.albums);
  const totalPages = useSelector((state) => state.totalPages);
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

  const [queryObj, setQueryObj] = useState(null);

  const handlePageNumber = (page) => {
    setQueryObj((prev) => {
      return {
        ...prev,
        page,
      };
    });
  };

  const handleFilters = (e) => {
    const { name, value } = e.target;
    setQueryObj((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    if (queryObj) {
      const params = new URLSearchParams(queryObj).toString();

      if (params) {
        history.push({ search: params });
      }
    }

    const getParams = history.location.search;
    dispatch(fetchAlbums(getParams));
  }, [queryObj, history]);

  const [pages, setPages] = useState([]);

  useEffect(() => {
    setAlbums(data);
    setPages(() => {
      const arr = [];
      for (let i = 0; i < totalPages; i++) {
        arr.push(i + 1);
      }

      return arr;
    });
  }, [totalPages, data]);

  return (
    <>
      <div className="albums-main">
        <div className="filters">
          <input
            value={search}
            onChange={handleSearch}
            type="text"
            placeholder="Search albums"
          />
          <div className="genre">
            <select onChange={handleFilters} name="genre">
              <option value="">Choose genre</option>
              <option value="Soundtrack">Soundtrack</option>
              <option value="Hip-Hop">Hip-Hop</option>
              <option value="Indian-pop">Indian-pop</option>
              <option value="Filmi">Filmi</option>
              <option value="Classical">Classical</option>
            </select>
          </div>
          <div className="sort">
            <select onChange={handleFilters} name="sortBy">
              <option value="">Sort By Year</option>
              <option value="new-to-old">New to old</option>
              <option value="old-to-new">Old to new</option>
            </select>
          </div>
        </div>

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

        <div className="pages">
          {pages.map((el) => (
            <button
              key={el}
              onClick={() => handlePageNumber(el)}
              className="page-btn"
            >
              {el}
            </button>
          ))}
        </div>
      </div>

      <style jsx>
        {`
          .pages {
            display: flex;
            gap: 10px;
            justify-content: center;
            align-items: center;
            margin-top: 24px;
          }

          .page-btn {
            padding: 8px 12px;
            border: none;
            background-color: black;
            color: white;
          }

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
          .filters > input {
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

          .filters {
            margin-bottom: 24px;
          }
        `}
      </style>
    </>
  );
};

export default LandingPage;
