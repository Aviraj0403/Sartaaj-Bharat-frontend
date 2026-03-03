import React from "react";
import { Trash2 } from "lucide-react";

export default function DeleteAccount() {
  return (
    <div className="p-8 md:p-12 bg-white rounded-[2.5rem] border border-slate-100 min-h-[50vh]">
      <h1 className="text-4xl font-black text-slate-900 mb-4 italic tracking-tighter uppercase">Termination Protocol</h1>
      <p className="text-slate-500 font-medium uppercase tracking-widest text-xs mb-10 max-w-sm">
        Permanently purge your account and all associated neural data. This action is irreversible.
      </p>

      <div className="p-12 border-2 border-blue-500/20 border-dashed rounded-[3rem] bg-blue-50/50 flex flex-col items-center">
        <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center mb-8 shadow-xl shadow-blue-500/20">
          <Trash2 className="text-white" size={32} />
        </div>
        <p className="text-slate-900 font-black italic uppercase tracking-tighter text-lg mb-8 text-center leading-none">
          Confirm Total <span className="text-blue-600">Account Erasure?</span>
        </p>
        <button className="bg-slate-950 hover:bg-blue-600 text-white px-12 py-4 rounded-xl font-black text-[10px] uppercase tracking-[0.3em] transition-all active:scale-95 italic">
          Initiate Delete Protocol
        </button>
      </div>
    </div>
  );
}
