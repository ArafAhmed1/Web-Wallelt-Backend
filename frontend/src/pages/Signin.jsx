import { Link, useNavigate } from "react-router-dom"
import axios from "axios"

export const Signin = ()=>{
    const navigate = useNavigate()
    async function submitForm() {
        const username = document.getElementById('un').value
        const password = document.getElementById('pw').value

        const response = await axios.post("http://localhost:3000/api/v1/user/signin",
            {
                username,
                password
            })
        localStorage.setItem("token", response.data.token)
        alert("Logged in successfully")
        navigate('/dashboard')
    }

    return <div>
        <div className="bg-gray-50 mt-30 w-125 mx-auto rounded-4xl px-10 py-10 border">
            <p className="font-bold text-5xl pt-3 text-center">Sign In</p>
            <p className="pt-3 text-center">Enter credential to access your account</p>
            <p className="mt-10 text-xl font-bold">Username</p>
            <input id="un" className="mt-2 w-full border p-2 rounded"></input>
            <p className="mt-7 text-xl font-bold">Password</p>
            <input id="pw" type="password" className="mt-2 w-full border p-2 rounded"></input>
            <br/>
            <button onClick={submitForm} className="w-full mx-auto block px-40 py-2 mt-8 rounded-lg bg-gray-800 text-2xl text-gray-200 font-bold hover:bg-gray-700 active:bg-blue-700">Submit</button>
            
            <div className="flex justify-center">
                <p className="mt-2">Don't have an account?</p>
                <Link to="/signup" className="mt-2 ml-2 text-blue-900 underline">Sign up</Link>
            </div>
        </div>
    </div>
}