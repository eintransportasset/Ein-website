import connectDB from "@/config/db";
import { NextResponse,NextRequest } from "next/server";
import User from "@/models/User";
import GoodsTransport from "@/models/goodsTranport";

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    const data = await request.json();

    const { name, email, phoneNumber, from, to, dateTime, description, materials, weight, vehicleRequired } = data;

    // Check for existing user
    let user = await User.findOne({ phoneNumber });

    if (!user) {
      // Create new user
      user = await User.create({ name, email, phoneNumber });
    }

    // Create Goods Transport request
    const goodsTransport = await GoodsTransport.create({
      userId: user._id,
      from,
      to,
      dateTime: new Date(dateTime),
      description: description || '',
      materials,
      weight,
      vehicleRequired,
    });

    return NextResponse.json({
      success: true,
      message: "Goods Transport request created successfully",
      data: goodsTransport,
    });

  } catch (error) {
    console.error("Error in GoodsTransport POST:", error);
    return NextResponse.json(
      { success: false, message: "Server error", error },
      { status: 500 }
    );
  }
}