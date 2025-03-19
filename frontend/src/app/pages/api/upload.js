import cloudinary from "cloudinary";

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { video } = req.body; // Expecting a base64 video string or file URL

    const uploadResponse = await cloudinary.v2.uploader.upload(video, {
      resource_type: "video",
      folder: "interviews",
    });

    return res.status(200).json({ url: uploadResponse.secure_url });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}