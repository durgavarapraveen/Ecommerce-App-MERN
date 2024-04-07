import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

function Spinner({path = "login"}) {
  const navigate = useNavigate();
  const Location = useLocation();

  const [count, setCount] = useState(5);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prev) => prev - 1);
    }, 1000);

    if (count === 0) {
      navigate(`/${path}`, {
        state: location.pathname,
      });
    }

    return () => clearInterval(interval);
  }, [count, navigate, location, path]);

  return (
    <div
      class="d-flex justify-content-center align-items-center"
      style={{
        height: "100vh",
      }}
    >
      <h3 className="text-center">redirecting to you in {count} seconds</h3>
      <div class="spinner-border" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>
  );
}

export default Spinner;
