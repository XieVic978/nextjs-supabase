'use client';
import { createContext, useEffect, useState } from "react";

import client from "@/api/client";
import { use } from "react/cjs/react.production";

const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
}

  useEffect(() => {
    client.auth.getSession().then(({ data }) => { setUser(data.session?.user || null); setLoading(false);
});
    const { data: listener } = client.auth.onAuthStateChange((event, session) => {
      setUser(session?.user || null);
    });

    return () => { listener.subscription.unsubscribe(); };
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  );