import React, { useState } from 'react'
import { useAuth } from '../../context/AuthContext';
import axios from 'axios';
import toast from 'react-hot-toast'
import EditPassword from './EditPassword';
import { API } from "../utils/api";

function EditProfile({ onCancel, onChangePassword }) {

    const { user, setUser } = useAuth();

    const [fullName, setFullName] = useState(user.fullName)
    const [username, setUsername] = useState(user.username)
    const [email, setEmail] = useState(user.email)

    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        setLoading(true);

        if (!fullName.trim()) {
            toast.error("Full name is required");
            return;
        }

        if (!username.trim()) {
            toast.error("Username is required");
            return;
        }

        if (!email.trim()) {
            toast.error("Email is required");
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(email)) {
            toast.error("Enter a valid email");
            return;
        }

        try {

            const editedProfile = {
                fullName: fullName.trim(),
                username: username.trim(),
                email: email.trim()
            }

            const response = await axios.patch(`${API}/users/update-account`,
                editedProfile,
                {
                    withCredentials: true
                }
            );

            setUser(prev => ({
                ...prev,
                ...response.data.data,
            }));

            toast.success("Profile edited successfully")

            onCancel();

        } catch (error) {
            toast.error(error.response?.data?.message || "Unable to edit profile")
        }
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">

            {/* Overlay */}
            <div
                className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                onClick={onCancel}
            />

            {/* Modal */}
            <div className="relative w-[90%] max-w-lg bg-[#1c1c1c] border border-[#494945] rounded-2xl p-6 z-10">

                {/* Header */}
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h2 className="text-2xl font-semibold text-white">
                            Edit Profile
                        </h2>

                        <p className="text-[#b7b5a7] text-sm">
                            Update your account information
                        </p>
                    </div>

                    <button
                        onClick={onCancel}
                        className="text-white/60 hover:text-white text-xl cursor-pointer"
                    >
                        ✕
                    </button>
                </div>

                {/* Form */}
                <form
                    onSubmit={handleSubmit}
                    className="space-y-5">

                    {/* Full Name */}
                    <div>
                        <label className="block text-sm text-[#cbcac4] mb-2">
                            Full Name
                        </label>

                        <input
                            type="text"
                            placeholder="Enter your full name"
                            className="w-full h-11 px-4 rounded-lg bg-[#262624] border border-[#494945] text-white placeholder:text-[#777] focus:outline-none focus:border-blue-600 focus:shadow-[0_0_6px_#3b82f6]"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                        />
                    </div>

                    {/* Username */}
                    <div>
                        <label className="block text-sm text-[#cbcac4] mb-2">
                            Username
                        </label>

                        <input
                            type="text"
                            placeholder="Enter username"
                            className="w-full h-11 px-4 rounded-lg bg-[#262624] border border-[#494945] text-white placeholder:text-[#777] focus:outline-none focus:border-blue-600 focus:shadow-[0_0_6px_#3b82f6]"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>

                    {/* Email */}
                    <div>
                        <label className="block text-sm text-[#cbcac4] mb-2">
                            Email
                        </label>

                        <input
                            type="email"
                            placeholder="Enter email"
                            className="w-full h-11 px-4 rounded-lg bg-[#262624] border border-[#494945] text-white placeholder:text-[#777] focus:outline-none focus:border-blue-600 focus:shadow-[0_0_6px_#3b82f6]"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    {/* Divider */}
                    <div className="border-t border-[#494945] pt-5">

                        <button
                            onClick={() => { onCancel(), onChangePassword() }}
                            type="button"
                            className="w-full h-11 rounded-lg border border-[#494945] text-white hover:bg-[#30302e] transition cursor-pointer"
                        >
                            🔒 Change Password
                        </button>

                    </div>

                    {/* Footer */}
                    <div className="flex justify-end gap-3 pt-2">

                        <button
                            type="button"
                            onClick={onCancel}
                            className="px-5 h-10 rounded-lg bg-white/10 border border-[#494945] text-white hover:bg-white/20 transition cursor-pointer"
                        >
                            Cancel
                        </button>

                        <button
                            disabled={loading}
                            type="submit"
                            className="px-6 h-10 rounded-lg bg-[#4a41ac] text-white font-semibold hover:bg-[#5a50cf] transition cursor-pointer"
                        >
                            {loading ? "Saving..." : "Save Changes"}
                        </button>

                    </div>

                </form>

            </div>
        </div>
    )
}

export default EditProfile