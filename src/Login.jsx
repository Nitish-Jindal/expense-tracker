import { useState } from 'react';
import { useAuth } from './authContext';

function Login() {
  const { login, signup } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignup, setIsSignup] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      isSignup ? await signup(email, password) : await login(email, password);
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="max-w-sm mx-auto bg-white p-6 rounded shadow mt-20">
      <h2 className="text-2xl mb-4 text-center">{isSignup ? 'Sign Up' : 'Log In'}</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 border rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 border rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button className="w-full bg-blue-500 text-white py-2 rounded">
          {isSignup ? 'Sign Up' : 'Log In'}
        </button>
      </form>
      <button
        className="text-sm text-blue-600 mt-2 underline"
        onClick={() => setIsSignup(!isSignup)}
      >
        {isSignup ? 'Already have an account? Log in' : 'No account? Sign up'}
      </button>
    </div>
  );
}

export default Login;
