import { PrismaClient } from "@prisma/client";
import { hash } from "bcrypt";

const prisma = new PrismaClient();

async function main() {
    // ล้างข้อมูลในทุกคอลเลกชัน
    await prisma.answer.deleteMany({});
    await prisma.question.deleteMany({});
    await prisma.lesson.deleteMany({});
    await prisma.examSchedule.deleteMany({});
    await prisma.examResult.deleteMany({});
    await prisma.exam.deleteMany({});
    await prisma.user.deleteMany({});

    console.log("Cleared all collections.");

    // Seed admin user
    const adminPassword = await hash("admin123", 10);
    const admin = await prisma.user.create({
        data: {
            email: "admin@example.com",
            username: "admin",
            password: adminPassword,
            role: "ADMIN",
            createdAt: new Date(),
            updatedAt: new Date(),
        },
    });

    // Seed exam
    const exam = await prisma.exam.create({
        data: {
            title: "Sample Programming Test",
            description: "Basic programming concepts test",
            duration: 60,
            passingScore: 70,
            createdBy: admin.id,
            createdAt: new Date(),
            updatedAt: new Date(),
            questions: {
                create: [
                    {
                        text: "What is JavaScript?",
                        type: "MULTIPLE_CHOICE",
                        score: 10,
                        orderIndex: 0,
                        createdAt: new Date(),
                        updatedAt: new Date(),
                        answers: {
                            create: [
                                { text: "A programming language", isCorrect: true, orderIndex: 0 },
                                { text: "A database", isCorrect: false, orderIndex: 1 },
                                { text: "An operating system", isCorrect: false, orderIndex: 2 },
                            ],
                        },
                    },
                    {
                        text: "What does HTML stand for?",
                        type: "MULTIPLE_CHOICE",
                        score: 10,
                        orderIndex: 1,
                        createdAt: new Date(),
                        updatedAt: new Date(),
                        answers: {
                            create: [
                                { text: "HyperText Markup Language", isCorrect: true, orderIndex: 0 },
                                { text: "HighText Machine Language", isCorrect: false, orderIndex: 1 },
                                { text: "Home Tool Markup Language", isCorrect: false, orderIndex: 2 },
                            ],
                        },
                    },
                ],
            },
            lesson: {
                create: {
                    title: "Introduction to Programming",
                    content: "Basic programming concepts and fundamentals...",
                    readingTime: 15,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
            },
        },
    });

    // Seed candidate
    const candidatePassword = await hash("candidate123", 10);
    const candidate = await prisma.user.create({
        data: {
            email: "candidate@example.com",
            username: "candidate",
            password: candidatePassword,
            role: "CANDIDATE",
            createdAt: new Date(),
            updatedAt: new Date(),
        },
    });

    // Seed exam schedule
    const examSchedule = await prisma.examSchedule.create({
        data: {
            examId: exam.id,
            candidateId: candidate.id,
            startTime: new Date(),
            endTime: new Date(new Date().getTime() + 60 * 60000), // 1 hour later
            status: "SCHEDULED",
            createdAt: new Date(),
            updatedAt: new Date(),
        },
    });

    console.log({ admin, exam, candidate, examSchedule });
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
