"use server"

import { revalidatePath } from "next/cache"

export interface Broadcast {
  id: string
  content: string
  ngoId: string
  ngoName: string
  createdAt: string
  likes: number
  comments: number
}

// Mock data for demo purposes
const MOCK_BROADCASTS: Broadcast[] = [
  {
    id: "1",
    content:
      "We're excited to announce our new clean water initiative in rural communities. This project aims to provide access to clean drinking water for over 10,000 people. Learn more about how you can support this cause on our website.",
    ngoId: "ngo1",
    ngoName: "Clean Water Foundation",
    createdAt: new Date(Date.now() - 3600000).toISOString(), // 1 hour ago
    likes: 24,
    comments: 5,
  },
  {
    id: "2",
    content:
      "📢 Scholarship Alert! Applications are now open for our annual education scholarship program. We're offering 50 full scholarships for underprivileged students. Deadline: June 15, 2023. Visit our profile for application details.",
    ngoId: "ngo2",
    ngoName: "Education For All",
    createdAt: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
    likes: 56,
    comments: 12,
  },
  {
    id: "3",
    content:
      "Our medical camp last weekend was a huge success! We provided free health check-ups to over 500 people in the Riverside community. Special thanks to all the volunteer doctors and nurses who made this possible. #HealthcareForAll",
    ngoId: "ngo3",
    ngoName: "Health Outreach",
    createdAt: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
    likes: 89,
    comments: 15,
  },
]

// In a real application, this would connect to MongoDB
export async function fetchBroadcasts(): Promise<Broadcast[]> {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  // Return mock data sorted by createdAt (newest first)
  return [...MOCK_BROADCASTS].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
}

interface CreateBroadcastParams {
  content: string
  ngoId: string
  ngoName: string
}

export async function createBroadcast(params: CreateBroadcastParams): Promise<Broadcast> {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 1000))

  // In a real app, this would insert into MongoDB
  const newBroadcast: Broadcast = {
    id: Date.now().toString(),
    content: params.content,
    ngoId: params.ngoId,
    ngoName: params.ngoName,
    createdAt: new Date().toISOString(),
    likes: 0,
    comments: 0,
  }

  // Add to the beginning of our mock data
  MOCK_BROADCASTS.unshift(newBroadcast)

  // Revalidate the home page to show the new broadcast
  revalidatePath("/")

  return newBroadcast
}

