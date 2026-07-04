import { Routes, Route } from "react-router-dom"
import { TooltipProvider } from "@/components/ui/tooltip"
import { Toaster } from "@/components/ui/sonner"
import Landing from "@/pages/Landing"
import Generator from "@/pages/Generator"

export default function App() {
  return (
    <TooltipProvider delayDuration={300}>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/app" element={<Generator />} />
      </Routes>
      <Toaster position="bottom-right" />
    </TooltipProvider>
  )
}
