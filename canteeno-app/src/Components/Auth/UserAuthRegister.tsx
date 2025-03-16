import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { setEmail, setName, setPassword, setPhoneNumber, UserState } from '../../Common/Slices/UserSlice';

export const UserAuthRegister = () => {
    const [userData, setUserData] = useState<UserState>({email: '', name: '', phoneNumber: ''});

    const dispatch = useDispatch();

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setUserData({ ...userData, [id]: value });
    }

    const handleRegister = () => {
        console.log("UserData: ", userData);
        dispatch(setName(userData.name));
        dispatch(setEmail(userData.email));
        dispatch(setPhoneNumber(userData.phoneNumber));
        dispatch(setPassword(userData.password || '')); // password is optional
        
    }
    return (
        <div className="">
            Register
            
                <div>
                    <label htmlFor="username">Username:</label>
                    <input type="text" id="email" name="username" required value={userData.email} onChange={handleInputChange} />
                </div>
                <div>
                    <label htmlFor="name">Name:</label>
                    <input type="text" id="name" name="name" required value={userData.name} onChange={handleInputChange} />
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <input type="password" id="password" name="password" required value={userData.password} onChange={handleInputChange} />
                </div>
                <div>
                    <label htmlFor="phonenumber">Phone Number:</label>
                    <input type="tel" id="phoneNumber" name="phonenumber" required value={userData.phoneNumber} onChange={handleInputChange}/>
                </div>
                <button type="button" onClick={handleRegister}>Register</button>
           
        </div>
    );
}