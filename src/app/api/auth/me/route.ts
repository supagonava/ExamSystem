import { NextResponse } from "next/server";
import * as jose from "jose";
import { cookies } from "next/headers";

export async function GET(req: Request) {
    // Check Authorization header first
    const authToken = req.headers.get("authorization")?.split(" ")[1];
    // Check cookies
    const cookieStore = cookies();
    const cookieToken = (await cookieStore).get("token")?.value;

    const token = authToken || cookieToken;

    if (!token) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    try {
        const secret = new TextEncoder().encode(process.env.JWT_SECRET_KEY || "secret-key");
        const { payload } = await jose.jwtVerify(token, secret);

        return NextResponse.json(payload);
    } catch (error) {
        if (error instanceof jose.errors.JWTExpired) {
            return NextResponse.json({ message: "Token expired" }, { status: 401 });
        }
        return NextResponse.json({ message: "Invalid token" }, { status: 401 });
    }
}
