import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import AddContactModal from '../AddContactModal';
import EditContactModal from '../EditModal';
import './ContactList.css'

const ContactList = () => {
  const history = useNavigate();
  const [openAddContactModal, setOpenAddContactModal] = useState(false);
  const [contactsList, setContactsList] = useState([])
  const [openEditContactModal, setOpenEditContactModal] = useState(false);
  const [selectedContact, setSelectedContact] = useState();
  console.log('data', contactsList)
  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem('userInformation'));
    console.log(userInfo);
    if (!userInfo)
      history('/')
  }, [history])

  const getData = async () => {
    const userInfo = JSON.parse(localStorage.getItem('userInformation'));
    const config = {
      method: 'get',
      url: 'https://yc-backend-production.up.railway.app/contacts',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.accessToken}`
      }
    };
    axios(config).then(res => {
      console.log(res.data);
      setContactsList([...contactsList, ...res.data])
    }).catch(err => {
      console.log(err);
    })
  }

  useEffect(() => {
    getData()
  }, [])

  const _onLogOut = () => {
    localStorage.removeItem('userInformation');
    history("/");
  }

  const onDeleteContact = async (id) => {
    const userInfo = JSON.parse(localStorage.getItem('userInformation'));
    const config = {
      method: 'delete',
      url: `https://yc-backend-production.up.railway.app/contacts/${id}`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.accessToken}`
      }
    };
    axios(config).then(res => {
      console.log(res.data);
      setContactsList(contactsList.filter(curr_fil => curr_fil._id !== id))
    }).catch(err => {
      console.log(err);
    })
  }

  const onCloseAddContactModal = () => {
    setOpenAddContactModal(false)
  }

  const onCloseEditContactModal = () => {
    setOpenEditContactModal(false)
  }

  const onEditClick = (data) => {
    setSelectedContact(data)
    setOpenEditContactModal(!openEditContactModal)
  }

  return (
    <>
      <AddContactModal
        showModal={openAddContactModal}
        onCloseAddContactModal={() => onCloseAddContactModal()}
        setContactsList={setContactsList}
        contactsList={contactsList}
        setOpenAddContactModal={setOpenAddContactModal}
      />
      {selectedContact && <EditContactModal
        showModal={openEditContactModal}
        onCloseEditContactModal={() => onCloseEditContactModal()}
        selectedContact={selectedContact}
        setContactsList={setContactsList}
        contactsList={contactsList}
        setOpenEditContactModal={setOpenEditContactModal}
      />}
      <div className='header'>
        <div></div>
        <div className='headerRight'>
          <div className='headerRightChild' onClick={() => setOpenAddContactModal(!openAddContactModal)}>Add Contact</div>
          <div className='headerRightChild' onClick={() => _onLogOut()}>Log Out</div>
        </div>
      </div>
      <div className='mainContactListContainer'>
        <div className='contactListTopHeading'>Contacts List</div>
        <div>
          {contactsList.map((curr_contact, index) => (
            <div className='contactListContainer' key={`contact_${index}`}>
              <div>
                <div className='contactListContainerLeftChild'>{`Name: ${curr_contact.name}`}</div>
                <div className='contactListContainerLeftChild'>{`Email: ${curr_contact.email}`}</div>
                <div className='contactListContainerLeftChild'>{`Mobile Number: ${curr_contact.mobile}`}</div>
              </div>
              <div className='contactListContainerRightChildContainer'>
                <div className='contactListContainerRightChild' onClick={() => onEditClick(curr_contact)}>Edit</div>
                <div className='contactListContainerRightChild' onClick={() => onDeleteContact(curr_contact._id)}>Delete</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default ContactList