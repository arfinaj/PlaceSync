import { useState } from "react";

function Register() {

    const [formData,setFormData]=useState({
        fullName: "",
        email: "",
        password: "",
        confirmPassword: "",
        role: "Student"
    })

    const handleSubmit=async (e)=>{
        e.preventDefault();

        if(formData.password!==formData.confirmPassword){
            alert("Passwords do not match");
            return;
        }

        try{
            const response=await fetch("http://localhost:5000/api/auth/register",{
                method:"POST",
                headers:{
                    "Content-Type": "application/json",
                },
                body:JSON.stringify({
                    name: formData.fullName,
                    email: formData.email,
                    password: formData.password,
                    role: formData.role
                }),
            });

            const data= await response.json();
            console.log(data);
            
            
        }
        catch(error){
            console.error("Error registering user:", error);
        }
        
        
    
    }



  return (
    <div className="min-h-screen bg-[#0B1220] flex items-center justify-center px-6 py-12 text-white">
      
      <div className="w-full max-w-md rounded-2xl bg-slate-900 p-8 shadow-xl">
        
        {/* Heading */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold">
            Create your account
          </h1>

          <p className="mt-2 text-gray-400">
            Join PlaceSync and get started
          </p>
        </div>

        {/* Registration Form */}
        <form className="space-y-5" onSubmit={handleSubmit}>

          {/* Name */}
          <div>
            <label className="mb-2 block text-sm font-medium">
                
              Full Name
            </label>

            <input
              type="text"
              placeholder="Enter your full name"
              className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 outline-none focus:border-blue-500"
              value={formData.fullName}
              onChange={(e)=>setFormData({...formData, fullName:e.target.value})}
            />
          </div>

          {/* Email */}
          <div>
            <label className="mb-2 block text-sm font-medium">
              Email
            </label>

            <input
              type="email"
              placeholder="Enter your email"
              className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 outline-none focus:border-blue-500"
              value={formData.email}
              onChange={(e)=>setFormData({...formData, email:e.target.value})}
            />
          </div>

          {/* Password */}
          <div>
            <label className="mb-2 block text-sm font-medium">
              Password
            </label>

            <input
              type="password"
              placeholder="Create a password"
              className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 outline-none focus:border-blue-500"
              value={formData.password}
              onChange={(e)=>setFormData({...formData, password:e.target.value})}
            />
          </div>

          {/* Confirm Password */}
          <div>
            <label className="mb-2 block text-sm font-medium">
              Confirm Password
            </label>

            <input
              type="password"
              placeholder="Confirm your password"
              className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 outline-none focus:border-blue-500"
              value={formData.confirmPassword}
              onChange={(e)=>setFormData({...formData, confirmPassword:e.target.value})}
            />
          </div>

          {/* Role */}
          <div>
            <label className="mb-2 block text-sm font-medium">
              I am a
            </label>

            <select
              className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 outline-none focus:border-blue-500"
              value={formData.role}
              onChange={(e)=>setFormData({...formData, role:e.target.value})}
            >
              <option value="Student">Student</option>
              <option value="Recruiter">Recruiter</option>
            </select>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full rounded-lg bg-blue-600 py-3 font-semibold transition hover:bg-blue-700"
          >
            Create Account
          </button>

        </form>

        {/* Login link */}
        <p className="mt-6 text-center text-sm text-gray-400">
          Already have an account?{" "}
          <a
            href="/login"
            className="font-medium text-blue-400 hover:text-blue-300"
          >
            Login
          </a>
        </p>

      </div>
    </div>
  );
}

export default Register;