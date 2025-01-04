import { PrismaClient } from '@prisma/client'
import { hash } from 'bcrypt'

const prisma = new PrismaClient()

async function main() {
  // Create admin user
  const adminPassword = await hash('admin123', 10)
  const admin = await prisma.user.upsert({
    where: { email: 'admin@example.com' },
    update: {},
    create: {
      email: 'admin@example.com',
      username: 'admin',
      password: adminPassword,
      role: 'ADMIN',
      firstName: 'Admin',
      lastName: 'User'
    }
  })

  // Create sample exam
  const exam = await prisma.exam.create({
    data: {
      title: 'Sample Programming Test',
      description: 'Basic programming concepts test',
      duration: 60,
      passingScore: 70,
      createdBy: admin.id,
      questions: {
        create: [
          {
            text: 'What is JavaScript?',
            type: 'MULTIPLE_CHOICE',
            score: 10,
            orderIndex: 0,
            answers: {
              create: [
                { text: 'A programming language', isCorrect: true, orderIndex: 0 },
                { text: 'A database', isCorrect: false, orderIndex: 1 },
                { text: 'An operating system', isCorrect: false, orderIndex: 2 }
              ]
            }
          }
        ]
      },
      lesson: {
        create: {
          title: 'Introduction to Programming',
          content: 'Basic programming concepts and fundamentals...',
          readingTime: 15
        }
      }
    }
  })

  console.log({ admin, exam })
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
