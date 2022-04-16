import { useEffect, useState } from "react";
import "./news-board.scss";

export const NewsBoard = () => {
  const [news, setNews] = useState(
    [
      { 
        title: 'News1',
        text: 'News1 lorem ip Lorem ipsum dolor, sit amet consectetur adipisicing elit. Fugiat debitis nihil ipsa excepturi aut officia quae optio libero? Doloremque sit tenetur quam nobis obcaecati rem saepe quisquam distinctio culpa quis!' 
      },
      { 
        title: 'News2',
        text: 'News2 lorem ip Lorem ipsum dolor, sit amet consectetur adipisicing elit. Fugiat debitis nihil ipsa excepturi aut officia quae optio libero? Doloremque sit tenetur quam nobis obcaecati rem saepe quisquam distinctio culpa quis!' 
      },
      { 
        title: 'News3',
        text: 'News3 lorem ip Lorem ipsum dolor, sit amet consectetur adipisicing elit. Fugiat debitis nihil ipsa excepturi aut officia quae optio libero? Doloremque sit tenetur quam nobis obcaecati rem saepe quisquam distinctio culpa quis!' 
      },
    ]
  );

  useEffect(() => {
    const getNews = async () => {
        // const data = await fetchNews();
        const data = news;
        let newData = [{ title: "", text: "" }];
        data.map((data) => newData = [...newData, data]);
        setNews(newData);
    }
    getNews()
  }, [news])

  const fetchNews = async () => {
    const response = await fetch(`<link catre backend>`);
    const data = await response.json();
    
    return data;
  }

  return (
    <div className="flex items-center justify-center ">
      <div className="my-profile-page-container-without-grid-template">
        <div className="my-profile-side-bar debug">
          <div className="grid grid-rows-12">
            <div className={'messages'}>
              {
                news.length > 0 ?
                  news.map((article) => (
                    <div className="article">
                      <h4>{article.title}</h4>
                      <p>{article.text}</p>
                      <br/>
                    </div>
                  )) : "There's no news posted yet"
             }
            </div>
          </div>
        </div>
      </div>
    </div>
  )
};
