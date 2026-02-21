
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Login() {
  const [username, setUsername] = useState('')
  const navigate = useNavigate()

  const handleLogin = () => {
    if (!username.trim()) return alert('Enter username')

    // Save user (temporary – replace with API later)
    localStorage.setItem('username', username)

    navigate('/home')
  }

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2>Login</h2>

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={e => setUsername(e.target.value)}
          style={styles.input}
        />

        <button onClick={handleLogin} style={styles.button}>
          Login
        </button>
      </div>
    </div>
  )
}

const styles = {
  container: {
    display: 'flex',
    height: '100vh',
    alignItems: 'center',
    justifyContent: 'center',
    background: '#f4f6f8'
  },
  card: {
    padding: 30,
    borderRadius: 8,
    background: '#fff',
    width: 300,
    boxShadow: '0 4px 10px rgba(0,0,0,0.1)'
  },
  input: {
    width: '100%',
    padding: 10,
    marginBottom: 15
  },
  button: {
    width: '100%',
    padding: 10,
    cursor: 'pointer'
  }
}

export default Login