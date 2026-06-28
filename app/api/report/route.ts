import { promises as fs } from 'fs';
import path from 'path';

export async function POST(request: Request) {
  try {
    const newSlap = await request.json();
    const filePath = path.join(process.cwd(), 'data/stickers.json');

    // 1. Read existing data
    const fileData = await fs.readFile(filePath, 'utf8');
    const stickers = JSON.parse(fileData);

    // 2. Append new entry with all required fields
    // We ensure name and description are captured, plus the coordinates
    stickers.push({
      id: Date.now(),
      name: newSlap.name || "Anonymous",
      description: newSlap.description || "No description provided",
      lat: newSlap.lat,
      lng: newSlap.lng,
      foundCount: 1
    });

    // 3. Save back to file
    await fs.writeFile(filePath, JSON.stringify(stickers, null, 2));

    return Response.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Failed to save slap:", error);
    return Response.json({ success: false, error: "Failed to update database" }, { status: 500 });
  }
}