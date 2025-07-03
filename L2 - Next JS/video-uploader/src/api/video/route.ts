import { authOptions } from "@/lib/auth";
import { connectDB } from "@/lib/dbConfig";
import Video, { IVideo } from "@/models/video.model";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

// Public Route -> Get all videos
export async function GET(request: NextRequest) {
  try {
    await connectDB();
    const videos = await Video.find({}).sort({ createdAt: -1 }).lean();

    if (!videos || videos.length === 0) {
      return NextResponse.json([], { status: 200 });
    }

    return NextResponse.json(videos);
  } catch (error) {
    return NextResponse.json(
      { error: "failed to log videos" },
      { status: 500 }
    );
  }
}

// Private Route -> Upload Videos
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "unauthorized" }, { status: 401 });
    }

    await connectDB();

    const reqBody: IVideo = await request.json();
    if (
      !reqBody.title ||
      !reqBody.description ||
      !reqBody.videoURL ||
      !reqBody.thumbnailURL
    ) {
      return NextResponse.json(
        { error: "missing required fields" },
        { status: 400 }
      );
    }

    const videoData = {
      ...reqBody,
      controls: reqBody?.controls ?? true,
      transformation: {
        height: 1920,
        width: 1080,
        quality: reqBody?.transformation?.quality ?? 100,
      },
    };

    const newVideo = await Video.create(videoData);
    return NextResponse.json(newVideo);
  } catch (error) {
    return NextResponse.json(
      { error: "failed to create a video" },
      { status: 500 }
    );
  }
}
