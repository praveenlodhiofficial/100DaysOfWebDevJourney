import { useRef, useState } from "react";
import { Button } from "../components/ui/Button";
import { BACKEND_URL } from "../config";
import axios from "axios";

export const SigninPage = () => {
    const usernameOrEmailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const [isLoading, setIsLoading] = useState(false);

    async function signin() {
        setIsLoading(true);
        const usernameOrEmail = usernameOrEmailRef.current?.value;
        const password = passwordRef.current?.value;

        // Validation: Ensure at least one field (username or email) and password is provided
        if (!usernameOrEmail || !password) {
            alert("Username/Email and password are required.");
            setIsLoading(false);
            return;
        }

        try {
            await axios.post(BACKEND_URL + "api/v1/signin", {
                usernameOrEmail,
                password,
            });
            alert("You have signed in successfully.");
        } catch (error) {
            console.error("Signin failed", error);
            alert("Failed to sign in. Please check your credentials and try again.");
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="bg-black bg-opacity-95 h-full w-screen absolute top-0 justify-center flex items-center z-10">
            <div className="border flex justify-center sm:max-w-94 h-fit bg-white flex-col rounded-lg">
                <div className="bg-slate-100 gap-5 flex flex-col p-10 py-20">
                    <h1 className="text-3xl text-center font-semibold uppercase">
                        Sign in to Second Brain
                    </h1>
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            signin();
                        }}
                        className="flex flex-col gap-2 text-sm"
                    >
                        {/* Username or Email Input */}
                        <input
                            ref={usernameOrEmailRef}
                            type="text"
                            className="border w-full rounded px-2 py-1 items-center text-black"
                            placeholder="Username or Email"
                        />
                        {/* Password Input */}
                        <input
                            ref={passwordRef}
                            type="password"
                            className="border w-full rounded px-2 py-1 items-center text-black"
                            placeholder="Password"
                        />
                        {/* Signin Button */}
                        <Button
                            variant="tertiary"
                            title="Sign In"
                            size="md"
                            onClick={signin}
                            loading={isLoading}
                        />
                    </form>
                </div>
            </div>
        </div>
    );
};
