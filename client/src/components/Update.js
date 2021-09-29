import axios from "axios";
import React, { useState, useContext, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import toast, { Toaster } from "react-hot-toast";
import { useHistory } from "react-router-dom";

import UserContext from "../context/UserContext";

export default function Update({ studentId, setDisplayUpdate }) {
  const [name, setName] = useState("");
  const [id, setId] = useState(0);
  const [division, setDivision] = useState("");
  const [year, setYear] = useState("");

  const { user } = useContext(UserContext);
  const history = useHistory();

  useEffect(() => {
    axios
      .post(
        "/api/student/getStudentDetails",
        {
          studentId,
        },
        {
          headers: {
            "x-auth-token": user,
          },
        }
      )
      .then((res) => {
        if (res.data.success) {
          setName(res.data.name);
          setDivision(res.data.division);
          setYear(res.data.year);
          setId(studentId);
        } else {
          // toast.error(res.data.msg);
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error("Server error");
      });
  }, []);

  const updateStudent = () => {
    axios
      .post(
        "/api/student/updateStudent",
        {
          name,
          id,
          division,
          year,
        },
        {
          headers: {
            "x-auth-token": user,
          },
        }
      )
      .then((res) => {
        if (res.data.success) {
          toast.success("Record Updated");
          setDisplayUpdate(false);
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
    <div>
      <h1>Update student</h1>
      <Toaster position="top-right" />
      <Form className="justify-content-center w-100 mt-3">
        <Form.Group className="mb-4">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Name"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-4">
          <Form.Label>ID</Form.Label>
          <Form.Control
            type="text"
            placeholder="ID"
            value={id}
            disabled
            onChange={(event) => setId(event.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-4">
          <Form.Label>Division</Form.Label>
          <br />
          <select
            value={division}
            onChange={(event) => setDivision(event.target.value)}
            aria-label="Default select example"
            className="mb-4"
            style={{}}
          >
            <option value="">Select an option</option>
            <option value="a">a</option>
            <option value="b">b</option>
            <option value="c">c</option>
          </select>
        </Form.Group>

        <Form.Group className="mb-4">
          <Form.Label>Year</Form.Label>
          <br />
          <select
            value={year}
            onChange={(event) => setYear(event.target.value)}
            aria-label="Default select example"
            className="mb-4"
          >
            <option value="">Select an option</option>
            <option value="FE">FE</option>
            <option value="SE">SE</option>
            <option value="TE">TE</option>
            <option value="BE">BE</option>
          </select>
        </Form.Group>

        <Button variant="outline-primary mb-4" onClick={updateStudent}>
          Update
        </Button>
      </Form>
    </div>
  );
}
