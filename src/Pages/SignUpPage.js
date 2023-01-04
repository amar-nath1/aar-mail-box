import { useRef } from "react"
import { Button, Card, Form } from "react-bootstrap"

const SignUpPage=()=>{

    const emailRef=useRef()
    const passwordRef=useRef()
    const confPasswordRef=useRef()


    const signUpSubmitHandler=async(event)=>{
        event.preventDefault()
        const enteredEmail=emailRef.current.value
        const enteredPassword=passwordRef.current.value
        const enteredConfPassword=confPasswordRef.current.value

        if(enteredPassword!==enteredConfPassword){

            alert('Passwords Do not Match')
            return
        }
        else{

            try{

            let signUpResponse=await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyD7fyunokmN90jhPObr6smc0AQ2lRjUgTQ',
            
            {

                method:'POST',
                body:JSON.stringify({

                    email:enteredEmail,
                    password:enteredPassword,
                    returnSecureToken:true

                }),
                headers:{
                    'Content-Type':'application/json'
                }
            }
            
            )

            if (!signUpResponse.ok){

                throw new Error(' Could not Sign Up Please try again')
            }

            let signUpJsonRes=await signUpResponse.json()
            console.log(signUpJsonRes.email, 'is now registered')
                }catch(error){
                alert(error.message)
                
                }
            }

    }

    return (
        <Card style={{width:'400px'}}>

        <Form onSubmit={signUpSubmitHandler} className="m-4 p-4 border border-primary">
            <h1 className="text-dark mb-4 border-bottom border-dark pb-2">Sign Up</h1>
            <Form.Group className='m-2'>
                <Form.Control type="email" placeholder="Enter Email" ref={emailRef} required></Form.Control>
            </Form.Group>

            <Form.Group className='m-2'>
                <Form.Control type="password" placeholder="Enter Password" ref={passwordRef} required></Form.Control>
            </Form.Group>

            <Form.Group className="m-2">
                <Form.Control type="password" placeholder="Confirm Password" ref={confPasswordRef} required></Form.Control>
            </Form.Group>
            <Button type='submit'>Sign Up</Button>

        </Form>
        </Card>
    )

}

export default SignUpPage