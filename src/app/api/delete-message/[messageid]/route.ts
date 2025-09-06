import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/options";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/User";
import { User } from "next-auth";

export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ messageid: string }> }
) {
    // Await the params promise
    const { messageid } = await params;
    const messageId = messageid;
    
    await dbConnect();
    const session = await getServerSession(authOptions);
    const user: User = session?.user as User;
    
    if (!session || !session.user) {
        return NextResponse.json(
            {
                success: false,
                message: "Not Authenticated",
            },
            { status: 401 }
        );
    }

    try {
        const updateResult = await UserModel.updateOne(
            { _id: user._id },
            { $pull: { message: { _id: messageId } } }
        );
        
        if (updateResult.modifiedCount == 0) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Message not found or already deleted",
                },
                { status: 404 }
            );
        }
        
        return NextResponse.json(
            {
                success: true,
                message: "Message deleted",
            },
            { status: 200 } // Changed from 201 to 200 (201 is for created, 200 for success)
        );
    } catch (error) {
        console.log("Error in delete message route:", error);
        
        return NextResponse.json(
            {
                success: false,
                message: "Error deleting message",
            },
            { status: 500 }
        );
    }
}