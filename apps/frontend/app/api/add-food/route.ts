import { NextResponse } from "next/server";

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