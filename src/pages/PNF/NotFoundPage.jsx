import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const NotFoundPage = () => {
  const navigate = useNavigate();

  // Auto redirect after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/");
    }, 10000);
    return () => clearTimeout(timer); // cleanup
  }, [navigate]);

  return (
    <div style={styles.container}>
      {/* Dark overlay for readability */}
      <div style={styles.overlay}></div>
      <div style={styles.content}>
        <h1 style={styles.title}>404 - Page Not Found</h1>
        <p style={styles.message}>
          Oops! Looks like this dish is not on the menu 🍽️  
          <br />
          Don’t worry, we’ll guide you back home in a few seconds…
        </p>
        <Link to="/" style={styles.button}>
          Back to Home
        </Link>
      </div>
    </div>
  );
};

const styles = {
  container: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    backgroundImage: "url('/rest1.png')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    position: "relative",
    padding: "20px",
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0,0,0,0.6)", // dark overlay
    zIndex: 1,
  },
  content: {
    position: "relative",
    zIndex: 2,
    color: "#fff",
  },
  title: {
    fontSize: "2.2rem",
    fontWeight: "700",
    marginBottom: "10px",
    fontFamily: "Segoe UI, sans-serif",
  },
  message: {
    fontSize: "1.1rem",
    maxWidth: "400px",
    margin: "0 auto 20px auto",
  },
  button: {
    display: "inline-block",
    padding: "10px 20px",
    background: "#ff7043",
    color: "#fff",
    textDecoration: "none",
    borderRadius: "6px",
    fontWeight: "600",
    transition: "background 0.3s ease",
  },
};

export default NotFoundPage;
