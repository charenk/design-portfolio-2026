import Link from 'next/link'

export interface ProjectCardProps {
  title: string
  tags: string
  href: string
  badge?: string
  aspect: string
  placeholder: string
  rotate?: string
}

export function ProjectCard({ title, tags, href, badge, aspect, placeholder, rotate }: ProjectCardProps) {
  return (
    <Link href={href} className={`group block no-underline ${rotate ?? ''}`}>
      <div
        className={`w-full ${aspect} rounded-[14px] overflow-hidden shadow-sm relative
                    transition-transform duration-[220ms] group-hover:scale-[1.02]`}
        style={{ backgroundColor: placeholder }}
      >
        <div className="absolute inset-0" />
        {badge && (
          <span className="absolute bottom-3 right-3 bg-black/10 text-[#1a1a1a]
                           text-[11px] font-medium px-2.5 py-1 rounded-full">
            {badge}
          </span>
        )}
      </div>
      <div className="mt-3 px-1">
        <p className="font-sans text-[15px] font-semibold text-[#1a1a1a]
                       inline-flex items-center gap-1.5 group-hover:gap-2.5 transition-all duration-[220ms]">
          {title}
          <span aria-hidden="true">→</span>
        </p>
        <p className="font-sans text-[12px] text-[#9e9e9e] mt-1">{tags}</p>
      </div>
    </Link>
  )
}
