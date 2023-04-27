import React from "react";
import { Link } from "react-router-dom";
import Footer from "../pages/footer.jsx";
import Terms from "../../img/terms.jpg";

function terms() {
  return (
    <>
      <div className="terms-top"></div>
      <div className="container-terms">
        <div className="terms">
          <h4 className="title-terms">TERMS OF USE AGREEMENT</h4>
          <div>
            <div className="paragraph">
              <p>
                Welcome to Only Paws, operated by Only Paws ("the Company").
                This agreement ("Agreement") sets forth the terms and conditions
                that apply to your use of the Only Paws website (the "Site"),
                its content, and any related services or products (collectively,
                the "Service"). By accessing or using the Service, you agree to
                be bound by the terms and conditions of this Agreement. If you
                do not agree to be bound by this Agreement, do not access or use
                the Service.
              </p>
            </div>
            <h4 className="title-terms">LICENSE TO USE SERVICE</h4>
            <div className="paragraph">
              <p>
                The Company grants a non-exclusive, non-transferable, limited
                license to access and use the Service solely for your own
                personal, non-commercial use. You agree not to reproduce,
                distribute, modify, create derivative works from, or publicly
                display any part of the Service except as expressly authorized
                by Only Paws. You also agree not to use the Service for any
                unlawful purpose or in any manner that could damage, disable,
                overburden, or impair the Service.
              </p>
            </div>
            <h4 className="title-terms">INTELLECTUAL PROPERTY</h4>
            <div className="paragraph">
              <p>
                All content and materials on the Service, including but not
                limited to text, graphics, logos, images, and software, are the
                property of The Company or its licensors and are protected by
                U.S. and international copyright, trademark, and other
                intellectual property laws. You agree not to use or display any
                of our intellectual property without our prior written consent.
              </p>
            </div>
            <h4 className="title-terms">PRIVACY</h4>
            <div className="paragraph">
              <p>
                The Company collects and uses personal information in accordance
                with our Privacy Policy, which is incorporated into this
                Agreement by reference. By using the Service, you agree to the
                terms of our Privacy Policy.
              </p>
            </div>
            <h4 className="title-terms">DISCLAIMERS</h4>
            <div className="paragraph">
              <p>
                THE SERVICE IS PROVIDED ON AN "AS-IS" AND "AS-AVAILABLE" BASIS
                WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED,
                INCLUDING WITHOUT LIMITATION WARRANTIES OF MERCHANTABILITY,
                FITNESS FOR A PARTICULAR PURPOSE, OR NON-INFRINGEMENT. WE DO NOT
                WARRANT THAT THE SERVICE WILL BE UNINTERRUPTED OR ERROR-FREE,
                THAT DEFECTS WILL BE CORRECTED, OR THAT THE SERVICE OR THE
                SERVER THAT MAKES IT AVAILABLE ARE FREE OF VIRUSES OR OTHER
                HARMFUL COMPONENTS.
              </p>
            </div>
            <h4 className="title-terms">LIMITATION OF LIABILITY</h4>
            <div className="paragraph">
              <p>
                IN NO EVENT SHALL ONLY PAWS OR OUR AFFILIATES, LICENSORS, OR
                SERVICE PROVIDERS BE LIABLE FOR ANY INDIRECT, CONSEQUENTIAL,
                INCIDENTAL, SPECIAL, PUNITIVE, OR EXEMPLARY DAMAGES ARISING OUT
                OF OR IN CONNECTION WITH THE SERVICE, INCLUDING WITHOUT
                LIMITATION DAMAGES FOR LOSS OF PROFITS, USE, DATA, OR OTHER
                INTANGIBLES, WHETHER OR NOT WE HAVE BEEN ADVISED OF THE
                POSSIBILITY OF SUCH DAMAGES.
              </p>
            </div>
            <h4 className="title-terms">INDEMNIFICATION</h4>
            <div className="paragraph">
              <p>
                You agree to indemnify, defend, and hold harmless The Company
                and its affiliates, officers, directors, employees, agents,
                licensors, and service providers from and against any and all
                claims, liabilities, damages, judgments, awards, losses, costs,
                expenses, or fees (including reasonable attorneys' fees) arising
                out of or relating to your use of the Service or your violation
                of this Agreement.
              </p>
            </div>
            <h4 className="title-terms">MODIFICATIONS</h4>
            <div className="paragraph">
              <p>
                The Company reserves the right to modify this Agreement at any
                time by posting revised terms on the Service. Your continued use
                of the Service following any such modification constitutes your
                agreement to be bound by the revised terms.
              </p>
            </div>
            <h4 className="title-terms">GOVERNING LAW</h4>
            <div className="paragraph">
              <p>
                This Agreement shall be governed by and construed in accordance
                with the laws of the State of California, without giving effect
                to any principles of conflicts of law.
              </p>
            </div>
            <h4 className="title-terms">DISPUTE RESOLUTION</h4>
            <div className="paragraph">
              <p>
                Any dispute arising out of or relating to this Agreement or the
                Service shall be resolved through binding arbitration in
                accordance with the rules of the American Arbitration
                Association. The arbitration shall take place in San Francisco,
                California. Judgment upon the award rendered
              </p>
            </div>
          </div>
          <div>
            <img
              src={Terms}
              alt="pet-sitters-landscape"
              className="terms-img"
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
export default terms;
