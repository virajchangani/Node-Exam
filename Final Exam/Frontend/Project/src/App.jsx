import React, { useEffect, useState } from "react";
import axios from "axios";

export default function App() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [pnr, setPnr] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:1080/api/users")
      .then((res) => {
        setUsers(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newUser = { name, email, mobile, pnr };

    if (editMode) {
      await axios.put(`http://localhost:1080/api/updateUser/${editId}`, newUser)
        .then((res) => {
          setUsers(users.map((user) => (user._id === editId ? res.data : user)));
        });
      setEditMode(false);
      setEditId(null);
    } else {
      await axios.post("http://localhost:1080/api/users", newUser)
        .then((res) => {
          setUsers([...users, res.data]);
        });
    }

    setName("");
    setEmail("");
    setMobile("");
    setPnr("");
  };

  const deleteData = async (id) => {
    axios.delete(`http://localhost:1080/api/deleteUser?id=${id}`)
      .then((res) => {
        setUsers(res.data);
      });
  };

  const editData = (user) => {
    setEditMode(true);
    setEditId(user._id);
    setName(user.name);
    setEmail(user.email);
    setMobile(user.mobile);
    setPnr(user.pnr);
  };

  return (
    <div>
      <h1>Passenger List</h1>
      
      <form onSubmit={handleSubmit}>
      <h2>{editMode ? "Edit Passenger" : "Add Passenger"}</h2>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Passenger Name"
          required
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Passenger Email"
          required
        />
        <input
          type="tel"
          value={mobile}
          onChange={(e) => setMobile(e.target.value)}
          placeholder="Passenger Mobile No"
          required
        />
        <input
          type="text"
          value={pnr}
          onChange={(e) => setPnr(e.target.value)}
          placeholder="Passenger PNR Number"
          required
        />
        <button id="b1" type="submit">{editMode ? "Update Passenger" : "Add Passenger"}</button>
      </form>

      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>Passenger Name</th>
            <th>Passenger Email</th>
            <th>Passenger Mobile No</th>
            <th>PNR Number</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.mobile}</td>
              <td>{user.pnr}</td>
              <td>
                <button id="b1" onClick={() => editData(user)}>Edit</button>
                <button id="b2" onClick={() => deleteData(user._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
