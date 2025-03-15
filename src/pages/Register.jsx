import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/ui/Navbar";
import axios from "axios";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    if (!email.trim() || !password.trim() || !confirmPassword.trim()) {
      setError("All fields are required.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      await axios.post("http://localhost:5000/register", {
        email,
        password,
      });

      navigate("/login");
    } catch (error) {
      setError(error.response?.data?.error || "Server error. Try again later.");
    }
  };

  return (
    <>
      <Navbar />

      <div className='flex items-center justify-center min-h-screen bg-background text-foreground'>
        <Card className='p-8 space-y-4 w-96 shadow-lg bg-card text-card-foreground rounded-lg border border-border'>
          <h2 className='text-xl font-semibold text-center'>Register</h2>

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

          <Input
            type='password'
            placeholder='Confirm Password'
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            aria-label='Confirm Password'
          />

          {error && (
            <div
              className='p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-100 dark:bg-gray-800 dark:text-red-400'
              role='alert'>
              <span className='font-medium'>Error:</span> {error}
            </div>
          )}

          <Button
            onClick={handleRegister}
            disabled={!email || !password || !confirmPassword}
            className={`w-full bg-primary text-primary-foreground rounded-md px-4 py-2 font-medium hover:bg-primary/80 disabled:opacity-50 disabled:cursor-not-allowed`}>
            Register
          </Button>

          <p className='text-sm text-muted-foreground text-center'>
            Already have an account?{" "}
            <a href='/login' className='text-primary'>
              Login
            </a>
          </p>
        </Card>
      </div>
    </>
  );
}

export default Register;
