import { query } from "../lib/db"

export default async function handler(req, res) {
  if (req.method === "POST") {
    const currentDate = new Date()
    const isConnected = Math.random() < 0.8 // Simulamos la conexión

    let testData = {
      fecha: currentDate,
      downloadSpeed: 0,
      uploadSpeed: 0,
      ping: 0,
      estado: "Incorrecta",
    }

    if (isConnected) {
      testData = {
        fecha: currentDate,
        downloadSpeed: Math.floor(Math.random() * (100 - 20) + 20),
        uploadSpeed: Math.floor(Math.random() * (50 - 10) + 10),
        ping: Math.floor(Math.random() * 100),
        estado: "Correcta",
      }
    }

    const result = await query(
      "INSERT INTO pruebas_red (fecha, download_speed, upload_speed, ping, is_connected, estado) VALUES (?, ?, ?, ?, ?, ?)",
      [testData.fecha, testData.downloadSpeed, testData.uploadSpeed, testData.ping, isConnected, testData.estado],
    )

    if (result.error) {
      res.status(500).json({ error: "Error guardando prueba" })
    } else {
      res.status(200).json({
        id: result.insertId,
        ...testData,
        message: isConnected ? "Conexión a Internet correcta" : "Conexión a Internet incorrecta",
      })
    }
  } else {
    res.setHeader("Allow", ["POST"])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}

