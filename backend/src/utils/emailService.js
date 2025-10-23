const nodemailer = require('nodemailer');

// Create transporter
const createTransporter = () => {
  return nodemailer.createTransporter({
    service: process.env.EMAIL_SERVICE || 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD
    }
  });
};

// Send welcome email
exports.sendWelcomeEmail = async (user) => {
  try {
    const transporter = createTransporter();

    const mailOptions = {
      from: process.env.EMAIL_FROM,
      to: user.email,
      subject: 'Welcome to Alumni by Better!',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #FFD700;">Welcome to Alumni by Better!</h2>
          <p>Hi ${user.name},</p>
          <p>Thank you for joining Alumni by Better. We're excited to have you on board!</p>
          <p>Start exploring our English courses and take your language skills to the next level.</p>
          <a href="${process.env.FRONTEND_URL}/courses" style="display: inline-block; background: #FFD700; color: #000; padding: 12px 30px; text-decoration: none; border-radius: 5px; margin: 20px 0;">Browse Courses</a>
          <p>If you have any questions, feel free to reach out to our support team.</p>
          <p>Best regards,<br>The Alumni Team</p>
        </div>
      `
    };

    await transporter.sendMail(mailOptions);
    console.log(`✅ Welcome email sent to ${user.email}`);
  } catch (error) {
    console.error('Error sending welcome email:', error);
  }
};

// Send course enrollment email
exports.sendEnrollmentEmail = async (user, courses) => {
  try {
    const transporter = createTransporter();

    const courseList = courses.map(c => `<li>${c.title}</li>`).join('');

    const mailOptions = {
      from: process.env.EMAIL_FROM,
      to: user.email,
      subject: 'Course Enrollment Confirmation - Alumni by Better',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #FFD700;">Congratulations on Your Enrollment!</h2>
          <p>Hi ${user.name},</p>
          <p>You have been successfully enrolled in the following courses:</p>
          <ul style="line-height: 1.8;">
            ${courseList}
          </ul>
          <p>You can start learning right away!</p>
          <a href="${process.env.FRONTEND_URL}/my-courses" style="display: inline-block; background: #FFD700; color: #000; padding: 12px 30px; text-decoration: none; border-radius: 5px; margin: 20px 0;">Start Learning</a>
          <p>Happy learning!<br>The Alumni Team</p>
        </div>
      `
    };

    await transporter.sendMail(mailOptions);
    console.log(`✅ Enrollment email sent to ${user.email}`);
  } catch (error) {
    console.error('Error sending enrollment email:', error);
  }
};

// Send order confirmation email
exports.sendOrderConfirmationEmail = async (user, order) => {
  try {
    const transporter = createTransporter();

    const itemsList = order.items.map(item =>
      `<li>${item.title} - $${item.price}</li>`
    ).join('');

    const mailOptions = {
      from: process.env.EMAIL_FROM,
      to: user.email,
      subject: `Order Confirmation - ${order.orderNumber}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #FFD700;">Order Confirmation</h2>
          <p>Hi ${user.name},</p>
          <p>Thank you for your purchase! Your order has been confirmed.</p>
          <p><strong>Order Number:</strong> ${order.orderNumber}</p>
          <p><strong>Items:</strong></p>
          <ul style="line-height: 1.8;">
            ${itemsList}
          </ul>
          <p><strong>Total Amount:</strong> $${order.finalAmount}</p>
          <p>You can now access your courses in your dashboard.</p>
          <a href="${process.env.FRONTEND_URL}/my-courses" style="display: inline-block; background: #FFD700; color: #000; padding: 12px 30px; text-decoration: none; border-radius: 5px; margin: 20px 0;">View My Courses</a>
          <p>Thank you for choosing Alumni by Better!<br>The Alumni Team</p>
        </div>
      `
    };

    await transporter.sendMail(mailOptions);
    console.log(`✅ Order confirmation email sent to ${user.email}`);
  } catch (error) {
    console.error('Error sending order confirmation email:', error);
  }
};
