import { NextResponse } from "next/server";

export async function PUT(
    request: Request,
    { params }: { params: { id: string } }) {
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
    console.log(`${BASE_URL}/raw-material/${params.id}`)
    console.log("Received raw material update request:", body);
    console.log("Authorization token:", token);

    const response = await fetch(`${BASE_URL}/raw-material/${params.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify(body)
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
