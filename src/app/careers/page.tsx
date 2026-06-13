import { Navbar } from "@/components/Navbar"
import { Footer } from "@/components/Footer"
import { MapPin, Briefcase, ChevronRight } from "lucide-react"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Careers | DIGIPIN Enterprise",
  description: "Join the team building the future of global location intelligence.",
}

const JOBS = [
  { role: "Senior Geospatial Engineer", department: "Engineering", location: "San Francisco, CA (Hybrid)" },
  { role: "Full Stack Developer (Next.js)", department: "Engineering", location: "Remote" },
  { role: "Product Manager, API", department: "Product", location: "New York, NY" },
  { role: "Enterprise Account Executive", department: "Sales", location: "London, UK" }
]

export default function CareersPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-28 pb-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Join the DIGIPIN Team</h1>
            <p className="text-lg text-muted-foreground">
              Help us map the unmapped and build the infrastructure for the next generation of global logistics.
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold mb-6">Open Positions</h2>
            <div className="space-y-4">
              {JOBS.map((job, i) => (
                <div key={i} className="glass p-6 rounded-2xl flex flex-col md:flex-row md:items-center justify-between group cursor-pointer hover:bg-white/5 transition-colors border border-transparent hover:border-white/10">
                  <div>
                    <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">{job.role}</h3>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1"><Briefcase className="w-4 h-4" /> {job.department}</span>
                      <span className="flex items-center gap-1"><MapPin className="w-4 h-4" /> {job.location}</span>
                    </div>
                  </div>
                  <div className="mt-4 md:mt-0">
                    <button className="bg-primary/10 text-primary p-3 rounded-xl group-hover:bg-primary group-hover:text-white transition-colors">
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-12 glass p-8 rounded-3xl text-center border border-dashed border-white/20">
              <h3 className="text-xl font-bold mb-2">Don't see your role?</h3>
              <p className="text-muted-foreground mb-6">We're always looking for talented individuals. Send us your resume anyway.</p>
              <button className="bg-white/10 hover:bg-white/20 font-medium px-6 py-2 rounded-xl transition-colors">
                Email careers@digipin.io
              </button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
