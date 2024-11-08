import { NextResponse } from "next/server";

/**
 * Maneja una solicitud DELETE para eliminar un material desde el backend.
 *
 * Esta función recibe una solicitud DELETE con un token de autenticación en las cabeceras.
 * Realiza una solicitud al backend para eliminar un material específico usando su ID.
 * Si no se encuentra el token o si ocurre algún error durante la operación, devuelve un mensaje adecuado de error.
 *
 * @param {Request} request - El objeto de solicitud HTTP que contiene las cabeceras, incluyendo el token de autenticación.
 * @param {Object} params - Los parámetros de la solicitud.
 * @param {string} params.id - El ID del material que se desea eliminar.
 *
 * @returns {Promise<NextResponse>} Retorna una promesa con la respuesta de Next.js que contiene los datos del material
 *                                  eliminado o un mensaje de error en caso de fallo.
 *
 * @example
 * // Ejemplo de uso básico de la función DELETE para eliminar un material por ID
 * const response = DELETE(request, { params: { id: "12345" } });
 */
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const BASE_URL = "http://localhost:5000/api/tabbles-tables";

  try {
    const token = request.headers.get("Authorization");

    if (!token) {
      return NextResponse.json(
        { message: "No se proporcionó token de autenticación" },
        { status: 401 }
      );
    }

    const response = await fetch(`${BASE_URL}/raw-material/${params.id}`, {
      method: "DELETE",
      headers: {
        Authorization: token,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        { message: data.message || "Failed to delete raw material" },
        { status: response.status }
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error deleting raw material:", error);
    return NextResponse.json(
      { message: "An error occurred while deleting raw material" },
      { status: 500 }
    );
  }
}
