import { NextRequest, NextResponse } from "next/server";
import { uploadFile } from "@/lib/s3";

export async function POST(req: NextRequest) {
  const formData = await req.formData();

  const files = formData.getAll("files") as File[];

  const uploadedFiles = [];

  for (const file of files) {
    const key = await uploadFile(file);

    uploadedFiles.push({
      key,
      type: file.type.startsWith("image")
        ? "IMAGE"
        : "VIDEO",
    });
  }

  return NextResponse.json(uploadedFiles);
}