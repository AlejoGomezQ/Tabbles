import { NextResponse } from "next/server";

/**
 * Actualiza una materia prima en el backend utilizando un método PUT.
 *
 * Esta función maneja una solicitud PUT para actualizar una materia prima en el
 * backend. Verifica la autenticación mediante un token y realiza la actualización
 * de los datos en la API correspondiente. Si hay algún error en el proceso,
 * devuelve un mensaje de error adecuado.
 *
 * @param {Request} request - Objeto de solicitud que contiene los datos de la
 *                             solicitud HTTP, incluidos los parámetros y el cuerpo.
 * @param {Object} params - Parámetros adicionales extraídos de la ruta.
 * @param {string} params.id - ID de la materia prima que se va a actualizar.
 *
 * @returns {Promise<NextResponse>} Retorna una respuesta con los datos de la
 * actualización o un mensaje de error dependiendo del resultado de la operación.
 *
 * @example
 * // Uso básico del método PUT
 * // Llamar a PUT pasando el ID de la materia prima y los datos a actualizar
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
    console.log(`${BASE_URL}/raw-material/${params.id}`);
    console.log("Received raw material update request:", body);
    console.log("Authorization token:", token);

    const response = await fetch(`${BASE_URL}/raw-material/${params.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify(body),
    });

    const responseText = await response.text();
    console.log("Backend raw material response status:", response.status);

    if (!response.ok) {
      return NextResponse.json(
        { message: responseText || "Failed to update raw material" },
        { status: response.status }
      );
    }

    const data = JSON.parse(responseText);
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching raw materials:", error);
    return NextResponse.json(
      { message: "An error occurred while fetching raw materials" },
      { status: 500 }
    );
  }
}
