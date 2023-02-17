import UserInfo from "../components/UserInfo"
import UserDto from "../dtos/UserDto";
import {Navigate} from "react-router-dom";
import LoggedInDto from "../dtos/LoggedInDto";
interface MyAccountProps {
    u: LoggedInDto | null
}
const MyAccount = ({u}: MyAccountProps) => {
    if (u === null) {
        return (<Navigate to="/"></Navigate>)
    }
    return (
        <UserInfo id={u.id}/>
    );
}
export default MyAccount;