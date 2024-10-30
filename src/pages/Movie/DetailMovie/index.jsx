import "./style.css";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
function DetailMovie() {
  const { state } = useLocation();
  console.log('movie-detail', state);
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
              <div className="std">
                &nbsp; {state.actor}
              </div>
            </div>
            <div className="movie-genre movie-info">
              <label>Thể loại: </label>
              <div className="std">
                &nbsp; {state.category}
              </div>
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
              <div className="std">
                &nbsp; {state.language}
              </div>
            </div>
            <div className="movie-rating movie-rated-web">
              <label cursorshover="true">Rated: </label>
              <div className="std">
                &nbsp; {state.rated}
              </div>
            </div>
          </div>

          
        </div>
      </div>

    </div>
  );
}
export default DetailMovie;

