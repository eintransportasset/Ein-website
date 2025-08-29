import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

type OrderType = 'trucks' | 'packers';

interface GoodsOrder {
  fullName: string;
  phoneNumber: string;
  email?: string;
  fromAddress: string;
  fromDistrict?: string;
  toAddress: string;
  toDistrict?: string;
  dateTime: string;
  description?: string;
  materials: string;
  weight: string;
  vehicleRequired: string;
}

interface PackersOrder {
  fullName: string;
  phoneNumber: string;
  email?: string;
  fromAddress: string;
  fromDistrict?: string;
  toAddress: string;
  toDistrict?: string;
  dateTime: string;
  description?: string;
  shiftingThings: string;
}

export async function sendOrderEmail(
  order: GoodsOrder | PackersOrder,
  type: OrderType,
  to: string
) {
  const subject =
    type === 'trucks'
      ? 'New Truc Service Order'
      : 'New Packers & Movers Order';

  const html =
    type === 'trucks'
      ? goodsOrderTemplate(order as GoodsOrder)
      : packersOrderTemplate(order as PackersOrder);

  await transporter.sendMail({
    from: `"EinTransport" <${process.env.EMAIL_USER}>`,
    to,
    subject,
    html,
  });
}

function goodsOrderTemplate(order: GoodsOrder) {
  return `
  <div style="font-family: Arial, sans-serif; background: #fffbe6; padding: 24px; border-radius: 8px; border: 1px solid #ffe58f; max-width: 600px; margin: auto;">
    <h2 style="color: #d97706;">Truck Service Order</h2>
    <table style="width:100%; border-collapse:collapse;">
      <tr><td><strong>Name:</strong></td><td>${order.fullName}</td></tr>
      <tr><td><strong>Phone:</strong></td><td>${order.phoneNumber}</td></tr>
      <tr><td><strong>Email:</strong></td><td>${order.email || '-'}</td></tr>
      <tr><td><strong>From:</strong></td><td>${order.fromAddress} (${order.fromDistrict || '-'})</td></tr>
      <tr><td><strong>To:</strong></td><td>${order.toAddress} (${order.toDistrict || '-'})</td></tr>
      <tr><td><strong>Date:</strong></td><td>${order.dateTime}</td></tr>
      <tr><td><strong>Materials:</strong></td><td>${order.materials}</td></tr>
      <tr><td><strong>Weight:</strong></td><td>${order.weight} kg</td></tr>
      <tr><td><strong>Vehicle Required:</strong></td><td>${order.vehicleRequired}</td></tr>
      <tr><td><strong>Description:</strong></td><td>${order.description || '-'}</td></tr>
    </table>
    <div style="margin-top:24px; color:#555;">
      <em>Thank you for using EinTransport!</em>
    </div>
  </div>
  `;
}

function packersOrderTemplate(order: PackersOrder) {
  return `
  <div style="font-family: Arial, sans-serif; background: #fffbe6; padding: 24px; border-radius: 8px; border: 1px solid #ffe58f; max-width: 600px; margin: auto;">
    <h2 style="color: #d97706;">Packers & Movers Order</h2>
    <table style="width:100%; border-collapse:collapse;">
      <tr><td><strong>Name:</strong></td><td>${order.fullName}</td></tr>
      <tr><td><strong>Phone:</strong></td><td>${order.phoneNumber}</td></tr>
      <tr><td><strong>Email:</strong></td><td>${order.email || '-'}</td></tr>
      <tr><td><strong>From:</strong></td><td>${order.fromAddress} (${order.fromDistrict || '-'})</td></tr>
      <tr><td><strong>To:</strong></td><td>${order.toAddress} (${order.toDistrict || '-'})</td></tr>
      <tr><td><strong>Date:</strong></td><td>${order.dateTime}</td></tr>
      <tr><td><strong>Shifting Things:</strong></td><td>${order.shiftingThings}</td></tr>
      <tr><td><strong>Description:</strong></td><td>${order.description || '-'}</td></tr>
    </table>
    <div style="margin-top:24px; color:#555;">
      <em>Thank you for using EinTransport!</em>
    </div>
  </div>
  `;
}