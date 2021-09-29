const router = require("express").Router();
const express = require("express");
const cors = require("cors");

const controller = require("../controllers/Auth");

const { getToken } = controller;

router.use(express.json());
router.use(cors());
router.use(express.urlencoded({ extended: false }));

router.get("/getToken", getToken);

module.exports = router;
