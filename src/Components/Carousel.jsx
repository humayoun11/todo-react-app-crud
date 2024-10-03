import React from 'react';

const Carousel = () => {
  return (
    <div id="carouselExample" className="carousel slide" data-bs-ride="carousel">
      <div className="carousel-inner">
        <div className="carousel-item active">
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTkjdBh_J6biKEKTQ6cZsmZwgHFBsen7zGQmQ&s" className="d-block w-100" alt="Welcome" />
        </div>
        <div className="carousel-item">
          <img src="https://as1.ftcdn.net/v2/jpg/02/34/94/16/1000_F_234941682_ssUiQFnl9QjVxN9Salv2l5kpnm84fYYN.jpg" className="d-block w-100" alt="https://www.vectorstock.com/royalty-free-vector/task-management-it-header-or-footer-banner-vector-24528092" />
        </div>
        <div className="carousel-item">
          <img src="https://www.shutterstock.com/image-photo/do-list-panorama-notebook-blue-260nw-2051858483.jpg" className="d-block w-100" alt="Feature 2" />
        </div>
      </div>
      <button className="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button className="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
}

export default Carousel;
