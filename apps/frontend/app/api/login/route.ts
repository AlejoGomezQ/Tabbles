import { NextResponse } from "next/server";

/**
 * Maneja la solicitud de inicio de sesión mediante una solicitud POST.
 *
 * Esta función recibe una solicitud POST que contiene los datos de inicio de sesión
 * (por ejemplo, usuario y contraseña). Realiza una solicitud al backend para verificar
 * las credenciales y, si el inicio de sesión es exitoso, devuelve los datos de autenticación.
 * Si ocurre algún error durante el proceso, devuelve un mensaje adecuado de error.
 *
 * @param {Request} request - Objeto de solicitud HTTP que contiene los datos de inicio de sesión en el cuerpo de la solicitud.
 *
 * @returns {Promise<NextResponse>} Retorna una promesa con la respuesta de Next.js que contiene los datos de autenticación
 *                                  si el inicio de sesión fue exitoso o un mensaje de error en caso contrario.
 *
 * @example
 * // Uso de la función POST para realizar una solicitud de inicio de sesión
 * POST(request);
 */
export async function POST(request: Request) {
  const BASE_URL = "http://localhost:5000/api/tabbles-tables";

  const body = await request.json();

  try {
    const response = await fetch(`${BASE_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        { message: data.message || "Login failed" },
        { status: response.status }
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { message: "An error occurred during login" },
      { status: 500 }
    );
  }
}
