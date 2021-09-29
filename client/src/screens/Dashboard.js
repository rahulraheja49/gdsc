import React, { useContext, useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import axios from "axios";
import { useHistory } from "react-router-dom";

// import Add from "../components/Add";
// import Delete from "../components/Delete";
// import Update from "../components/Update";
import UserContext from "../context/UserContext";
import Update from "../components/Update";
import toast, { Toaster } from "react-hot-toast";

export default function Dashboard() {
  const [students, setStudents] = useState([]);
  const [studentId, setStudentId] = useState();
  const [displayUpdate, setDisplayUpdate] = useState(false);
  const [num, setNum] = useState(0);

  const history = useHistory();

  const { user } = useContext(UserContext);

  useEffect(() => {
    axios
      .get("/api/student/getStudents", {
        headers: {
          "x-auth-token": user,
        },
      })
      .then((res) => {
        if (res.data.success) {
          setStudents(res.data.students);
        } else {
          console.log(res);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [user, displayUpdate, num]);

  const updateUser = (id) => {
    setStudentId(id);
    setDisplayUpdate(true);
  };

  const deleteUser = (id) => {
    axios
      .post(
        "/api/student/deleteStudent",
        {
          id,
        },
        {
          headers: {
            "x-auth-token": user,
          },
        }
      )
      .then((res) => {
        if (res.data.success) {
          toast.success("User Deleted");
          setNum(num + 1);
        } else {
          toast.error("Some error occoured");
          console.log(res);
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error("Server error");
      });
  };

  const addUser = () => {
    history.push("/add");
  };

  if (displayUpdate) {
    return <Update studentId={studentId} setDisplayUpdate={setDisplayUpdate} />;
  }

  return (
    <div>
      <Toaster position="top-right" />
      <Table striped bordered hover style={{ width: "75%" }}>
        <thead>
          <tr>
            <th>id</th>
            <th>Name</th>
            <th>Division</th>
            <th>Year</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map((item) => (
            <tr>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.division}</td>
              <td>{item.year}</td>
              <td>
                <Button
                  variant="outline-warning m-1"
                  onClick={() => updateUser(item.id)}
                >
                  Update
                </Button>
                <Button
                  variant="outline-danger m-1"
                  onClick={() => deleteUser(item.id)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Button variant="outline-success mb-4 mt-2" onClick={addUser}>
        Add
      </Button>
    </div>
  );
}
