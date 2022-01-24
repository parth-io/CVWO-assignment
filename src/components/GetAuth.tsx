import {useState, useEffect} from "react";
import {Auth} from "aws-amplify";

const GetAuth = (props: any): JSX.Element => {
    const [username, setUsername] = useState("");
    useEffect(
        () => {
            async function getUserName() {
                const temp = await Auth.currentCredentials();
                // console.log(temp)
                setUsername(temp.identityId);
            }
            getUserName()
        }, []
    )
    if (username === "") {
        return <></>
    }
    else {
        return (
            <props.component username={username} />
        )
    }
}

export default GetAuth