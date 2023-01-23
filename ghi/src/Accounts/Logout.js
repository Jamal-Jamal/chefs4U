import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function Logout(props) {
  const navigate = useNavigate();

  useEffect(() => {
    async function deleteToken() {
      const serviceUrl = `${process.env.REACT_APP_ACCOUNTS_HOST}/token`;
      const fetchConfig = {
        method: "delete",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      };
      const response = await fetch(serviceUrl, fetchConfig);
      if (response.ok) {
        navigate("/login");
      }
    }
    deleteToken();
  }, [navigate]);
  return <></>;
}

export default Logout;
