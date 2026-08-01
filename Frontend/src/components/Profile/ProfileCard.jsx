import React from 'react'
import Row from './Row'
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { useAuth } from '../../context/AuthContext.jsx';
import { useExpense } from '../../context/ExpenseContext.jsx';
import ConfirmModal from '../confirmModal/ConfirmModal.jsx';

function ProfileCard() {

    const [showLogoutModal, setShowLogoutModal] = useState(false);

    const { expenses } = useExpense();

    const { user, setUser } = useAuth();

    const navigate = useNavigate();

    const handleLogout = async (e) => {
        e.preventDefault();

        try {
            await axios.post("http://localhost:8000/api/v1/users/logout",
                {},
                {
                    withCredentials: true,
                });

            setUser(null);
            navigate("/");

        } catch (error) {
            console.log(error);
        }
    }

    const getInitials = (fullName) => {
        return fullName
            .split(" ")
            .map(name => name[0])
            .join("")
            .toUpperCase();
    };

    const joinedDate = new Date(user.createdAt).toLocaleString("en-US", {
        month: "short",
        year: "numeric",
    });

    const transactions = expenses.length;

    return (
        <div className="bg-[#262624] border border-[#494945] rounded-2xl p-6">

            <div className="flex flex-col items-center">
                {user.avatar ? (
                    <img
                        src={user.avatar}
                        alt={user.fullName}
                        className="w-full h-full rounded-full object-cover"
                    />
                ) : (
                    <div className="w-24 h-24 rounded-full bg-[#e5e5f4] flex items-center justify-center text-4xl text-indigo-600">
                        {getInitials(user.fullName)}
                    </div>
                )}

                <h2 className="text-white text-2xl font-semibold mt-4">
                    {user.fullName}
                </h2>

                <p className="text-[#b0b0ac] mt-1">
                    {user.email}
                </p>

                <span className="mt-3 px-4 py-1 rounded-full bg-indigo-600 text-white text-sm">
                    Pro plan
                </span>
            </div>

            <div className="border-t border-[#494945] my-6"></div>

            <div className="space-y-4">
                <Row label="Member since" value={joinedDate} />
                <Row label="Transactions" value={transactions} />
                <Row label="Total tracked" value="₹4.2L" />
                <Row label="Avg savings" value="26%" />
            </div>

            <button className="cursor-pointer w-full mt-6 border border-[#65645f] rounded-xl py-3 text-white hover:bg-[#30302e]">
                Edit profile
            </button>

            <button
                onClick={() => setShowLogoutModal(true)}
                className="cursor-pointer w-full mt-6 border border-[#65645f] rounded-xl py-3 text-white hover:bg-[#30302e]">
                Logout
            </button>

            {
                showLogoutModal && (
                    <ConfirmModal
                        onCancel={() => setShowLogoutModal(false)}
                        onConfirm={handleLogout}
                    />
                )
            }
        </div>
    )
}

export default ProfileCard