import { useState } from 'react'
import HomePage from './Home'
import RegistrationPage from './RegistrationPage'
import './styles.css'

function App() {
  const [isRegistered, setIsRegistered] = useState(false)

  return (
    <div>
      {isRegistered ? (
        <HomePage />
      ) : (
        <RegistrationPage setIsRegistered={setIsRegistered} />
      )}
    </div>
  )
}

export default App
