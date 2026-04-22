"use client"

import { ProjectPageLayout } from '@/components/layout/ProjectPageLayout'

export default function FigmaBuddyPage() {
  return (
    <ProjectPageLayout
      title="Building AI feedback flow via Figma comments"
      hero={{ type: 'video', youtubeId: 'J0Z9t416FEY', thumbnailAlt: 'Figma Buddy demo video thumbnail' }}
      overviewLeft={
        <div>
          <h2 className="text-h1 font-serif font-light mb-[30px]">Overview</h2>
          <p className="font-serif text-[17px] leading-relaxed mb-[24px]">
            Designers often step out of Figma to get AI feedback, pasting images into ChatGPT or other tools for critique. While this works, it disrupts their creative flow and separates design from reflection.
          </p>
          <p className="font-serif text-[17px] leading-relaxed mb-[24px]">
            Figma Buddy explores how AI can exist <em>inside</em> the design process rather than outside it. By allowing users to comment <strong>@buddy</strong> within Figma, designers can receive contextual feedback on hierarchy, typography, layout, and usability without leaving their workspace.
          </p>
          <p className="font-serif text-[17px] leading-relaxed">
            This project began as a proof of concept to test how AI can understand frame context, interpret visual data, and provide structured, conversational design critique directly in Figma comments.
          </p>
        </div>
      }
      overviewRight={
        <div>
          <p className="text-caption font-serif text-[#9e9e9e] mb-[20px] uppercase tracking-widest">Project stack</p>
          <ul className="space-y-[14px] list-none p-0 m-0">
            <li className="font-serif text-[17px] leading-relaxed">
              <strong>OpenAI API</strong> for generating contextual design feedback
            </li>
            <li className="font-serif text-[17px] leading-relaxed">
              <strong>Supabase</strong> for authentication, data storage, and activity logging
            </li>
            <li className="font-serif text-[17px] leading-relaxed">
              <strong>Vercel</strong> for app hosting and deployment
            </li>
            <li className="font-serif text-[17px] leading-relaxed">
              <strong>Cursor IDE</strong> for development and rapid iteration
            </li>
            <li className="font-serif text-[17px] leading-relaxed">
              <strong>GitHub</strong> for version control and public collaboration
            </li>
          </ul>
        </div>
      }
      nextHref="/ai-pam"
      nextLabel="AI-Pam"
    />
  )
}
