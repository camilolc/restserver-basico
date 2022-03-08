const Role = require("../models/rol");
const User = require("../models/usuario");

const esRolValido = async (rol = "") => {
  const existeRol = await Role.findOne({ rol });
  if (!existeRol) {
    throw new Error(`El rol ${rol} no está registrado en la base de datos`);
  }
};

const emailExiste = async (correo = "") => {
  const existe = await User.findOne({ correo });

  if (existe) {
    throw new Error(`El email: ${correo} ya está registrado`);
  }
};

const existeUsuarioPorId = async (id) => {
  const existeUsuario = await User.findById(id);

  if (!existeUsuario) {
    throw new Error(`El ID: ${id} no existe`);
  }
};

module.exports = {
  esRolValido,
  emailExiste,
  existeUsuarioPorId,
};
