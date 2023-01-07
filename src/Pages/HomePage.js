import { useState,useEffect, useMemo, memo } from "react"
import { useDispatch } from "react-redux"
import { mailArrActions } from "../store/mailSlice"
import { Button, Container } from "react-bootstrap"
import Compose from "../Components/Compose"
import { useSelector } from "react-redux"
import Inbox from "./Inbox"
import axios from 'axios';
import { useNavigate } from "react-router-dom"

const HomePage=()=>{
    const navigate=useNavigate()

   const inboxArr=useSelector(state=>state.mailArr.allMails)
    

    // Unread Mail Count
    const [unreadMailCount,setUnreadMailCount]=useState(0)
    const [showCompose,setShowCompose]=useState(false)
    
    const showComposeHandler=()=>{
        setShowCompose(!showCompose)
    }

    const showInboxHandler=()=>{
        navigate('/homepage')
    }

    const dispatch=useDispatch()
    const userAuthDetail=JSON.parse(localStorage.getItem('currUser'))

    const fetchInboxHandler=async()=>{
      const userEmail=userAuthDetail.email.replace(/\W/g, '')
      try{
  
          let inbox=await axios.get(`https://aar-mail-box-default-rtdb.firebaseio.com/${userEmail}.json`)
  
          if (inbox.statusText!=='OK'){
              throw new Error('Could not load the Inbox mail Try again')
            
          }
          let unreadCount =0
          const emailsArr = []
          for (let key in inbox.data){
              emailsArr.push({
                  id:key,
                  emailSubject:inbox.data[key].emailSubject,
                  emailBody:inbox.data[key].emailBody,
                  sentAt:inbox.data[key].sentAt,
                  from:inbox.data[key].from,
                  newMail:inbox.data[key].newMail
              })
              if (inbox.data[key].newMail===true){
                unreadCount+=1
              }
          }
          setUnreadMailCount(unreadCount)
          dispatch(mailArrActions.setMailArr(emailsArr))
          
      }catch(error){
          alert(error.message)
      }     
  }

  
  useEffect(()=>{
      fetchInboxHandler()
      
  },[])
 
  
    return (
        <Container>
            <div className="d-flex justify-content-around">
        <Button onClick={showComposeHandler} variant='warning'>{showCompose?'Close Compose':'Compose Mail'}</Button>
        <Button onClick={showInboxHandler} variant='danger'>Inbox <span className="ms-1 bg-primary p-2 rounded-pill">{unreadMailCount}</span></Button>
        <Button variant='success'>Sent Items</Button></div>
        { showCompose && <Compose showCompose={showComposeHandler}></Compose>}
        {!showCompose && <Inbox inboxArray={inboxArr} handleFetch={fetchInboxHandler}></Inbox>}
        </Container>
    )

}

export default memo(HomePage)