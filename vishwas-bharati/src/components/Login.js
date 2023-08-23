/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import * as xlsx from 'xlsx';

const Login = () => {

    const [key, setKey] = useState('');
    const [data, setData] = useState([]);
    const [dataCopy, setDataCopy] = useState([]);
    const [searchText, setSearchText] = useState('');
    const [uploadData, setUploadData] = useState([]);
    const [isFileUploaded, setIsFileUploaded] = useState(false);
    const passKey = 'ggwp@99';

    const fetchData = async () => {
        const data = await fetch('/api/collectlist');
        const json = await data.json();
        setData(json);
        setDataCopy(json);
    };

    const tryLogin = code => {
        if(code === 13 || code === 987065){
            if(key === passKey){
                fetchData();
            }
        }
    };

    const readUploadFile = (e) => {
        e.preventDefault();
        if (e.target.files) {
            if(e.target.files[0].type === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"){
                const reader = new FileReader();
                reader.onload = (e) => {
                    const data = e.target.result;
                    const workbook = xlsx.read(data, { type: "array" });
                    const sheetName = workbook.SheetNames[0];
                    const worksheet = workbook.Sheets[sheetName];
                    const json = xlsx.utils.sheet_to_json(worksheet);
                    json.forEach(data => {
                        if(data.guests){
                            if(data.guests.indexOf(',') !== -1){
                                data.guests = data.guests.split(',');
                            }
                            else{
                                data.guests = [data.guests];
                            }
                        }
                    });
                    setUploadData(json);
                    if(json.length > 0){
                        setIsFileUploaded(true);
                    }
                };
                reader.readAsArrayBuffer(e.target.files[0]);
            }
        }
    };
    const createInvite = () => {
        if(isFileUploaded){
            let successArr = [];
            uploadData.forEach(async(upload) => {
                const reqData = {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ 
                        name: upload.name,
                        email: upload.email,
                        restrictions: upload.restrictions,
                        msg: upload.msg,
                        guests: upload.guests
                    })
                };
                const response = await fetch('/api/collectlist/', reqData);
                const { status } = response;
                if(status === 200){
                    successArr.push(status);
                }
                else{
                    successArr.push(400);
                }
            });
            if(!successArr.includes(400)){
                setData([]);
                fetchData();
            }
        }
    };

    const handleOnDeleteClick = async (inviteId) => {
        const response = await fetch('/api/collectlist/' + inviteId, { method: 'DELETE' });
        const { status } = response;
        if(status === 204){
            setData([]);
            fetchData();
        }
    };

    const filterSearch = () => {
        const newData = dataCopy.filter(invite => {
            if(invite.name.toLowerCase().includes(searchText.toLowerCase())){
                return invite;
            }
        });
        setData(newData);
    }

    useEffect(() => {
        createInvite();
    }, [isFileUploaded]);

    useEffect(() => {
        filterSearch();
    }, [searchText]);

    return (
        <div className='login-wrap'>
            <div className='grid'>
                {
                    data.length === 0 &&
                    <>
                        <h3>Hi There!</h3>
                        <div className='dtls'>
                            <label>Please enter the passKey</label>
                            <input type='password' value={key} onChange={(e) => setKey(e.target.value)} onKeyUp={(e) => tryLogin(e.keyCode)} />
                            <button className='btn' onClick={() => tryLogin(987065)}>Login</button>
                        </div>
                    </>
                }
                {
                    data.length > 0 ?
                    <div className='data-wrap'>
                        <div className='upload'>
                            <div className='wrap'>
                                <label htmlFor="upload"><img width="30" height="30" src="https://img.icons8.com/nolan/64/add.png" alt="add" /></label>
                                <input
                                    type="file"
                                    name="upload"
                                    id="upload"
                                    onChange={readUploadFile}
                                />
                            </div>
                        </div>
                        <div className='search'>
                            <input type='text' value={searchText} onChange={(e) => setSearchText(e.target.value)} placeholder='Search'></input>
                        </div>
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
                                    <button className='dlt-btn' onClick={() => handleOnDeleteClick(invite._id)}><img width="25" height="25" src="https://img.icons8.com/cute-clipart/64/filled-trash.png" alt="filled-trash"/></button>
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