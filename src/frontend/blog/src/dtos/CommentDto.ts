interface CommentDto {
    id: number,
    content: string,
    isActive: boolean,
    creationDate: Date,
    updateDate: Date,
    user: number,
    article: number,

};

export default CommentDto;