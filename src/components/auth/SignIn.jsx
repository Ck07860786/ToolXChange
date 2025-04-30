"use client";

import { useSignIn, useUser, SignIn as ClerkSignIn } from "@clerk/clerk-react";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff, Wrench, Hammer, Cpu, TouchpadOff, Share2, ShieldCheck, Lightbulb, Mail, Lock } from "lucide-react";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { Label } from "@/components/ui/label";

const SignIn = () => {
    const { isLoaded, signIn, setActive } = useSignIn();
    const { isSignedIn } = useUser();
    const router = useRouter();
    const searchParams = useSearchParams();
    const role = searchParams.get("role") || undefined;
  
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showResetPopup, setShowResetPopup] = useState(false);
    const [resetEmail, setResetEmail] = useState("");
    const [resetCode, setResetCode] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [step, setStep] = useState(1);
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
  
    // If already signed in, redirect
    useEffect(() => {
      if (isSignedIn) {
        router.replace("/user-dashboard");
      }
    }, [isSignedIn, router]);
  
    const handleLogin = async () => {
      if (!isLoaded) return toast.error("SignIn not ready.");
      if (!email || !password) return toast.error("All fields are required.");
      setLoading(true);
  
      try {
        const result = await signIn.create({ identifier: email, password });
        await setActive({ session: result.createdSessionId });
  
        const userRole = result.user?.unsafeMetadata?.role || role;
        toast.success("Login successful!");
        router.push(userRole === "provider" ? "/provider-dashboard" : "/user-dashboard");
      } catch (err) {
        console.error(err);
        const msg = err.errors?.[0]?.message || err.message || "Invalid credentials";
        toast.error(msg);
      } finally {
        setLoading(false);
      }
    };
  
    const handlePasswordReset = async () => {
      if (!resetEmail) return toast.error("Enter your email.");
      setLoading(true);
  
      try {
        await signIn.create({
          strategy: "reset_password_email_code",
          identifier: resetEmail,
        });
        toast.success("Verification code sent!");
        setStep(2);
      } catch (err) {
        console.error(err);
        toast.error(err.errors?.[0]?.message || "Something went wrong.");
      } finally {
        setLoading(false);
      }
    };
  
    const handleResetConfirm = async () => {
      if (!resetCode || !newPassword) return toast.error("All fields are required.");
      setLoading(true);
  
      try {
        const res = await signIn.attemptFirstFactor({
          strategy: "reset_password_email_code",
          code: resetCode,
          password: newPassword,
        });
        await setActive({ session: res.createdSessionId });
        toast.success("Password reset successful!");
        setShowResetPopup(false);
      } catch (err) {
        console.error(err);
        toast.error(err.errors?.[0]?.message || "Reset failed.");
      } finally {
        setLoading(false);
      }
    };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-100">
      {/* Left Hero Section */}
      <div className="hidden md:flex relative w-full md:w-1/2 flex-col items-center justify-center text-white text-center p-12 bg-gradient-to-r from-[#111827] to-[#1F2937] overflow-hidden">
        <Wrench className="absolute opacity-10 text-[180px] top-20 left-16 rotate-[-10deg]" />
        <Hammer className="absolute opacity-10 text-[160px] bottom-20 right-20 rotate-[15deg]" />
        <Cpu className="absolute opacity-10 text-[150px] top-24 right-20 rotate-[-5deg]" />
        <TouchpadOff className="absolute opacity-10 text-[170px] bottom-16 left-24 rotate-[20deg]" />

        <motion.h2
          className="text-5xl font-extrabold z-10"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Welcome back to <span className="text-purple-400">ToolXchange</span>
        </motion.h2>
        <motion.p
          className="text-lg mt-4 max-w-md z-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          Sign in to share, borrow, and discover tools with our community.
        </motion.p>

        <motion.div
          className="mt-6 grid grid-cols-2 gap-6 text-sm max-w-lg z-10"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6 }}
        >
          <div className="flex items-center space-x-3">
            <Share2 className="text-yellow-400" />
            <p>Exchange tools easily</p>
          </div>
          <div className="flex items-center space-x-3">
            <ShieldCheck className="text-green-400" />
            <p>Verified community</p>
          </div>
          <div className="flex items-center space-x-3">
            <Lightbulb className="text-purple-400" />
            <p>Innovate smarter</p>
          </div>
          <div className="flex items-center space-x-3">
            <Cpu className="text-blue-400" />
            <p>Use tech for growth</p>
          </div>
        </motion.div>
      </div>

      {/* Right Form Section */}
      <div className="w-full md:w-1/2 flex items-center justify-center px-4 py-12 md:px-32 bg-gradient-to-br from-blue-50 to-purple-100">
     
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-6 text-zinc">
          Login to Your Account
        </h2>

        <div className="mb-4">
          <Label className="text-sm font-medium text-gray-700 flex items-center gap-2 mb-2">
            <Mail className="text-gray-500" /> Email
          </Label>
          <Input
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="mb-4 relative">
          <Label className="text-sm font-medium text-gray-700 flex items-center gap-2 mb-2">
            <Lock className="text-gray-500" /> Password
          </Label>
          <Input
            type={showPassword ? "text" : "password"}
            placeholder="Your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="pr-10"
            required
          />
          <span
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-10 cursor-pointer text-gray-500 hover:text-gray-800"
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </span>
        </div>

        <div className="text-right mb-4">
          <button
            className="text-sm text-blue-600 hover:underline"
            onClick={() => setShowResetPopup(true)}
          >
            Forgot Password?
          </button>
        </div>

        <Button
          className="w-full  text-white"
          onClick={handleLogin}
          disabled={loading}
        >
          {loading ? "Verifying..." : "Login"}
        </Button>

        <p className="text-center text-sm text-gray-500 mt-4">
          Don’t have an account?{" "}
          <a href="/signup" className="text-blue-600 hover:underline">
            Sign Up
          </a>
        </p>
      </div>

      {/* Reset Password Modal */}
      {showResetPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg p-6 shadow-lg w-[90%] max-w-md">
            <h3 className="text-lg font-semibold mb-4 text-gray-700">
              Reset Password
            </h3>

            {step === 1 ? (
              <>
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={resetEmail}
                  onChange={(e) => setResetEmail(e.target.value)}
                />
                <Button
                  className="w-full mt-4 text-white"
                  onClick={handlePasswordReset}
                  disabled={loading}
                >
                  {loading ? "Sending..." : "Send Code"}
                </Button>
              </>
            ) : (
              <>
                <Input
                  type="text"
                  placeholder="Enter reset code"
                  className="mb-3"
                  value={resetCode}
                  onChange={(e) => setResetCode(e.target.value)}
                />
                <Input
                  type="password"
                  placeholder="New password"
                  className="mb-3"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
                <Button
                  className="w-full bg-green-600 hover:bg-green-700 text-white"
                  onClick={handleResetConfirm}
                  disabled={loading}
                >
                  {loading ? "Resetting..." : "Reset Password"}
                </Button>
              </>
            )}

            <Button
              variant="outline"
              className="w-full mt-3"
              onClick={() => setShowResetPopup(false)}
            >
              Cancel
            </Button>
          </div>
        </div>
      )}
    </div>
    </div>
    
  );
};

export default SignIn;
