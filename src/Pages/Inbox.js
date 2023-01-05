import { Card } from "react-bootstrap"

const Inbox=(props)=>{

    let inboxMessages=props.inboxArray.map((email)=>{
        

        return <Card key={email.id} style={{height:'50px'}}>
            <Card.Body className='d-flex justify-content-between'>
            <Card.Subtitle>{email.emailSubject}</Card.Subtitle>
            <div dangerouslySetInnerHTML={{__html: email.emailBody}}></div>
                <Card.Text>{email.sentAt}</Card.Text>
                
            </Card.Body>
        </Card>

    })
    


    return(
<div className="mt-4">
        {inboxMessages}

        </div>

    )


}

export default Inbox