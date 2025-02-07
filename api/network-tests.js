import { query } from "../lib/db"

export default async function handler(req, res) {
  if (req.method === "GET") {
    const results = await query("SELECT * FROM pruebas_red ORDER BY fecha DESC")

    if (results.error) {
      res.status(500).json({ error: "Error obteniendo pruebas" })
    } else {
      res.status(200).json(results)
    }
  } else {
    res.setHeader("Allow", ["GET"])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}

