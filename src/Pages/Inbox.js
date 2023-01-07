import axios from "axios"
import { memo } from "react"

import {Card, Form } from "react-bootstrap"

import { Link } from "react-router-dom"
import classes from './Inbox.module.css'


const Inbox = (props) => {
    
    
    let revMailArr = []
    for (let i = props.inboxArray.length - 1; i >= 0; i--) {

        revMailArr.push(props.inboxArray[i])
    }


    let inboxMessages = revMailArr.map((email) => {
        const userAuthDetail = JSON.parse(localStorage.getItem('currUser'))
        const readMailHandler = async () => {
            const userEmail = userAuthDetail.email.replace(/\W/g, '')
            await axios.patch(`https://aar-mail-box-default-rtdb.firebaseio.com/${userEmail}/${email.id}.json`, { newMail: false })
        }

        const deleteMailHandler = async () => {
            const userEmail = userAuthDetail.email.replace(/\W/g, '')
           let delRes= await axios.delete(`https://aar-mail-box-default-rtdb.firebaseio.com/${userEmail}/${email.id}.json`)
            
           if (delRes.statusText==='OK'){
            props.handleFetch()
            console.log('delete success')
           }
           else{
            alert('Could not delete. plz try again..')
        }
        }
        

        return <div key={email.id} className={classes.mainCard}>
        <Card className={classes.card} >
        <Link  className={classes.cardElements} to={`${email.id}`}> 
        
            
            <Card.Body className={`d-flex justify-content-between`} onClick={readMailHandler}>
                <Form.Check
                    checked={email.newMail}
                    readOnly
                    type='checkbox'
                    id={`${email.id}_read`}
                />
                <Card.Subtitle>{email.emailSubject}</Card.Subtitle>
                <p>from:- {email.from}</p>
                <Card.Text>{`${email.sentAt}`}</Card.Text>
            </Card.Body>
            </Link>
            </Card>
            <button type='button' className='btn btn-outline-danger mt-3 h-50' onClick={deleteMailHandler}>X</button>
            </div>
            
            
        
        
    })

    return (
        <div className="mt-4">
            {inboxMessages}
        </div>
    )
}

export default memo(Inbox)