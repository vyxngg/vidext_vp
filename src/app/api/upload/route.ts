import { S3 } from "aws-sdk";
import { NextResponse } from "next/server";

const s3 = new S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_S3_REGION,
});

export async function POST(req: Request) {
  console.log("Environment Variables: ", {
    AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID,
    AWS_S3_BUCKET_NAME: process.env.AWS_S3_BUCKET_NAME,
  });
  
  try {
    const { name, type, thumbnailName, thumbnailType } = await req.json();

    if (!name || !type || !thumbnailName || !thumbnailType) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const videoParams = {
      Bucket: process.env.AWS_S3_BUCKET_NAME!,
      Key: `videos/${name}`,
      Expires: 60,
      ContentType: type,
    };

    const videoUploadUrl = await s3.getSignedUrlPromise("putObject", videoParams);
    

    const thumbnailParams = {
      Bucket: process.env.AWS_S3_BUCKET_NAME!,
      Key: `thumbnails/${thumbnailName}`,
      Expires: 60,
      ContentType: thumbnailType,
    };

    const thumbnailUploadUrl = await s3.getSignedUrlPromise("putObject", thumbnailParams);

    return NextResponse.json({
      videoUploadUrl,
      videoFileUrl: `https://${process.env.AWS_S3_BUCKET_NAME}.s3.${process.env.AWS_S3_REGION}.amazonaws.com/videos/${name}`,
      thumbnailUploadUrl,
      thumbnailFileUrl: `https://${process.env.AWS_S3_BUCKET_NAME}.s3.${process.env.AWS_S3_REGION}.amazonaws.com/thumbnails/${thumbnailName}`,
    });
  } catch (error) {
    console.error("Error creating signed URL:", error);
    return NextResponse.json({ error: "Failed to create signed URL" }, { status: 500 });
  }
}
