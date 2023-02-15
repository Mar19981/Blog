import UserType from "../shared/UserType";

interface UserDto {
    id: number,
    userName: string,
    firstName: string,
    lastName: string,
    password: string,
    userType: UserType,
    email: string,
    isActive: boolean,
    joinDate: Date
};

export default UserDto;