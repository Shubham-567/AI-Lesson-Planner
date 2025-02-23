import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const demoEmail = "demouser";
  const demoPass = "demopass";

  const handleLogin = () => {
    if (email.trim() === demoEmail && password.trim() === demoPass) {
      sessionStorage.setItem("isAuthenticated", "true");
      navigate("/");
    } else {
      setError("Invalid email or password.");
    }
  };

  return (
    <div className='flex items-center justify-center min-h-screen size-full bg-gray-100'>
      <Card className='p-8 space-y-4 w-96 shadow-lg bg-white rounded-lg'>
        <h2 className='text-xl font-semibold text-center'>Login</h2>

        <Input
          type='text'
          placeholder='Email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          aria-label='Email'
        />

        <Input
          type='text'
          placeholder='Password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          aria-label='Password'
        />

        {error && (
          <div
            className='p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400'
            role='alert'>
            <span className='font-medium'>Error:</span> {error}
          </div>
        )}

        <Button
          onClick={handleLogin}
          disabled={!email || !password}
          className={`w-full ${
            !email || !password ? "opacity-50 cursor-not-allowed" : ""
          }`}>
          Login
        </Button>

        <p>Email: {demoEmail}</p>
        <p>Password: {demoPass}</p>
      </Card>
    </div>
  );
}

export default Login;
