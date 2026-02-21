import { useNavigate } from 'react-router-dom'

function Home() {
  const navigate = useNavigate()
  const username = localStorage.getItem('username')

  const logout = () => {
    localStorage.removeItem('username')
    navigate('/login')
  }

  return (
    <div style={styles.container}>
      <h1>Welcome, {username} 👋</h1>
      <button onClick={logout} style={styles.button}>
        Logout
      </button>
    </div>
  )
}

const styles = {
  container: {
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  button: {
    marginTop: 20,
    padding: 10
  }
}

export default Home