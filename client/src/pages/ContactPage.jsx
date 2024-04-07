import React from "react";
import Layoyt from "../components/layout/Layoyt";
import { MdMarkEmailRead } from "react-icons/md";
import { FaPhoneAlt } from "react-icons/fa";
import { FaHeadphones } from "react-icons/fa6";

function ContactPage() {
  return (
    <div>
      <Layoyt title={'Contact Us - Ecommerce App'}>
        <div className="contact-container">
          <img
            src="https://plus.unsplash.com/premium_photo-1661582120130-03b9bdc47a75?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjl8fGN1c3RvbWVyJTIwc2VydmljZXxlbnwwfHwwfHx8MA%3D%3D"
            alt="contact"
          />
          <div className="">
            <h3 className="bg-black text-white p-3 text-center">CONTACT US</h3>
            <p>Any query and info about product feel free to call any time</p>
            <p>We are available 24x7.</p>

            <div className="">
              <a href="mailto:durgavarapraveen@gmail.com">
                <MdMarkEmailRead /> : durgavarapraveen@gmail.com
              </a>
            </div>

            <div className="">
              <p>
                <FaPhoneAlt /> : +91 7997859888
              </p>
            </div>

            <div className="">
              <p>
                <FaHeadphones /> : 1800-0000-0000 (toll free)
              </p>
            </div>
          </div>
        </div>
      </Layoyt>
    </div>
  );
}

export default ContactPage;
