import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const questions = await prisma.question.findMany();
        return NextResponse.json(questions);
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch questions" }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const question = await prisma.question.create({ data: body });
        return NextResponse.json(question);
    } catch (error) {
        return NextResponse.json({ error: "Failed to create question" }, { status: 500 });
    }
}
