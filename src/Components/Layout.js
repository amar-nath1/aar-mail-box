import { NavLink } from "react-router-dom"
import classes from './Layout.module.css'
import { useSelector } from "react-redux"
const Layout=(props)=>{

    const authUser=useSelector(state=>state.auth.authenticated)

    const logoutHandler=()=>{
        localStorage.removeItem('currUser')
    }

    return (
<>
        <header className={classes.header}>
            <div className={classes.logo}>Welcome to Mail Box Client</div>
            <nav className={classes.nav}>
                {authUser &&
                <ul>
                <li><NavLink to='/homepage' >Home</NavLink></li>
                <li><NavLink to='/login'  onClick={logoutHandler}>Log Out</NavLink></li>
                    
                </ul>}
            </nav>
        </header>
        <main className={classes.main}>{props.children}</main>
        </>
    )

}

export default Layout