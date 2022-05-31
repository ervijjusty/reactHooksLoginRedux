import React, { useEffect,useState,useRef } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { userActions } from '../_actions';

function HomePage() {
    const users = useSelector(state => state.users);
    const user = useSelector(state => state.authentication.user);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(userActions.getAll());
    }, []);

    function handleDeleteUser(id) {
        dispatch(userActions.delete(id));
    }


    const [email, setEmail] = useState("")
     const [password, setPassword] = useState("")

     const inputRef = useRef()
     useEffect(() => {
     inputRef.current.focus();
     })
    

    return (
        <div className="col-lg-8 offset-lg-2">

            <h1>Hi {user.firstName}!</h1>
            <p>You're logged in with React Hooks!!</p>
            <h3>All registered users:</h3>

       <form>
 <input type = "email" value = {email} onChange = {text => setEmail(text)} />
 <input type = "password" value = {password} onChange = {text => setPassword(text)} />
 <button type = "submit">Login</button>
 </form>


            {users.loading && <em>Loading users...</em>}
            {users.error && <span className="text-danger">ERROR: {users.error}</span>}
            {users.items &&
                <ul>
                    {users.items.map((user, index) =>
                        <li key={user.id}>
                            {user.firstName + ' ' + user.lastName}
                            {
                                user.deleting ? <em> - Deleting...</em>
                                : user.deleteError ? <span className="text-danger"> - ERROR: {user.deleteError}</span>
                                : <span> - <a onClick={() => handleDeleteUser(user.id)} className="text-primary">Delete</a></span>
                            }
                        </li>
                    )}
                </ul>
            }
            <p>
                <Link to="/login">Logout</Link>
            </p>
        </div>
    );
}

export { HomePage };