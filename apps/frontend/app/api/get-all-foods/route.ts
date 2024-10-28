import { NextResponse } from "next/server";

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
