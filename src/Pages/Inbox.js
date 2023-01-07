import axios from "axios"
import { memo } from "react"

import { Card, Form } from "react-bootstrap"

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

        return <Link key={email.id} className={classes.cardElements} to={`${email.id}`}> <Card style={{ height: 'auto' }} className={classes.card} onClick={readMailHandler}>
            <Card.Body className={`d-flex justify-content-between`}>
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
        </Card>
        </Link>
    })

    return (
        <div className="mt-4">
            {inboxMessages}
        </div>
    )
}

export default memo(Inbox)