const express = require('express');
const nodemailer = require('nodemailer');

const app = express();

// CORS biar bisa diakses dari browser lain
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  next();
});

// Ganti dengan akun Gmail & App Password
const EMAIL = 'bot.vinzz.otp@gmail.com';
const APP_PASSWORD = 'wpezkhahtextlkpn'; // 16 digit, tanpa spasi

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: { user: EMAIL, pass: APP_PASSWORD }
});

transporter.verify((error, success) => {
  if (error) console.log('Error verifikasi transporter:', error);
  else console.log('Server siap kirim email ✅');
});

// API endpoint kirim OTP via query param
app.get('/api/mail-otp', async (req, res) => {
  const email = req.query.email;
  if (!email) {
    return res.status(400).json({
      status: false,
      message: "Email wajib diisi ❌",
      dev: "Vinzz Official"
    });
  }

  const otp = Math.floor(100000 + Math.random() * 900000); // OTP 6 digit

  const mailOptions = {
    from: EMAIL,
    to: email,
    subject: 'Kode OTP',
    text: `Kode OTP kamu: ${otp}`
  };

  try {
    await transporter.sendMail(mailOptions);
    res.json({
      status: true,
      message: "OTP berhasil dikirim ✅",
      otp,
      dev: "Vinzz Official"
    });
  } catch (err) {
    console.error('Gagal kirim email:', err);
    res.status(500).json({
      status: false,
      message: "Gagal mengirim OTP ❌",
      error: err.toString(),
      dev: "Vinzz Official"
    });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log('Server jalan di port', PORT));
