import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongoose";
import { FavouriteProps } from "@/types";
import Favourite from "@/database/favourite";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    await connectToDatabase();

    const body: FavouriteProps = await req.json();

    const { movieId, email } = body;

    const isExist = await Favourite.findOne({ email, movieId });

    if (isExist) {
      return NextResponse.json({
        success: false,
        message: "Already added to favourites",
      });
    }

    const favourite = await Favourite.create(body);

    return NextResponse.json({ success: true, data: favourite });
  } catch (e) {
    return NextResponse.json({
      success: false,
      message: "Something went wrong",
    });
  }
}

export async function GET(req: Request) {
  try {
    await connectToDatabase();

    const { searchParams } = new URL(req.url);
    const email = searchParams.get("email");

    const favourites = await Favourite.find({ email });

    return NextResponse.json({ success: true, data: favourites });
  } catch (e) {
    return NextResponse.json({
      success: false,
      message: "Something went wrong",
    });
  }
}

export async function DELETE(req: Request) {
  try {
    await connectToDatabase();

    const { searchParams } = new URL(req.url);
    const email = searchParams.get("email");
    const id = searchParams.get("id");

    await Favourite.findByIdAndDelete(id);

    return NextResponse.json({ success: true, data: "Successfully deleted" });
  } catch (e) {
    return NextResponse.json({
      success: false,
      message: "Something went wrong",
    });
  }
}
