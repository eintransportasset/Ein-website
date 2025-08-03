import connectDB from "@/config/db";
import { NextResponse, NextRequest } from "next/server";
import User from "@/models/User";
import PackersAndMovers from "@/models/PackersAndMover";
import { sendOrderEmail } from '@/config/email';

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    const data = await request.json();

    const {
      fullName,
      email,
      phoneNumber,
      fromAddress,
      fromLat,
      fromLng,
      fromDistrict,
      toAddress,
      toLat,
      toLng,
      toDistrict,
      dateTime,
      description,
      shiftingThings,
    } = data;

    // Check for existing user
    let user = await User.findOne({ phoneNumber });

    if (!user) {
      user = await User.create({ fullName, email, phoneNumber });
    }

    // Create Packers and Movers request
    const packersAndMovers = await PackersAndMovers.create({
      userId: user._id,
      fromAddress,
      fromLat,
      fromLng,
      fromDistrict,
      toAddress,
      toLat,
      toLng,
      toDistrict,
      dateTime: new Date(dateTime),
      description: description || '',
      shiftingThings,
    });

    // Send email notification
    await sendOrderEmail(data, 'packers', process.env.EMAIL_USER || '');

    return NextResponse.json({
      success: true,
      message: "Packers and Movers request created successfully",
      data: packersAndMovers,
    });

  } catch (error) {
    console.error("Error in PackersAndMovers POST:", error);
    return NextResponse.json(
      { success: false, message: "Server error", error },
      { status: 500 }
    );
  }
}
