import { MdChat } from "react-icons/md";

export const ChatButton = () => {
  return (
    <div className="fixed bottom-8 right-8 group">
      {/* Tooltip/Label (Visible on Hover) */}
      <span
        className="absolute -top-10 left-1/2 -translate-x-1/2 scale-0 group-hover:scale-100 
        transition-transform bg-slate-800 text-white text-xs px-3 py-1 rounded shadow-xl whitespace-nowrap"
      >
        AI Flood SUggestions
      </span>

      {/* Notification Badge */}
      <div className="absolute top-0 right-0 w-4 h-4 bg-red-500 border-2 border-white rounded-full z-10 animate-bounce" />

      {/* Main Button */}
      <button
        onClick={() => (window.location.href = "/chat")}
        className="relative w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 
          flex items-center justify-center text-white shadow-[0_10px_20px_rgba(59,130,246,0.3)]
          hover:shadow-[0_15px_30px_rgba(59,130,246,0.5)] hover:-translate-y-1 
          active:scale-95 transition-all duration-300 overflow-hidden"
      >
        {/* Glass Glow Effect */}
        <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
        <MdChat className="w-8 h-8" />
        {/* Icon */}
      </button>

      {/* Pulse Rings */}
      <div className="absolute inset-0 rounded-2xl bg-blue-400 opacity-20 animate-ping -z-10" />
    </div>
  );
};
