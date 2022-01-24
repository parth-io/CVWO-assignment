import {useAppDispatch, useAppSelector} from "../redux/hooks";
import {authenticated, selectUserName, setUserName} from "../redux/userSlice";
import {Navigate} from "react-router-dom";
import {Authenticator} from "@aws-amplify/ui-react";
import GetAuth from './GetAuth';

const DoAuth = (props: any): JSX.Element => {
    const dispatch = useAppDispatch();
    dispatch(authenticated());
    dispatch(setUserName(props.username));
    // console.log(props.username)
    // console.log("Next")
    // const userName = useAppSelector(selectUserName);
    // console.log(userName)
    // console.log("Done")
    return (
        <Navigate to={"/app/home"} replace={true}/>
    )
}

//todo fix UI styling
//todo fix sign out button doesn't disappear/appear after logging out unless page is refreshed
const Authenticate = (): JSX.Element => {
    return (
        <Authenticator variation="modal">
            {({signOut, user}) => {
                return <GetAuth component={DoAuth}></GetAuth>
            }}
        </Authenticator>
    )
}

export default Authenticate