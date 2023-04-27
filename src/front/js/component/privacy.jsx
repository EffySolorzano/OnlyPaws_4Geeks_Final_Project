import React from "react";
import { Link } from "react-router-dom";
import Footer from "../pages/footer.jsx";
import Privacyimg from "../../img/privacyimg.jpg";

function Privacy() {
  return (
    <>
      <div className="privacy-top"></div>
      <div className="container-privacy">
        <div className="privacy">
          <h4 className="title-privacy">PRIVACY POLICY</h4>
          <div>
            <div className="paragraph-privacy">
              <p>
                OnlyPaws ("The Company") is committed to protecting the privacy
                and security of our users' personal information. This Privacy
                Policy explains how we collect, use, and disclose information
                when you use the OnlyPaws website (the "Site"), its content, and
                any related services or products (collectively, the "Service").
              </p>
            </div>
            <h4 className="title-privacy">COLLECTED INFORMATION</h4>
            <div className="paragraph-privacy">
              <p>
                The Company collects information that you provide to us when you
                use the Service, including your name, email address, phone
                number, and payment information. We also collect information
                about your use of the Service, including your IP address,
                browser type, device type, and operating system.
              </p>
            </div>
            <h4 className="title-privacy">COOKIES AND TRACKING TECHNOLOGIES</h4>
            <div className="paragraph-privacy">
              <p>
                The Company uses cookies and other tracking technologies to
                collect information about your use of the Service, including
                your preferences and browsing behavior. We use this information
                to personalize your experience, improve the Service, and analyze
                trends.
              </p>
            </div>
            <h4 className="title-privacy">USE OF INFORMATION</h4>
            <div className="paragraph-privacy">
              <p>
                The Company uses the information it collects to provide and
                improve the Service, process payments, communicate with you, and
                personalize your experience. The Company may also use the
                information for research and analytics purposes.
              </p>
            </div>
            <h4 className="title-privacy">DISCLOSURE OF INFORMATION</h4>
            <div className="paragraph-privacy">
              <p>
                The Company may disclose your information to third-party service
                providers who assist us in providing and improving the Service,
                or as required by law. The Company does not sell or rent your
                personal information to third parties.
              </p>
            </div>
            <h4 className="title-privacy">DATA RETENTION</h4>
            <div className="paragraph-privacy">
              <p>
                The Company retains your information for as long as necessary to
                provide the Service and fulfill our legal obligations. The
                Company may also retain your information for research and
                analytics purposes.
              </p>
            </div>
            <h4 className="title-privacy">SECURITY</h4>
            <div className="paragraph-privacy">
              <p>
                The Company take reasonable measures to protect the security of
                your information, including using encryption and secure storage.
                However, no system is completely secure, and The Company cannot
                guarantee the security of your information.
              </p>
            </div>
            <h4 className="title-privacy">CHANGES TO PRIVACY POLICY</h4>
            <div className="paragraph-privacy">
              <p>
                The Company rmay update this Privacy Policy from time to time.
                If we make material changes, we will provide notice on the Site
                or by email. Your continued use of the Service after the changes
                are made constitutes your acceptance of the updated Privacy
                Policy.
              </p>
            </div>
            <h4 className="title-privacy">CONTACT US</h4>
            <div className="paragraph-privacy">
              <p>
                If you have any questions or concerns about this Privacy Policy
                or our practices, please contact us at info@onlypaws.com
              </p>
            </div>
          </div>
          <div>
            <img
              src={Privacyimg}
              alt="pet-sitters-landscape"
              className="privacy-img"
            />
          </div>
          <div className="container-footer">
            <Footer />
          </div>
        </div>
      </div>
    </>
  );
}
export default Privacy;
