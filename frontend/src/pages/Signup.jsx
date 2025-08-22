import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export const Signup = ()=>{
    const navigate = useNavigate();
    async function submitForm(){
        const firstName = document.getElementById('fn').value;
        const lastName = document.getElementById('ln').value;
        const username = document.getElementById('un').value;
        const password = document.getElementById('pw').value;

        await axios.post("http://localhost:3000/api/v1/user/signup",
            {
                firstName,
                lastName,
                username,
                password
            })
        alert("Successfully created an account. Now sign in to access your account!S")
        navigate('/signin')
    }
    return <div>
        <div className="bg-gray-50 mt-30 w-125 mx-auto rounded-4xl px-10 pb-10 pt-10 border-1">
            <p className="font-bold text-5xl pt-3 text-center">Sign Up</p>
            <p className="pt-3 text-center">Enter your information to create an account</p>
            <p className="mt-15 text-xl font-bold">First Name</p>
            <input id="fn" className="mt-2 w-full border p-2 rounded"></input>
            <p className="mt-3 text-xl font-bold">Last Name</p>
            <input id="ln" className="mt-2 w-full border p-2 rounded"></input>
            <p className="mt-3 text-xl font-bold">Username</p>
            <input id="un" className="mt-2 w-full border p-2 rounded"></input>
            <p className="mt-3 text-xl font-bold">Password</p>
            <input id="pw" type="password" className="mt-2 w-full border p-2 rounded"></input>
            <br/>
            <button className="w-full mx-auto block py-2 mt-8 rounded-lg bg-gray-800 text-2xl text-gray-200 font-bold hover:bg-gray-700 active:bg-blue-700"
                onClick={submitForm}>Submit</button>
            
            <div className="flex justify-center">
                <p className="mt-2">Already have an account?</p>
                <Link to="/signin" className="mt-2 ml-2 text-blue-900 underline">login</Link>
            </div>
        </div>
    </div>
}