import { useEffect, useState } from "react"

import { Button, Container } from "react-bootstrap"
import Compose from "../Components/Compose"
import axios from 'axios'
import Inbox from "./Inbox"

const HomePage=()=>{

    const userAuthDetail=JSON.parse(localStorage.getItem('currUser'))
    const userEmail=userAuthDetail.email.replace(/\W/g, '')
    const [showCompose,setShowCompose]=useState(false)
    const [inboxArr,setInboxArr]=useState([])
    

    const showComposeHandler=()=>{

        setShowCompose(!showCompose)
        
    }

    const showInboxHandler=async()=>{
        try{

            let inbox=await axios.get(`https://aar-mail-box-default-rtdb.firebaseio.com/${userEmail}.json`)

            if (inbox.statusText!=='OK'){
                throw new Error('Could not load the Inbox mail Try again')
                
            }
            const emailsArr = []
            for (let key in inbox.data){
                emailsArr.push({
                    id:key,
                    emailSubject:inbox.data[key].emailSubject,
                    emailBody:inbox.data[key].emailBody,
                    sentAt:inbox.data[key].sentAt,
                    from:inbox.data[key].from
                })
            }
            setInboxArr(emailsArr)
            

        }catch(error){
            alert(error.message)
        }     
    }

    useEffect(()=>{
        showInboxHandler()

    },[])

    return (
        <Container><h1>Welcome to Mail Box Client Project</h1>
        <Button onClick={showComposeHandler} variant='warning'>{showCompose?'Close Compose':'Compose Mail'}</Button>
        <Button onClick={showInboxHandler} variant='danger'>Inbox</Button>
        { showCompose && <Compose showCompose={showComposeHandler}></Compose>}
        <Inbox inboxArray={inboxArr}></Inbox>
        </Container>
    )

}

export default HomePage