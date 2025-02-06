const express = require("express");
const routes = express.Router();
const admin = require("../model/adminSchema");

routes.get("/api/users", async (req, res) => {
    let data = await admin.find({});
    res.json(data);
});

routes.post("/api/users", async (req, res) => {
    const newUser = await admin.create(req.body);
    res.json(newUser);
});

routes.delete("/api/deleteUser", async (req, res) => {
    await admin.findByIdAndDelete(req.query.id);
    const updatedUsers = await admin.find();
    res.json(updatedUsers);
});

routes.put("/api/updateUser/:id", async (req, res) => {
    const updatedUser = await admin.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedUser);
});

module.exports = routes;
