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
      localStorage.setItem("isAuthenticated", "true");
      navigate("/lesson-planner");
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

        {error && <p className='text-red-500 text-sm'>{error} </p>}

        <Button
          onClick={handleLogin}
          disabled={!email || !password}
          className={`w-full ${
            !email || !password ? "opacity-50 cursor-not-allowed" : ""
          }`}>
          Login
        </Button>
      </Card>
    </div>
  );
}

export default Login;
