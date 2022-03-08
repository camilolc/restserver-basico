const {
  esRolValido,
  emailExiste,
  existeUsuarioPorId,
} = require("../helpers/db-validators");

const { Router } = require("express");
const { check } = require("express-validator");
const {
  userGet,
  userPut,
  userPost,
  userDelete,
} = require("../controllers/users");
const { validarCampos } = require("../middlewares/validar-campos");

const router = Router();

router.get("/", userGet);
router.put(
  "/:id",
  [
    check("id", "No es ID valido").isMongoId(),
    check("id").custom(existeUsuarioPorId),
    check("rol").custom(esRolValido),
    validarCampos,
  ],
  userPut
);

router.post(
  "/",
  [
    check("nombre", "nombre obligatorio").not().isEmpty(),
    check("correo", "Correo no valido").isEmail(),
    check("correo").custom(emailExiste),
    check("password", "El password debe ser de mas de 6 letras").isLength({
      min: 6,
    }),
    // check("rol", "No es un rol valido").isIn(["ADMIN_ROLE", "USER_ROLE"]),
    check("rol").custom(esRolValido),
    validarCampos,
  ],
  userPost
);
router.delete(
  "/:id",
  [
    check("id", "No es ID valido").isMongoId(),
    check("id").custom(existeUsuarioPorId),
    validarCampos,
  ],
  userDelete
);

module.exports = router;

//
