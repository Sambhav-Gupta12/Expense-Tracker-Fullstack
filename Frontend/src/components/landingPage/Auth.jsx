import React from 'react'
import { useState } from 'react';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from '../../context/AuthContext.jsx';

function Auth() {

    const [isLogin, setIsLogin] = useState(true);

    const [fullName, setFullName] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [emailOrUsername, setEmailOrUsername] = useState("");

    const [error, setError] = useState("");

    const [loading, setLoading] = useState(false);

    const { setUser } = useAuth();

    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        if (!emailOrUsername.trim()) {
            setError("Email or Username is required.");
            return;
        }

        if (!password.trim()) {
            setError("Password is required.");
            return;
        }

        setLoading(true);

        try {

            const payload = {
                password
            };

            if (emailOrUsername.includes("@")) {
                payload.email = emailOrUsername;
            } else {
                payload.username = emailOrUsername;
            }

            const response = await axios.post(
                "http://localhost:8000/api/v1/users/login",
                payload,
                {
                    withCredentials: true,
                }
            );

            setUser(response.data.data.user);

            setEmailOrUsername("");
            setPassword("");

            // const { accessToken, refreshToken, user } = response.data.data;

            navigate("/dashboard");

        } catch (error) {
            console.log(error);

            setError(
                error.response?.data?.message || "Something went wrong"
            );
        } finally {

            setLoading(false);

        }
    }

    const handleRegister = async (e) => {
        e.preventDefault();

        setError("");

        if (!fullName.trim()) {
            setError("Full name is required.");
            return;
        }

        if (!username.trim()) {
            setError("Username is required.");
            return;
        }

        if (username.trim().length < 4) {
            setError("Username must be at least 4 characters.");
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(email)) {
            setError("Please enter a valid email address.");
            return;
        }

        if (!password.trim()) {
            setError("Password is required.");
            return;
        }

        if (password.length < 8) {
            setError("Password must be at least 8 characters long.");
            return;
        }

        setLoading(true);

        try {
            const response = await axios.post("http://localhost:8000/api/v1/users/register", {
                fullName,
                username,
                email,
                password
            },
                {
                    withCredentials: true
                }
            );

            setUser(response.data.data.user);

            // const { user } = response.data.data;

            setEmail("");
            setEmailOrUsername("");
            setFullName("");
            setPassword("");
            setUsername("")

            navigate("/dashboard");

        } catch (error) {
            console.log(error);

            setError(
                error.response?.data?.message || "Something went wrong"
            );
        } finally {

            setLoading(false);

        }
    }

    return (
        <div className="min-h-screen bg-[#0f0f12] text-white">
            <nav className="border-b border-zinc-800">
                <div className="mx-auto flex max-w-7xl items-center justify-between px-8 py-5">
                    <h1 className="text-2xl font-bold">
                        Spend<span className="text-violet-500">Wise</span>
                    </h1>

                    <div className="hidden gap-8 text-zinc-300 md:flex">
                        <a className='cursor-pointer' href="#">Features</a>
                        <a className='cursor-pointer' href="#">Pricing</a>
                        <a className='cursor-pointer' href="#">About</a>
                    </div>

                    <button
                        onClick={() => { setIsLogin(true) }}
                        className="rounded-lg border border-zinc-700 px-5 py-2 hover:bg-zinc-800 cursor-pointer"
                    >
                        Sign In
                    </button>
                </div>
            </nav>

            <div className="grid min-h-[calc(100vh-81px)] lg:grid-cols-2">
                <section className="hidden border-r border-zinc-800 px-14 py-20 lg:flex lg:flex-col lg:justify-center">
                    <span className="w-fit rounded-full bg-violet-100 px-4 py-2 text-sm font-medium text-violet-700">
                        ✨ Smart expense tracking
                    </span>

                    <h2 className="mt-8 text-6xl font-bold leading-tight">
                        Take control of your
                        <span className="block text-violet-500">money effortlessly</span>
                    </h2>

                    <p className="mt-8 max-w-lg text-lg leading-8 text-zinc-400">
                        Track expenses, manage budgets, visualize insights and stay in
                        control of your finances with one clean dashboard.
                    </p>

                    <div className="mt-12 space-y-5 text-zinc-300">
                        {[
                            "UPI, Cash & Card support",
                            "Category wise budgets",
                            "Beautiful analytics",
                            "CSV export"
                        ].map(item => (
                            <div key={item} className="flex items-center gap-3">
                                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-violet-200 text-violet-700">
                                    ✓
                                </div>
                                <p>{item}</p>
                            </div>
                        ))}
                    </div>
                </section>

                <section className="flex items-center justify-center p-8">
                    <div className="w-full max-w-md rounded-2xl border border-zinc-800 bg-[#17171b] p-8 shadow-2xl">
                        <div className="mb-8 flex border-b border-zinc-700">
                            <button
                                type="button"
                                disabled={loading}
                                onClick={() => { setIsLogin(false); setError(""); }}
                                className={`flex-1 pb-3 cursor-pointer ${!isLogin
                                    ? "border-b-2 border-violet-500 text-violet-500"
                                    : "text-zinc-400"
                                    }`}
                            >
                                Create account
                            </button>

                            <button
                                type="button"
                                disabled={loading}
                                onClick={() => { setIsLogin(true); setError(""); }}
                                className={`flex-1 pb-3 cursor-pointer ${isLogin
                                    ? "border-b-2 border-violet-500 text-violet-500"
                                    : "text-zinc-400"
                                    }`}
                            >
                                Sign In
                            </button>
                        </div>

                        <h3 className="text-3xl font-bold">
                            {isLogin ? "Welcome Back" : "Get Started"}
                        </h3>

                        <p className="mt-2 text-zinc-400">
                            {isLogin
                                ? "Sign in to continue."
                                : "Create your free account."}
                        </p>

                        {
                            error && (
                                <p className="text-red-500 text-sm">
                                    {error}
                                </p>
                            )
                        }

                        <form
                            className="mt-8 space-y-5"
                            onSubmit={isLogin ? handleLogin : handleRegister}
                        >
                            {!isLogin && (
                                <input
                                    placeholder="Full Name"
                                    className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-3 outline-none focus:border-violet-500"
                                    value={fullName}
                                    onChange={(e) => { setFullName(e.target.value); setError(""); }}
                                />
                            )}

                            {!isLogin && (
                                <input
                                    placeholder="Username"
                                    className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-3 outline-none focus:border-violet-500"
                                    value={username}
                                    onChange={(e) => { setUsername(e.target.value); setError(""); }}
                                />
                            )}

                            {!isLogin && (
                                <input
                                    type="email"
                                    placeholder="Email"
                                    className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-3 outline-none focus:border-violet-500"
                                    value={email}
                                    onChange={(e) => { setEmail(e.target.value); setError(""); }}
                                />
                            )}

                            {isLogin && (
                                <input
                                    type="text"
                                    placeholder="Email or Username"
                                    className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-3 outline-none focus:border-violet-500"
                                    value={emailOrUsername}
                                    onChange={(e) => { setEmailOrUsername(e.target.value); setError(""); }}
                                />
                            )}

                            <input
                                type="password"
                                placeholder="Password"
                                className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-3 outline-none focus:border-violet-500"
                                value={password}
                                onChange={(e) => { setPassword(e.target.value); setError(""); }}
                            />

                            <button disabled={loading} type='submit' className="w-full cursor-pointer rounded-lg bg-violet-600 py-3 font-semibold transition hover:bg-violet-700">
                                {loading
                                    ? (isLogin ? "Signing In..." : "Creating Account...")
                                    : (isLogin ? "Sign In" : "Create Account")}
                            </button>
                        </form>

                        <p className="mt-8 text-center text-zinc-400">
                            {isLogin ? "Don't have an account?" : "Already have an account?"}
                            <button
                                type="button"
                                onClick={() => { setIsLogin(!isLogin); setError(""); }}
                                className="ml-2 text-violet-500 hover:underline cursor-pointer"
                            >
                                {isLogin ? "Sign Up" : "Sign In"}
                            </button>
                        </p>
                    </div>
                </section>
            </div>
        </div>
    )
}

export default Auth