"use client";

import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { User } from "../models/user";
import { RawMaterial } from "../models/rawMaterial";
import { Food } from "../models/food";

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (
    name: string,
    lastName: string,
    email: string,
    password: string
  ) => Promise<void>;
  logout: () => void;
  addRawMaterial: (rawMaterial: RawMaterial) => Promise<void>;
  deleteRawMaterial: (id: string) => Promise<void>;
  getAllRawMaterials: () => Promise<RawMaterial[]>;
  getRawMaterial: (id: string) => Promise<RawMaterial>;
  addFood: (food: Food) => Promise<void>;
  getAllFoods: () => Promise<Food[]>;
  updateRawMaterial: (rawMaterial: RawMaterial) => Promise<void>;
  updateFood: (food: Food) => Promise<void>;
  deleteFood: (id: string) => Promise<void>;
}

/**
 * Contexto de autenticación que maneja el estado del usuario autenticado y el token.
 *
 * @constant {React.Context<AuthContextType | undefined>} AuthContext
 */
const AuthContext = createContext<AuthContextType | undefined>(undefined);

/**
 * Proveedor de autenticación que gestiona las funciones de login, registro, logout, y operaciones CRUD para materias primas y alimentos.
 *
 * @function AuthProvider
 * @param {ReactNode} children - Elementos secundarios que recibirán acceso al contexto.
 * @returns {JSX.Element} El componente proveedor de autenticación.
 */
