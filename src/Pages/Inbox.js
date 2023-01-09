import axios from "axios"
import { useEffect, useMemo } from "react"
import { useSelector } from "react-redux"
import {Card, Form } from "react-bootstrap"
import { mailArrActions } from "../store/mailSlice"
import { Link } from "react-router-dom"
import classes from './Inbox.module.css'
import { useDispatch } from "react-redux"
import { memo} from "react"

const Inbox = (props) => {
    

    const inboxArr=useSelector(state=>state.mailArr.allMails)
    const unreadMailCount=useSelector(state=>state.mailArr.unreadMails)
    const userAuthDetail=JSON.parse(localStorage.getItem('currUser'))
    let userEmail=userAuthDetail.email.replace(/\W/g, '')
    // const useEm=userAuthDetail.email.replace(/\W/g, '')
    
    const dispatch=useDispatch()
    const inboxShow=props.inboxShow
    if (!inboxShow){
        userEmail=`sent-by-${userEmail}`
    }
    
    const fetchInboxHandler=async(userMailBoxID)=>{
      
        try{
    
            let inbox=await axios.get(`https://aar-mail-box-default-rtdb.firebaseio.com/${userMailBoxID}.json`)
    
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
                    from:inboxShow? inbox.data[key].from:inbox.data[key].recipient,
                    newMail:inbox.data[key].newMail
                })
                if (inbox.data[key].newMail===true){
                  unreadCount+=1
                }
            }
            
        console.log(emailsArr)
            dispatch(mailArrActions.setMailArr(emailsArr))
            dispatch(mailArrActions.setUnreadMails(unreadCount))
       
        }catch(error){
            alert(error.message)
        }     
    }
    
    let revMailArr = []
    for (let i = inboxArr.length - 1; i >= 0; i--) {

        revMailArr.push(inboxArr[i])
    }
    
    
    let inboxMessages = revMailArr.map((email) => {
        
        const readMailHandler = async () => {
            
            await axios.patch(`https://aar-mail-box-default-rtdb.firebaseio.com/${userEmail}/${email.id}.json`, { newMail: false })
        }

        const deleteMailHandler = async () => {
            
           let delRes= await axios.delete(`https://aar-mail-box-default-rtdb.firebaseio.com/${userEmail}/${email.id}.json`)
            
           if (delRes.statusText==='OK'){
            fetchInboxHandler(userEmail)
            console.log('delete success')
           }
           else{
            alert('Could not delete. plz try again..')
        }
        }
        
        return <div key={email.id} className={classes.mainCard}>
            
        <div className={classes.card} >
        <Link  className={classes.cardElements} to={`${email.id}`}> 
           
            <Card.Body className={`d-flex justify-content-between`} onClick={readMailHandler}>
            {inboxShow &&  <Form.Check
                    checked={email.newMail}
                    readOnly
                    type='checkbox'
                    id={`${email.id}_read`}
                />}
                <Card.Subtitle>{email.emailSubject}</Card.Subtitle>
                <p >{inboxShow?'from:- ':'To:- '} {email.from}</p>
                <Card.Text>{`${email.sentAt}`}</Card.Text>
            </Card.Body>
            </Link>
            </div>
            
            <button type='button' className='btn btn-outline-danger ms-2' onClick={deleteMailHandler}>X</button>
            </div>
              
    })
    
   
    useEffect(()=>{
      
      fetchInboxHandler(userEmail)
        
        
    },[inboxShow,unreadMailCount])

    return (
        <div className="mt-4">
            {inboxMessages}
        </div>
    )
}

export default memo(Inbox)