
export const studentSeatDetails = {
    seatNumber: "101",
    seatType: "Full-Time",
    libraryTiming: "9:00 AM - 9:00 PM",
    status: "Active",
    assignedDate: "2024-06-01T09:00:00Z",
};

export const studentSeatHistory = [
    { id: "1", seatNumber: "A-12", assignedDate: "2024-03-01T09:00:00Z", vacatedDate: "2024-05-31T18:00:00Z" },
    { id: "2", seatNumber: "B-05", assignedDate: "2023-12-01T09:00:00Z", vacatedDate: "2024-02-28T18:00:00Z" },
];

export const studentDues = {
    amount: 150,
    dueDate: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 1).toISOString(),
    status: "Due",
};

export const studentPaymentHistory = [
    { id: "1", date: "2024-06-01T09:00:00Z", amount: 150, status: "Paid", receipt: "#INV-2024-001" },
    { id: "2", date: "2024-05-01T09:00:00Z", amount: 150, status: "Paid", receipt: "#INV-2024-002" },
    { id: "3", date: "2024-04-01T09:00:00Z", amount: 150, status: "Paid", receipt: "#INV-2024-003" },
    { id: "4", date: "2024-03-01T09:00:00Z", amount: 150, status: "Paid", receipt: "#INV-2024-004" },
];
