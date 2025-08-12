import React, { useState } from 'react';
import { api } from '../services/api';
import Footer from '../components/Footer';
 
interface Address { city: string; street: string }
interface FormData {
  firstname: string;
  lastname: string;
  username: string;
  email: string;
  phone: string;
  age: string; 
  password: string;
  confirmPassword: string;
  address: Address;
}

const initialForm: FormData = {
  firstname: '',
  lastname: '',
  username: '',
  email: '',
  phone: '',
  age: '',
  password: '',
  confirmPassword: '',
  address: { city: '', street: '' }
};

export default function RegisterPage() {
  const [form, setForm] = useState<FormData>(initialForm);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<string>('');
  const [showPwd, setShowPwd] = useState(false);


  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === 'city' || name === 'street') {
      setForm(prev => ({ ...prev, address: { ...prev.address, [name]: value } }));
    } else {
      setForm(prev => ({ ...prev, [name]: value }));
    }
  };

 
  const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
  const validate = () => {
    if (form.password !== form.confirmPassword) return 'Passwords do not match';
    if (!emailRegex.test(form.email)) return 'Please enter a valid email address';
    if (!form.username.trim()) return 'Username is required';
    if (!form.firstname.trim() || !form.lastname.trim()) return 'First and last name are required';
    if (!form.phone.trim()) return 'Phone is required';
    if (!form.age.trim()) return 'Age is required';
    if (form.password.length < 8) return 'Password must be at least 8 characters';
    return '';
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    const v = validate();
    if (v) { setError(v); return; }

    setLoading(true);
    try {
      const payload = {
        firstname: form.firstname,
        lastname: form.lastname,
        username: form.username,
        email: form.email,
        password: form.password,
        phone: form.phone,
        age: form.age,
        role: 'CUSTOMER', 
        ...(form.address.city || form.address.street ? { address: form.address } : {})
      };

      const { data } = await api.post('/api/user/create', payload);
      if (!data?.status) throw new Error('Failed to create user');
      setSuccess(`Welcome, ${data.data.firstname}!`);
      setForm(initialForm);
    } catch (err) {
      setError( 'Registration failed. Please try again.');
      console.log(err)
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="container mx-auto px-4 mt-5 mb-5">
        <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-sm border border-gray-100">
          <div className="p-8">
            <h1 className="text-3xl font-bold text-center mb-2">Create Your Account</h1>
            <p className="text-center text-gray-500 mb-8">Register as a user to book services.</p>

            {success && (
              <div className="mb-6 p-4 bg-green-50 text-green-700 border border-green-200 rounded-lg">{success}</div>
            )}
            {error && (
              <div className="mb-6 p-4 bg-red-50 text-red-700 border border-red-200 rounded-lg">{error}</div>
            )}

            <form onSubmit={onSubmit} className="space-y-5">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="firstname" className="block text-gray-700 mb-1 font-medium">First name</label>
                  <input
                   id="firstname" 
                   name="firstname" 
                   value={form.firstname} 
                   onChange={onChange} 
                   className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-focus:ring-blue-500"
                  required
                  />
                </div>

                <div>
                  <label htmlFor="lastname" className="block text-gray-700 mb-1 font-medium">Last name</label>
                  <input
                   id="lastname" 
                   name="lastname"
                   value={form.lastname}
                   onChange={onChange} 
                   className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" 
                   required
                   />
                </div>
              </div>

              <div>
                <label htmlFor="username" className="block text-gray-700 mb-1 font-medium">Username</label>
                <input
                 id="username" 
                 name="username"
                 value={form.username} 
                 onChange={onChange} 
                 className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" 
                 required 
                 />
              </div>

              <div>
                <label htmlFor="email" className="block text-gray-700 mb-1 font-medium">Email</label>
                <input
                 type="email" 
                 id="email" 
                 name="email" 
                 value={form.email} 
                 onChange={onChange} 
                 className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" 
                 required/>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="phone" className="block text-gray-700 mb-1 font-medium">Phone</label>
                  <input 
                  id="phone"
                  name="phone"
                  value={form.phone}
                  onChange={onChange} 
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" 
                  required
                  />
                </div>

                <div>
                  <label htmlFor="age" className="block text-gray-700 mb-1 font-medium">Age</label>
                  <input
                   id="age" 
                   name="age"
                   value={form.age}
                   onChange={onChange} className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                   required
                   />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="city" className="block text-gray-700 mb-1 font-medium">City</label>
                  <input
                  id="city"
                  name="city" 
                  value={form.address.city} 
                  onChange={onChange} 
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                  />
                </div>

                <div>
                  <label htmlFor="street" className="block text-gray-700 mb-1 font-medium">Street</label>
                  <input 
                  id="street" 
                  name="street" 
                  value={form.address.street} 
                  onChange={onChange} 
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="relative">
                  <label htmlFor="password" className="block text-gray-700 mb-1 font-medium">Password</label>
                  <input 
                  id="password" 
                  name="password" 
                  type={showPwd ? "text" : "password"}
                  value={form.password} 
                  onChange={onChange} 
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" 
                  required 
                  />

                   <button
                    type="button"
                    onClick={() => setShowPwd(s => !s)}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-sm px-2 py-1 text-blue-600 hover:text-blue-700"
                    aria-label={showPwd ? "Hide password" : "Show password"}
                  >
                    {showPwd ? "Hide" : "Show"}
                  </button>
                </div>

                <div className="relative">
                  <label htmlFor="confirmPassword" className="block text-gray-700 mb-1 font-medium">Confirm Password</label>
                  <input 
                  id="confirmPassword" 
                  name="confirmPassword" 
                  type={showPwd ? "text" : "password"}
                  value={form.confirmPassword} 
                  onChange={onChange} 
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" 
                  required
                  />
                  
                   <button
                    type="button"
                    onClick={() => setShowPwd(s => !s)}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-sm align-middle px-2 py-1 text-blue-600 hover:text-blue-700"
                    aria-label={showPwd ? "Hide password" : "Show password"}
                  >
                    {showPwd ? "Hide" : "Show"}
                  </button>
                </div>
              </div>
    
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 text-white py-3 rounded-xl font-medium hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loading ? 'Processing…' : 'Register'}
              </button>

              <p className="text-center text-gray-600 mt-2">
                Already have an account?{' '}
                <a href="/login" className="text-blue-600 hover:underline">Log in</a>
              </p>
            </form>
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
}
