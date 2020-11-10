import React from 'react';
import {Link} from 'react-router-dom';

const Layout = ({children}) => {
  return (
    <div>
    <header>
      <nav>
      <Link to="/"><button className="btn btn-outline-warning responsive inline-b">Previous Result</button></Link>
        <h3 class="nav-title"><i class="far fa-futbol"></i>
          BetWise
        </h3>
        <Link to="/h2h"><button className="btn btn-outline-warning responsive inline-b">H2H Result</button></Link>
      </nav>
    </header>

    <div>{children}</div>

  <section>
    <footer class="footer">
      <div>
        <p>Made with ❤ by @tech_faraday</p>
      </div>
    </footer>
  </section>
  </div>
  )
}

export default Layout;
