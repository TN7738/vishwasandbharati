import React, { useState } from 'react';
import '../styles/style.scss';
import LoadingBar from 'react-top-loading-bar';

const Rsvp = () => {

    const [fullName, setFullName] = useState('');
    const [progress, setProgress] = useState(25);
    const [selectedInvite, setSelectedInvite] = useState({});
    const [inputFields, setInputFields] = useState([]);
    const [hidePart1, setHidePart1] = useState(false);
    const [showFinalMsg, setShowFinalMsg] = useState(false);
    const [newInvite, setNewInvite] = useState({
        email: '',
        msg: '',
        restrictions: ''
    });
    const [inviteStep, setInviteStep] = useState(0);

    const setDetails = (index, event) => {
        let data = [...inputFields];
        data[index] = event.target.value;
        setInputFields(data);
    };

    const addFields = () => {
        let newfield = '';
        setInputFields([...inputFields, newfield]);
    };

    const removeFields = (index) => {
        let data = [...inputFields];
        data.splice(index, 1);
        setInputFields(data);
    };

    const fetchDetails = async () => {
        const data = await fetch('/api/collectlist');
        const json = await data.json();
        const slctInv = json.filter(entry => {
            return entry.name.toLocaleLowerCase() === fullName.toLocaleLowerCase();
        });
        if(slctInv.length > 0) {
            setSelectedInvite(slctInv[0]);
            setInputFields(slctInv[0].guests);
            setProgress(75);
            setHidePart1(true);
        }
        else{
            setInviteStep(1);
            addFields();
            setProgress(40);
            setHidePart1(true);
        }
    };

    const handleOnClick = () => {
        if(fullName.trim().toLocaleLowerCase().length > 0){
            fetchDetails();
        }
    };

    const handleOnKeyUp = (evt) => {
        if(evt.keyCode === 13){
            if(fullName.trim().toLocaleLowerCase().length > 0){
                fetchDetails();
            }
        }
    };

    const editData = async () => {
        const nonEmptyGuestList = inputFields.filter(str => str);
        const reqData = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                name: selectedInvite.name,
                email: selectedInvite.email,
                restrictions: selectedInvite.restrictions,
                msg: selectedInvite.msg,
                guests: nonEmptyGuestList
            })
        };
        const response = await fetch('/api/collectlist/' + selectedInvite._id, reqData);
        const { status } = response;
        if(status === 200){
            setProgress(100);
            setSelectedInvite([]);
            setShowFinalMsg(true);
            setTimeout(() => {
                window.location.href ='/';
            }, 2500);
        }
    };

    const handleContinueFromSteps = () => {
        setInviteStep(currStep => currStep += 1);
        setProgress(currProgress => currProgress += 15);
    };

    const createInvite = async () => {
        const nonEmptyGuestList = inputFields.filter(str => str);
        const reqData = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                name: fullName,
                email: newInvite.email,
                restrictions: newInvite.restrictions,
                msg: newInvite.msg,
                guests: nonEmptyGuestList
            })
        };
        const response = await fetch('/api/collectlist/', reqData);
        const { status } = response;
        if(status === 200){
            setProgress(100);
            setNewInvite([]);
            setShowFinalMsg(true);
            setTimeout(() => {
                window.location.href ='/';
            }, 2500);
        }
    };

    return (
        <div className='rsvp-wrap'>
            <LoadingBar
                color='#C029FF'
                progress={progress}
                containerStyle={{top: '115px'}}
                shadow={false}
                onLoaderFinished={() => setProgress(100)}
            />
            <div className='grid'>
                {
                    !hidePart1 ? 
                    <div className='part1'>
                        <h2>Vishwas & Bharati's Wedding</h2>
                        <p>If you're responding for you and a guest (or your family), <br/> you'll be able to RSVP for your entire group.</p>
                        <input type='text' placeholder='Enter your full name' value={fullName} onKeyUp={(e) => handleOnKeyUp(e)} onChange={(e) => setFullName(e.target.value)}></input>
                        <button className='btn' onClick={() => handleOnClick()}>Find your invitation</button>
                    </div> : null
                }
                {
                    hidePart1 && !showFinalMsg &&
                    <div className='part2'>
                        {
                            selectedInvite._id !== undefined ?  (
                                <div className='rsvp-form-wrapper'>
                                    <div className='edit-inv-wrap'>
                                        <h3>Here's your invite details</h3>
                                        <p className='name data-wrap'>
                                            <label htmlFor="name">Name:</label>
                                            <input type='text' name='name' id='name' value={selectedInvite.name} onChange={(e) => setSelectedInvite(currInv => ({...currInv, name: e.target.value}))} />
                                        </p>
                                        <p className='restctn data-wrap'>
                                            <label htmlFor="restrictions">Diet Restrictions:</label>
                                            <textarea rows="3" cols="10" className='text-area' name="restrictions" id="restrictions" value={selectedInvite.restrictions} onChange={(e) => setSelectedInvite(currInv => ({...currInv, restrictions: e.target.value}))}></textarea>
                                        </p>
                                        <p className='msg data-wrap'>
                                            <label htmlFor="msg">Note to the couple:</label>
                                            <textarea rows="3" cols="10" className='text-area' name="msg" id="msg" value={selectedInvite.msg} onChange={(e) => setSelectedInvite(currInv => ({...currInv, msg: e.target.value}))}></textarea>
                                        </p>
                                        <p className='email data-wrap'>
                                            <label htmlFor="email">Email:</label>
                                            <input type='text' email='email' id='email' value={selectedInvite.email} onChange={(e) => setSelectedInvite(currInv => ({...currInv, email: e.target.value}))} />
                                        </p>
                                        <div className='guests data-wrap'>
                                            <label htmlFor='guests'>Guests:</label>
                                            <div className='guests-input'>
                                                {
                                                    inputFields.map((input, i) => <div key={i} className='guest-wrap'><input value={input} onChange={(e) => setDetails(i, e)} /> <button onClick={() => removeFields(i)}><img width="18" height="18" src="https://img.icons8.com/nolan/64/delete-sign.png" alt="delete-sign"/></button></div>)
                                                }
                                                <button onClick={() => addFields()} className='add-btn'><img width="30" height="30" src="https://img.icons8.com/nolan/64/add.png" alt="add"/></button>
                                            </div>
                                        </div>
                                        <button className='btn' onClick={() => editData()}>Submit</button>
                                    </div>
                                    <div className='rsvp-bg'>
                                        <img src='rsvp-bg.png' alt='flower' />
                                    </div>            
                                </div>    
                            ) : (
                                <div className='new-inv-wrap'>
                                    {
                                        inviteStep === 1 ? 
                                        <div className='step1'>
                                            <h3>Great! <br/> Who's coming from your household?</h3>
                                            <div className='guests data-wrap'>
                                                <label htmlFor='guests'>Guests:</label>
                                                <div>
                                                    {
                                                        inputFields.map((input, i) => <div key={i} className='guest-wrap'><input value={input} onChange={(e) => setDetails(i, e)} /> <button onClick={() => removeFields(i)}><img width="18" height="18" src="https://img.icons8.com/nolan/64/delete-sign.png" alt="delete-sign"/></button></div>)
                                                    }
                                                    <button onClick={() => addFields()} className='add-btn'><img width="30" height="30" src="https://img.icons8.com/nolan/64/add.png" alt="add"/></button>
                                                </div>
                                            </div>
                                            <button className='btn' onClick={() => handleContinueFromSteps()}>Continue</button>
                                        </div> 
                                        : null
                                    }
                                    {
                                        inviteStep === 2 ?
                                        <div className='step2'>
                                            <h3>Do you have any dietary restrictions?</h3>
                                            <div className='restr data-wrap'>
                                                <label htmlFor="restrictions">Diet Restrictions:</label>
                                                <textarea rows="3" cols="10" className='text-area' name="restrictions" id="restrictions" value={newInvite.restrictions} onChange={(e) => setNewInvite(currInv => ({...currInv, restrictions: e.target.value}))}></textarea>
                                            </div>
                                            <button className='btn' onClick={() => handleContinueFromSteps()}>Continue</button>
                                        </div>
                                        : null
                                    }
                                    {
                                        inviteStep === 3 ?
                                        <div className='step3'>
                                            <h3>Send a note to the couple?</h3>
                                            <div className='msg data-wrap'>
                                                <label htmlFor="msg">Note to the couple:</label>
                                                <textarea rows="3" cols="10" className='text-area' name="msg" id="msg" value={newInvite.msg} onChange={(e) => setNewInvite(currInv => ({...currInv, msg: e.target.value}))}></textarea>
                                            </div>
                                            <button className='btn' onClick={() => handleContinueFromSteps()}>Continue</button>
                                        </div>
                                        : null
                                    }
                                    {
                                        inviteStep === 4 ?
                                        <div className='step4'>
                                            <h3>Please tell us your email</h3>
                                            <div className='email data-wrap'>
                                                <label htmlFor="email">Email:</label>
                                                <input type='text' email='email' id='email' value={newInvite.email} onChange={(e) => setNewInvite(currInv => ({...currInv, email: e.target.value}))} />
                                            </div>
                                            <button className='btn' onClick={() => createInvite()}>Submit</button>
                                        </div>
                                        : null
                                    }
                                </div>
                            )
                        }
                    </div>
                }
                {
                    showFinalMsg && 
                    <div className='part3'>
                        <h4>Thank you, <span>{fullName}</span>. <br/> See you on September 24th &#129321;</h4>
                    </div>
                }
            </div>
        </div>
    );
}

export default Rsvp;