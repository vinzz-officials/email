import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  const email = req.query.email;

  if (!email) {
    return res.status(400).json({
      status: false,
      message: "Email wajib diisi ❌",
      dev: "Vinzz Official"
    });
  }

  const otp = Math.floor(100000 + Math.random() * 900000);

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'bot.vinzz.otp@gmail.com',
      pass: 'wpezkhahtextlkpn'
    }
  });

  try {
    await transporter.sendMail({
      from: 'bot.vinzz.otp@gmail.com',
      to: email,
      subject: 'Kode OTP',
      text: `Kode OTP kamu: ${otp}`
    });

    res.status(200).json({
      status: true,
      message: "OTP berhasil dikirim ✅",
      otp,
      dev: "Vinzz Official"
    });
  } catch (err) {
    res.status(500).json({
      status: false,
      message: "Gagal mengirim OTP ❌",
      error: err.toString(),
      dev: "Vinzz Official"
    });
  }
}
