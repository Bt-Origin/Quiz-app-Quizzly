import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function LoginScreen() {
    const [username, setUsername] = useState(null);
    const Navigate = useNavigate()
    const handleLogin = () => {

        if (!username.includes("@")) {
            alert("Not an Email!!")
        } else {
            Navigate("/quiz")
        }
    }
    return (
        <>
            <div className="flex mt-[15%] justify-center rounded-[20px] p-[20px] items-center flex-col m-[280px] bg-[#ffffff6e]">
                <div className='text-[40px] font-semibold'>Enter Email </div>
                <div>
                    <div className="p-[10px]">
                        <input
                            className='w-[280px] h-[30px] rounded-[40px]'
                            type="text"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
            </div>
            <button className='rounded-[40px] bg-[]  border-[1px]  text-[15px] border-zinc-600 mr-[15px] w-[150px] cursor-pointer active:bg-[#c4bbf0] bg-[#2db8d9a3] border-0 py-[10px] px-8 text-[20px]' onClick={handleLogin}>Login</button>
        </div >
        </>
    );
}

export default LoginScreen;
