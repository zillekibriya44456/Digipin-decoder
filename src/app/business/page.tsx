"use client"

import { useState } from "react"
import { Navbar } from "@/components/Navbar"
import { Footer } from "@/components/Footer"
import { Building2, Users, MapPin, QrCode, Download, Plus, Search, FileBarChart } from "lucide-react"

export default function BusinessDashboard() {
  const [branches, setBranches] = useState([
    { id: 1, name: "HQ - Mumbai", digipin: "39J-438-TJC7", usage: 1245 },
    { id: 2, name: "Branch - Delhi", digipin: "8H2-K9L-M4N", usage: 890 },
    { id: 3, name: "Warehouse - Pune", digipin: "P9L-23M-X9C", usage: 3450 },
  ])

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-1 pt-28 pb-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-4">
            <div>
              <h1 className="text-3xl font-bold mb-2">Business Dashboard</h1>
              <p className="text-muted-foreground">Manage your enterprise locations and track API usage.</p>
            </div>
            <button className="px-4 py-2 rounded-lg bg-primary text-white hover:bg-primary/90 transition-colors flex items-center gap-2 font-medium">
              <Plus className="w-4 h-4" /> Add Branch
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="glass p-6 rounded-2xl">
              <div className="w-10 h-10 rounded-lg bg-blue-500/10 text-blue-500 flex items-center justify-center mb-4">
                <Building2 className="w-5 h-5" />
              </div>
              <h3 className="text-2xl font-bold mb-1">3</h3>
              <p className="text-sm text-muted-foreground">Active Branches</p>
            </div>
            <div className="glass p-6 rounded-2xl">
              <div className="w-10 h-10 rounded-lg bg-purple-500/10 text-purple-500 flex items-center justify-center mb-4">
                <Users className="w-5 h-5" />
              </div>
              <h3 className="text-2xl font-bold mb-1">5,585</h3>
              <p className="text-sm text-muted-foreground">Location Interactions</p>
            </div>
            <div className="glass p-6 rounded-2xl flex flex-col justify-center gap-3">
              <button className="w-full px-4 py-2 rounded-lg bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors flex items-center justify-center gap-2 text-sm font-medium">
                <Download className="w-4 h-4" /> Export Report (CSV)
              </button>
              <button className="w-full px-4 py-2 rounded-lg bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors flex items-center justify-center gap-2 text-sm font-medium">
                <FileBarChart className="w-4 h-4" /> Usage Analytics
              </button>
            </div>
            <div className="glass p-6 rounded-2xl flex items-center justify-center border-dashed border-2 border-primary/30 cursor-pointer hover:bg-primary/5 transition-colors">
              <div className="text-center">
                <QrCode className="w-8 h-8 text-primary mx-auto mb-2" />
                <p className="font-medium">Generate Bulk QR</p>
              </div>
            </div>
          </div>

          <div className="glass rounded-3xl overflow-hidden">
            <div className="p-6 border-b border-border flex justify-between items-center bg-black/5 dark:bg-white/5">
              <h2 className="text-xl font-bold flex items-center gap-2">
                <MapPin className="w-5 h-5 text-primary" /> Managed Locations
              </h2>
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input 
                  type="text" 
                  placeholder="Search branches..." 
                  className="pl-9 pr-4 py-2 rounded-lg border border-border bg-background focus:outline-none focus:border-primary text-sm"
                />
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-black/5 dark:bg-white/5 text-sm uppercase text-muted-foreground">
                  <tr>
                    <th className="px-6 py-4 font-semibold">Branch Name</th>
                    <th className="px-6 py-4 font-semibold">DIGIPIN</th>
                    <th className="px-6 py-4 font-semibold">API Usage</th>
                    <th className="px-6 py-4 font-semibold text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {branches.map(branch => (
                    <tr key={branch.id} className="hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
                      <td className="px-6 py-4 font-medium">{branch.name}</td>
                      <td className="px-6 py-4 font-mono text-primary">{branch.digipin}</td>
                      <td className="px-6 py-4">{branch.usage} requests</td>
                      <td className="px-6 py-4 text-right space-x-2">
                        <button className="px-3 py-1 text-sm bg-secondary rounded hover:bg-secondary/80">QR Code</button>
                        <button className="px-3 py-1 text-sm bg-secondary rounded hover:bg-secondary/80">Edit</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
