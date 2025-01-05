import Cookies from "js-cookie";

export const mockUsers = [
    {
        id: "1",
        username: "admin",
        email: "admin@example.com",
        password: "admin123", // In real app, never store plain passwords
        role: "ADMIN",
    },
    {
        id: "2",
        username: "user",
        email: "user@example.com",
        password: "user123",
        role: "USER",
    },
];

export const mockExams = [
    {
        id: "1",
        title: "JavaScript Basics",
        description: "Test your JavaScript knowledge",
        duration: 60,
        passingScore: 70,
        isActive: true,
    },
    // Add more mock exams as needed
];

export const mockAuth = {
    login: (username: string, password: string) => {
        const user = mockUsers.find((u) => (u.username === username || u.email === username) && u.password === password);
        if (user) {
            return {
                token: "mock-token",
                role: user.role,
                user: { ...user, password: undefined },
            };
        }
        throw new Error("Invalid credentials");
    },

    getUserRole: (token: string) => {
        if (token === "mock-token") {
            // Simulate different roles based on stored cookie or local data
            const lastUsername = Cookies.get("lastUsername");
            return String(lastUsername) === "ADMIN" ? "ADMIN" : "USER";
        }
        return null;
    },
};
