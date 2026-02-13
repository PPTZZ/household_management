import dbConnect from "@/lib/db/connection";
import Household from "@/lib/db/schemas/household";
import {NextRequest, NextResponse} from "next/server";

export const GET = async (req: NextRequest) => {
    await dbConnect();

    try {
        const households = await Household.find({});
        return NextResponse.json({status: 200, households})
    } catch (err: unknown) {
        let errorMessage = "Failed to fetch households";
        if (err instanceof Error) {
            errorMessage = err.message;
            return NextResponse.json(
                {error: errorMessage},
                {status: 500}
            );
        }
    }
};

export const POST = async (req: NextRequest) => {
    await dbConnect();
    const data = await req.json();
    try {
        await Household.create(data)
        return NextResponse.json({status: 201})
    } catch (err: unknown) {
        let errorMessage = "Failed to fetch households";
        if (err instanceof Error) {
            errorMessage = err.message;
            return NextResponse.json(
                {error: errorMessage},
                {status: 500}
            );
        }
    }
};