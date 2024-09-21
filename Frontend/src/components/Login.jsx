import React from 'react';
import { Link } from 'react-router-dom';
import { useForm } from "react-hook-form";
import axios from 'axios';
import toast from 'react-hot-toast';

const Login = ({ isOpen, onClose }) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = async (data) => {
        const userInfo = {
            email: data.email,
            password: data.password,
        };
        await axios.post("http://localhost:5000/user/login", userInfo)
            .then((res) => {
                console.log(res.data);
                if (res.data) {
                    toast.success("Login Successful", { duration: 3000 }); // Toast for 3 seconds
                    localStorage.setItem("Users", JSON.stringify(res.data.user));

                    // Close the modal after successful login
                    onClose();
                }
            })
            .catch((err) => {
                if (err.response) {
                    console.log(err);
                    toast.error("Error: " + err.response.data.message, { duration: 3000 });
                }
            });
    };

    return (
        <div>
            {isOpen && (
                <dialog id="my_modal_3" className="modal" open>
                    <div className="modal-box max-w-full sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl">
                        <form onSubmit={handleSubmit(onSubmit)} method="dialog">
                            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={onClose}>
                                ✕
                            </button>
                            <h3 className="font-bold text-lg text-center">Login</h3>

                            <div className="mt-4 space-y-2">
                                <label htmlFor="email" className="block text-sm font-medium">Email</label>
                                <input
                                    id="email"
                                    type="email"
                                    placeholder="Enter your email"
                                    className="w-full px-3 py-2 border rounded-md outline-none focus:ring-2 focus:ring-pink-500"
                                    {...register("email", { required: true })}
                                />
                                {errors.email && <span className="text-red-500 text-sm">Email is required</span>}
                            </div>

                            {/* Password */}
                            <div className="mt-4 space-y-2">
                                <label htmlFor="password" className="block text-sm font-medium">Password</label>
                                <input
                                    id="password"
                                    type="password"
                                    placeholder="Enter your password"
                                    className="w-full px-3 py-2 border rounded-md outline-none focus:ring-2 focus:ring-pink-500"
                                    {...register("password", { required: true })}
                                />
                                {errors.password && <span className="text-red-500 text-sm">Password is required</span>}
                            </div>

                            <div className="flex flex-col md:flex-row justify-between mt-6 space-y-4 md:space-y-0">
                                <button className="w-full md:w-auto bg-pink-500 text-white rounded-md px-4 py-2 hover:bg-pink-700 duration-200">
                                    Login
                                </button>
                                <p className="text-center md:text-left pt-1">
                                    Not registered? <Link to="/signup" className="underline text-blue-500 cursor-pointer">Signup</Link>
                                </p>
                            </div>
                        </form>
                    </div>
                </dialog>
            )}
        </div>
    );
};

export default Login;
