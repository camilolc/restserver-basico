// {
// 	nombre:'asdf'.
// 	correo:'asdf@asf.com',
// 	password: '12345',
// 	img:'12345345',
// 	rol:'1233145',
// 	estado: false,
// 	google:false
// }

const { Schema, model } = require("mongoose");

const userSchema = Schema({
  nombre: {
    type: String,
    required: [true, "El nombre es obligatorio"],
  },
  correo: {
    type: String,
    required: [true, "El correo es obligatorio"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "La contraseña es obligatoria"],
  },
  img: {
    type: String,
  },
  rol: {
    type: String,
    required: true,
    //enum: ["ADMIN_ROLE", "USER_ROLE"],
  },
  estado: {
    type: Boolean,
    default: true,
  },
  google: {
    type: Boolean,
    default: false,
  },
});

userSchema.methods.toJSON = function () {
  const { __v, password, ...user } = this.toObject();
  return user;
};

module.exports = model("Usuarios", userSchema);
