import { NextResponse } from "next/server";
import { cartData } from "@/lib/mockData";

export async function GET() {
  // Simulate network delay for realism
  await new Promise((resolve) => setTimeout(resolve, 300));
  return NextResponse.json(cartData);
}
