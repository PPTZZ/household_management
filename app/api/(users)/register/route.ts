import dbConnect from "@/lib/db/connection";
import User from "@/lib/db/schemas/user";
import {NextRequest, NextResponse} from "next/server";

export const POST = async (req: NextRequest) => {
    await dbConnect();
    const data = await req.json()
    try {
        await User.create(data)
        return NextResponse.json({status: 200, data})
    } catch (err: unknown) {
        let errorMessage = "Failed to create user";
        if (err instanceof Error) {
            errorMessage = err.message;
            return NextResponse.json(
                {error: errorMessage},
                {status: 500}
            );
        }
    }
}