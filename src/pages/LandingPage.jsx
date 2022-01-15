import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const LandingPage = () => {
  const data = useSelector((state) => state.albums);
  console.log(data);
  return (
    <>
      <div className="albums-main">
        <div className="albums">
          {data.map((el) => {
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
        </div>
        <div className="filters">
          <div className="search">
            <input type="text" placeholder="Search albums" />
          </div>
          <div className="genre"></div>
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
            display: flex;
            margin: auto;
            padding: 20px;
            gap: 45px;
            margin: 0 48px;
          }
        `}
      </style>
    </>
  );
};

export default LandingPage;
