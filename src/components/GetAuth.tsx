import {useState, useEffect} from "react";
import {Auth} from "aws-amplify";

const GetAuth = (props: any): JSX.Element => {
    const [username, setUsername] = useState("");
    useEffect(
        () => {
            async function getUserName() {
                const temp = await Auth.currentCredentials()
                const rname = temp.accessKeyId;
                setUsername(rname)
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