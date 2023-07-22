import { NextRequest, NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";
import Error from "next/error";

cloudinary.config({
    cloud_name:process.env.CLOUD_NAME,
    api_key:process.env.CLOUD_API_KEY,
    api_secret:process.env.CLOUD_SECRET
})
export async function POST(req:NextRequest) {
    const {imagePath} = await req.json();
    if(!imagePath) return NextResponse.json({message:"Image path is required"},{status:400})

    try {
        const options = {
            use_filename: true,
            unique_filename:false,
            overwrite:true,
            transformation:[{width:1000,height:752,crop:'scale'}]
        }
        const cloud = await  cloudinary.uploader.upload(imagePath,options);
        return NextResponse.json({message:"Image uploaded successfully",imageUrl:cloud.url})
    } catch (error:any) {
        return NextResponse.json({message:error.message},{status:500});
    }
}