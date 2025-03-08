import React, { useState, useEffect } from 'react';
import fb from '../assets/fb.png';
import { useNavigate } from 'react-router-dom';

function Register() {
    const [user, setUser ] = useState('');
    const navigate = useNavigate();
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [userarr, setUser_Arr] = useState([]);
    const [passarr, setPassArr] = useState([]);
    const [currNames, setCurrNames] = useState([]); // New state to hold current names
    const [showRegister, setShowRegister] = useState(true);

    useEffect(() => {
        fetch('http://localhost:5000/getthis')
            .then(response => {
                if (!response.ok) throw new Error('Network response was not ok');
                return response.json();
            })
            .then(data => setUser_Arr(data.map(user => user.user)))
            .catch(error => console.error('Error fetching users:', error));

        fetch('http://localhost:5000/getPass')
            .then(response => {
                if (!response.ok) throw new Error('Network response was not ok');
                return response.json();
            })
            .then(data => setPassArr(data.map(password => password.password)))
            .catch(error => console.error('Error fetching passwords:', error));

        fetch('http://localhost:5000/getcurr') 
            .then(response => {
                if (!response.ok) throw new Error('Network response was not ok');
                return response.json();
            })
            .then(data => setCurrNames(data.map(user => user.curr_name)))
            .catch(error => console.error('Error fetching current names:', error));
    }, []);

    const handleRegister = async () => {
        if (!user || !password || !confirmPassword) {
            alert("Please enter something.");
            return;
        }

        if (userarr.includes(user)) {
            alert("Username already exists.");
            return;
        }

        if (passarr.includes(password)) {
            alert("Password already exists.");
            return;
        }

        if (password !== confirmPassword) {
            alert("Passwords do not match.");
            return;
        }

        try {
           
            await fetch('http://localhost:5000/addusername', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ user, name })
            });

          
            await fetch('http://localhost:5000/addpassword', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ password })
            });

           
            await fetch('http://localhost:5000/addcurr', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ curr_user: user, curr_name: name }) // Use name as curr_name
            });

            setUser_Arr([...userarr, user]);
            setPassArr([...passarr, password]);
            setCurrNames([...currNames, name]); 
            alert('Register successful');
            setShowRegister(false);
        } catch (error) {
            alert("Error adding user or password: " + error);
        }
    };

    const handleLogin = async () => {
        if (!user || !password) {
            alert("Fields cannot be empty");
            return;
        }

        const userIndex = userarr.indexOf(user);
        if (userIndex === -1) {
            alert("User  does not exist");
            return;
        }

        if (passarr[userIndex] === password) {
  

           

            navigate('/'); 
        } else {
            alert("Incorrect password");
        }
    };

    

    return (
        <div className="bg-[#282E48] min-h-screen flex items-center justify-center">
            <div className="w-[25rem] h-auto bg-white mx-auto relative rounded-md p-6">
                <div className="font-semibold text-[1.5rem] text-center">{showRegister ? 'SignUp' : 'Login'}</div>
                <br />
                <form className="ml-7">
                    {showRegister && (
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="border border-gray-400 w-[90%] h-[3rem] p-4 mb-4"
                            placeholder="Enter name"
                        />
                    )}
                    <input
                        type="text"
                        value={user}
                        onChange={(e) => setUser (e.target.value)}
                        className="border border-gray-400 w-[90%] h-[3rem] p-4 mb-4"
                        placeholder="Username"
                    />
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="border border-gray-400 w-[90%] h-[3rem] p-4 mb-4"
                        placeholder="Enter Password"
                    />
                    {showRegister && (
                        <input
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="border border-gray-400 w-[90%] h-[3rem] p-4 mb-4"
                            placeholder="Re-enter password"
                        />
                    )}
                </form>
                <div className="text-center text-[#282E48] cursor-pointer hover:underline mb-4">
                    Forgot Password?
                </div>
                <div className="text-center mb-4">
                    <button
                        type="button"
                        className="text-white bg-[#282E48] py-3 px-[8rem] rounded-md"
                        onClick={showRegister ? handleRegister : handleLogin}
                    >
                        {showRegister ? 'SignUp' : 'Login'}
                    </button>
                </div>
                <div className="text-center mb-4">
                    {showRegister ? 'Already Have an account? ' : "Don't have an account? "}
                    <span
                        className="text-[#282E48] cursor-pointer hover:underline"
                        onClick={() => setShowRegister(!showRegister)}
                    >
                        {showRegister ? 'Login' : 'SignUp'}
                    </span>
                </div>
                <div className="flex items-center mb-4">
                    <hr className="flex-grow" /> <span className="px-2">Or</span> <hr className="flex-grow" />
                </div>
                <div className="flex items-center justify-center mb-3">
                    <img src={fb} alt="Facebook" className="rounded-full w-[2rem] h-[2rem] bg-white p-2 mr-4" />
                    <button
                        type="button"
                        className="text-white bg-[#282E48] py-3 px-[5.6rem] rounded-md text-[0.85rem]"
                    >
                        {showRegister ? 'Sign Up' : 'Login'} with Facebook
                    </button>
                </div>
                <div className="flex items-center justify-center">
                <img src="images/google.png" alt="Google" className="rounded-full w-[2rem] h-[2rem] bg-white p-2 mr-4" />
                    <button
                        type="button"
                        className="text-white bg-[#282E48] py-3 px-[6rem] rounded-md text-[0.85rem]"
                    >
                        {showRegister ? 'Sign Up' : 'Login'} with Google
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Register;