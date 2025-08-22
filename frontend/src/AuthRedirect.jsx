import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const AuthRedirect = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            navigate("/dashboard");
        } else {
            navigate("/signin");
        }
    }, [navigate]);

    return null;
};