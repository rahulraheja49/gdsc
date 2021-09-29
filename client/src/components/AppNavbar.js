import React, { useContext } from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import { useHistory, Link } from "react-router-dom";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

import UserContext from "../context/UserContext";

export default function AppNavbar() {
  const { user, setUser } = useContext(UserContext);

  const history = useHistory();

  const signOut = () => {
    setUser(null);
    toast.success("Logged out");
    history.push("/");
  };

  const signIn = () => {
    // axios call
    axios
      .get("/api/auth/getToken")
      .then((res) => {
        if (res.data.success) {
          setUser(res.data.token);
          toast.success("Logged in");
          history.push("/dashboard");
        } else {
          toast.error(res.data.msg);
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error("Server error");
      });
  };

  return (
    <Navbar bg="dark" variant="dark" sticky="top">
      <Toaster position="top-right" />
      <Container>
        <Nav className="me-auto">
          <Navbar.Brand>
            <Link
              to="/"
              style={{
                textDecoration: "none",
                color: "white",
              }}
            >
              Student Management
            </Link>
          </Navbar.Brand>
        </Nav>
        <Nav>
          {!user && <Nav.Link onClick={signIn}>Login</Nav.Link>}
          {/* {user && <Nav.Link href="/dashboard">Dashboard</Nav.Link>} */}
          {user && (
            <Link
              className="nav-link"
              to="/dashboard"
              style={{
                textDecoration: "none",
              }}
            >
              Dashboard
            </Link>
          )}
          {user && <Nav.Link onClick={signOut}>Sign Out</Nav.Link>}
        </Nav>
      </Container>
    </Navbar>
  );
}
