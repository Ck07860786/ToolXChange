import cloudinary from "@/lib/cloudinary";
import dbConnect from "@/lib/dbConnect";


import Tool from "@/models/toolModel";
import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic'


// Disable Next.js default body parsing
export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(request) {
    await dbConnect();
    const formData = await request.formData();
    const ownerId = formData.get('ownerId');
    const name = formData.get('name');
    const status = formData.get('status');
    const description = formData.get('description');
    // status omitted: default "Pending" in model
    const availability = formData.get('availability') === 'true';
    const rentalRate = parseFloat(formData.get('rentalRate'));
    const imageFiles = formData.getAll('images');
    const uploadedImages = [];
  
    for (const file of imageFiles) {
      const buffer = Buffer.from(await file.arrayBuffer());
      const base64 = buffer.toString('base64');
      const dataURI = `data:${file.type};base64,${base64}`;
      const uploadRes = await cloudinary.uploader.upload(dataURI, { folder: 'tooxchange/tools' });
      uploadedImages.push({ public_id: uploadRes.public_id, url: uploadRes.secure_url });
    }
  
    const newTool = await Tool.create({
      ownerId,
      name,
      description,
      availability,
      rentalRate,
     
      images: uploadedImages
      // status defaults to "Pending"
    });
  
    return NextResponse.json({ message: 'Tool created', tool: newTool }, { status: 201 });
  }
  


