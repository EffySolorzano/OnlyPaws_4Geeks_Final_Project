import React, { Component } from "react";
import { Link } from "react-router-dom";

export const Footer = () => (
	<footer className="footer mt-auto py-3 text-center">
		{/* {<p>
			Made with <i className="fa fa-heart text-danger" /> by{" "}
			<a href="http://www.4geeksacademy.com">4Geeks Academy</a>
		</p> */
			< p >
				<Link to="/contact-us" className="text-decoration-none"><p className="d-flex justify-content-end pe-5 text-black">
					Contact Us
				</p>
				</Link>
			</p>}
	</footer >
);
