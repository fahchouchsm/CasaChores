const express = require("express");
const router = express.Router();
const twilio = require("twilio");
const authenticated = require("../middleware/jwt/jwt");
const codeGn = require("../middleware/code/codeAuth");
const wsCodeSchema = require("../schema/wsCodeSchema");

require("dotenv").config();

router.use(authenticated);

const twilioClient = twilio(process.env.accountSid, process.env.authToken);

const TWILIO_FROM_NUMBER = "whatsapp:+14155238886";
const TWILIO_TO_NUMBER = "whatsapp:+212600422374";

router.post("/send/:id", async (req, res) => {
  const { code } = codeGn(7, 15);

  const wsCode = new wsCodeSchema({
    code: code,
    userId: req.userId,
    phone: req.body.phone,
  });

  wsCode
    .save()
    .then(async (result) => {
      console.log(result.code);
      const message = await twilioClient.messages.create({
        body: `Votre code d'authenification est : ${code}`,
        from: TWILIO_FROM_NUMBER,
        to: TWILIO_TO_NUMBER,
      });

      res.json({
        success: true,
        message: "Message WhatsApp envoyé avec succès !",
      });
    })
    .catch((err) => {
      console.error(`Erreur lors de l'envoi du message : ${err.message}`);
      res.status(500).json({
        success: false,
        message: "Erreur lors de l'envoi du message WhatsApp",
      });
    });
});

router.post("/check/:id", async (req, res) => {
  const { code } = req.body;
  wsCodeSchema
    .findOne({ userId: req.userId, code: code })
    .then((result) => {
      res.json({
        message: result ? true : false,
      });
    })
    .catch((err) => {
      res
        .status(500)
        .json({ success: false, message: "Erreur interne du serveur" });
    });
});

module.exports = router;
