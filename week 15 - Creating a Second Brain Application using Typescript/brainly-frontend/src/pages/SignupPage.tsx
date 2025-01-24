import { useRef, useState } from "react";
import { Button } from "../components/ui/Button";
import { BACKEND_URL } from "../config";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const SignupPage = () => {
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const usernameRef = useRef<HTMLInputElement>(null);
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);

    async function signup() {
        setIsLoading(true);
        const username = usernameRef.current?.value;
        const email = emailRef.current?.value;
        const password = passwordRef.current?.value;

        if (!username || !email || !password) {
            alert("All fields are required.");
            setIsLoading(false);
            return;
        }

        try {
            await axios.post(`${BACKEND_URL}/api/v1/signup`, {
                username,
                email,
                password,
            });
            alert("You have Signed Up.");
            navigate('/signin');


        } catch (error) {
            console.error("Signup failed", error);
            alert("Failed to sign up. Please try again.");

        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="bg-black bg-opacity-95 h-full w-screen absolute top-0 justify-center flex items-center z-10">
            <div className="border flex justify-center sm:max-w-94 h-fit bg-white flex-col rounded-lg">
                <div className="bg-slate-100 gap-5 flex flex-col p-10 py-20">
                    
                    <h1 className="text-3xl text-center font-semibold uppercase">
                        Signup to Second Brain
                    </h1>
                    
                    <form onSubmit={(e) => {
                        e.preventDefault();
                        signup();
                    }}
                        className="flex flex-col gap-2 text-sm"
                    >
                        <label htmlFor="username" className="sr-only">Username</label>
                        <input
                            ref={usernameRef}
                            id="username"
                            type="text"
                            className="border w-full rounded px-2 py-1 items-center text-black"
                            placeholder="Username"
                        />

                        <label htmlFor="email" className="sr-only">Email</label>
                        <input
                            ref={emailRef}
                            id="email"
                            type="text"
                            className="border w-full rounded px-2 py-1 items-center text-black"
                            placeholder="Email"
                        />

                        <label htmlFor="password" className="sr-only">Password</label>
                        <input
                            ref={passwordRef}
                            id="password"
                            type="password"
                            className="border w-full rounded px-2 py-1 items-center text-black"
                            placeholder="Password"
                        />

                        <Button
                            variant="tertiary"
                            title="Signup"
                            size="md"
                            onClick={signup}
                            loading={isLoading}
                        />

                    </form>
                    
                </div>
            </div>
        </div>
    );
};
