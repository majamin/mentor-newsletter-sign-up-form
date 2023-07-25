import { useState, useEffect } from "react";
import { ChangeEvent, FormEvent } from "react";

function App() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const getScreenWidth = () => {
    return window.innerWidth;
  };

  const [screenWidth, setScreenWidth] = useState(getScreenWidth());

  // Add an event listener to update the screen width whenever the window is resized
  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(getScreenWidth());
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handleEmailVerification = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Valid email required");
      return false;
    } else {
      setError("");
      return true;
    }
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handleEmailVerification()
      ? setSubmitted(true)
      : alert("Please fix forms errors");
    // Add any additional form submission logic here if needed
    // For example, you can submit the form data to a server.
  };

  if (!submitted) {
    return (
      <>
        <div className="mx-auto bg-white flex h-[800px] w-[375px] flex-col rounded-3xl mt-20 desktop:flex-row-reverse desktop:w-[930px] desktop:justify-between desktop:h-[640px] desktop:p-6">
          <img
            src={`${screenWidth < 1440 ? 'illustration-sign-up-mobile.svg' : 'illustration-sign-up-desktop.svg'}`}
            className="h-auto w-full desktop:h-full desktop:w-auto"
            alt=""
          />
          <div className="flex flex-col space-y-6 px-8 py-10">
            <h1>Stay updated!</h1>
            <p>Join 60,000+ product managers receiving monthly updates on:</p>
            <ul className="checkmark-list">
              <li>Product discovery and building what matters</li>
              <li>Measuring to ensure updates are a success</li>
              <li>And much more!</li>
            </ul>
            <form onSubmit={handleSubmit}>
              <div className="relative">
                <label
                  htmlFor="email"
                  className="text-gray-900 mb-2 block text-xs font-bold"
                >
                  Email address
                </label>
                <input
                  type="text"
                  id="email"
                  className={`${error
                    ? "bg-tomato bg-opacity-10 text-tomato focus:ring-tomato"
                    : "text-inerit focus:ring-slate"
                    } mb-6 w-full appearance-none rounded border px-3 py-2 leading-tight ring-opacity-0 transition duration-500 focus:outline-none focus:ring-1 focus:ring-opacity-100 `}
                  placeholder="email@company.com"
                  required
                  value={email}
                  onChange={handleChange}
                  onBlur={handleEmailVerification}
                />
                {error && (
                  <div className="absolute right-0 top-0">
                    <div className="rounded text-xs text-tomato">{error}</div>
                  </div>
                )}
              </div>
              <button
                type="submit"
                className="mb-2 mr-2 w-full rounded-lg bg-charcoal px-5 py-3.5 text-center text-sm font-bold text-white hover:bg-gradient-to-r hover:from-[#ff5378] hover:to-[#ff673e] focus:outline-none focus:ring-4"
              >
                Subscribe to monthly newsletter
              </button>
            </form>
          </div>
        </div>
      </>
    );
  } else {
    return (
      <>
        <div className="mx-auto flex h-[800px] w-[375px] flex-col justify-evenly rounded-lg px-8 py-10 desktop:bg-white">
          <div className="flex flex-col space-y-6">
            <img src="icon-success.svg" className="h-auto w-12" alt="" />
            <h1>Thanks for subscribing!</h1>
            <p>
              A confirmation email has been sent to <span className="font-bold">{email}</span>. Please open it and click the button inside to confirm your subscription
            </p>
          </div>
          <div>
            <button
              type="submit"
              className="mb-2 mr-2 w-full rounded-lg bg-charcoal px-5 py-3.5 text-center text-sm font-bold text-white hover:bg-gradient-to-r hover:from-[#ff5378] hover:to-[#ff673e] focus:outline-none focus:ring-4"
            >
              Dismiss message
            </button>
          </div>
        </div>
      </>
    );
  }
}

export default App;
