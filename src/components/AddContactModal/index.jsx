import axios from 'axios';
import React, { useState } from 'react'
import '../AddContactModal/AddContactModal.css'

const AddContactModal = ({
    showModal = false,
    onCloseAddContactModal,
    contactsList,
    setContactsList,
    setOpenAddContactModal
}) => {
    const [nameAddContactModal, setNameAddContactModal] = useState('');
    const [emailAddContactModal, setEmailAddContactModal] = useState('');
    const [phoneAddContactModal, setPhoneAddContactModal] = useState('');

    const submitAddContactForm = async (e) => {
        e.preventDefault();
        const data = JSON.stringify({ name: nameAddContactModal, email: emailAddContactModal, mobile: phoneAddContactModal });
        const userInfo = JSON.parse(localStorage.getItem('userInformation'));
        const config = {
            method: 'post',
            url: 'https://yc-backend-production.up.railway.app/contacts',
            headers: {
                Authorization: `Bearer ${userInfo.accessToken}`,
                'Content-Type': 'application/json'
            },
            data: data
        };

        axios(config)
            .then(function (response) {
                setContactsList([...contactsList, ...response.data])
                setOpenAddContactModal(false)
                setNameAddContactModal('')
                setEmailAddContactModal('')
                setPhoneAddContactModal('')

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
                        onClick={onCloseAddContactModal}>&times;
                    </div>
                </div>
                <div>
                    <div className='modalHeading'>Add Contact</div>
                    <form onSubmit={submitAddContactForm}>
                        <div className='inputModalContainer'>
                            <input
                                type="type"
                                required
                                placeholder='Name'
                                onChange={(e) => setNameAddContactModal(e.target.value)}
                            />
                        </div>
                        <div className='inputModalContainer'>
                            <input
                                type="email"
                                required
                                placeholder='Email'
                                onChange={(e) => setEmailAddContactModal(e.target.value)}
                            />
                        </div>
                        <div className='inputModalContainer'>
                            <input
                                type="tel"
                                required
                                placeholder='Phone Number'
                                onChange={(e) => setPhoneAddContactModal(e.target.value)}
                            />
                        </div>
                        <button className='modalButton'>Submit</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default AddContactModal