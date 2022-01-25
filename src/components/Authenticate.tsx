import {useAppDispatch} from "../redux/hooks";
import {authenticated, setUserName} from "../redux/userSlice";
import {Navigate} from "react-router-dom";
import {Authenticator} from "@aws-amplify/ui-react";
import GetAuth from './GetAuth';

const DoAuth = (props: any): JSX.Element => {
    const dispatch = useAppDispatch();
    dispatch(authenticated());
    dispatch(setUserName(props.username));
    return (
        <Navigate to={"/app/home"} replace={true}/>
    )
}

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