import React from "react";
import { useNavigate } from "react-router-dom";
import { MDBModal, MDBModalDialog, 
    MDBModalContent } from "mdb-react-ui-kit";

export const ToRedirect = (): JSX.Element => {
    const navigate = useNavigate();
    const [count, setCount] = React.useState(5);

    React.useEffect(() => {
        const interval = setInterval(() => {
            setCount((currentCount) => currentCount - 1);
        }, 1000);
        count === 0 && navigate("/auth");
        return () => clearInterval(interval);
    }, [count, navigate]);

    return (
        <main className="vh-100 gradient-custom">
            <MDBModal show={true}>
                <MDBModalDialog centered>
                    <MDBModalContent>
                        <p 
                            className="mt-3"
                            >Redirecting you in {count} second
                        </p>
                    </MDBModalContent>
                </MDBModalDialog>
            </MDBModal>
        </main>
    );
};

