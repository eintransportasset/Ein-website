import connectDB from "@/config/db";
import { NextResponse, NextRequest } from "next/server";
import User from "@/models/User";
import PackersAndMovers from "@/models/PackersAndMover";

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    const data = await request.json();

    const { name, email, phoneNumber, from, to, dateTime, description } = data;

    // Check for existing user
    let user = await User.findOne({ phoneNumber });

    if (!user) {
      // Create new user
      user = await User.create({ name, email, phoneNumber });
    }

    // Create Packers and Movers request
    const packersAndMovers = await PackersAndMovers.create({
      userId: user._id,
      from,
      to,
      dateTime: new Date(dateTime),
      description: description || '',
    });

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
