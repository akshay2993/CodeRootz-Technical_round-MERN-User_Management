import React from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'

const Signup = () => {
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()

    const formData = new FormData(e.target)
    const userData = Object.fromEntries(formData.entries())
    console.log(userData)

    try {
      const res = await axios.post('http://localhost:3000/api/auth/signup', userData)
      console.log(res)
      alert('Signed up successfully')
      navigate('/login')
    } catch (error) {
      console.log(error)
      alert(`Error: ${error.response.data.message}`)
    }
  }

  return (
    <>
      <form className='auth-form' onSubmit={handleSubmit}>
      <h1 className="text-2xl text-center mb-2">Signup</h1>
      <div className='form-row'>
      <label htmlFor='name'>Name</label>
      <input type='text' id='name' name='name' placeholder='Full Name' required/>
      </div>

      <div className='form-row'>
      <label htmlFor='email'>Email</label>
      <input type='email' id='email' name='email' placeholder='Email address' required/>
      </div>

      <div className='form-row'>
      <label htmlFor='password'>Password</label>
      <input type='password' id='password' name='password' placeholder='Password' required/>
      
      <button className='mt-6'>Register</button>
      
      <p className="mt-4">Already have an account? 
      <Link to='/login' className="underline mt-4"> Login </Link>
      </p>
      </div>
      </form>
    </>
  )
}

export default Signup
