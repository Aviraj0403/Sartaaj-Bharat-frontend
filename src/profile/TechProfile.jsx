import React from "react";
import { User, ShieldCheck, Zap, Activity, Clock, Terminal } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function TechProfile() {
  const { user } = useAuth();

  const securityStats = [
    { label: "Account Integrity", value: "Verified", icon: ShieldCheck, color: "text-emerald-500" },
    { label: "Deployment Access", value: "Level 4", icon: Zap, color: "text-blue-500" },
    { label: "Active Nodes", value: "2 Points", icon: Activity, color: "text-indigo-500" },
    { label: "Session Uptime", value: "Current", icon: Clock, color: "text-slate-400" },
  ];

  return (
    <div className="p-4 md:p-8 bg-white min-h-[70vh]">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 px-2">
        <div>
          <h1 className="text-4xl md:text-6xl font-black text-slate-900 mb-2 italic tracking-tighter uppercase leading-none">
            User <span className="text-blue-600">Protocol</span>
          </h1>
          <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.4em] italic leading-relaxed">
            Identity verification and tactical preferences
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-8">
        {/* Profile Identity Card */}
        <div className="bg-slate-950 rounded-[3rem] p-8 md:p-12 relative overflow-hidden group border border-slate-900 shadow-2xl">
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/10 blur-[100px] rounded-full translate-x-1/2 -translate-y-1/2 group-hover:bg-blue-600/20 transition-colors duration-700"></div>
          
          <div className="relative z-10 flex flex-col md:flex-row items-center md:items-start gap-10">
            <div className="relative">
              <div className="w-32 h-32 md:w-40 md:h-40 bg-blue-600 rounded-[2.5rem] flex items-center justify-center rotate-3 group-hover:rotate-0 transition-transform duration-500 shadow-2xl shadow-blue-500/30 border-4 border-white/10">
                <User size={64} className="text-white" strokeWidth={2.5} />
              </div>
              <div className="absolute -bottom-2 -right-2 bg-emerald-500 w-10 h-10 rounded-2xl flex items-center justify-center border-4 border-slate-950 shadow-xl">
                <ShieldCheck size={18} className="text-white" />
              </div>
            </div>

            <div className="flex-1 text-center md:text-left space-y-6">
              <div>
                <span className="bg-blue-600/10 text-blue-400 text-[9px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest border border-blue-500/20 mb-4 inline-block italic">
                  Primary Operator
                </span>
                <h2 className="text-3xl md:text-5xl font-black text-white italic tracking-tighter uppercase leading-tight">
                  {user?.name || user?.username}
                </h2>
                <p className="text-slate-400 font-bold uppercase tracking-[0.2em] text-[10px] mt-1">
                  {user?.email}
                </p>
              </div>

              <div className="flex flex-wrap justify-center md:justify-start gap-4">
                 <div className="px-5 py-3 bg-white/5 border border-white/10 rounded-2xl flex items-center gap-3 group/btn hover:bg-white/10 transition-all cursor-default">
                    <Terminal size={14} className="text-blue-500" />
                    <span className="text-[10px] font-black text-white uppercase tracking-widest italic">Dev System Active</span>
                 </div>
              </div>
            </div>
          </div>

          <div className="mt-12 h-px w-full bg-slate-800"></div>

          <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-6">
            {securityStats.map((stat, i) => (
              <div key={i} className="space-y-2">
                <stat.icon size={16} className={`${stat.color} mb-1`} strokeWidth={2.5} />
                <p className="text-[8px] font-black text-slate-500 uppercase tracking-widest leading-none">
                  {stat.label}
                </p>
                <p className="text-xs font-black text-white italic uppercase tracking-tight">
                  {stat.value}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Tactical Feed / Activity (Placeholder) */}
        <div className="space-y-6">
          <div className="bg-slate-50 border border-slate-100 rounded-[2.5rem] p-8 h-full flex flex-col justify-center text-center">
            <Activity size={40} className="mx-auto text-blue-600 mb-6" strokeWidth={1} />
            <h3 className="text-xl font-black text-slate-900 uppercase tracking-widest italic mb-3">
              Neural Activity
            </h3>
            <p className="text-slate-500 text-xs font-medium italic leading-relaxed max-w-[200px] mx-auto">
              Deployment history and interaction logs are currently synchronized with the main terminal.
            </p>
            <div className="mt-8 flex justify-center gap-2">
               {[...Array(4)].map((_, i) => (
                 <div key={i} className={`w-8 h-1 rounded-full ${i === 0 ? 'bg-blue-600' : 'bg-slate-200'}`}></div>
               ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
