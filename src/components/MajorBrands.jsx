import React from "react";

const MajorBrands = () => {
  const logos = [
    {
      src: "https://cdn.brandfetch.io/idVC4cqYlK/w/102/h/86/theme/dark/logo.png",
      alt: "UN",
    },
    {
      src: "https://cdn.brandfetch.io/idB52afxsR/theme/light/logo.svg?c=1dxbfHSJFAPEGdCLU4o5B",
      alt: "Ecobank",
    },
    {
      src: "https://cdn.brandfetch.io/id01d_Yuue/w/524/h/148/theme/light/logo.png?c=1dxbfHSJFAPEGdCLU4o5B",
      alt: "Bank Of Uganda",
    },
    {
      src: "https://cdn.brandfetch.io/idcH-S_tZv/theme/dark/logo.svg?c=1dxbfHSJFAPEGdCLU4o5B",
      alt: "Total",
    },
    {
      src: "https://cdn.brandfetch.io/idL8t-KOWe/w/377/h/206/theme/dark/logo.png?c=1dxbfHSJFAPEGdCLU4o5B",
      alt: "Africell",
    },
    {
      src: "https://cdn.brandfetch.io/idFGtyBjk_/w/2045/h/317/theme/dark/logo.png?c=1dxbfHSJFAPEGdCLU4o5B",
      alt: "Roko Construction",
    },
    {
      src: "https://cdn.brandfetch.io/idbEJ2XWew/theme/light/logo.svg?c=1dxbfHSJFAPEGdCLU4o5B",
      alt: "UBA",
    },
    {
      src: "https://cdn.brandfetch.io/id-UmnExAG/theme/light/logo.svg?c=1dxbfHSJFAPEGdCLU4o5B",
      alt: "KPMG",
    },
    {
      src: "https://cdn.brandfetch.io/idvtkQjw5h/theme/dark/logo.svg?c=1dxbfHSJFAPEGdCLU4o5B",
      alt: "Orange",
    },
    {
      src: "https://cdn.brandfetch.io/idA3CmdR9v/w/650/h/50/theme/light/logo.png?c=1dxbfHSJFAPEGdCLU4o5B",
      alt: "Britania",
    },
    {
      src: "https://cdn.brandfetch.io/idsSOQj-I9/w/252/h/58/theme/dark/logo.png?c=1dxbfHSJFAPEGdCLU4o5B",
      alt: "Grow More Seeds",
    },
    {
      src: "https://cdn.brandfetch.io/id5VkXmNdO/w/198/h/87/theme/dark/logo.png?c=1dxbfHSJFAPEGdCLU4o5B",
      alt: "Orient Bank / I&M",
    },
    {
      src: "https://cdn.brandfetch.io/id64bRDs7g/theme/dark/logo.svg?c=1dxbfHSJFAPEGdCLU4o5B",
      alt: "KCB",
    },
    {
      src: "https://cdn.brandfetch.io/idtdXB-ogi/w/400/h/400/theme/dark/icon.jpeg?c=1dxbfHSJFAPEGdCLU4o5B",
      alt: "MTN",
    },
    {
      src: "https://cdn.brandfetch.io/idJmRz705r/w/209/h/113/theme/dark/logo.png?c=1dxbfHSJFAPEGdCLU4o5B",
      alt: "Malaika Beach Resort",
    },
    {
      src: "https://cdn.brandfetch.io/idlr2Np6uN/theme/dark/logo.svg?c=1dxbfHSJFAPEGdCLU4o5B",
      alt: "UNHCR",
    },
    {
      src: "https://cdn.brandfetch.io/id5BZM95hZ/w/2292/h/673/theme/dark/logo.png?c=1dxbfHSJFAPEGdCLU4o5B",
      alt: "EA Seed",
    },
    {
      src: "https://cdn.brandfetch.io/id0DQ-cAhI/theme/light/logo.svg?c=1dxbfHSJFAPEGdCLU4o5B",
      alt: "Protea Hotels",
    },
    {
      src: "https://cdn.brandfetch.io/idjMNCMLK_/w/650/h/270/theme/dark/logo.png?c=1dxbfHSJFAPEGdCLU4o5B",
      alt: "Simba Telecom",
    },
    {
      src: "https://cdn.brandfetch.io/idKLNQtXoa/w/250/h/112/theme/dark/logo.png?c=1dxbfHSJFAPEGdCLU4o5B",
      alt: "Tropical Bank",
    },
    {
      src: "https://cdn.brandfetch.io/idw16PkiYo/theme/light/logo.svg?c=1dxbfHSJFAPEGdCLU4o5B",
      alt: "Engen",
    },
    {
      src: "https://cdn.brandfetch.io/idCUngtUJY/w/200/h/200/theme/dark/logo.png?c=1dxbfHSJFAPEGdCLU4o5B",
      alt: "Hass",
    },
    {
      src: "https://cdn.brandfetch.io/idjMNCMLK_/w/650/h/270/theme/dark/logo.png?c=1dxbfHSJFAPEGdCLU4o5B",
      alt: "Simba Telecom",
    },
    // {
    //   src: "https://cdn.brandfetch.io/idjMNCMLK_/w/650/h/270/theme/dark/logo.png?c=1dxbfHSJFAPEGdCLU4o5B",
    //   alt: "Simba Telecom",
    // },
  ];

  return (
    <>
      <style>{`
        .marquee {
          display: flex;
          align-items: center;
          overflow: hidden;
          position: relative;
          padding: 10px 0;
        }

        .marquee-track {
          display: flex;
          gap: 40px; 
          animation: scroll 20s linear infinite;
        }

        .marquee-track img {
          height: 35px; 
          object-fit: contain;
          transition: transform 0.3s ease; 
        }

        .marquee-track img:hover {
          transform: scale(1.1); 
        }

        @keyframes scroll {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }

        /* Media query for smaller screens */
        @media (max-width: 768px) {
          .marquee-track {
            gap: 20px; /* Reduce gap on smaller screens */
          }
          .marquee-track img {
            height: 50px; /* Smaller height for mobile */
          }
        }
      `}</style>

      <div className="bg-[#01234e] flex flex-col items-center gap-2 w-full py-5 overflow-hidden">
        <h2 className="text-white text-xs sm:text-sm">Trusted by 100+ Company Partners in the world.</h2>

        <div className="marquee">
          <div className="marquee-track">
            {/* Repeat logos twice to ensure smooth infinite scroll */}
            {[...logos, ...logos].map((logo, index) => (
              <img key={index} src={logo.src} alt={logo.alt} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default MajorBrands;
