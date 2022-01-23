import {useAppDispatch} from "../redux/hooks";
import {setUserName} from "../redux/userSlice";
import {Navigate} from "react-router-dom";
import GetAuth from './GetAuth';

const DoAuth = (props: any): JSX.Element => {
    const dispatch = useAppDispatch();
    dispatch(setUserName(props.username));
    return (
        <>
            <Navigate to={"/app/home"} replace={true}/>
        </>
    )
}

const Guest = (): JSX.Element => {
    return (
        <GetAuth component={DoAuth}></GetAuth>
    )
}

export default Guest