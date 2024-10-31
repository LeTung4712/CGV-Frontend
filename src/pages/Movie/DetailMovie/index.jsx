import "./style.css";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
function DetailMovie() {
  const { state } = useLocation();
  console.log("movie-detail", state);
  const videoUrl = state.trailer.replace("watch?v=", "embed/");

  const [toggleState, setToggleState] = useState(1);

  const toggleTab = (index) => {
    setToggleState(index);
  };
  return (
    <div className="page-chitiet">
      <div className="product-view">
        <div className="product-essential">
          <div className="page-title product-view">
            <span className="h1">Nội Dung Phim</span>
          </div>
          <div className="product-name-reponsive">
            <h1>{state.name}</h1>
          </div>
          <div className="product-img-box">
            <div className="product-image product-image-zoom zoom-available">
              <div className="product-image-gallery">
                <img
                  id="image-main"
                  className="gallery-image visible"
                  src={state.image}
                  alt={state.name}
                  title={state.name}
                />
              </div>
            </div>
          </div>
          <div className="product-shop">
            <div className="product-name">
              <span className="h1">{state.name}</span>
            </div>

            {/* Build test  */}
            <div className="movie-director movie-info">
              <label>Đạo diễn: </label>
              <div className="std">&nbsp; {state.directors} </div>
            </div>
            <div className="movie-actress movie-info">
              <label cursorshover="true">Diễn viên:</label>
              <div className="std">&nbsp; {state.actor}</div>
            </div>
            <div className="movie-genre movie-info">
              <label>Thể loại: </label>
              <div className="std">&nbsp; {state.category}</div>
            </div>
            <div className="movie-release movie-info">
              <label>Khởi chiếu: </label>
              <div className="std">&nbsp; {state.timeStart} </div>
            </div>
            <div className="movie-actress movie-info">
              <label>Thời lượng: </label>
              <div className="std">&nbsp; {state.time} phút</div>
            </div>
            <div className="movie-language movie-info">
              <label>Ngôn ngữ: </label>
              <div className="std">&nbsp; {state.language}</div>
            </div>
            <div className="movie-rating movie-rated-web">
              <label cursorshover="true">Rated: </label>
              <div className="std">&nbsp; {state.rated}</div>
            </div>
          </div>
        </div>
      </div>
      <div className="product-collateral toggle-content tabs-format-cgv">
        <div className="bloc-tabs">
          <button
            className={toggleState === 1 ? "tabs active-tabs" : "tabs"}
            onClick={() => toggleTab(1)}
          >
            Chi tiết
          </button>
          <button
            className={toggleState === 2 ? "tabs active-tabs" : "tabs"}
            onClick={() => toggleTab(2)}
          >
            Trailer
          </button>
        </div>

        <div className="content-tabs">
          <div
            className={
              toggleState === 1 ? "content  active-content" : "content"
            }
          >
            <p>{state.detail}</p>
          </div>

          <div
            className={
              toggleState === 2 ? "content  active-content" : "content"
            }
          >
            {state.trailer !== undefined && (
              <iframe
                width="1230"
                height="450"
                src={videoUrl}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                title={state.name}
              ></iframe>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
export default DetailMovie;
