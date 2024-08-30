"use client"
import Link from 'next/link'
import React from 'react'
import { signIn } from "next-auth/react"
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter()
  const handleLogin = async (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    
    try {
      const res = await signIn('credentials', {
        email,
        password,
        redirect: false
      });
      if(res.status == 200){
        router.push('/')
      }

      if (res.error) {
        // Handle error (e.g., show error message)
        console.error('Login failed:', res.error);
      } else {
        // Redirect or handle successful login
        console.log('Login successful');
      }
    } catch (error) {
      console.error('An unexpected error occurred:', error);
    }
  };

  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Login now!</h1>
          <p className="py-6">
            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem
            quasi. In deleniti eaque aut repudiandae et a id nisi.
          </p>
        </div>
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <form onSubmit={handleLogin} className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="email"
                name="email"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                placeholder="password"
                name="password"
                className="input input-bordered"
                required
              />
              <label className="label">
                <Link href="/signup" className="label-text-alt link link-hover">
                  No account? Register
                </Link>
              </label>
            </div>
            <div className="form-control mt-6">
              <button className="btn btn-primary">Login</button>
            </div>
          </form>
          <div className='text-center mb-6'>
            <h1 className='font-semibold mb-3'>Or, Log in with:</h1>
            <div className='flex gap-4 justify-center items-center'>
              <button
                onClick={() => signIn('google')}
                className='font-bold btn bg-green-400 text-white border py-2 px-4 rounded-lg'
              >
                Google
              </button>
              <button
                onClick={() => signIn('github')}
                className='font-bold btn bg-orange-400 text-white border py-2 px-4 rounded-lg'
              >
                GitHub
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
