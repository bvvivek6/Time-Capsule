# 📦 Time Capsule App

A unique web application that allows users to create digital time capsules containing messages and images, which will be unlocked on a future date. Users will receive email notifications when their capsule is ready to be opened.

## 🚀 Features

User Authentication (JWT-based Sign-up & Login)
Create Time Capsules (Message, Image, Unlock Date)
Secure Storage with MongoDB
File Upload Support (Multer for image uploads)
Scheduled Email Reminders (Nodemailer + Cron Jobs)
Responsive UI with React & Tailwind CSS

## 📧 Email Reminders

Cron job runs every midnight to check if any capsules need to be unlocked.
If a capsule is due, an email notification is sent to the user.

## 🤝 Contributing

Feel free to fork this repository and contribute. Pull requests are welcome!

## 📜 License

This project is licensed under the MIT License - see the LICENSE file for details.

Made with ❤️ by Vivek
