import { type NextRequest } from 'next/server'
import { shortlinkResponse } from '../shortlink'

// Short attribution URL like /google/custom-deck: unlock and land straight
// on the pitch deck instead of the home page.
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params
  return shortlinkResponse(request, slug, '/custom-deck')
}
