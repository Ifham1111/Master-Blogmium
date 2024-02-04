import { Alert, Button, Label, Spinner, TextInput } from 'flowbite-react'
import React, { useState } from 'react'
import { Form, Link, useNavigate } from 'react-router-dom'
import OAuth from '../components/OAuth';

export default function SignUp() {
  const [formData, setFormData] = useState({});
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value.trim()
    });
  };

  console.log(formData);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.username || !formData.email || !formData.password) {
      return setErrorMessage('Please fill out all fields');
    }

    try {
      setLoading(true);
      setErrorMessage(null);
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const data = await res.json();

      if (data.success === false) {
        return setErrorMessage(data.message);
      }
      setLoading(false);
      if (res.ok) {
        navigate('/sign-in');
      }
    } catch (error) {
      setErrorMessage(error.message);
      setLoading(false);
    }

  };

  // const res = await fetch('http://localhost:5000/api/auth/signup', {
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'application/json'
  //   },
  //   body: JSON.stringify(formData)
  // });

  // const data = await res.json();

  // console.log(data);



  return (
    <div className='min-h-screen mt-20'>
      <div className='flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5'>
        {/* left */}
        <div className='flex-1'>
          <Link
            to="/"
            className='semibold dark:text-white text-4xl'>
            <span
              className='px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white'>
              Blog
            </span>
            mium
          </Link>
          <p className='text-sm mt-5 font-bold'>
            Welcome to Blogmium! This is a platform where you can explore a wide range of topics, from technology and programming to lifestyle and travel. Join our community of passionate bloggers and share your thoughts, experiences, and knowledge with the world. Sign up now to start your blogging journey!
          </p>
        </div>
        {/* right */}
        <div className='flex-1'>
          <form className='flex flex-col gap-4'
            // onSubmit={(e) => {
            //     e.preventDefault();
            //     console.log(formData);
            //   }}
            onSubmit={handleSubmit}
          >
            <div>

              <Label value='Username' className='block text-gray-700 text-sm font-bold mb-2' />
              <TextInput
                type='text'
                placeholder='Username'
                name='username'
                id='username'
                onChange={handleChange}
              />


              <Label className='block text-gray-700 text-sm font-bold mb-2 mt-5' value='Email' />
              <TextInput
                type='email'
                placeholder='name@company.com'
                name='email'
                id='email'
                onChange={handleChange}
              />


              <Label className='block text-gray-700 text-sm font-bold mb-2 mt-5' value='Password' />
              <TextInput
                type='password'
                placeholder='Password'
                name='password'
                id='password'
                onChange={handleChange}
              />


              {/* <Label className='block text-gray-700 text-sm font-bold mb-2 mt-5' value='Confirm Password' />
              <TextInput
                type='password'
                placeholder='Password'
                name='password'
                id='re-password'
              /> */}


              {/* <div className='flex justify-end mt-5'>
                <Link to='/sign-in'>
                  <button
                    className='bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white px-4 py-2 rounded-lg shadow-md hover:shadow-xl focus:shadow-outline focus:outline-none mr-1'
                    type='button'>
                    Sign In
                  </button>
                  <button
                    className='
                    bg-gray-500 bg-gradient-to-r from-purple-500 via-purple-400 to-purple-300 text-white px-4 py-2 rounded-lg shadow-md hover:shadow-xl focus:shadow-outline focus:outline-none'
                    type='submit'>
                    Sign Up
                  </button>
                </Link>
              </div> */}

            </div>

            <Button gradientDuoTone='purpleToPink' type='submit' disabled={loading}>
              {loading ? (
                <>
                  <Spinner size='sm' />
                  <span className='pl-3'>Loading...</span>
                </>
              ) : 'Sign Up'
              }
            </Button>

            <OAuth />

          </form>

          <div className="flex gap-2 text-sm mt-5">
            <span>Have an account</span>
            <Link to='/sign-in' className='text-blue-500'>
              Sign In</Link>
          </div>
          {
            errorMessage && (
              <Alert className='mt-5' color='failure'>
                {errorMessage}
              </Alert>
            )
          }
        </div>
      </div>
    </div>
  )
}
