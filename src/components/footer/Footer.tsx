import { CiInstagram } from "react-icons/ci";
import { PiTelegramLogoThin, PiTiktokLogoLight } from "react-icons/pi";
import { useMemo } from "react";

const community = [
  {
    name: "Instagram",
    icon: <CiInstagram color="black" size={23}  />,
    url: "https://instagram.com/",
  },
  {
    name: "TikTok",
    icon: <PiTiktokLogoLight color="black" size={23}  />,
    url: "https://tiktok.com/@",
  },
  {
    name: "Telegram",
    icon: <PiTelegramLogoThin color="black" size={23}  />,
    url: "https://t.me/",
  },
];

const FooterSection = ({ title, children }) => (
  <ul className="space-y-2">
    <h3 className="text-lg font-semibold">{title}</h3>
    {children}
  </ul>
);

function Footer() {
  const socialLinks = useMemo(() => community, []);

  return (
    <div className="bg-white w-full">
      <div className="mx-6">
        <hr />
        <div className="flex flex-col md:flex-row md:justify-around py-10 text-sm">
          <FooterSection title="Contact">
            <li>
              <a href="tel:+2512345678">345-678-9065</a>
            </li>
            <li>
              <a href="mailto:infoweb23@gmail.com">infoweb23@gmail.com</a>
            </li>
          </FooterSection>
          <FooterSection title="Shop">
            <li>
              <a href="/">Browse Collection</a>
            </li>
            <li>
              <a href="/new-arrivals">New Arrivals</a>
            </li>
            <li>
              <a href="/categories">Categories</a>
            </li>
          </FooterSection>
          <FooterSection title="Help">
            <li>
              <a href="">Privacy</a>
            </li>
          </FooterSection>
          <FooterSection title="Social Media">
            <div className="flex gap-4">
              {socialLinks.map((item, key) => (
                <li key={key}>
                  <a
                    href={item.url}
                    target="_blank"
                    rel=""
                    // aria-label={`Follow us on ${item.name}`}
                    className="hover:opacity-80 transition-opacity"
                  >
                    {item.icon}
                  </a>
                </li>
              ))}
            </div>
          </FooterSection>
        </div>
        <hr />
        <div className="py-4 text-center text-sm">
          <p>&copy;  All rights reserved</p>
        </div>
      </div>
    </div>
  );
}

export default Footer;