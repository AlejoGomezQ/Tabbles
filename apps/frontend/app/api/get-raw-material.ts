import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const { id } = req.query;
  const BASE_URL = "http://localhost:5000/api/tabbles-tables";

  try {
    const token = req.headers.authorization;

    if (!token) {
      return res
        .status(401)
        .json({ message: "No se proporcionó token de autenticación" });
    }

    const response = await fetch(`${BASE_URL}/raw-material/${id}`, {
      headers: {
        Authorization: token,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch raw material");
    }

    const data = await response.json();
    return res.status(200).json(data);
  } catch (error) {
    console.error("Error fetching raw material:", error);
    return res
      .status(500)
      .json({ message: "An error occurred while fetching raw material" });
  }
}
