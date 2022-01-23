import {useAppDispatch} from "../redux/hooks";
import {authenticated, setUserName} from "../redux/userSlice";
import {Navigate} from "react-router-dom";
import {Authenticator} from "@aws-amplify/ui-react";
import * as React from "react";

const DoAuth = (props: any): JSX.Element => {
    const dispatch = useAppDispatch();
    dispatch(authenticated());
    dispatch(setUserName(props.user.username));
    return (
        <Navigate to={"/app/home"} replace={true}/>
    )
}

//todo fix UI styling
//todo fix sign out button doesn't disappear/appear after logging out unless page is refreshed
const Authenticate = (): JSX.Element => {
    return (
        <Authenticator variation="modal">
            {({signOut, user}) => <DoAuth user={user} signOut={signOut}/>}
        </Authenticator>
    )
}

export default Authenticate