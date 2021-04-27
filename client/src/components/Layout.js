import React from 'react';
import { Link } from 'react-router-dom';

const Layout = ({ children }) => {
	return (
		<div>
			<section style={{ position: 'relative', minHeight: '98vh' }}>
				<header>
					<nav class="header container-fluid">
						<Link to="/">
							<h3 class="nav-title" style={{ color: '#fff' }}>
								BetWise
							</h3>
						</Link>
						<ul class="nav-ul">
							<Link to="/previous">
								<li class="btn btn-outline-success">Previous Result</li>
							</Link>
							<Link to="/">
								<li class="btn btn-outline-success">Head to Head</li>
							</Link>
						</ul>
						<button id="toggle-btn" class="btn btn-small btn-outline-success">
							Open
						</button>
						<div class="mobile-nav-div">
							<ul class="nav-ul-mobile">
								<Link to="/previous">
									<li class="btn btn-outline-success">Previous Result</li>
								</Link>
								<Link to="/">
									<li class="btn btn-outline-success">Head to Head</li>
								</Link>
							</ul>
						</div>
					</nav>
				</header>
				<div>{children}</div>
			</section>

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
