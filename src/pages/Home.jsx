import { useNavigate } from 'react-router-dom'

function Home() {
  const navigate = useNavigate()
  const username = localStorage.getItem('username')

  const users = [
  { id: 1, name: 'Andres', email: 'andres@example.com' },
  { id: 2, name: 'Maria', email: 'maria@example.com' },
  { id: 3, name: 'John', email: 'john@example.com' },
]

  const logout = () => {
    localStorage.removeItem('username')
    navigate('/login')
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
                <input style={styles.searchInput} type="text" placeholder="Search..." className="search-input" />
                <button onClick={logout} >
                        Search
                </button>
            </div>
        </div>
        <div style={styles.box}>
            
        </div>
         <div style={styles.box}>
            <button onClick={logout} >
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
        {users.map(user => (
          <tr
            key={user.id}
            style={{
              ...(user.id % 2 === 0 ? styles.trHover : {}),
            }}
          >
            <td style={styles.td}>{user.id}</td>
            <td style={styles.td}>{user.name}</td>
            <td style={styles.td}>{user.email}</td>
            <td style={styles.td}>{user.email}</td>
            <td style={styles.td}>{user.email}</td>
            <td style={styles.td}>{user.email}</td>
          </tr>
        ))}
      </tbody>
    </table>  
    </div>
   
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