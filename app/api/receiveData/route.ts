// ./app/api/receiveData/route.ts

import { NextResponse } from 'next/server';

let latestData: any = null; // In-memory storage for the latest data

export async function POST(request: Request) {
  const data = await request.json();
  latestData = data; // Store the received data
  console.log('Received data from iOS app:', data);

  return NextResponse.json({ message: 'Data received successfully' }, { status: 200 });
}

export async function GET() {
  if (latestData) {
    return NextResponse.json(latestData, { status: 200 });
  } else {
    return NextResponse.json({ message: 'No data available' }, { status: 404 });
  }
}
