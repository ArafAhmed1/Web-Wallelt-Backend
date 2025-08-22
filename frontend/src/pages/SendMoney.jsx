import axios from "axios";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom"
export const SendMoney = ()=>{
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const id = params.get("id");
    const name = params.get("name");
    const [amount, setAmount] = useState(0);
    const token = localStorage.getItem("token")
    const navigate = useNavigate();
    
    
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            alert("Please log in to continue")
            navigate("/signin");
        }
    }, [navigate]);

    return <div>
        <div className="h-screen flex items-center justify-center">
            
        <div className="shadow w-125 border border-gray-900 px-10 py-20 rounded-2xl">

        <h1 className="font-extrabold text-4xl flex justify-center">Send Money</h1>
        <div className="h-14 flex justify-between font-bold text-3xl mt-20">

        <div className="flex">
            <div className="mx-2 flex rounded-full h-12 w-12 bg-green-600 text-gray-50 mt-1">
                <div className=" flex flex-col justify-center h-full mx-auto">{name[0]}</div>
            </div>
            <div className="flex flex-col justify-center ml-2 h-full">{name}</div>
        </div>
        </div>
        <div className="mt-10">
            <p className="text-xl font-bold">Amount in Taka</p>
            <input onChange={(e)=>{
                setAmount(e.target.value)
            }} type="number" placeholder="Enter amount" className="mt-5 shadow border w-full p-2 rounded"></input>
        </div>
        <button onClick={async()=>{

            try {
        await axios.post("http://localhost:3000/api/v1/account/transfer",
            {
                to: id,
                amount: Number(amount)
            },
            {headers:{
                Authorization: `Bearer ${token}`
            }}
        )
        alert("Transaction successful")
        navigate('/dashboard')
    } catch (error) {
        alert(error.response?.data?.message || "Transaction failed");
    }


            
        }} className="w-full mx-auto block px-8 py-2 mt-8 rounded-lg bg-green-600 text-2xl text-gray-50 font-bold hover:bg-green-800 active:bg-blue-700">
            Send Money</button>
        </div>
        </div>
    </div>
}
