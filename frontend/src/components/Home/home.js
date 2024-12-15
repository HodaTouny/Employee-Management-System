import React from "react";
import "../../libraries/bootstrap.min.css";
import "../../assets/home.png"; 


const Home = () => {
    return (
        <div className="d-flex align-items-center justify-content-between p-5" style={{ height: "80vh" }}>
            <div className="text-left" style={{ maxWidth: "50%" }}>
                <h1 style={{ fontSize: "3rem", color: "#f6745d" }}>Welcome Aboard!</h1>
                <p style={{ fontSize: "1.2rem", color: "#555" }}>
                    Managing your employees has never been easier. Explore our tools to stay organized and productive!
                </p>
            </div>

            <div style={{ maxWidth: "40%" }}>
                <img
                    src={require("../../assets/home.png")}
                    alt="Employee Management"
                    style={{ width: "100%", borderRadius: "15px" }}
                />
            </div>
        </div>
    );
};

export default Home;
