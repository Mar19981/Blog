import UserInfo from "../components/UserInfo"
import UserType from "../shared/UserType"

const MyAccount = () => {
    return (
        <UserInfo id={1} username={"zapierdala123"} firstName={"Twoja"} lastName={"Stara"} joinDate={new Date()} type={UserType.EDITOR}/>
    );
}
export default MyAccount;