import './App.css';
import axios from 'axios'
import moment from 'moment'
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass} from '@fortawesome/free-solid-svg-icons';

function News() {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");

  const getNews = (e) => {
    e.preventDefault(); 

    const options = { //api call
      method: 'GET',
      url: 'https://bing-news-search1.p.rapidapi.com/news/search',
      params: {q: search, freshness: 'Day', textFormat: 'Raw', safeSearch: 'Off'},
      headers: {
        'X-BingApis-SDK': 'true',
        'X-RapidAPI-Key': '927458ade3msh6163248bdffe610p1b88d0jsnecf53af81a5f',
        'X-RapidAPI-Host': 'bing-news-search1.p.rapidapi.com'
      }
    };
    
    axios.request(options).then(function (response) {
      setData(response.data.value);
      console.log(data);
    }).catch(function (error) {
      console.error(error);
    });///-------------------------
    console.log(search);
  }

  return (
    <div className='container'>
      <div className="header">
      <span className="news-head">News</span>
      <div className="form-box">
      <form onSubmit={getNews} >
        <input type="text" className='search-inp' placeholder="search for topics, locations and sources" 
        onChange={(e) => {
          setSearch(e.target.value)
        }}
        />
        <button type="submit"><FontAwesomeIcon title='search'icon={faMagnifyingGlass} /></button>
      </form>
      </div>
      </div>
      <div className="post">
        {data.map(eachPost => (
            <div className="news-post" key={eachPost?.name}>
              <h1>{eachPost?.name}</h1>
              <p className='post-time'><span>{eachPost?.provider[0]?.name} | </span><span>{moment(eachPost?.datePublished).format('Do MMMM YYYY, h:mm a')}</span></p>
              <p>{eachPost?.description}</p>
              <img src={eachPost?.image?.thumbnail?.contentUrl} alt="img" className='post-img'/>
            </div>
          )
        )}
      </div>
    </div>
  );
}

export default News;
