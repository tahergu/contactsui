import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import React, { useState, useEffect } from 'react'
import NewContact from './NewContact'
import EditContact from './EditContact'

function Home() {
  const navigate = useNavigate()
  const username = localStorage.getItem('username')
  
    const [contacts, setContacts] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [isNew, setIsNew] = useState(true)
    const [modalOpen, setModalOpen] = useState(false)
    const [editOpen, setEditOpen] = useState(false);
    const [contactId, setContactId] = useState(0);
    const [searchValue, setSearchValue] = useState('');

    useEffect(() => {
        axios.get('https://localhost:7100/Contacts') // example API
        .then(response => {
            setContacts(response.data);
            
            console.log(response.data);
            setLoading(false)
        })
        .catch(err => {
            setError('Failed to fetch users server must be offline due to azure free plan, please refresh')
            console.log("Entra a error");
        })
    }, [loading])


  const logout = () => {
  
    localStorage.removeItem('username')
    navigate('/login')
  }

    const onAddContact = () => {
      setIsNew(true);
      setModalOpen(true)
    }

    const handleEdit = (contactId) => {
      setContactId(contactId);
      setEditOpen(true)
    }

    const onUpdateClose = () => {
      setEditOpen(false);
      setLoading(!loading);
    }

    const onSearchResults = (value) => {
      axios.get('https://localhost:7100/Contacts/search?value=' + searchValue)
      .then(response => {
            setContacts(response.data);
            
            console.log(response.data);
            setLoading(false)
        })
        .catch(err => {
            setError('Failed to fetch contacts');
        })
    }
    
    const handleAddUser = (contact) => {
   
    const newContact = { ...contact }

    const response = axios.post('https://localhost:7100/Contacts', {
        Name: newContact.name,
        Email: newContact.email,
        Phone: newContact.phone,
        Fax: newContact.fax
      });
      setLoading(true);
  }

  return (
    <>
     <div style={styles.mcontainer}>
        <div style={styles.box}>
            <h3>MyContacts|Lookup</h3>
        </div>
        <div style={styles.box}>
            
        </div>
         <div style={styles.box}>
            <h3>Welcome, aaaa{username}</h3>
            <button onClick={logout} >
                Logout
            </button>
        </div>
    </div>
     <div style={styles.scontainer}>
        <div style={styles.box}>
            <div style={styles.searchContainer}>
                <input onChange={e => setSearchValue(e.target.value)}style={styles.searchInput} type="text" placeholder="Search..." className="search-input" />
                <button onClick={onSearchResults} >
                        Search
                </button>
            </div>
        </div>
        <div style={styles.box}>
            
        </div>
         <div style={styles.box}>
            <button onClick={onAddContact} >
                Add New
            </button>
        </div>
    </div>
    <div>
    <table style={styles.table}>
      <thead>
        <tr>
          <th style={styles.th}>Name</th>
          <th style={styles.th}>Phone</th>
          <th style={styles.th}>Fax</th>
          <th style={styles.th}>Email</th>
          <th style={styles.th}>Last Updated</th>
          <th style={styles.th}>Actions</th>
        </tr>
      </thead>
      <tbody>
        {contacts.map(user => (
          <tr
            key={user.id}
            style={{
              ...(user.id % 2 === 0 ? styles.trHover : {}),
            }}
          >
            <td style={styles.td}>{user.name}</td>
            <td style={styles.td}>{user.phone}</td>
            <td style={styles.td}>{user.fax}</td>
            <td style={styles.td}>{user.email}</td>
            <td style={styles.td}>{user.lastUpdatedDate}</td>
            <td style={styles.td}>
              <a onClick={(e) => {
                e.preventDefault()
                handleEdit(user.contactId)
                }} title="Edit"><i className="fa-solid fa-pen"></i>
                </a>
              </td>
          </tr>
        ))}
      </tbody>
    </table>
    {error != "" && (
      <div>
      <h2><b>{error}</b></h2>
    </div>
)}
    </div>
   <NewContact
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        isNew = {isNew}
        onSave={handleAddUser} 
      />

      <EditContact
        isOpen={editOpen}
        onClose={onUpdateClose}
        contactId ={contactId}
      />
    </>
  )
}

const styles = {
  mcontainer: {
    display: 'flex',
     width: '100%',
    flexDirection: 'row',
    background: '#100c35',
    color: 'white'
  },
    scontainer: {
    display: 'flex',
    width: '100%',
    flexDirection: 'row',
    background: '#e7eeee',
    color: 'white'
  },
  box: {
    flex: 1,
    padding: 16,
    },
  button: {
    marginTop: 20,
    padding: 10
  },
 searchContainer: {
    width: '100%',
    maxWidth: '400px',
    margin: '16px auto',
    position: 'relative',
  },
  searchInput: {
    width: '50%',
    padding: '12px 20px',
    borderRadius: '25px',
    border: '1px solid #ccc',
    boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
    fontSize: '16px',
    outline: 'none',
    transition: 'all 0.3s ease',
  },
  searchInputFocus: {
    borderColor: '#4f46e5',
    boxShadow: '0 0 8px rgba(79, 70, 229, 0.5)',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    marginTop: 20,
  },
  th: {
    border: '1px solid #ddd',
    padding: '12px',
    backgroundColor: '#e7eeee',
    color: 'black',
    textAlign: 'left',
  },
  td: {
    border: '1px solid #ddd',
    padding: '12px',
  },
  trHover: {
    backgroundColor: '#f9f9f9',
  },
}

export default Home