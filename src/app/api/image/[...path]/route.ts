import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET(
  request: NextRequest,
  { params }: { params: { path: string[] } }
) {
  try {
    const imagePath = params.path.join('/');
    const fullPath = path.join(process.cwd(), 'public', imagePath);
    
    // Check if file exists
    if (!fs.existsSync(fullPath)) {
      return new NextResponse('Image not found', { status: 404 });
    }
    
    // Read file as buffer
    const imageBuffer = fs.readFileSync(fullPath);
    
    // Determine content type
    let contentType = 'image/jpeg';
    if (fullPath.endsWith('.png')) {
      contentType = 'image/png';
    } else if (fullPath.endsWith('.svg')) {
      contentType = 'image/svg+xml';
    } else if (fullPath.endsWith('.gif')) {
      contentType = 'image/gif';
    }
    
    // Return image with appropriate headers
    return new NextResponse(imageBuffer, {
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=86400',
      },
    });
  } catch (error) {
    console.error('Error serving image:', error);
    return new NextResponse('Error serving image', { status: 500 });
  }
} 