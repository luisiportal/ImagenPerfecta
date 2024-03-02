import { trabajadoresDB } from "../db/trabajadores";
import { usuariosDB } from "../db/usuarios";


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
    
      return usuarioEncontrado;
    } else {
 
    }
  } else {

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


