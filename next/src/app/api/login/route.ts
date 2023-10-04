import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();

  const response = await fetch('http://localhost:3003/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: body.email,
      password: body.password,
    })
  });
  const resJson = await response.json();

  if (resJson.success === true) {
    cookies().set('accessToken', resJson.accessToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60,
    });
    cookies().set('refreshToken', resJson.refreshToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60,
    });

    delete resJson.accessToken;
    delete resJson.refreshToken;
    return NextResponse.json(resJson);
  }

  return NextResponse.json({
    success: false,
    message: 'Credential Error',
  })
}