import NewsType from "../shared/NewsType";

interface ArticleDto {
    sysnews: number,
    title: string,
    text: string,
    type: NewsType,
    is_active: boolean,
    create_date: Date,
    update_date: Date,
    create_sysuser: number,
    update_sysuser: number,

};

export default ArticleDto;