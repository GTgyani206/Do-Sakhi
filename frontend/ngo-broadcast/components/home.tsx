"use client";
import { useState, Suspense } from "react";
import LipSyncCharacter from "@/components/lip-sync-character";
import AudioUploader from "@/components/audio-uploader";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function Character() {
  const [selectedTopic, setSelectedTopic] = useState<string | undefined>(
    undefined,
  );
  const [customRequest, setCustomRequest] = useState<string>("");

  const handleSendRequest = async () => {
    if (!customRequest) return;
    try {
      const response = await fetch("/api/custom-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ request: customRequest }),
      });
      const data = await response.json();
      console.log("Server Response:", data);
    } catch (error) {
      console.error("Error sending request:", error);
    }
  };

  return (
    <div className="p-4">
      <Card className="w-full max-w-md mx-auto">
        <CardHeader>
          <CardDescription>Your Friendly Teacher</CardDescription>
        </CardHeader>
        <CardContent>
          <Select value={selectedTopic} onValueChange={setSelectedTopic}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a topic" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="CourageAndConsent">
                Courage and Consent
              </SelectItem>
              <SelectItem value="HealthAndHeigene">
                Health and Hygiene
              </SelectItem>
              <SelectItem value="KnowYourRights">Know Your Rights</SelectItem>
              <SelectItem value="MindMatters">Mind Matters</SelectItem>
              <SelectItem value="SafetyAndBoundaries">
                Safety and Boundaries
              </SelectItem>
            </SelectContent>
          </Select>
          <br />
          <Suspense
            fallback={
              <div className="h-64 flex items-center justify-center">
                Loading...
              </div>
            }
          >
            <LipSyncCharacter />
          </Suspense>
        </CardContent>
      </Card>

      <div className="mt-4">
        <AudioUploader />
      </div>

      <div className="mt-4">
        <Input
          type="text"
          placeholder="Enter a custom request"
          value={customRequest}
          onChange={(e) => setCustomRequest(e.target.value)}
        />
        <Button onClick={handleSendRequest} className="mt-2">
          Send Request
        </Button>
      </div>
    </div>
  );
}
