import express from "express";
import { createServer as createViteServer } from "vite";
import nodemailer from "nodemailer";
import path from "path";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API routes FIRST
  app.post("/api/book", async (req, res) => {
    try {
      const { service, date, time, name, email, phone, vehicle } = req.body;

      // Validate required fields
      if (!service || !date || !time || !name || !email) {
        return res.status(400).json({ error: "Missing required fields" });
      }

      // Create a test account for Ethereal Email (fake SMTP service)
      const testAccount = await nodemailer.createTestAccount();

      // Create a transporter object using the default SMTP transport
      const transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
          user: testAccount.user, // generated ethereal user
          pass: testAccount.pass, // generated ethereal password
        },
      });

      // Send mail with defined transport object
      const info = await transporter.sendMail({
        from: '"Venice Detailing" <booking@venicedetailing.com>',
        to: email, // send to the user's email
        subject: "Booking Confirmation - Venice Detailing",
        text: `Hello ${name},\n\nYour booking for ${service} on ${date} at ${time} has been confirmed.\n\nVehicle: ${vehicle}\nPhone: ${phone}\n\nThank you for choosing Venice Detailing!`,
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #facc15;">Booking Confirmation</h2>
            <p>Hello <strong>${name}</strong>,</p>
            <p>Your booking has been successfully confirmed. Here are the details:</p>
            <ul>
              <li><strong>Service:</strong> ${service}</li>
              <li><strong>Date:</strong> ${date}</li>
              <li><strong>Time:</strong> ${time}</li>
              <li><strong>Vehicle:</strong> ${vehicle || "Not provided"}</li>
              <li><strong>Phone:</strong> ${phone || "Not provided"}</li>
            </ul>
            <p>We look forward to seeing you!</p>
            <p>Best regards,<br>Venice Detailing Team</p>
          </div>
        `,
      });

      console.log("Message sent: %s", info.messageId);
      console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

      res.json({ 
        status: "success", 
        message: "Booking confirmed and email sent.",
        previewUrl: nodemailer.getTestMessageUrl(info) 
      });
    } catch (error) {
      console.error("Booking error:", error);
      res.status(500).json({ error: "Failed to process booking" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
