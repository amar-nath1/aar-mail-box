import { useState } from "react"
import { Button, Container } from "react-bootstrap"
import Compose from "../Components/Compose"

const HomePage=()=>{

    const [showCompose,setShowCompose]=useState(false)

    const showComposeHandler=()=>{

        setShowCompose(!showCompose)
    }

    return (
        <Container><h1>Welcome to Mail Box Client Project</h1>
        <Button onClick={showComposeHandler} variant='warning'>{showCompose?'Close Compose':'Compose Mail'}</Button>
        { showCompose && <Compose showCompose={showComposeHandler}></Compose>}
        </Container>
    )

}

export default HomePage