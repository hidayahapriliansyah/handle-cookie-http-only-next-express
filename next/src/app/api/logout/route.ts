import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const responseApi = await fetch('http://localhost:3003/sign-out');
  const resApiJson = responseApi.json();

  const response = NextResponse.json(resApiJson);
  response.cookies.delete('accessToken');
  response.cookies.delete('refreshToken');
  return response;
};
