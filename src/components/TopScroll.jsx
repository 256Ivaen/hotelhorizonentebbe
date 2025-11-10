import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { assets } from "../assets/assets";

const TopScroll = () => {
  const { pathname } = useLocation();
  const [showScrollToTop, setShowScrollToTop] = useState(false);
  const [showWhatsAppPopup, setShowWhatsAppPopup] = useState(false);

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 200) {
        setShowScrollToTop(true);

        // Show the WhatsApp popup message after 3 seconds of scrolling
        setTimeout(() => {
          if (!localStorage.getItem("whatsappPopupShown")) {
            setShowWhatsAppPopup(true);
            localStorage.setItem("whatsappPopupShown", "true"); 
          }
        }, 3000);
      } else {
        setShowScrollToTop(false);
        setShowWhatsAppPopup(false); 
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (showWhatsAppPopup) {
      // Hide the WhatsApp popup after 10 seconds
      const timer = setTimeout(() => {
        setShowWhatsAppPopup(false);
      }, 10000);

      return () => clearTimeout(timer);
    }
  }, [showWhatsAppPopup]);

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      {showScrollToTop && (
        <>
          {/* WhatsApp Button */}
          <a
            href="https://wa.me/256740505050"
            target="_blank"
            rel="noopener noreferrer"
            className="fixed bottom-20 right-6 bg-green-500 text-white w-10 h-10 rounded-full shadow-lg transition-all border flex items-center justify-center text-2xl z-[9000]"
          >
            <img src={assets.whatsapp} alt="WhatsApp" className="w-6 h-6" />
          </a>

          {/* WhatsApp Popup Message */}
          {showWhatsAppPopup && (
            <div className="fixed bottom-20 right-20 bg-white text-gray-800 px-4 py-2 rounded-lg shadow-lg transition-all z-[9000] animate-fadeIn">
              Chat with us on WhatsApp 📲
            </div>
          )}
        </>
      )}

      {/* Scroll to Top Button */}
      {showScrollToTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 bg-[#01234e] text-white w-10 h-10 rounded-full shadow-lg transition-all border flex items-center justify-center text-2xl z-[9000]"
        >
          <img
            src={assets.arrowUp}
            alt="Scroll to top"
            className="w-6 h-6 transform rotate-[-90deg]"
          />
        </button>
      )}
    </>
  );
};

export default TopScroll;
