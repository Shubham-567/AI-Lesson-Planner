import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/ui/Navbar";

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
      navigate("/lesson-planner");
    } else {
      setError("Invalid email or password.");
    }
  };

  return (
    <>
      <Navbar />

      <div className='flex items-center justify-center min-h-screen bg-background text-foreground'>
        <Card className='p-8 space-y-4 w-96 shadow-lg bg-card text-card-foreground rounded-lg border border-border'>
          <h2 className='text-xl font-semibold text-center'>Login</h2>

          <Input
            type='text'
            placeholder='Email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            aria-label='Email'
          />

          <Input
            type='password'
            placeholder='Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            aria-label='Password'
          />

          {error && (
            <div
              className='p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-100 dark:bg-gray-800 dark:text-red-400'
              role='alert'>
              <span className='font-medium'>Error:</span> {error}
            </div>
          )}

          <Button
            onClick={handleLogin}
            disabled={!email || !password}
            className={`w-full bg-primary text-primary-foreground rounded-md px-4 py-2 font-medium hover:bg-primary/80 disabled:opacity-50 disabled:cursor-not-allowed`}>
            Login
          </Button>

          <p className='text-sm text-muted-foreground text-center'>
            Email: {demoEmail} | Password: {demoPass}
          </p>
        </Card>
      </div>
    </>
  );
}

export default Login;
