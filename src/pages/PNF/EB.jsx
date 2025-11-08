import React, { Component } from "react";
import { Link } from "react-router-dom";

class EB extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, info: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    this.setState({ error, info });
    console.error("Error caught by Error Boundary: ", error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={styles.container}>
          <img
            src="/rest1.png"
            alt="Error Illustration"
            style={styles.image}
          />
          <h2 style={styles.title}>Oops! Something went wrong.</h2>
          <p style={styles.message}>
            Looks like our kitchen had a little fire 🔥. Don’t worry, we’re fixing it!  
          </p>
          <Link to="/" style={styles.button}>
            Go Back Home
          </Link>
        </div>
      );
    }
    return this.props.children;
  }
}

const styles = {
  container: {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    background: "linear-gradient(135deg, #fff3e6, #ffe0cc)",
    padding: "20px",
  },
  image: {
    maxWidth: "280px",
    marginBottom: "20px",
  },
  title: {
    fontSize: "1.8rem",
    fontWeight: "700",
    color: "#d84315",
    marginBottom: "10px",
    fontFamily: "Segoe UI, sans-serif",
  },
  message: {
    fontSize: "1rem",
    color: "#444",
    maxWidth: "400px",
    marginBottom: "20px",
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

styles.button[":hover"] = {
  background: "#d84315",
};

export default EB;
