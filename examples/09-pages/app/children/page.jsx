import { UserInfo } from "./UserInfo";
import { Welcome } from "./Welcome";

export default function WelcomePage() {
    // jsx
    return <>
            <Welcome appName='ConfPlus' year='2023' >
                <p>Conf dates: 14 to 18 April 2023</p>
            </Welcome>
            <UserInfo firstName='Fatima' lastName = 'Ali' />
        </>
}