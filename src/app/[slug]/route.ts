import { type NextRequest } from 'next/server'
import { shortlinkResponse } from './shortlink'

// Short attribution URL like /okta: unlock and land on the home page.
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params
  return shortlinkResponse(request, slug, '/')
}
