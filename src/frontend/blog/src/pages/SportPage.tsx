import Backdrop from '../components/Backdrop';
import Grid from '@mui/material/Grid';
import NewsElement from '../components/NewsElement';
import NewsType from '../shared/NewsType';
import { useEffect, useState } from 'react';
import ArticleDto from '../dtos/ArticleDto';
import API_SERVER from '../shared/consts';
const MainPage = () => {
    const [articles, setArticles] = useState<Array<ArticleDto>>([]);
    useEffect(() => {
        const getArticles = async () => {
          const articlesFromServer = await fetchArticles()
          setArticles(articlesFromServer.filter((article: ArticleDto) => article.type === NewsType.SPORT && article.is_active === true))
        }
    
        getArticles()
      }, [])
    
      // Fetch Tasks
      const fetchArticles = async () => {
        const res = await fetch(`http://${API_SERVER}/articles`)
        console.log(res);
        const data = await res.json()
    
        return data
      }
    return (
        <>
        <Backdrop>
            <Grid container spacing={2}   justifyContent="center" alignSelf="center" justifySelf="center"
                    alignItems="center" rowSpacing={2} >
                        {articles.map((article, index) => {
                            return (
                            <Grid xs={4} key={index}>
                                <NewsElement id={article.sysnews} date={article.create_date} title={article.title} category={article.type} />
                            </Grid>                
                            )
                        })}
            </Grid>
        </Backdrop>
        </>
    );
}
export default MainPage;