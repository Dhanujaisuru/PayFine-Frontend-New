// lib/mockdata/police.js
const policeData = {
  officerID: "PD1234",
  policeStationID: "PS001",
  fullName: "Officer John Doe",
  phoneNumber: "+1-555-123-4567",
  department: "City Police Department",
  dateOfBirth: "1985-03-15",
  gender: "male",
  address: "123 Main St, Cityville",
  badgeIssueDate: "2020-01-10",
  badgeExpireDate: "2026-01-10",
  citationsIssued: [
    {
      id: 1,
      citationNumber: "CIT001",
      date: "2025-05-01",
      violation: "Speeding",
      amount: 150.0,
      status: "unpaid",
      driver: "Jane Smith",
    },
    {
      id: 2,
      citationNumber: "CIT002",
      date: "2025-05-10",
      violation: "Red Light Violation",
      amount: 200.0,
      status: "appealed",
      driver: "John Brown",
    },
    {
      id: 3,
      citationNumber: "CIT003",
      date: "2025-05-15",
      violation: "Parking Violation",
      amount: 50.0,
      status: "paid",
      driver: "Alice Johnson",
    },
  ],
  totalCitations: 25,
  totalRevenue: 3750.0,
};

export default policeData;