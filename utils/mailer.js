// NOTE: File này cấu hình và export hàm gửi mail.

const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS // Nên dùng App Password của Google
  }
});

/**
 * Gửi mail thông báo ứng tuyển
 * @param {object} applicationData - Dữ liệu ứng tuyển
 * @param {object} jobData - Dữ liệu công việc
 */
const sendApplicationEmail = async (applicationData, jobData) => {
    const { full_name, email, phone, message, cv_url } = applicationData;

    const mailOptions = {
        from: `"VSM Recruit" <${process.env.MAIL_USER}>`,
        to: process.env.MAIL_RECEIVER,
        subject: `[Ứng Tuyển] Vị trí ${jobData.title} - Ứng viên ${full_name}`,
        html: `
            <h2>Có ứng viên mới cho vị trí: ${jobData.title}</h2>
            <p><strong>Họ và tên:</strong> ${full_name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Số điện thoại:</strong> ${phone}</p>
            <p><strong>Lời nhắn:</strong></p>
            <p>${message}</p>
            <p><strong>Link CV:</strong> <a href="${cv_url}">${cv_url}</a></p>
            <br>
            <p>Email này được gửi tự động từ hệ thống tuyển dụng VSM.</p>
        `
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('Application email sent successfully.');
    } catch (error) {
        console.error('Error sending email:', error);
    }
};

module.exports = { sendApplicationEmail };