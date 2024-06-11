'use client'

import React, { ChangeEvent, FormEvent, useState } from 'react'
import { FIREBASE_AUTH } from '@/FirebaseConfig';
import { useRouter } from 'next/navigation';
import { signInWithEmailAndPassword } from 'firebase/auth';

interface User {
  id: string,
  email: string,
  password: string
}

function Login() {
  const auth = FIREBASE_AUTH;
  const [newUser, setNewUser] = useState<User>({ id: '', email: '', password: '' });
  const router = useRouter(); // Initialize useRouter


  const signIn = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const response = await signInWithEmailAndPassword(auth, newUser.email, newUser.password);
      console.log(response);
      window.alert("Login successful" )
      router.push('/addTrip'); // Redirect to the Drivers page

    } catch (error) {
      console.log(error);
      window.alert("Login unsuccessful please try again" )

      // setAlert({ show: true, message: 'Registration failed. Please try again.', type: 'error' });
    }
  }

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewUser(prevState => ({
      ...prevState,
      [name]: value
    }));
  };


  return (
    <div>
         <div>
        <div className="flex min-h-screen w-screen w-full items-center justify-center text-gray-600 bg-gray-50">
            <div className="relative">
    
                <div className="hidden sm:block h-56 w-56 text-indigo-300 absolute a-z-10 -left-20 -top-20">
                 <svg id='patternId' width='100%' height='100%' xmlns='http://www.w3.org/2000/svg'><defs><pattern id='a' patternUnits='userSpaceOnUse' width='40' height='40' patternTransform='scale(0.6) rotate(0)'><rect x='0' y='0' width='100%' height='100%' fill='none'/><path d='M11 6a5 5 0 01-5 5 5 5 0 01-5-5 5 5 0 015-5 5 5 0 015 5'  stroke-width='1' stroke='none' fill='currentColor'/></pattern></defs><rect width='800%' height='800%' transform='translate(0,0)' fill='url(#a)'/></svg>
                </div>
                <div className="hidden sm:block h-28 w-28 text-indigo-300 absolute a-z-10 -right-20 -bottom-20">
                    <svg id='patternId' width='100%' height='100%' xmlns='http://www.w3.org/2000/svg'><defs><pattern id='b' patternUnits='userSpaceOnUse' width='40' height='40' patternTransform='scale(0.5) rotate(0)'><rect x='0' y='0' width='100%' height='100%' fill='none'/><path d='M11 6a5 5 0 01-5 5 5 5 0 01-5-5 5 5 0 015-5 5 5 0 015 5'  stroke-width='1' stroke='none' fill='currentColor'/></pattern></defs><rect width='800%' height='800%' transform='translate(0,0)' fill='url(#b)'/></svg>
                </div>

    <div className="relative flex flex-col sm:w-[30rem] rounded-lg border-gray-400 bg-white shadow-lg px-4">
      <div className="flex-auto p-6">
       
        <div className="mb-10 flex flex-shrink-0 flex-grow-0 items-center justify-center overflow-hidden">
          <a href="#" className="flex cursor-pointer items-center gap-2 text-indigo-500 no-underline hover:text-indigo-500">
            <span className="flex-shrink-0 text-3xl font-black lowercase tracking-tight opacity-100">Kilimo.com</span>
          </a>
        </div>
       
        <h4 className="mb-2 font-medium text-gray-700 xl:text-xl">Welcome to Kilimo.com</h4>
        <p className="mb-6 text-gray-500">Please sign-in to access your account</p>

        <form className="mb-4" onSubmit={signIn}>
          <div className="mb-4">
            <label className="mb-2 inline-block text-xs font-medium uppercase text-gray-700">Email or Username</label>
            <input type="text" className="block w-full cursor-text appearance-none rounded-md border border-gray-400 bg--100 py-2 px-3 
            text-sm outline-none focus:border-indigo-500 focus:bg-white 
            focus:text-gray-600 focus:shadow" id="email"
            name="email"
            value={newUser.email}
            onChange={handleInputChange}
            placeholder="Enter your email or username"  />
          </div>
          <div className="mb-4">
            <div className="flex justify-between">
              <label className="mb-2 inline-block text-xs font-medium uppercase text-gray-700" >Password</label>
              <a href="auth-forgot-password-basic.html" className="cursor-pointer text-indigo-500 no-underline hover:text-indigo-500">
                {/* <small className=" ">Forgot Password?</small> */}
              </a>
            </div>
            <div className="relative flex w-full flex-wrap items-stretch">
              <input type="password" id="password" className="relative block flex-auto cursor-text appearance-none rounded-md border 
              border-gray-400 bg--100 py-2 px-3 text-sm outline-none 
              focus:border-indigo-500 focus:bg-white focus:text-gray-600 
              focus:shadow" 
                  name="password"
                    value={newUser.password}
                    onChange={handleInputChange} placeholder="············" />
            </div>
          </div>
          <div className="mb-4">
            <div className="block">
              {/* <input className="mt-1 mr-2 h-5 w-5 appearance-none rounded border border-gray-300 bg-contain bg-no-repeat align-top
               text-black shadow checked:bg-indigo-500 focus:border-indigo-500 focus:shadow" type="checkbox" id="remember-me" 
                checked /> */}
              {/* <label className="inline-block"> Remember Me </label> */}
            </div>
          </div>
          <div className="mb-4">
          
            <button className="grid w-full cursor-pointer select-none rounded-md border border-indigo-500 bg-indigo-500 py-2
             px-5 text-center align-middle text-sm text-white shadow hover:border-indigo-600 hover:bg-indigo-600 hover:text-white
              focus:border-indigo-600 focus:bg-indigo-600 focus:text-white focus:shadow-none" >Sign in</button>
            
           
          </div>
        </form>

        <p className="mb-4 text-center">
          New on kilimo.com
          <a href="/register" className="cursor-pointer text-indigo-500 no-underline hover:text-indigo-500"> Create an account </a>
        </p>
      </div>
    </div>
 
  </div>
</div>

    </div>
    </div>
  )
}

export default Login