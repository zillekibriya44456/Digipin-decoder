"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { MapPin, ArrowRight } from "lucide-react"

export default function RegisterPage() {
  const router = useRouter()
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password })
      })

      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || "Registration failed")
      }

      // Automatically redirect to login after successful registration
      router.push("/login?registered=true")
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-black/5 dark:bg-white/5 py-12 px-4">
      <div className="max-w-md w-full space-y-8 glass p-8 rounded-3xl">
        <div className="text-center">
          <Link href="/" className="inline-flex items-center gap-2 justify-center">
            <div className="bg-primary/10 p-2 rounded-xl">
              <MapPin className="w-8 h-8 text-primary" />
            </div>
            <span className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600">
              DIGIPIN
            </span>
          </Link>
          <h2 className="mt-6 text-3xl font-extrabold text-foreground">Create an account</h2>
          <p className="mt-2 text-sm text-muted-foreground">Start managing your locations worldwide</p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleRegister}>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Full Name</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-border bg-background/50 focus:outline-none focus:border-primary transition-colors"
                placeholder="John Doe"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Email address</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-border bg-background/50 focus:outline-none focus:border-primary transition-colors"
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Password</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-border bg-background/50 focus:outline-none focus:border-primary transition-colors"
                placeholder="••••••••"
              />
            </div>
          </div>

          {error && <div className="text-destructive text-sm font-medium">{error}</div>}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-primary hover:bg-primary/90 text-white rounded-xl font-medium transition-all disabled:opacity-70 flex justify-center items-center gap-2"
          >
            {loading ? "Creating account..." : <>Sign Up <ArrowRight className="w-4 h-4" /></>}
          </button>
        </form>
        <div className="text-center mt-6">
          <p className="text-sm text-muted-foreground">
            Already have an account? <Link href="/login" className="font-medium text-primary hover:text-primary/80">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  )
}
