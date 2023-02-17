import NewsType from "../shared/NewsType";

interface CreateArticleDto {
    title: string,
    text: string,
    type: NewsType,
    create_sysuser: number,

};

export default CreateArticleDto;