"use client"

import { useState } from "react"
import { Navbar } from "@/components/Navbar"
import { Footer } from "@/components/Footer"
import { Users, Activity, AlertTriangle, Key, TrendingUp, ShieldCheck } from "lucide-react"

export default function AdminPanel() {
  const [metrics] = useState({
    totalUsers: 12450,
    dailyActive: 3200,
    apiUsage: 450000,
    revenue: "$12,450",
    errors: 23
  })

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-1 pt-28 pb-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-4">
            <div>
              <h1 className="text-3xl font-bold mb-2 flex items-center gap-2">
                <ShieldCheck className="w-8 h-8 text-emerald-500" /> Admin Control Center
              </h1>
              <p className="text-muted-foreground">Platform health, user management, and revenue analytics.</p>
            </div>
            <div className="flex gap-2">
              <button className="px-4 py-2 rounded-lg bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors font-medium">
                Export Data
              </button>
              <button className="px-4 py-2 rounded-lg bg-primary text-white hover:bg-primary/90 transition-colors font-medium">
                System Settings
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="glass p-6 rounded-2xl border-l-4 border-blue-500">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <p className="text-sm text-muted-foreground font-medium">Total Users</p>
                  <h3 className="text-3xl font-bold">{metrics.totalUsers.toLocaleString()}</h3>
                </div>
                <div className="w-10 h-10 rounded-lg bg-blue-500/10 text-blue-500 flex items-center justify-center">
                  <Users className="w-5 h-5" />
                </div>
              </div>
              <p className="text-xs text-emerald-500 flex items-center gap-1 font-medium">
                <TrendingUp className="w-3 h-3" /> +12% this week
              </p>
            </div>

            <div className="glass p-6 rounded-2xl border-l-4 border-purple-500">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <p className="text-sm text-muted-foreground font-medium">API Requests</p>
                  <h3 className="text-3xl font-bold">{metrics.apiUsage.toLocaleString()}</h3>
                </div>
                <div className="w-10 h-10 rounded-lg bg-purple-500/10 text-purple-500 flex items-center justify-center">
                  <Activity className="w-5 h-5" />
                </div>
              </div>
              <p className="text-xs text-emerald-500 flex items-center gap-1 font-medium">
                <TrendingUp className="w-3 h-3" /> +5% today
              </p>
            </div>

            <div className="glass p-6 rounded-2xl border-l-4 border-emerald-500">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <p className="text-sm text-muted-foreground font-medium">Est. Revenue</p>
                  <h3 className="text-3xl font-bold">{metrics.revenue}</h3>
                </div>
                <div className="w-10 h-10 rounded-lg bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
                  <Key className="w-5 h-5" />
                </div>
              </div>
              <p className="text-xs text-emerald-500 flex items-center gap-1 font-medium">
                <TrendingUp className="w-3 h-3" /> API Billing Active
              </p>
            </div>

            <div className="glass p-6 rounded-2xl border-l-4 border-red-500">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <p className="text-sm text-muted-foreground font-medium">System Errors</p>
                  <h3 className="text-3xl font-bold">{metrics.errors}</h3>
                </div>
                <div className="w-10 h-10 rounded-lg bg-red-500/10 text-red-500 flex items-center justify-center">
                  <AlertTriangle className="w-5 h-5" />
                </div>
              </div>
              <p className="text-xs text-red-500 flex items-center gap-1 font-medium">
                Requires attention
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 glass rounded-3xl p-6">
              <h2 className="text-xl font-bold mb-6">Recent API Activity</h2>
              <div className="space-y-4">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="flex justify-between items-center p-4 rounded-xl bg-black/5 dark:bg-white/5">
                    <div>
                      <p className="font-medium">Decode Request (DIGIPIN: {Math.random().toString(36).substring(2, 8).toUpperCase()})</p>
                      <p className="text-xs text-muted-foreground mt-1">API Key: key_live_{Math.random().toString(36).substring(2, 8)}</p>
                    </div>
                    <div className="text-right">
                      <span className="px-2 py-1 bg-emerald-500/10 text-emerald-500 text-xs font-bold rounded">200 OK</span>
                      <p className="text-xs text-muted-foreground mt-1">2 mins ago</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="glass rounded-3xl p-6">
              <h2 className="text-xl font-bold mb-6">System Health</h2>
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="font-medium">Database Load</span>
                    <span className="text-emerald-500">24%</span>
                  </div>
                  <div className="w-full bg-black/10 dark:bg-white/10 rounded-full h-2">
                    <div className="bg-emerald-500 h-2 rounded-full w-[24%]"></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="font-medium">API Rate Limit Pool</span>
                    <span className="text-yellow-500">85%</span>
                  </div>
                  <div className="w-full bg-black/10 dark:bg-white/10 rounded-full h-2">
                    <div className="bg-yellow-500 h-2 rounded-full w-[85%]"></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="font-medium">Geocoding Latency</span>
                    <span className="text-emerald-500">120ms</span>
                  </div>
                  <div className="w-full bg-black/10 dark:bg-white/10 rounded-full h-2">
                    <div className="bg-emerald-500 h-2 rounded-full w-[15%]"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
