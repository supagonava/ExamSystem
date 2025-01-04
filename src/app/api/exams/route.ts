import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const exams = await prisma.exam.findMany();
        return NextResponse.json(exams);
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch exams" }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const exam = await prisma.exam.create({ data: body });
        return NextResponse.json(exam);
    } catch (error) {
        return NextResponse.json({ error: "Failed to create exam" }, { status: 500 });
    }
}
