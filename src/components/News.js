import React, { useState, useEffect } from "react";
import Newsitem from "./Newsitem";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";
import Spinner from "./Spinner";
const News = (props) => {
  const Capitalize = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };
  const [articles, setarticles] = useState([]);
  const [loading, setloading] = useState(false);
  const [page, setpage] = useState(1);
  const [totalresults, settotalresults] = useState(0);
  // document.title = `${this.Capitalize(this.props.category)}-NewsMonkey`;
  const updateNews = async () => {
    props.setProgress(10);
    const url = `https://news-monkey-pztu.vercel.app/news?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
    setloading(true);
    let data = await fetch(url);
    props.setProgress(30);
    let parsedData = await data.json();
    props.setProgress(70);
    console.log(parsedData);
    setarticles(parsedData.articles);
    settotalresults(parsedData.totalresults);
    setloading(false);
    props.setProgress(100);
  };
  useEffect(() => {
    updateNews();
    // eslint-disable-next-line
  },[]);

  const fetchMoreData = async () => {
    
    const url = `https://news-monkey-pztu.vercel.app/news?country=${props.country}&category=${props.category}&page=${page}&pageSize=${props.pageSize}`;
    setpage(page + 1);
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);
    setarticles(articles.concat(parsedData.articles));
    settotalresults(parsedData.totalResults);
  };
  return (
    <>
      <h1 className={`text-center`} style={{marginTop:'90px'}}>
        NewsMonkey - Top Headlines from {Capitalize(props.category)} category
      </h1>
      {loading && <Spinner />}
      <InfiniteScroll
        dataLength={articles.length}
        next={fetchMoreData}
        hasMore={articles.length !== totalresults}
        loader={<Spinner />}
      >
        <div className="container">
          <div className="row">
            {articles.map((element) => {
              return (
                <div className="col-md-3" key={element.url}>
                  <Newsitem
                    title={element.title ? element.title : ""}
                    description={element.description ? element.description : ""}
                    imageUrl={element.urlToImage}
                    newsUrl={element.url}
                    author={element.author}
                    date={element.publishedAt}
                    source={element.source.name}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </InfiniteScroll>
    </>
  );
};

News.defaultProps = {
  country: "us",
  pageSize: 8,
  category: "business",
};
News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
};
export default News;
