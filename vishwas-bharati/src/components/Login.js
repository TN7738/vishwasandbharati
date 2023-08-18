import React, { useState } from 'react'

const Login = () => {

    const [key, setKey] = useState('');
    const [data, setData] = useState([]);
    const passKey = 'ggwp@99';

    const fetchData = async () => {
        const data = await fetch('/api/collectlist');
        const json = await data.json();
        setData(json);
    };

    const tryLogin = code => {
        if(code === 13 || code === 987065){
            if(key === passKey){
                fetchData();
            }
        }
    };

    return (
        <div className='login-wrap'>
            <div className='grid'>
                {
                    data.length === 0 &&
                    <>
                        <h3>Hi There!</h3>
                        <div className='dtls'>
                            <label>Please enter the passKey</label>
                            <input type='text' value={key} onChange={(e) => setKey(e.target.value)} onKeyUp={(e) => tryLogin(e.keyCode)} />
                            <button className='btn' onClick={() => tryLogin(987065)}>Login</button>
                        </div>
                    </>
                }
                {
                    data.length > 0 ?
                    <div className='data-wrap'>
                        {
                            data.map(invite => (
                                <div key={invite._id} className='data'>
                                    <div className='name-wrap'>
                                        <label>Name:</label>
                                        <span>{invite.name}</span>
                                    </div>
                                    <div className='guests-wrap'>
                                        <label>Guests:</label>
                                        <span>{invite.guests.join(', ')}</span>
                                    </div>
                                    <div className='rest-wrap'>
                                        <label>Restrictions:</label>
                                        <span>{invite.restrictions}</span>
                                    </div>
                                    <div className='msg-wrap'>
                                        <label>Message to the couple:</label>
                                        <span>{invite.msg}</span>
                                    </div>
                                    <div className='email-wrap'>
                                        <label>Email:</label>
                                        <span>{invite.email}</span>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                    : null
                }
            </div>
        </div>
    )
}

export default Login