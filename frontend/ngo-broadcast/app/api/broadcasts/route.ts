import { NextResponse } from "next/server"

// This would be replaced with actual MongoDB connection in a real app
const MOCK_BROADCASTS = [
  {
    id: "1",
    content:
      "We're excited to announce our new clean water initiative in rural communities. This project aims to provide access to clean drinking water for over 10,000 people. Learn more about how you can support this cause on our website.",
    ngoId: "ngo1",
    ngoName: "Clean Water Foundation",
    createdAt: new Date(Date.now() - 3600000).toISOString(),
    likes: 24,
    comments: 5,
  },
  {
    id: "2",
    content:
      "📢 Scholarship Alert! Applications are now open for our annual education scholarship program. We're offering 50 full scholarships for underprivileged students. Deadline: June 15, 2023. Visit our profile for application details.",
    ngoId: "ngo2",
    ngoName: "Education For All",
    createdAt: new Date(Date.now() - 86400000).toISOString(),
    likes: 56,
    comments: 12,
  },
  {
    id: "3",
    content:
      "Our medical camp last weekend was a huge success! We provided free health check-ups to over 500 people in the Riverside community. Special thanks to all the volunteer doctors and nurses who made this possible. #HealthcareForAll",
    ngoId: "ngo3",
    ngoName: "Health Outreach",
    createdAt: new Date(Date.now() - 172800000).toISOString(),
    likes: 89,
    comments: 15,
  },
]

export async function GET() {
  // In a real app, this would fetch from MongoDB
  return NextResponse.json(MOCK_BROADCASTS)
}

export async function POST(request: Request) {
  const body = await request.json()

  // Validate request body
  if (!body.content || !body.ngoId || !body.ngoName) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
  }

  // Create new broadcast
  const newBroadcast = {
    id: Date.now().toString(),
    content: body.content,
    ngoId: body.ngoId,
    ngoName: body.ngoName,
    createdAt: new Date().toISOString(),
    likes: 0,
    comments: 0,
  }

  // In a real app, this would save to MongoDB
  MOCK_BROADCASTS.unshift(newBroadcast)

  return NextResponse.json(newBroadcast, { status: 201 })
}

