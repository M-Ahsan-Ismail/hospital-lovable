import React from "react";
import { Heart } from "lucide-react";

const LightFooter: React.FC = () => {
  return (
    <footer className="mt-auto py-8 border-t border-slate-200 bg-white/80 backdrop-blur-md z-10 relative">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <span className="text-2xl font-bold text-slate-800">
              MediSphere<span className="text-emerald-600">.</span>
            </span>
            <p className="text-slate-600 text-sm mt-1">
              Efficient Patient Record Management
            </p>
          </div>
          
          <div className="flex items-center text-slate-600 text-sm">
            <a href="#" className="hover:text-emerald-600 transition-colors mr-6">
              Contact Us
            </a>
            <a href="#" className="hover:text-emerald-600 transition-colors mr-6">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-emerald-600 transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
        
        <div className="mt-6 text-center text-slate-500 text-xs">
          <p className="flex items-center justify-center">
            Built with <Heart size={12} className="mx-1 text-emerald-500" /> for healthcare professionals
          </p>
          <p className="mt-1">© {new Date().getFullYear()} MediSphere. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default LightFooter;