import React from "react";
import { MDBInput } from "mdb-react-ui-kit";
import { AuthAPI } from "../global/AuthAPI";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../global/Hooks";
import { setUser } from "../global/AuthSlice";

const initialState = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: ""
};

export const Auth = (): JSX.Element => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [formValue, setFormValue] = React.useState(initialState);
    const [showRegister, setShowRegister] = React.useState(false);
    const { firstName, lastName, email, 
        password, confirmPassword } = formValue;

    const [login, {
        isSuccess: isLoginSuccess, 
        isError: isLoginError, 
        error: loginError, 
        data: loginData
    }] = AuthAPI.useLoginMutation();

    const [register, {
        isError: isRegisterError,
        isSuccess: isRegisterSuccess,
        error: registerError,
        data: registerData
    }] = AuthAPI.useRegisterMutation();
    
    const handleChange = 
    (event: React.ChangeEvent<HTMLInputElement>) => {
        setFormValue({...formValue, 
            [event.target.name]: event.target.value});
    };

    const handleLogin = async () => {
        if (email && password) {
            await login({email, password});
        } else {
            toast.error("Please fill all input fields.");
        }
    };

    const handleRegister = async () => {
        if (password !== confirmPassword) {
            return toast.error("Passwords do not match!");
        };
        if (firstName && lastName && email && 
            password && confirmPassword) {
            await register({firstName, lastName, email, 
                password, confirmPassword});
        }
    };

    React.useEffect(() => {
        if (isLoginSuccess) {
            toast.success("User Login Successfully!");
            dispatch(setUser({
                name: loginData.result.name,
                token: loginData.token, 
            }));
            navigate("/dashboard");
        };

        if (isRegisterSuccess) {
            toast.success("User Registered Successfully!");
            dispatch(setUser({
                name: registerData.result.name,
                token: registerData.token
            }));
            navigate("/dashboard");
        };
    }, [isLoginSuccess, isRegisterSuccess]);

    return (
    <section className="vh-100 gradient-custom">
    <div className="container py-4 h-100">
        <div className="row d-flex 
            justify-content-center 
            align-items-center 
            h-100"
            >
            <div className="col-12 col-md-8 
                col-lg-6 col-xl-5">
                <div className="card 
                    bg-dark 
                    text-white style" 
                    style={{ borderRadius: "1rem" }}>
                    <div className="card-body p-4 text-center">
                        <div className="mb-md-5 mt-md-4 pb-5">
                            <h2 className="fw-bold mb-2 text-uppercase">
                                {!showRegister ? "Login" : "Register"}
                            </h2>
                            <p className="text-white-50 mb-4">
                                {!showRegister 
                                    ? "Please enter your Email & Password" 
                                    : "Please enter your Info"
                                }
                            </p>
                            {showRegister && (
                                <>
                                    <div className="form-outline form-white mb-4">
                                        <MDBInput 
                                            className="form-control form-control-lg"
                                            label="First Name"
                                            type="text"
                                            name="firstName"
                                            value={firstName}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="form-outline form-white mb-4">
                                        <MDBInput 
                                            label="Last Name"
                                            type="text"
                                            name="lastName"
                                            value={lastName}
                                            onChange={handleChange}
                                            className="form-control form-control-lg"
                                        />
                                    </div>
                                </>
                            )}
                            <div className="form-outline form-white mb-4">
                                <MDBInput 
                                    className="form-control form-control-lg"
                                    label="Email"
                                    type="email"
                                    name="email"
                                    value={email}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="form-outline form-white mb-4">
                                <MDBInput 
                                    label="Password"
                                    type="password"
                                    name="password"
                                    value={password}
                                    onChange={handleChange}
                                    className="form-control form-control-lg"
                                />
                            </div>
                                {showRegister && (
                                    <div className="form-outline form-white mb-4">
                                    <MDBInput 
                                        label="Confirm Password"
                                        type="password"
                                        name="confirmPassword"
                                        value={confirmPassword}
                                        onChange={handleChange}
                                        className="form-control form-control-lg"
                                    />
                                </div>
                                )}
                                {!showRegister ? (
                                    <button className="btn 
                                        btn-outline-light 
                                        btn-lg px-5"
                                        type="button"
                                        onClick={() => handleLogin()}
                                        >Login
                                    </button>
                                ) : (
                                    <button className="btn 
                                        btn-outline-light 
                                        btn-lg px-5"
                                        type="button"
                                        onClick={() => handleRegister()}
                                        >Register
                                    </button>
                                )}
                            </div>
                            <div>
                                <h5 className="mb-0">
                                    {!showRegister ? (
                                        <>
                                            Don't have an account ?
                                            <p className="text-white-50 fw-bold"
                                                style={{ cursor: "pointer" }}
                                                onClick={() => setShowRegister(true)}>
                                                Register
                                            </p>
                                        </>
                                    ) : (
                                        <>
                                            Already have an account ?
                                            <p className="text-white-50 fw-bold"
                                                style={{ cursor: "pointer" }}
                                                onClick={() => setShowRegister(false)}>
                                                Login
                                            </p>
                                        </>
                                    )}
                                </h5>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </section>
    );
};



