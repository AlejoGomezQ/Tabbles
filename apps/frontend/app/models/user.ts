/**
 * Interfaz que representa un usuario en el sistema.
 *
 * @interface User
 * @property {string} id - Identificador único del usuario.
 * @property {string} name - Nombre del usuario.
 * @property {string} lastName - Apellido del usuario.
 * @property {string} email - Correo electrónico del usuario.
 */
export interface User {
  id: string;
  name: string;
  lastName: string;
  email: string;
}
