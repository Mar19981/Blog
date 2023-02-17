import UserInfo from "../components/UserInfo"
import UserDto from "../dtos/UserDto";
import {Navigate, useParams} from "react-router-dom";
import LoggedInDto from "../dtos/LoggedInDto";
const DisplayAccount = () => {
    const {id} = useParams();
    return (
        <UserInfo id={Number(id)}/>
    );
}
export default DisplayAccount;