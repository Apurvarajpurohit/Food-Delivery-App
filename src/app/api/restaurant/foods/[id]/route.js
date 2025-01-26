import { connectionStr } from "@/app/lib/db";
import { foodSchema } from "@/app/lib/foodsModel";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function GET(request, context) {
    const params = await context.params; // Ensure params is resolved
    const id = params.id; // Extract id from params
    let success = false;

    try {
        // Connect to the database
        await mongoose.connect(connectionStr, { useNewUrlParser: true, useUnifiedTopology: true });

        // Find foods by resto_id
        const result = await foodSchema.find({ resto_id: id });
        if (result) {
            success = true;
        }

        return NextResponse.json({ result, success });
    } catch (error) {
        console.error("Error in GET handler:", error);
        return NextResponse.json({ success: false, error: error.message });
    } finally {
        mongoose.connection.close();
    }
}

export async function DELETE(request, context) {
    const params = await context.params; // Ensure params is resolved
    const id = params.id; // Extract id from params
    let success = false;

    try {
        // Connect to the database
        await mongoose.connect(connectionStr, { useNewUrlParser: true, useUnifiedTopology: true });

        // Delete food by _id
        const result = await foodSchema.deleteOne({ _id: id });
        if (result.deletedCount > 0) {
            success = true;
        }

        return NextResponse.json({ result, success });
    } catch (error) {
        console.error("Error in DELETE handler:", error);
        return NextResponse.json({ success: false, error: error.message });
    } finally {
        mongoose.connection.close();
    }
}
