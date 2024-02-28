import { trabajadoresDB } from "../db/trabajadores";
import { usuariosDB } from "../db/usuarios";

// usuarios
export const registerRequest = async (values) => {
  const trabajadoresJSON = JSON.stringify(values);
  localStorage.setItem("trabajador999", trabajadoresJSON);
};

//login
export const loginRequest = (values) => {
  const usuarioIngresado = values.username;
  const contrasenaIngresada = values.password;

  // Busca el usuario en usuariosDB
  const usuarioEncontrado = usuariosDB.find(
    (user) => user.username === usuarioIngresado
  );

  if (usuarioEncontrado) {
    if (usuarioEncontrado.password === contrasenaIngresada) {
      console.log("Inicio de sesión exitoso");
      return usuarioEncontrado;
    } else {
      console.log("Contraseña incorrecta");
    }
  } else {
    console.log("Usuario no encontrado");
  }
};



//perfil
export const cargarPerfilRequest = (id) => {

  const usuarioEncontrado = trabajadoresDB.find(
    (user) => user.id_usuario === id
  );
  return usuarioEncontrado;
};

// plantilla trabajadores
export const cargarPlantillaTrabajadores = () => {
 
};


