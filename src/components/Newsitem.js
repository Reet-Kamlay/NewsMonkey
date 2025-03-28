import React from "react";

const Newsitem=(props)=> {
    let { title, description, imageUrl, newsUrl,author,date,source } = props;
    return (
      <div className="my-3">
        <div className="card" >
          <img src={!imageUrl?"https://www.hindustantimes.com/ht-img/img/2023/10/02/1600x900/GAMES-ASIA--531_1696236278287_1696236311356.JPG":imageUrl} className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">{title}  <span class="badge rounded-pill text-bg-primary">{source}</span></h5>
            <p className="card-text">{description}...</p>
            <p className="card-text"><small className="text-body-secondary">By {!author?"Unknown":author} on {new Date(date).toGMTString()}</small></p>
            <a rel="noreferrer" href={newsUrl} target="_blank" className="btn btn-sm btn-primary btn-dark">
              Read More
            </a>
            
          </div>
        </div>
      </div>
    );
  }

export default Newsitem;
