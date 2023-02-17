import UserType from "../shared/UserType";

interface LoggedInDto {
    username: string,
    type: UserType,
    id: number
};

export default LoggedInDto;