"use client"

import { CircularRevealHeading } from "@/components/ui/circular-reveal-heading"

const items = [
  {
    text: "SYSTEMS",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&h=400&fit=crop"
  },
  {
    text: "AI",
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=400&fit=crop"
  },
  {
    text: "SECURITY",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=400&fit=crop"
  },
  {
    text: "ENTERPRISE",
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400&h=400&fit=crop"
  },
  {
    text: "GROWTH",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=400&fit=crop"
  }
]

export function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-contact">
          <h2 className="footer-heading">Interested in collaborating? Let&apos;s connect</h2>
          <div className="footer-links">
            <a href="mailto:charen@gmail.com" className="footer-link">charen@gmail.com</a>
            <a href="tel:+12269215640" className="footer-link">+1 226 921 5640</a>
          </div>
        </div>
        <div className="hidden md:block flex-shrink-0">
          <CircularRevealHeading
            items={items}
            centerText={
              <div className="text-xl font-bold text-[#444444]">
                CHAREN
              </div>
            }
            size="xs"
          />
        </div>
      </div>
    </footer>
  )
}
