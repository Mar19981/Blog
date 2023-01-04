import UserType from "../shared/UserType";

interface RegisterDto {
    userName: string,
    firstName: string,
    lastName: string,
    password: string,
    userType: UserType,
    email: string
};

export default RegisterDto;