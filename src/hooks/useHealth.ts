import { useEffect, useState } from "react";
import { getHealth, type HealthStatus } from "../api/health";

export function useHealth() {
  const [health, setHealth] = useState<HealthStatus | null>(null);
  const [online, setOnline] = useState(false);
  useEffect(() => {
    let active = true;
    const check = () => getHealth().then((value) => { if (active) { setHealth(value); setOnline(true); } }).catch(() => { if (active) setOnline(false); });
    check();
    const timer = window.setInterval(check, 30000);
    return () => { active = false; window.clearInterval(timer); };
  }, []);
  return { health, online };
}
