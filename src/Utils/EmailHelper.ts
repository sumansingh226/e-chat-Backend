import nodemailer from "nodemailer"


export const sendWelcomeEmail = async (toEmail: string) => {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL_ID,
            pass: process.env.Pass,
        },
    });

    const mailOptions = {
        from: process.env.EMAIL_ID,
        to: toEmail,
        subject: "Welcome to E-Chat",
        html: `
        <html>
        <head>
            <style>
                body {
                    font-family: 'Arial', sans-serif;
                    color: #333;
                    margin: 20px;
                }
                h2 {
                    color: #0066cc;
                }
                p {
                    margin-bottom: 15px;
                }
                a {
                    color: #0066cc;
                    text-decoration: none;
                }
                a:hover {
                    text-decoration: underline;
                }
                .container {
                    border: 1px solid #ddd;
                    padding: 20px;
                    border-radius: 5px;
                    background-color: #f9f9f9;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <h2>Welcome to E-Chat!</h2>
                <p>Thank you for signing up with us.</p>
                <p>Start exploring our products and enjoy shopping!</p>
                <p>Best regards,</p>
                <p>The E-Chat Team</p>
            </div>
        </body>
    </html>

        `,
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log("Welcome email sent successfully.");
    } catch (error) {
        console.error("Error sending welcome email:", error);
    }
};