export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    loadUser();
    window.addEventListener("storage", loadUser);

    return () => {
      window.removeEventListener("storage", loadUser);
    };
  }, []);

  /**
   * Carga el usuario autenticado y el token desde las cookies.
   * Si no existe, realiza una llamada para obtener los datos del usuario.
   */
  const loadUser = async () => {
    const storedToken = Cookies.get("token");
    const storedUser = Cookies.get("user");

    if (storedToken) {
      setToken(storedToken);
      if (storedUser) {
        try {
          const parsedUser = JSON.parse(storedUser);
          setUser(parsedUser);
        } catch (error) {
          console.error("Error parsing stored user data:", error);
          Cookies.remove("user");
        }
      } else {
        await fetchUserData(storedToken);
      }
    } else {
      setUser(null);
      setToken(null);
    }
  };

  /**
   * Realiza una petición para obtener los datos del usuario autenticado.
   *
   * @param {string} authToken - Token de autenticación.
   */
  const fetchUserData = async (authToken: string) => {
    try {
      const response = await fetch("/api/user", {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      if (response.ok) {
        const userData = await response.json();
        setUser(userData);
        Cookies.set("user", JSON.stringify(userData), { expires: 7 });
      } else {
        console.error("Failed to fetch user data:", await response.text());
        Cookies.remove("token");
        setToken(null);
        setUser(null);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  /**
   * Realiza el proceso de login del usuario, guardando el token y los datos del usuario en cookies.
   *
   * @param {string} email - Correo del usuario.
   * @param {string} password - Contraseña del usuario.
   * @throws {Error} Si ocurre un error en el login.
   */
  const login = async (email: string, password: string) => {
    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Login failed");
      }

      const data = await response.json();
      setUser(data.user);
      setToken(data.token);
      Cookies.set("token", data.token, { expires: 7 });
      Cookies.set("user", JSON.stringify(data.user), { expires: 7 });
      router.push("/pages/dashboard");
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  };

  /**
   * Realiza el proceso de registro del usuario y redirige al login.
   *
   * @param {string} name - Nombre del usuario.
   * @param {string} lastName - Apellido del usuario.
   * @param {string} email - Correo del usuario.
   * @param {string} password - Contraseña del usuario.
   * @throws {Error} Si ocurre un error en el registro.
   */
  const register = async (
    name: string,
    lastName: string,
    email: string,
    password: string
  ) => {
    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, lastName, email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Registration failed");
      }

      const data = await response.json();
      setUser(data.user);
      setToken(data.token);
      Cookies.set("token", data.token, { expires: 7 });
      router.push("/pages/login");
    } catch (error) {
      console.error("Registration error:", error);
      throw error;
    }
  };

  /**
   * Realiza el logout del usuario, eliminando el token y redirigiendo a la página principal.
   */
  const logout = () => {
    setUser(null);
    setToken(null);
    Cookies.remove("token");
    router.push("/");
  };

  /**
   * Agrega una nueva materia prima mediante una petición autenticada.
   *
   * @param {RawMaterial} rawMaterial - Materia prima a agregar.
   * @returns {Promise<any>} Respuesta de la operación.
   * @throws {Error} Si ocurre un error al agregar la materia prima.
   */
  const addRawMaterial = async (rawMaterial: RawMaterial) => {
    const currentToken = token || Cookies.get("token");
    if (!currentToken) {
      throw new Error("No authentication token found");
    }

    try {
      const response = await fetch("/api/add-raw-material", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${currentToken}`,
        },
        body: JSON.stringify(rawMaterial),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to add raw material");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error adding raw material:", error);
      throw error;
    }
  };

  /**
   * Elimina una materia prima mediante una petición autenticada.
   *
   * @param {string} id - ID de la materia prima a eliminar.
   * @returns {Promise<any>} Respuesta de la operación.
   * @throws {Error} Si ocurre un error al eliminar la materia prima.
   */
  const deleteRawMaterial = async (id: string) => {
    const currentToken = token || Cookies.get("token");
    if (!currentToken) {
      throw new Error("No authentication token found");
    }

    try {
      const response = await fetch(`/api/delete-raw-material/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${currentToken}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to delete raw material");
      }

      const data = await response.json();
      console.log(data);
      return data;
    } catch (error) {
      console.error("Error adding raw material:", error);
      throw error;
    }
  };

  /**
   * Obtiene todas las materias primas.
   *
   * @returns {Promise<RawMaterial[]>} Lista de materias primas.
   * @throws {Error} Si ocurre un error al obtener las materias primas.
   */
  const getAllRawMaterials = async (): Promise<RawMaterial[]> => {
    const currentToken = token || Cookies.get("token");
    if (!currentToken) {
      throw new Error("No authentication token found");
    }

    try {
      const response = await fetch("/api/get-all-raw-materials", {
        headers: {
          Authorization: `Bearer ${currentToken}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to fetch raw materials");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching raw materials:", error);
      throw error;
    }
  };

  /**
   * Obtiene una materia prima específica por su ID.
   *
   * @param {string} id - ID de la materia prima a obtener.
   * @returns {Promise<RawMaterial>} Datos de la materia prima.
   * @throws {Error} Si ocurre un error al obtener la materia prima.
   */
  const getRawMaterial = async (id: string): Promise<RawMaterial> => {
    const currentToken = token || Cookies.get("token");
    if (!currentToken) {
      throw new Error("No authentication token found");
    }

    try {
      const response = await fetch("/api/get-raw-material/" + id, {
        headers: {
          Authorization: `Bearer ${currentToken}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to fetch raw material");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching raw material:", error);
      throw error;
    }
  };

  /**
   * Actualiza una materia prima.
   *
   * @param {RawMaterial} rawMaterial - Materia prima a actualizar.
   * @returns {Promise<any>} Respuesta de la operación.
   * @throws {Error} Si ocurre un error al actualizar la materia prima.
   */
  const updateRawMaterial = async (rawMaterial: RawMaterial) => {
    const currentToken = token || Cookies.get("token");
    if (!currentToken) {
      throw new Error("No authentication token found");
    }

    try {
      const response = await fetch(
        "/api/update-raw-material/" + rawMaterial.id,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${currentToken}`,
          },
          body: JSON.stringify(rawMaterial),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to update raw material");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error updating raw material:", error);
      throw error;
    }
  };

  /**
   * Agrega un nuevo alimento mediante una petición autenticada.
   *
   * @param {Food} food - Alimento a agregar.
   * @returns {Promise<any>} Respuesta de la operación.
   * @throws {Error} Si ocurre un error al agregar el alimento.
   */
  const addFood = async (food: Food) => {
    const currentToken = token || Cookies.get("token");
    if (!currentToken) {
      throw new Error("No authentication token found");
    }

    try {
      const response = await fetch("/api/add-food", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${currentToken}`,
        },
        body: JSON.stringify(food),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to add food");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error adding food:", error);
      throw error;
    }
  };

  /**
   * Obtiene todos los alimentos.
   *
   * @returns {Promise<Food[]>} Lista de alimentos.
   * @throws {Error} Si ocurre un error al obtener los alimentos.
   */
  const getAllFoods = async (): Promise<Food[]> => {
    const currentToken = token || Cookies.get("token");
    if (!currentToken) {
      throw new Error("No authentication token found");
    }

    try {
      const response = await fetch("/api/get-all-foods", {
        headers: {
          Authorization: `Bearer ${currentToken}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to fetch foods");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching foods:", error);
      throw error;
    }
  };

  /**
   * Actualiza un alimento.
   *
   * @param {Food} food - Alimento a actualizar.
   * @returns {Promise<any>} Respuesta de la operación.
   * @throws {Error} Si ocurre un error al actualizar el alimento.
   */
  const updateFood = async (food: Food) => {
    const currentToken = token || Cookies.get("token");
    if (!currentToken) {
      throw new Error("No authentication token found");
    }

    try {
      const response = await fetch("/api/update-food/" + food.id, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${currentToken}`,
        },
        body: JSON.stringify(food),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to update food");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error updating food:", error);
      throw error;
    }
  };

  /**
   * Elimina un alimento mediante una petición autenticada.
   *
   * @param {string} id - ID del alimento a eliminar.
   * @returns {Promise<any>} Respuesta de la operación.
   * @throws {Error} Si ocurre un error al eliminar el alimento.
   */
  const deleteFood = async (id: string) => {
    const currentToken = token || Cookies.get("token");
    if (!currentToken) {
      throw new Error("No authentication token found");
    }

    try {
      const response = await fetch(`/api/delete-food/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${currentToken}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to delete food");
      }

      const data = await response.json();
      console.log(data);
      return data;
    } catch (error) {
      console.error("Error deleting food:", error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        login,
        register,
        logout,
        addRawMaterial,
        deleteRawMaterial,
        getAllRawMaterials,
        getRawMaterial,
        addFood,
        getAllFoods,
        updateRawMaterial,
        updateFood,
        deleteFood,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

/**
 * Hook personalizado para acceder al contexto de autenticación.
 *
 * @function useAuth
 * @throws {Error} Si el hook se utiliza fuera de un AuthProvider.
 * @returns {AuthContextType} El contexto de autenticación.
 */
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
