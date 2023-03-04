import axios from 'axios';
import React, { useState } from 'react'

const EditContactModal = ({
    showModal = false,
    onCloseEditContactModal,
    selectedContact,
    setOpenEditContactModal,
    setContactsList,
    contactsList
}) => {
    const [nameAddContactModal, setNameAddContactModal] = useState(selectedContact?.name);
    const [emailAddContactModal, setEmailAddContactModal] = useState(selectedContact?.email);
    const [phoneAddContactModal, setPhoneAddContactModal] = useState(selectedContact?.mobile);


    const submitAddContactForm = async (e) => {
        e.preventDefault();
        const data = JSON.stringify({ name: nameAddContactModal, email: emailAddContactModal, mobile: phoneAddContactModal });
        const userInfo = JSON.parse(localStorage.getItem('userInformation'));
        const config = {
            method: 'patch',
            url: `https://yc-backend-production.up.railway.app/contacts/${selectedContact._id}`,
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.accessToken}`
            },
            data: data
        };

        axios(config)
            .then(function (res) {
                setOpenEditContactModal(false)
                setContactsList(
                    contactsList.map(curr_contact =>
                        curr_contact._id === selectedContact._id ? {
                        ...curr_contact,
                        name: res.data.name,
                        email: res.data.email,
                        mobile: res.data.mobile
                    } : curr_contact))
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    return (
        <div className='modal' style={{ display: showModal ? 'block' : 'none', }}>
            <div className='modal-content' >
                <div className='closerContainer'>
                    <div />
                    <div
                        className="close"
                        onClick={onCloseEditContactModal}>&times;
                    </div>
                </div>
                {selectedContact && (
                    <div>
                        <div className='modalHeading'>Edit Contact</div>
                        <form onSubmit={submitAddContactForm}>
                            <div className='inputModalContainer'>
                                <input
                                    type="type"
                                    required
                                    value={nameAddContactModal}
                                    placeholder='Name'
                                    onChange={(e) => setNameAddContactModal(e.target.value)}
                                />
                            </div>
                            <div className='inputModalContainer'>
                                <input
                                    type="email"
                                    required
                                    value={emailAddContactModal}
                                    placeholder='Email'
                                    onChange={(e) => setEmailAddContactModal(e.target.value)}
                                />
                            </div>
                            <div className='inputModalContainer'>
                                <input
                                    type="tel"
                                    required
                                    value={phoneAddContactModal}
                                    placeholder='Phone Number'
                                    onChange={(e) => setPhoneAddContactModal(e.target.value)}
                                />
                            </div>
                            <button className='modalButton'>Submit</button>
                        </form>
                    </div>
                )}
            </div>
        </div>
    )
}

export default EditContactModal