import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { API } from "../utils/api";

function EditPassword({ onCancel }) {
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confPassword, setConfPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!oldPassword.trim()) {
            toast.error("Current password is required");
            return;
        }

        if (!newPassword.trim()) {
            toast.error("New password is required");
            return;
        }

        if (!confPassword.trim()) {
            toast.error("Please confirm your new password");
            return;
        }

        if (newPassword !== confPassword) {
            toast.error("Passwords do not match");
            return;
        }

        try {

            const passwordData = {
                oldPassword,
                newPassword,
                confPassword
            }

            const response = await axios.patch(`${API}/users/change-password`,
                passwordData,
                {
                    withCredentials: true
                }
            );

            toast.success(response.data.message);

            onCancel();

        } catch (error) {
            toast.error(error.response?.data?.message || "Unable to change password")
        }
    };

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
                            Change Password
                        </h2>

                        <p className="text-[#b7b5a7] text-sm">
                            Update your account password
                        </p>
                    </div>

                    <button
                        onClick={onCancel}
                        className="text-white/60 hover:text-white text-xl cursor-pointer"
                    >
                        ✕
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">

                    {/* Current Password */}
                    <div>
                        <label className="block text-sm text-[#cbcac4] mb-2">
                            Current Password
                        </label>

                        <input
                            type="password"
                            placeholder="Enter current password"
                            className="w-full h-11 px-4 rounded-lg bg-[#262624] border border-[#494945] text-white placeholder:text-[#777] focus:outline-none focus:border-blue-600 focus:shadow-[0_0_6px_#3b82f6]"
                            value={oldPassword}
                            onChange={(e) => setOldPassword(e.target.value)}
                        />
                    </div>

                    {/* New Password */}
                    <div>
                        <label className="block text-sm text-[#cbcac4] mb-2">
                            New Password
                        </label>

                        <input
                            type="password"
                            placeholder="Enter new password"
                            className="w-full h-11 px-4 rounded-lg bg-[#262624] border border-[#494945] text-white placeholder:text-[#777] focus:outline-none focus:border-blue-600 focus:shadow-[0_0_6px_#3b82f6]"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                        />
                    </div>

                    {/* Confirm Password */}
                    <div>
                        <label className="block text-sm text-[#cbcac4] mb-2">
                            Confirm New Password
                        </label>

                        <input
                            type="password"
                            placeholder="Confirm new password"
                            className="w-full h-11 px-4 rounded-lg bg-[#262624] border border-[#494945] text-white placeholder:text-[#777] focus:outline-none focus:border-blue-600 focus:shadow-[0_0_6px_#3b82f6]"
                            value={confPassword}
                            onChange={(e) => setConfPassword(e.target.value)}
                        />
                    </div>

                    {/* Footer */}
                    <div className="flex justify-end gap-3 pt-3">

                        <button
                            type="button"
                            onClick={onCancel}
                            className="px-5 h-10 rounded-lg bg-white/10 border border-[#494945] text-white hover:bg-white/20 transition cursor-pointer"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            className="px-6 h-10 rounded-lg bg-[#4a41ac] text-white font-semibold hover:bg-[#5a50cf] transition cursor-pointer"
                        >
                            Update Password
                        </button>

                    </div>

                </form>
            </div>
        </div>
    );
}

export default EditPassword;