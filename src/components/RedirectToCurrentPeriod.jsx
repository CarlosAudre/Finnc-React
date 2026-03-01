import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export function RedirectToCurrentPeriod() {
  const navigate = useNavigate();

  useEffect(() => {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 1;

    navigate(`/period/${year}/${month}`, {replace: true})
  }, [navigate]);

  return null;
}
