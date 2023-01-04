import { useRef } from "react"
import { Button, Card, Form } from "react-bootstrap"
import { Link, Navigate, useNavigate } from "react-router-dom"

const LoginPage=()=>{

    const navigate=useNavigate()
    const emailRef=useRef()
    const passwordRef=useRef()
    
    const loginSubmitHandler=async(event)=>{
        event.preventDefault()
        const enteredEmail=emailRef.current.value
        const enteredPassword=passwordRef.current.value
        
            try{

            let loginResponse=await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyD7fyunokmN90jhPObr6smc0AQ2lRjUgTQ',
            
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

            if (!loginResponse.ok){

                let a=await loginResponse.json()
                throw new Error (a.error.message)
            }

            let loginJsonRes=await loginResponse.json()
            console.log(loginJsonRes.email, 'is Logged In successfully')
            localStorage.setItem('currUser',JSON.stringify({token:loginJsonRes.idToken,email:loginJsonRes.email}))
            navigate('/homepage')
                }catch(error){
                
                alert(error)
                }
    }

    return (

        <div  style={{backgroundImage:'url(/images/signupback.jpg)'}}>

        <Card className="ms-4" style={{width:'400px'}}>

        <Form onSubmit={loginSubmitHandler} className="m-4 p-4 border border-primary">
            <h1 className="text-dark mb-4 border-bottom border-dark pb-2">Login</h1>
            <Form.Group className='m-2'>
                <Form.Control type="email" placeholder="Enter Email" ref={emailRef} required></Form.Control>
            </Form.Group>

            <Form.Group className='m-2'>
                <Form.Control type="password" placeholder="Enter Password" ref={passwordRef} required></Form.Control>
            </Form.Group>

           
            <Button type='submit'>Login</Button>

        </Form>
        <p className="ms-4">Don't Have an account? <Link to='/signup'>Sign Up</Link></p>
        </Card>
        </div>
    )

}

export default LoginPage