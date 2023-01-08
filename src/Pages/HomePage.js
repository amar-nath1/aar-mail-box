import { useState,useEffect, memo } from "react"
import { useDispatch } from "react-redux"

import { Button, Container } from "react-bootstrap"
import Compose from "../Components/Compose"
import { useSelector } from "react-redux"
import Inbox from "./Inbox"


import { showInboxActions } from "../store/mailSlice"
import { useNavigate } from "react-router-dom"

const HomePage=()=>{
    const navigate=useNavigate()
    const inboxShow=useSelector(state=>state.mailArr.inbox)
    
   
    const dispatch=useDispatch()
    // Unread Mail Count
    const [unreadMailCount,setUnreadMailCount]=useState(0)
    const [showCompose,setShowCompose]=useState(false)
    
    const showComposeHandler=()=>{
        setShowCompose(!showCompose)
    }

    const showInboxHandler=()=>{
        dispatch(showInboxActions.setInboxShow(true))
        if(showCompose){
            setShowCompose(false)
        }
    }
    
  const showSentBoxHandler=()=>{
    dispatch(showInboxActions.setInboxShow(false))
if(showCompose){
    setShowCompose(false)
}

  }
 
 const childDataHandler=(unreadCount)=>{
    setUnreadMailCount(unreadCount)
 }
 
  let showText='Inbox'
  if(!inboxShow){
    showText='Sent Mails'
  }
  else if (showCompose){
    showText='Compose Mail'
  }
    return (
        <Container>
            <div className="d-flex justify-content-around ">
        <Button onClick={showComposeHandler} variant='warning'>{showCompose?'Close Compose':'Compose Mail'}</Button>
        <Button onClick={showInboxHandler} variant='danger'>Inbox {inboxShow && <span className="ms-1 bg-primary p-2 rounded-pill">{unreadMailCount}</span>}</Button>
        <Button variant='success' onClick={showSentBoxHandler}>Sent Items</Button></div>
        <h3 className='border-bottom border-dark p-3'>{showText}</h3>
        { showCompose && <Compose showCompose={showComposeHandler}></Compose>}
        {!showCompose && <Inbox  inboxShow={inboxShow} childDataHandler={childDataHandler}></Inbox>}
        
        </Container>
    )

}

export default HomePage