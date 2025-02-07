import { query } from "../lib/db"

export default async function handler(req, res) {
  if (req.method === "DELETE") {
    const { id } = req.query

    const result = await query("DELETE FROM pruebas_red WHERE id = ?", [id])

    if (result.error) {
      res.status(500).json({ error: "Error eliminando prueba" })
    } else {
      res.status(200).json({ message: "Prueba eliminada con éxito" })
    }
  } else {
    res.setHeader("Allow", ["DELETE"])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}

