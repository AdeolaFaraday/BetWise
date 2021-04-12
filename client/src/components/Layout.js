import React from 'react';
import { Link } from 'react-router-dom';

const Layout = ({ children }) => {
	return (
		<div>
			<section>
				<header>
					<nav class="header container-fluid">
						<h3 class="nav-title">BetWise</h3>
						<ul class="nav-ul">
							<li class="btn btn-outline-success">
								<Link to="/kjbn">Home</Link>
							</li>
							<li class="btn btn-outline-success">
								<Link to="/">H2H</Link>
							</li>
						</ul>
						<button id="toggle-btn" class="btn btn-small btn-outline-success">
							Open
						</button>
						<div class="mobile-nav-div">
							<ul class="nav-ul-mobile">
								<li class="btn btn-outline-success">
									<Link to="/ggv">Home</Link>
								</li>
								<li class="btn btn-outline-success">
									<Link to="/">H2H</Link>
								</li>
							</ul>
						</div>
					</nav>
				</header>
			</section>

			<div>{children}</div>

			<section>
				<footer class="footer">
					<div>
						<p>Made with ❤ by @tech_faraday</p>
					</div>
				</footer>
			</section>
		</div>
	);
};

export default Layout;
