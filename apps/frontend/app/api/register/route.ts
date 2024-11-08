import { NextResponse } from "next/server";

/**
 * Actualiza la información de un alimento en el backend utilizando una solicitud PUT.
 *
 * Esta función recibe una solicitud PUT para actualizar los datos de un alimento
 * en el servidor. Verifica que se proporcione un token de autenticación antes de
 * proceder con la actualización. Si no se encuentra el token o si ocurre un error,
 * devuelve un mensaje apropiado de error.
 *
 * @param {Request} request - Objeto de solicitud HTTP que contiene los datos de
 *                             la solicitud, incluyendo el cuerpo y las cabeceras.
 * @param {Object} params - Parámetros de la ruta extraídos de la URL.
 * @param {string} params.id - El ID del alimento que se va a actualizar.
 *
 * @returns {Promise<NextResponse>} Retorna una respuesta de Next.js que contiene
 *                                  los datos de la actualización o un mensaje
 *                                  de error en caso de fallo.
 *
 * @example
 * // Ejemplo de uso básico de la función PUT para actualizar un alimento
 * PUT(request, { params: { id: "456" } });
 */
export async function POST(request: Request) {
  const BASE_URL = "http://localhost:5000/api/tabbles-tables";

  const body = await request.json();

  try {
    const response = await fetch(`${BASE_URL}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        { message: data.message || "Registration failed" },
        { status: response.status }
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { message: "An error occurred during registration" },
      { status: 500 }
    );
  }
}
