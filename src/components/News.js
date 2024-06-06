import React, { useEffect,useState} from 'react';
import NewsItem from './NewsItem';
import Spinner from './spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from 'react-infinite-scroll-component';

const News = (props) => {
  const [articles, setarticles] = useState([])
  const [loading, setloading] = useState(false)
  const [page, setpage] = useState(1)
  const [totalResults, settotalResults] = useState(0)
  const [error, seterror] = useState(null)
  const capitalize = (string) => {
    string = string.toLowerCase()
    return string.charAt(0).toUpperCase() + string.slice(1)
  }

  const fetchData = async (url) => {
    seterror(null);
    setloading(true); 
    try {
      let data = await fetch(url);
      props.setProgress(30)
      if (!data.ok) {
        throw new Error(`HTTP error! status: ${data.status}`);
      }
      let parsedData = await data.json();
      props.setProgress(70)
      return parsedData;
    } catch (error) {
      console.error("Failed to fetch data:", error);
      seterror(error.message )
      return null;
    } finally {
      setloading(false)
    }
  }

  useEffect(() => {
    document.title = `NewsNow - ${capitalize(props.category)}`
    const loadInitialData = async () => {
      props.setProgress(10);
      const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
      let parsedData = await fetchData(url);
      if (parsedData) {
        setarticles(parsedData.articles);
        settotalResults(parsedData.totalResults);
      }
      props.setProgress(100);
    };
    loadInitialData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchMoreData = async () => {
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page + 1}&pageSize=${props.pageSize}`;
    let parsedData = await fetchData(url);
    if (parsedData) {
      setarticles(articles.concat(parsedData.articles))
      settotalResults( parsedData.totalResults)
      setpage(page + 1)
    }
  }
    return (
      <>
        <h1 className="text-center" style={{ margin: '45px 0px',marginTop:'90px' }}>{`NewsNow - Top ${capitalize(props.category)} Headlines`}</h1>
        {loading && <Spinner />}
        {error && <div className="text-center" style={{ color: 'red' }}>Error: {error}</div>}
        {!error && (
          <InfiniteScroll
            dataLength={articles.length}
            next={fetchMoreData}
            hasMore={articles.length !== totalResults}
            loader={articles.length <= totalResults ? <Spinner/> : null}
          >
            <div className="container">
              <div className="row">
                {articles.map((element) => {
                  return (
                    <div className="col-md-4 my-2" key={element.url}>
                      <NewsItem
                        source={element.source.name}
                        imageUrl={element.urlToImage}
                        title={element.title ? element.title.slice(0, 46) : ''}
                        description={element.description ? element.description.slice(0, 91) : ''}
                        newsUrl={element.url}
                        author={element.author}
                        date={element.publishedAt}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          </InfiniteScroll>
        )}
      </>
    );
}
News.defaultProps = {
  country: "in",
  pageSize: 9,
  category: "general"
}

News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string
}
export default News 