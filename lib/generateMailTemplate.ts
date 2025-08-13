export function generateContactEmailTemplate(data: {
  fullName: string;
  email: string;
  phone: string;
  project: string;
  message?: string;
}): string {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Contact Form Submission</title>
</head>
<body style="margin:0; padding:0; font-family: 'Arial', sans-serif; background-color:#000;">
  <table width="100%" cellpadding="0" cellspacing="0" style="padding: 20px 0;">
    <tr>
      <td align="center">
        <!-- Main Card -->
        <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px; background-color:#ffffff; border-radius:12px; box-shadow:0 4px 15px rgba(0,0,0,0.1); overflow:hidden;">
          
          <!-- Header -->
          <tr>
            <td style="background-color:#1fc8e4; padding: 40px 20px; text-align:center; color:#ffffff;">
              <div style="font-size:36px; font-weight:bold; margin-bottom:10px;">✨ BrandBoy</div>
              <p style="font-size:14px; opacity:0.9; margin:0;">Interior Design | Construction | Branding | Project Management</p>
            </td>
          </tr>

          <!-- Intro -->
          <tr>
            <td style="padding:30px 20px;">
              <h2 style="margin-top:0; font-size:22px; color:#333333;">🎉 New Contact Form Submission</h2>
              <p style="color:#555555; font-size:15px; line-height:1.6; margin-bottom:25px;">
                Someone is ready to bring their vision to life! Here are their details:
              </p>

              <!-- Details Table -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:25px;">
                ${[
                  { label: "Full Name", value: data.fullName },
                  { label: "Email Address", value: data.email },
                  { label: "Phone Number", value: data.phone },
                  {
                    label: "Project Type",
                    value: `<span style="background-color:#1fc8e4; color:#fff; padding:6px 12px; border-radius:20px; font-size:14px;">${data.project}</span>`,
                  },
                ]
                  .map(
                    (item) => `
                  <tr>
                    <td style="padding-bottom:15px;">
                      <div style="background-color:#f9fafb; border:1px solid #e1e4e8; border-radius:8px; padding:15px;">
                        <div style="font-size:11px; color:#888888; text-transform:uppercase; font-weight:600; letter-spacing:0.5px; margin-bottom:5px;">${item.label}</div>
                        <div style="font-size:16px; color:#333333; font-weight:500;">${item.value}</div>
                      </div>
                    </td>
                  </tr>
                `
                  )
                  .join("")}
              </table>

              <!-- Optional Message -->
              ${
                data.message
                  ? `
                <div style="background-color:#f9fafb; border-left:4px solid #1fc8e4; border-radius:8px; padding:20px; margin-top:15px;">
                  <h3 style="margin:0 0 10px 0; font-size:16px; color:#333333;">📝 Message / Special Request</h3>
                  <p style="margin:0; font-size:14px; color:#555555; font-style:italic; line-height:1.6;">"${data.message}"</p>
                </div>
              `
                  : ""
              }

              <!-- CTA -->
              <div style="background-color:#1fc8e4; color:#ffffff; text-align:center; padding:20px; border-radius:12px; margin-top:25px;">
                <p style="margin:0; font-size:16px; line-height:1.5;">
                  <strong>Ready to transform their vision into reality?</strong><br>
                  Reach out and let's create something amazing together!
                </p>
              </div>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color:#000; padding:20px; text-align:center; font-size:12px; color:#999999;">
              <p style="margin:0;">This message was sent from your BrandBoy contact form</p>
              <p style="margin:5px 0 0 0;">${new Date().toLocaleDateString()} at ${new Date().toLocaleTimeString()}</p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `;
}
