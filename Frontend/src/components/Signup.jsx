import { Link } from 'react-router-dom';
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from 'react-hot-toast';

const Signup = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = async (data) => {
        const userInfo = {
            fullname: data.fullname,
            email: data.email,
            password: data.password
        };
        await axios.post("http://localhost:5000/user/signup", userInfo)
            .then((res) => {
                console.log(res.data);
                if (res.data) {
                    toast.success("Signup Successful", { duration: 3000 });
                }
                localStorage.setItem("Users", JSON.stringify(res.data.user));
            })
            .catch((err) => {
                if (err.response) {
                    console.log(err);
                    toast.error("Error: " + err.response.data.message, { duration: 3000 });
                }
            });
    };

    return (
        <div className="flex items-center justify-center h-screen px-4 md:px-8">
            <div id="my_modal_3" className="w-full max-w-md border shadow-xl bg-white rounded-lg">
                <div className="p-8 relative">
                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                        ✕
                    </button>
                    <h3 className="font-bold text-lg text-center">Signup</h3>

                    <form onSubmit={handleSubmit(onSubmit)}>
                        {/* Name */}
                        <div className="mt-4 space-y-2">
                            <label htmlFor="fullname">Name</label>
                            <input
                                id="fullname"
                                type="text"
                                placeholder="Enter your Full Name"
                                className="w-full px-3 py-2 border rounded-md outline-none focus:ring-2 focus:ring-pink-500"
                                {...register("fullname", { required: true })}
                            />
                            {errors.fullname && <span className="text-red-500">Name is required</span>}
                        </div>

                        {/* Email */}
                        <div className="mt-4 space-y-2">
                            <label htmlFor="email">Email</label>
                            <input
                                id="email"
                                type="email"
                                placeholder="Enter your email"
                                className="w-full px-3 py-2 border rounded-md outline-none focus:ring-2 focus:ring-pink-500"
                                {...register("email", { required: true })}
                            />
                            {errors.email && <span className="text-red-500">Email is required</span>}
                        </div>

                        {/* Password */}
                        <div className="mt-4 space-y-2">
                            <label htmlFor="password">Password</label>
                            <input
                                id="password"
                                type="password"
                                placeholder="Enter your password"
                                className="w-full px-3 py-2 border rounded-md outline-none focus:ring-2 focus:ring-pink-500"
                                {...register("password", { required: true })}
                            />
                            {errors.password && <span className="text-red-500">Password is required</span>}
                        </div>

                        <div className="flex flex-col items-center justify-center mt-6 space-y-4 md:flex-row md:space-y-0 md:space-x-4">
                            <button className="w-full md:w-auto bg-pink-500 text-white rounded-md px-4 py-2 hover:bg-pink-700 duration-200">
                                Signup
                            </button>
                            <p className="text-center">
                                Have an account? <Link to="/" className="underline text-blue-500 cursor-pointer">Login</Link>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Signup;
