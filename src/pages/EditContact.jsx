import React, { useState, useEffect } from 'react'
import axios from 'axios'

const styles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  modal: {
    backgroundColor: 'white',
    borderRadius: '12px',
    padding: '24px',
    width: '100%',
    maxWidth: '400px',
    boxShadow: '0 10px 25px rgba(0,0,0,0.3)',
    position: 'relative',
  },
  closeButton: {
    position: 'absolute',
    top: '12px',
    right: '12px',
    background: 'transparent',
    border: 'none',
    fontSize: '18px',
    cursor: 'pointer',
  },
  input: {
    width: '100%',
    padding: '10px',
    marginBottom: '12px',
    borderRadius: '6px',
    border: '1px solid #ccc',
    fontSize: '16px',
  },
  button: {
    padding: '10px 16px',
    borderRadius: '6px',
    border: 'none',
    backgroundColor: '#4f46e5',
    color: 'white',
    cursor: 'pointer',
    width: '100%',
    fontSize: '16px',
  },
}

function EditContact({ isOpen, onClose, contactId, onSave }) {

  if (!isOpen) return null

   const [contact, setContact] = useState([])

   useEffect(() => {
         axios.get('https://localhost:7100/Contacts/' + contactId) // example API
        .then(response => {
            setContact(response.data);
            console.log(response.data);
            //setLoading(false)
        })
        .catch(err => {
            setError('Failed to fetch contact information.')
            console.log("Entra a error");
        })
    }, [contactId])

  const onUpdateSubmit = () => {
    localStorage.removeItem('username')
    navigate('/login')
  }

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <button style={styles.closeButton} onClick={onClose}>×</button>
        {<h2>Edit Contact</h2>}
        <form onSubmit={onUpdateSubmit}>
          <input
            style={styles.input}
            type="text"
            placeholder="Name"
            value={contact.name}
            onChange={e => setName(e.target.value)}
          />
          <input
            style={styles.input}
            type="email"
            placeholder="Email"
            value={contact.email}
            onChange={e => setEmail(e.target.value)}
          />
           <input
            style={styles.input}
            type="text"
            placeholder="Phone"
             value={contact.phone}
            onChange={e => setPhone(e.target.value)}
          />
           <input
            style={styles.input}
            type="text"
            placeholder="Fax"
            value={contact.fax}
            onChange={e => setFax(e.target.value)}
          />
          <button style={styles.button} type="submit">Save</button>
        </form>
      </div>
    </div>
  )
}

export default EditContact