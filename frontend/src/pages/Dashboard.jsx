import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const Dashboard = ()=>{
    const [input, setInput] = useState("");
    const [users, setUsers] = useState([]);
    const [balance, setBalance] = useState(0);
    const [showLogout, setShowLogout] = useState(false);
    const navigate = useNavigate();
    const logoutRef = useRef();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            alert("Please log in to continue")
            navigate("/signin");
        }
    }, [navigate]);   

    useEffect(()=>{
        const token = localStorage.getItem("token")
        const fetchBalance = async()=>{
            const response = await axios.get("http://localhost:3000/api/v1/account/balance",
                {headers:{
                    Authorization: `Bearer ${token}`
                }
                }
            )
            setBalance(response.data.balance)
        }
        fetchBalance();
    }, [])

    useEffect(()=>{
        const token = localStorage.getItem("token")
        const fetchUsers = async ()=>{
            const response = await axios.get(`http://localhost:3000/api/v1/user/bulk?filter=${input}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            )
            setUsers(response.data.users)
        };
        fetchUsers();

    },[input])

    useEffect(() => {
        function handleClick(e) {
            if (
                showLogout &&
                logoutRef.current &&
                !logoutRef.current.contains(e.target)
            ) {
                setShowLogout(false);
            }
        }
        if (showLogout) {
            document.addEventListener("mousedown", handleClick);
        }
        return () => {
            document.removeEventListener("mousedown", handleClick);
        };
    }, [showLogout]);

    return <div>
    <div className="shadow h-14 flex justify-between">
        <div className="text-pink-600 flex flex-col justify-center h-full text-xl ml-4 font-bold">Bkash Web Pay</div>
        <div className="flex relative">
            <div className="flex flex-col justify-center h-full">Hello</div>
            <button
                className="rounded-full w-12 bg-slate-200 mt-1 hover:bg-green-200 cursor-pointer flex flex-col justify-center h-12 mx-5"
                onClick={() => setShowLogout((prev) => !prev)}
            >
                U
            </button>
            {showLogout && (
                <div ref={logoutRef} className="absolute right-0 top-16 bg-white z-10">
                    <button
                        className="bg-gray-900 text-gray-50 font-bold px-4 py-2 hover:bg-gray-600 rounded"
                        onClick={() => {
                            localStorage.removeItem("token");
                            navigate("/signin");
                            alert("Successfully logged out");
                        }}
                    >
                        Logout
                    </button>
                </div>
            )}
        </div>
    </div>
    <div className="mx-10 mt-10">
        <div className="flex">
            <div className="font-bold text-lg">Your Balance</div>
            <div className="font-semibold text-lg ml-5">Tk {balance}</div>
        </div>
        <div>
            <div className="font-bold mt-6 text-lg">Users</div>
            <div className="my-2">
                <input onChange={(e)=>{
                    setInput(e.target.value)
                }} type="text" placeholder="Search users..." className="mt-2 w-full border p-2 rounded"></input>
            </div>
        </div>
        <div>
            {users.map(user=><User key={user._id} user={user}/>)}
        </div>
    </div>
    </div>
}

function User({user}){
    const navigate = useNavigate();
    return (
        <div className="flex items-center justify-between my-2">
            <div className="flex items-center my-2">
            <div className="flex items-center justify-center rounded-full h-12 w-12 bg-slate-200 mr-4">
                {user.firstName[0]}
            </div>
            <div className="font-semibold mr-4">
                {user.firstName} {user.lastName}
            </div>
            </div>
            <button onClick={()=>navigate(`/send?id=${user._id}&name=${user.firstName} ${user.lastName}`)} className="py-2 px-4 rounded-lg bg-gray-800 text-gray-200 font-bold hover:bg-gray-700 active:bg-blue-700 cursor-pointer">
                Send Money
            </button>
        </div>
    );
}