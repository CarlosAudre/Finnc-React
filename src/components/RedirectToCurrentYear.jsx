import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export function RedirectToCurrentYear() {
  const navigate = useNavigate();

  useEffect(() => {
    const today = new Date();
    const year = today.getFullYear();

    navigate(`/dashboard/${year}`, {replace: true})
  }, [navigate]);

  return null;
}
