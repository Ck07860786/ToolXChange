"use client";

import { useSignUp } from "@clerk/clerk-react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff, Wrench, Hammer, Cpu, TouchpadOff, Share2, ShieldCheck, Lightbulb } from "lucide-react";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { toast } from "sonner";
import { motion } from "framer-motion";

const SignUp = () => {
  const { isLoaded, signUp } = useSignUp(); // include isLoaded
  const router = useRouter();

  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSignup = async () => {
    if (!isLoaded) {
      toast.error("SignUp module not loaded yet.");
      return;
    }
    if (!email || !password || !name || !phone || !address) {
      return toast.error("Please fill in all fields.");
    }
  
    setLoading(true);
    const toastId = toast.loading("Creating account…");
    try {
      console.log("🚀 Calling signUp.create with:", {
        emailAddress: email,
        password,
        phoneNumber: phone,       // we’ll adjust this next…
        firstName: name,
        unsafeMetadata: { role: "user", address },
      });
  
      await signUp.create({
        emailAddress: email,
        password,
        phoneNumber: phone,       // <-- keep this so we can see the raw failure
        firstName: name,
        unsafeMetadata: { role: "user", address },
      });
  
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });
      toast.success("Verification code sent to your email", { id: toastId });
      setStep(2);
    } catch (err) {
      // 1) Dump the full error
      console.error("❌ signUp.create error:", err);
  
      // 2) Grab the best message we can find
      const msg =
        err.errors?.[0]?.message || // Clerk structured errors
        err.longMessage    ||       // sometimes Clerk returns a longMessage
        err.message        ||       // fallback JS Error message
        "Signup failed.";
  
      toast.error(msg, { id: toastId });
    } finally {
      setLoading(false);
    }
  };
  
  

  const handleVerify = async (e) => {
    e.preventDefault();
    if (!isLoaded) {
      toast.error("SignUp module not ready yet.");
      return;
    }
    if (code.length !== 6) {
      toast.error("Enter the complete 6-digit code");
      return;
    }
  
    setLoading(true);
    const toastId = toast.loading("Verifying code…");
  
    try {
      const result = await signUp.attemptEmailAddressVerification({ code });
      console.log("🔍 attemptEmailAddressVerification result:", result);
  
      switch (result.status) {
        case "needs_activation":
          console.log("→ Code OK, now activating account…");
          await signUp.activate();
          console.log("✅ Activation complete!");
          toast.success("Signup complete!", { id: toastId });
          router.push("/user-dashboard");
          break;
  
        case "complete":
          console.log("→ Already fully verified & activated!");
          toast.success("Already verified – redirecting…", { id: toastId });
          router.push("/user-dashboard");
          break;
  
        default:
          console.warn("⚠️ Unexpected status:", result.status);
          toast.error(`Verification ${result.status}`, { id: toastId });
      }
    } catch (err) {
      console.error("❌ Verification error:", err);
      // Clerk’s error shape sometimes puts the message in `err.errors[0].message`
      const msg = err.errors?.[0]?.message || err.message || "Invalid verification code.";
      toast.error(msg, { id: toastId });
    } finally {
      setLoading(false);
    }
  };
  
  const resendCode = async () => {
    if (!isLoaded) return toast.error("SignUp module not ready yet.");

    const toastId = toast.loading("Resending verification code...");
    try {
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });
      toast.success("New code sent to your email!", { id: toastId });
    } catch {
      toast.error("Failed to resend code", { id: toastId });
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

        <motion.h2 className="text-5xl font-extrabold z-10" initial={{ opacity: 0, y: -30 }} animate={{ opacity: 1, y: 0 }}>
          Welcome to <span className="text-purple-400">ToolXchange</span>
        </motion.h2>
        <motion.p className="text-lg mt-4 max-w-md z-10" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          Share, borrow, and discover tools with a trusted community.
        </motion.p>

        <motion.div className="mt-6 grid grid-cols-2 gap-6 text-sm max-w-lg z-10" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.6 }}>
          <div className="flex items-center space-x-3"><Share2 className="text-yellow-400" /><p>Exchange tools easily</p></div>
          <div className="flex items-center space-x-3"><ShieldCheck className="text-green-400" /><p>Verified community</p></div>
          <div className="flex items-center space-x-3"><Lightbulb className="text-purple-400" /><p>Innovate smarter</p></div>
          <div className="flex items-center space-x-3"><Cpu className="text-blue-400" /><p>Use tech for growth</p></div>
        </motion.div>
      </div>

      {/* Right Form Section */}
      <div className="w-full md:w-1/2 flex items-center justify-center px-4 py-12 md:px-32 bg-gradient-to-br from-blue-50 to-purple-100">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 space-y-6">
          <h2 className="text-2xl font-bold text-center text-gray-800">
            {step === 1 ? "Create Your Account" : "Verify Email"}
          </h2>

          {step === 1 ? (
            <div className="space-y-4">
              <Input placeholder="Full Name" value={name} onChange={(e) => setName(e.target.value)} required />
              <Input placeholder="Phone Number" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} required />
              <Input placeholder="Address" value={address} onChange={(e) => setAddress(e.target.value)} required />
              <Input placeholder="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
              <div className="relative">
                <Input
                  placeholder="Password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pr-10"
                />
                <span onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-2/4 -translate-y-1/2 cursor-pointer text-gray-500 hover:text-gray-800">
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </span>
              </div>
              <Button className="w-full" onClick={handleSignup} disabled={loading}>
                {loading ? "Creating..." : "Create Account"}
              </Button>
            </div>
          ) : (
            <form onSubmit={handleVerify} className="space-y-4">
              <InputOTP maxLength={6} value={code} onChange={setCode}>
                <InputOTPGroup>
                  {Array.from({ length: 6 }).map((_, idx) => (
                    <InputOTPSlot key={idx} index={idx} />
                  ))}
                </InputOTPGroup>
              </InputOTP>
              <Button className="w-full" type="submit" disabled={loading}>
                {loading ? "Verifying..." : "Verify"}
              </Button>
              <button type="button" onClick={resendCode} className="text-blue-500 underline text-sm">
                Resend Code
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default SignUp;
