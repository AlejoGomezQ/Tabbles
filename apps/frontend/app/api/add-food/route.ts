import { NextResponse } from "next/server";

/**
 * Maneja una solicitud POST para agregar un nuevo alimento al backend.
 *
 * Esta función recibe una solicitud POST que incluye un token de autenticación en las cabeceras y los datos del alimento en el cuerpo de la solicitud.
 * Luego, realiza una solicitud al backend para agregar el alimento. Si no se encuentra el token o si ocurre algún error en el proceso,
 * devuelve un mensaje adecuado de error.
 *
 * @param {Request} request - El objeto de solicitud HTTP que contiene las cabeceras (incluyendo el token de autenticación) y el cuerpo con los datos del alimento.
 *
 * @returns {Promise<NextResponse>} Retorna una promesa con la respuesta de Next.js que contiene los datos del alimento agregado
 *                                  o un mensaje de error en caso de fallo.
 *
 * @example
 * // Ejemplo de uso básico de la función POST para agregar un alimento
 * const foodData = { name: "Manzana", category: "Fruta", unit: "kg" };
 * POST(request);
 */
export async function POST(request: Request) {
  const BASE_URL = "http://localhost:5000/api/tabbles-tables";

  try {
    const body = await request.json();
    const token = request.headers.get("Authorization");

    if (!token) {
      return NextResponse.json(
        { message: "No se proporcionó token de autenticación" },
        { status: 401 }
      );
    }

    console.log("Received food request:", body);
    console.log("Authorization token:", token);

    const response = await fetch(`${BASE_URL}/food`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify(body),
    });

    console.log("Backend food response status:", response.status);
    const responseText = await response.text();
    console.log("Backend food response body:", responseText);

    if (!response.ok) {
      return NextResponse.json(
        { message: responseText || "Failed to add food" },
        { status: response.status }
      );
    }

    const data = JSON.parse(responseText);
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error adding food:", error);
    return NextResponse.json(
      { message: "An error occurred while adding food" },
      { status: 500 }
    );
  }
}
