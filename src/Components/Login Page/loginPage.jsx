import React from 'react'
import './loginpage.css'
import { Link} from 'react-router-dom'

function loginPage() {
  const [isActive, setIsActive] = React.useState(false);

  const handleRegisterClick = () => {
    setIsActive(true);
  };

  const handleLoginClick = () => {
    setIsActive(false);
  };

  return (
        <div className={`container ${isActive ? "active" : ""}`} id="container">
          <div className="form-container sign-up">
            <form>
              <h1>Create Account</h1>
              <div className="social-icons">
                <a href="#" className="icon">
                  <i className="fa-brands fa-google-plus-g" />
                </a>
                <a href="#" className="icon">
                  <i className="fa-brands fa-facebook-f" />
                </a>
                <a href="#" className="icon">
                  <i className="fa-brands fa-github" />
                </a>
                <a href="#" className="icon">
                  <i className="fa-brands fa-linkedin-in" />
                </a>
              </div>
              <span>or use your email for registeration</span>
              <input type="text" placeholder="Hospital Certificate ID" />
              <input type="email" placeholder="Email" />
              <input type="password" placeholder="Password" />
              <button>Sign Up</button>
            </form>
          </div>
          <div className="form-container sign-in">
            <form>
              <h1>Sign In</h1>
              <div className="social-icons">
                <a href="#" className="icon">
                  <i className="fa-brands fa-google-plus-g" />
                </a>
                <a href="#" className="icon">
                  <i className="fa-brands fa-facebook-f" />
                </a>
                <a href="#" className="icon">
                  <i className="fa-brands fa-github" />
                </a>
                <a href="#" className="icon">
                  <i className="fa-brands fa-linkedin-in" />
                </a>
              </div>
              <span>or use your email password</span>
              <input type="email" placeholder="Email" />
              <input type="password" placeholder="Password" />
              <a href="#">Forget Your Password?</a>
              <button>
              <Link className=' text-red-500 font-bold' to={'/quality'}>Sign In</Link>
                </button>
            </form>
          </div>
          <div className="toggle-container">
            <div className="toggle">
              <div className="toggle-panel toggle-left">
                <h1>SIH Project</h1>
                <p>Enter your login details</p>
                <button className="hidden" id="login" onClick={handleLoginClick}>
                  Sign In
                </button>
              </div>
              <div className="toggle-panel toggle-right">
                <h1>Hello !</h1>
                <p>Register with a new account </p>
                <button className="hidden" id="register" onClick={handleRegisterClick}>
                  Sign Up
                </button>
              </div>
            </div>
          </div>
        </div>
  );
}

export default loginPage;