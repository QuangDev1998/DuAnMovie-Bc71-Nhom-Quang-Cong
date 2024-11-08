// Footer.js
import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-20" id="ungDungSection">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* TIX */}
          <div>
            <h3 className="font-semibold text-lg mb-4">TIX</h3>
            <ul>
              <li>
                <a href="#" className="">
                  FAQ
                </a>
              </li>
              <li>
                <a href="#" className="">
                  Brand Guidelines
                </a>
              </li>
            </ul>
          </div>

          {/* Đối Tác */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Đối Tác</h3>
            <div className="grid grid-cols-4 gap-4">
              <img
                src="https://link-to-logo1.png"
                alt="Đối Tác 1"
                className="w-10 h-10"
              />
              <img
                src="https://link-to-logo2.png"
                alt="Đối Tác 2"
                className="w-10 h-10"
              />
              <img
                src="https://link-to-logo3.png"
                alt="Đối Tác 3"
                className="w-10 h-10"
              />
              {/* Thêm các logo khác tương tự */}
            </div>
          </div>

          {/* Mobile App */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Mobile App</h3>
            <div className="flex space-x-4">
              <img
                src="https://link-to-apple-logo.png"
                alt=""
                className="w-10 h-10"
              />
              <img
                src="https://link-to-android-logo.png"
                alt=""
                className="w-10 h-10"
              />
            </div>
          </div>

          {/* Social */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Social</h3>
            <div className="flex space-x-4">
              <img
                src="https://link-to-facebook-logo.png"
                alt=""
                className="w-10 h-10"
              />
              <img
                src="https://link-to-zalo-logo.png"
                alt=""
                className="w-10 h-10"
              />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
