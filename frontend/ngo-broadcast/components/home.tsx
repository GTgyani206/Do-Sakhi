import { Suspense } from "react";
import LipSyncCharacter from "@/components/lip-sync-character";
import AudioUploader from "@/components/audio-uploader";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Character() {
  return (
    <div className="">
      {/* <Card className="w-full max-w-md mx-auto">
        <CardHeader>
          <CardTitle>Lip Sync Animation</CardTitle>
          <CardDescription>
            Upload an audio file to see the character lip sync
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Suspense
            fallback={
              <div className="h-64 flex items-center justify-center">
                Loading...
              </div>
            }
          > */}
      <LipSyncCharacter />
      {/* </Suspense>
          <AudioUploader />
        </CardContent>
      </Card> */}
    </div>
    // <div className="relative h-screen">
    //   <div className="absolute bottom-11 left-1/4  ">
    //     <LipSyncCharacter />
    //   </div>
    // </div>
  );
}
