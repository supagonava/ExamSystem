import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import * as jose from "jose";
import { cookies } from "next/headers";

export async function GET() {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get("token");

        if (!token) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const secret = new TextEncoder().encode(process.env.JWT_SECRET || "secret-key");
        const { payload } = await jose.jwtVerify(token.value, secret);

        const exams = await prisma.exam.findMany({
            where: {
                isActive: true,
                schedules: {
                    some: {
                        candidateId: payload.id as string,
                        status: "SCHEDULED",
                    },
                },
            },
            select: {
                id: true,
                title: true,
                description: true,
                duration: true,
                passingScore: true,
                isActive: true,
            },
        });

        return NextResponse.json(exams);
    } catch (error) {
        console.error("Failed to fetch exams:", error);
        return NextResponse.json({ error: "Failed to fetch exams" }, { status: 500 });
    }
}
