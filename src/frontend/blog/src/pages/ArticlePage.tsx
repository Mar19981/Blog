import Backdrop from '../components/Backdrop';
import Stack from '@mui/material/Stack';
import Typography from "@mui/material/Typography";
import Comment from "../components/Comment";
import CommentForm from "../components/CommentForm";
import { useParams } from 'react-router';
import LoggedInDto from '../dtos/LoggedInDto';
import API_SERVER from '../shared/consts';
import { useEffect, useState } from 'react';
import ArticleDto from '../dtos/ArticleDto';
import UserDto from '../dtos/UserDto';
import CommentDto from '../dtos/CommentDto';
import { Link } from "react-router-dom";

interface ArticlePageProps {
    user: LoggedInDto | null
}

const ArticlePage = ({user}: ArticlePageProps) => {
    const { id } = useParams();
    const [article, setArticle] = useState<ArticleDto|any>({});
    const [cuser, setUser] = useState<Array<UserDto>>([]);
    const [comments, setComments] = useState<Array<CommentDto>>([]);
    useEffect(() => {
        const getArticles = async () => {
            const userFromServer = await fetchUsers();
            setUser(userFromServer);
            const articlesFromServer = await fetchArticles()
            setArticle(articlesFromServer);
            try {
                const commentsFromServer = await fetchComments(articlesFromServer.sysnews);
                console.log(commentsFromServer)
                setComments(Array.isArray(commentsFromServer) ? commentsFromServer : []);
            } catch(err) {
                setComments([]);
            }
        }
    
        getArticles()
      }, [])
    
      // Fetch Tasks
      const fetchArticles = async () => {
        const res = await fetch(`http://${API_SERVER}/article/${id}`)
        console.log(res);
        const data = await res.json()
    
        return data
      }      
      const fetchUsers = async () => {
        const res = await fetch(`http://${API_SERVER}/users`)
        console.log(res);
        const data = await res.json()
    
        return data
      }      
      const fetchComments = async (aid: number) => {
        const res = await fetch(`http://${API_SERVER}/article/${aid}/comments`)
        console.log(res);
        const data = await res.json()
    
        return data
      }
      const editor = user !== null && user.id === article.sysuser;
    return (
        <>
        <Backdrop>
            <Stack spacing={5}>
                <Stack direction={"row"} spacing={2} justifyContent="space-between">
                    <Typography variant="body2">{`${new Date(article.create_date).toLocaleDateString()}${article.update_date === null ? "" : "(Aktualizacja: " + (new Date(article.update_date).toLocaleDateString()) + ")"}`}</Typography>
                    {editor &&
                        <Link to={`/news/${id}/edit`} style={{color:"#D6D6D6", textDecoration: "none"}}>Edytuj</Link> 
                        }
                </Stack>
                <Typography variant="h2">{article.title}</Typography>            
                <Typography variant="body1">{article.text}</Typography>            
            <Backdrop>
                <Stack spacing={5} alignItems="center">
                <Typography variant="h5" alignSelf="flex-start">Komentarze</Typography>
                {user !== null && <CommentForm userId={user.id} articleId={Number(id)} setComment={setComments}></CommentForm>}
                <Stack width="100%" alignItems="center"  justifyContent={"center"} spacing={2}>
                    {comments.map((comment, index) => {
                            return (<Comment key={index} id={comment.syscomment} text={comment.text} author={cuser[comment.sysuser - 1].username} date={comment.create_date} active={comment.is_active} editable={user !== null ? user.id === comment.sysuser : false} comment={comment} setComment={setComments}/>);
                        })}
                </Stack>
                </Stack>
                </Backdrop>
            </Stack>
        </Backdrop>
        </>
    );
}
export default ArticlePage;