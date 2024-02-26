import { trabajadoresDB } from "../db/trabajadores";
import { usuariosDB } from "../db/usuarios";

// usuarios
export const registerRequest = async (values) => {
  const trabajadoresJSON = JSON.stringify(values);
  console.log(trabajadoresJSON);
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
      return usuarioEncontrado.id;
    } else {
      console.log("Contraseña incorrecta");
    }
  } else {
    console.log("Usuario no encontrado");
  }
};



//perfil
export const cargarPerfilRequest = (id) => {
  console.log('id');
  console.log(id);
  const usuarioEncontrado = trabajadoresDB.find(
    (user) => user.id_usuario === id
  );
  console.log(usuarioEncontrado);
  return usuarioEncontrado;
};

// plantilla trabajadores
export const cargarPlantillaTrabajadores = () => {
 
};


