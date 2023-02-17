import NewsType from "../shared/NewsType";

interface EditArticleDto {
    title: string,
    text: string,
    type: NewsType,
    update_sysuser: number,

};

export default EditArticleDto;