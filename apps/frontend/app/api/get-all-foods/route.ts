import { NextResponse } from "next/server";

/**
 * Maneja una solicitud GET para obtener la lista de alimentos desde el backend.
 *
 * Esta función recibe una solicitud GET con un token de autenticación en las cabeceras.
 * Realiza una solicitud al backend para obtener todos los alimentos disponibles.
 * Si no se encuentra el token o si ocurre algún error en el proceso, devuelve un mensaje adecuado de error.
 *
 * @param {Request} request - El objeto de solicitud HTTP que contiene las cabeceras, incluyendo el token de autenticación.
 *
 * @returns {Promise<NextResponse>} Retorna una promesa con la respuesta de Next.js que contiene los datos de los alimentos
 *                                  o un mensaje de error en caso de fallo.
 *
 * @example
 * // Ejemplo de uso básico de la función GET para obtener la lista de alimentos
 * GET(request);
 */
export async function GET(request: Request) {
  const BASE_URL = "http://localhost:5000/api/tabbles-tables";

  try {
    const token = request.headers.get("Authorization");

    if (!token) {
      return NextResponse.json(
        { message: "No se proporcionó token de autenticación" },
        { status: 401 }
      );
    }

    const response = await fetch(`${BASE_URL}/foods`, {
      method: "GET",
      headers: {
        Authorization: token,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        { message: data.message || "Failed to fetch foods" },
        { status: response.status }
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching foods:", error);
    return NextResponse.json(
      { message: "An error occurred while fetching  foods" },
      { status: 500 }
    );
  }
}
