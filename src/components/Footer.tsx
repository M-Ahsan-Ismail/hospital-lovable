
import React from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

interface FooterProps {
  theme?: "dark" | "light";
}

const Footer: React.FC<FooterProps> = ({ theme = "dark" }) => {
  const isDark = theme === "dark";
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className={cn(
      "relative z-10 py-12",
      isDark ? "bg-dark border-t border-white/5" : "bg-white border-t border-gray-100"
    )}>
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between">
          <div className="mb-8 md:mb-0">
            <Link to="/" className="flex items-center mb-4">
              <div className={cn(
                "w-8 h-8 rounded-md flex items-center justify-center mr-2",
                isDark 
                  ? "bg-gradient-to-br from-neon-cyan to-neon-magenta" 
                  : "bg-gradient-to-br from-blue-500 to-pink-500"
              )}>
                <span className="text-white text-sm font-bold">MS</span>
              </div>
              <span className={cn(
                "text-lg font-bold",
                isDark ? "text-white" : "text-gray-800"
              )}>MediSphere</span>
            </Link>
            <p className={cn(
              "max-w-xs mb-4",
              isDark ? "text-white/60" : "text-gray-600"
            )}>
              Empowering healthcare professionals with intelligent patient management solutions.
            </p>
            <div className="flex space-x-4">
              {["Twitter", "LinkedIn", "Facebook"].map((social) => (
                <a 
                  key={social} 
                  href="#" 
                  className={cn(
                    "p-2 rounded-full transition-colors duration-300",
                    isDark 
                      ? "bg-dark-secondary hover:bg-white/10 text-white/70 hover:text-white" 
                      : "bg-gray-100 hover:bg-gray-200 text-gray-600 hover:text-gray-800"
                  )}
                >
                  {social[0]}
                </a>
              ))}
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 md:gap-16">
            {[
              {
                title: "Product", 
                links: ["Features", "Pricing", "Testimonials", "Demo"]
              },
              {
                title: "Company",
                links: ["About Us", "Careers", "Blog", "Contact"]
              },
              {
                title: "Resources",
                links: ["Help Center", "Documentation", "Privacy Policy", "Terms of Service"]
              }
            ].map((column, idx) => (
              <div key={idx} className="mb-6">
                <h3 className={cn(
                  "text-sm font-semibold uppercase mb-4",
                  isDark ? "text-white" : "text-gray-800"
                )}>
                  {column.title}
                </h3>
                <ul className="space-y-3">
                  {column.links.map((link, index) => (
                    <li key={index}>
                      <a 
                        href="#" 
                        className={cn(
                          "transition-colors duration-300",
                          isDark ? "text-white/60 hover:text-white" : "text-gray-600 hover:text-gray-900"
                        )}
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        
        <div className={cn(
          "pt-8 mt-8 border-t",
          isDark ? "border-white/5" : "border-gray-100"
        )}>
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className={cn(
              "text-sm",
              isDark ? "text-white/50" : "text-gray-500"
            )}>
              © {currentYear} MediSphere. All rights reserved.
            </p>
            <div className="mt-4 md:mt-0 flex space-x-6">
              {["Privacy Policy", "Terms of Service", "Cookies Policy"].map((link) => (
                <a 
                  key={link} 
                  href="#" 
                  className={cn(
                    "text-sm transition-colors duration-300",
                    isDark ? "text-white/50 hover:text-white" : "text-gray-500 hover:text-gray-900"
                  )}
                >
                  {link}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
