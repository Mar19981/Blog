interface CommentDto {
    syscomment: number,
    text: string,
    is_active: boolean,
    create_date: Date,
    update_date: Date | null,
    sysuser: number,
    sysnews: number,

};

export default CommentDto;