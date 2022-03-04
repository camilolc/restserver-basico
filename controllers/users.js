const { response, request } = require("express");

const userGet = (req = request, res = response) => {
  const { q, nombre = "no name", apikey, page = 1, limit } = req.query;
  res.json({
    mgs: "get API - controller",
    q,
    nombre,
    apikey,
    page,
    limit,
  });
};

const userPut = (req, res) => {
  const id = req.params.id;

  res.status(400).json({
    mgs: "put API - controller",
    id,
  });
};

const userPost = (req, res) => {
  const { nombre, edad } = req.body;
  res.status(201).json({
    mgs: "post API - controller",
    nombre,
    edad,
  });
};

const userDelete = (req, res) => {
  res.json({
    mgs: "delete API - controller",
  });
};

module.exports = {
  userGet,
  userPost,
  userPut,
  userDelete,
};
