import UserType from "../shared/UserType";

interface RegisterDto {
    username: string,
    name: string,
    surname: string,
    password: string,
    type: UserType,
    email: string
};

export default RegisterDto;