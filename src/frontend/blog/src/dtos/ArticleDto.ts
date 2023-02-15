import NewsType from "../shared/NewsType";

interface ArticleDto {
    id: number,
    title: string,
    content: string,
    articleType: NewsType,
    isActive: boolean,
    creationDate: Date,
    updateDate: Date,
    creationUser: number,
    updateUser: number,

};

export default ArticleDto;