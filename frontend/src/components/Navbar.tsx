import { Link, useLocation } from "react-router-dom"
import { Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import ThemeToggle from "@/components/ThemeToggle"

export default function Navbar() {
  const { pathname } = useLocation()
  const isLanding = pathname === "/"

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-sm">
      <nav className="mx-auto flex h-14 max-w-6xl items-center justify-between px-6">
        <Link to="/" className="flex items-center gap-2 font-semibold tracking-tight">
          <Zap className="size-4 text-primary" strokeWidth={2.5} />
          <span>Thumbmaker</span>
        </Link>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          {isLanding ? (
            <Button asChild size="sm">
              <Link to="/app">Start creating</Link>
            </Button>
          ) : (
            <Button asChild variant="ghost" size="sm">
              <Link to="/">Home</Link>
            </Button>
          )}
        </div>
      </nav>
    </header>
  )
}
