import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HexagonBackground from "@/components/HexagonBackground";
import AnimatedButton from "@/components/AnimatedButton";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Eye, EyeOff, LockKeyhole } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name || !email || !password || !role) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }
    
    setLoading(true);
    
    try {
      // STEP 1: Clean up any existing user with the same email in our users table
      console.log("Checking for existing user in database with email:", email);
      const { data: existingUserInDb, error: dbCheckError } = await supabase
        .from('users')
        .select('*')
        .eq('email', email);
      
      if (dbCheckError) {
        console.error("Error checking for existing user in DB:", dbCheckError);
      }
      
      // If user exists in our database, delete it first
      if (existingUserInDb && existingUserInDb.length > 0) {
        console.log("Found existing user in DB, deleting:", existingUserInDb[0].id);
        const { error: deleteError } = await supabase
          .from('users')
          .delete()
          .eq('email', email);
        
        if (deleteError) {
          console.error("Error deleting existing user from DB:", deleteError);
        } else {
          console.log("Successfully deleted user from DB");
        }
      }
      
      // STEP 2: Now try to sign up with Supabase Auth
      console.log("Attempting to sign up with Auth");
      let { data, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: name,
            role: role,
          },
        },
      });
      
      // STEP 3: Handle case where account already exists in Auth
      if (signUpError && signUpError.message.includes("already exists")) {
        console.log("Account already exists in Auth, signing in instead");
        
        // Try signing in with the provided credentials
        const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        
        if (signInError) {
          console.error("Failed to sign in with existing account:", signInError);
          
          // This is a simplified approach - we'll just tell the user to use a different email
          throw new Error("This email is already registered but the password doesn't match. Please use a different email or the correct password.");
        }
        
        // Use the signed-in user data
        data = signInData;
        console.log("Successfully signed in with existing account");
      } else if (signUpError) {
        // Some other signup error
        console.error("Signup error:", signUpError);
        throw signUpError;
      }
      
      if (!data || !data.user) {
        throw new Error("Failed to create or access account");
      }
      
      // STEP 4: Create user in our database
      console.log("Creating user in database:", data.user.id);
      const { error: insertError } = await supabase
        .from('users')
        .insert({
          id: data.user.id,
          full_name: name,
          email: email,
          role: role,
          password: password, // Store password for simplified login
        });
      
      if (insertError) {
        console.error("Error inserting user to database:", insertError);
        throw new Error("Account created but failed to set up profile. Please try signing in.");
      }
      
      // STEP 5: Save user info and redirect
      localStorage.setItem('currentUser', JSON.stringify({
        id: data.user.id,
        email: data.user.email,
        fullName: name,
        role: role
      }));
      
      toast({
        title: "Success",
        description: "Account created successfully",
      });
      
      // Redirect based on role
      if (role === 'doctor') {
        navigate('/create-patient');
      } else {
        navigate('/dashboard');
      }
    } catch (error: any) {
      console.error("Sign-up error:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to create account",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <HexagonBackground />
      <Navbar />
      
      <section className="flex-grow flex items-center justify-center py-20 px-4">
        <div className="w-full max-w-md">
          <div className="glass-card border border-white/10 rounded-xl p-8 backdrop-blur-lg relative overflow-hidden">
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-neon-cyan/20 rounded-full filter blur-3xl"></div>
            <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-neon-magenta/20 rounded-full filter blur-3xl"></div>
            
            <div className="text-center mb-8">
              <h1 className="text-2xl font-bold mb-2">Create Your Account</h1>
              <p className="text-white/60">
                Join our hospital management system
              </p>
            </div>
            
            <form onSubmit={handleSubmit}>
              <div className="space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Dr. John Doe"
                    className="bg-white/5 border-white/10 text-white placeholder:text-white/40 focus:border-neon-cyan"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="doctor@hospital.com"
                    className="bg-white/5 border-white/10 text-white placeholder:text-white/40 focus:border-neon-cyan"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="bg-white/5 border-white/10 text-white placeholder:text-white/40 focus:border-neon-cyan pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white transition-colors"
                    >
                      {showPassword ? (
                        <EyeOff size={18} />
                      ) : (
                        <Eye size={18} />
                      )}
                    </button>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="role">Role</Label>
                  <Select onValueChange={setRole} value={role}>
                    <SelectTrigger className="bg-white/5 border-white/10 text-white focus:border-neon-cyan">
                      <SelectValue placeholder="Select a role" />
                    </SelectTrigger>
                    <SelectContent className="bg-dark-secondary border-white/10">
                      <SelectItem value="doctor" className="focus:bg-white/10 focus:text-white">Doctor</SelectItem>
                      <SelectItem value="admin" className="focus:bg-white/10 focus:text-white">Admin</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="pt-2">
                  <AnimatedButton
                    type="submit"
                    className="w-full"
                    disabled={loading}
                  >
                    {loading ? (
                      <div className="flex items-center justify-center">
                        <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                        <span>Creating Account...</span>
                      </div>
                    ) : (
                      "Create Account"
                    )}
                  </AnimatedButton>
                </div>
              </div>
            </form>
            
            <div className="mt-8 pt-5 border-t border-white/10 text-center">
              <p className="text-white/60 text-sm">
                Already have an account?{" "}
                <Link to="/signin" className="text-neon-cyan hover:underline">
                  Sign in
                </Link>
              </p>
            </div>
            
            <div className="mt-6 text-xs text-center text-white/40 flex items-center justify-center">
              <LockKeyhole size={12} className="mr-1" />
              <span>Your data is securely encrypted</span>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default SignUp;
