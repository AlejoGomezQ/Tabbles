import { NextResponse } from "next/server";

/**
 * Actualiza los datos de un alimento en el backend mediante una solicitud PUT.
 *
 * Esta función maneja una solicitud PUT para actualizar los datos de un alimento
 * en el backend. Verifica la autenticación mediante un token y realiza la
 * actualización de los datos en la API correspondiente. Si ocurre algún error en
 * el proceso, se devuelve un mensaje de error adecuado.
 *
 * @param {Request} request - El objeto de solicitud HTTP que contiene los datos
 *                             de la solicitud, incluyendo los parámetros de la URL
 *                             y el cuerpo de la solicitud.
 * @param {Object} params - Parámetros adicionales extraídos de la ruta.
 * @param {string} params.id - El ID del alimento que se va a actualizar.
 *
 * @returns {Promise<NextResponse>} Retorna una respuesta con los datos de la
 * actualización del alimento o un mensaje de error si la operación falla.
 *
 * @example
 * // Uso básico del método PUT
 * // Llamar a PUT pasando el ID del alimento y los datos a actualizar
 * PUT(request, { params: { id: "123" } });
 */
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
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
    console.log("Received food update request:", body);
    console.log("Authorization token:", token);

    const response = await fetch(`${BASE_URL}/food/${params.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify(body),
    });

    const responseText = await response.text();
    console.log("Backend food response status:", response.status);

    if (!response.ok) {
      return NextResponse.json(
        { message: responseText || "Failed to update food" },
        { status: response.status }
      );
    }

    const data = JSON.parse(responseText);
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching food:", error);
    return NextResponse.json(
      { message: "An error occurred while fetching food" },
      { status: 500 }
    );
  }
}
