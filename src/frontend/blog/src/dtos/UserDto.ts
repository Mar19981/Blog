import UserType from "../shared/UserType";

interface UserDto {
    sysuser: number,
    username: string,
    name: string,
    surname: string,
    password: string,
    type: UserType,
    email: string,
    is_active: boolean,
    create_date: Date
};

export default UserDto;