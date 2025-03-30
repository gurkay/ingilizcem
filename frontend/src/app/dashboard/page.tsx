"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

// NextAuth hook'unu dinamik olarak import et
let useSession: () => {
  data: any | null;
  status: "loading" | "authenticated" | "unauthenticated";
};

try {
  // @ts-ignore
  useSession = require("next-auth/react").useSession;
} catch (error) {
  console.warn("NextAuth/react useSession yüklenemedi:", error);
  useSession = () => ({ data: null, status: "unauthenticated" });
}

interface User {
  id?: string;
  email?: string;
  name?: string;
  roles?: string[];
}

interface Session {
  user?: {
    id?: string;
    email?: string | null;
    name?: string | null;
    roles?: string[];
    accessToken?: string;
  };
}

export default function Dashboard() {
  // useSession hook'unu try-catch içinde kullan 
  let sessionData: { data: Session | null; status: string } = { data: null, status: "loading" };
  try {
    sessionData = useSession();
  } catch (error) {
    console.error("useSession hatası:", error);
    sessionData = { data: null, status: "unauthenticated" };
  }

  const { data: session, status } = sessionData;
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    console.log("Dashboard sayfası yükleniyor...");
    
    // Öncelikle localStorage'dan kullanıcı bilgilerini kontrol et
    const checkLocalAuth = () => {
      try {
        const storedToken = localStorage.getItem('token');
        const storedUserStr = localStorage.getItem('user');
        
        console.log("Yerel depolama kontrol ediliyor...");
        
        if (storedToken && storedUserStr) {
          try {
            const storedUser = JSON.parse(storedUserStr);
            console.log("Yerel depolamada kullanıcı bulundu:", storedUser);
            setUser(storedUser);
            setLoading(false);
            return true;
          } catch (e) {
            console.error("Kullanıcı bilgisi ayrıştırılamadı:", e);
          }
        }
        return false;
      } catch (error) {
        console.error("Yerel depolama kontrolünde hata:", error);
        return false;
      }
    };

    // 1. Önce localStorage kontrol et
    if (typeof window !== 'undefined') {
      const localAuthExists = checkLocalAuth();
      if (localAuthExists) return;
    }
    
    // 2. NextAuth session'ı varsa kullan
    console.log("NextAuth session durumu:", status);
    if (status === "authenticated" && session?.user) {
      console.log("NextAuth ile oturum açıldı:", session.user);
      setUser({
        id: session.user.id,
        email: session.user.email || undefined,
        name: session.user.name || undefined,
        roles: session.user.roles
      });
      setLoading(false);
      return;
    } else if (status !== "loading") {
      // Eğer localStorage'da token yoksa ve NextAuth session'ı da yoksa, giriş sayfasına yönlendir
      if (typeof window !== 'undefined' && !checkLocalAuth()) {
        console.log("Oturum bulunamadı, giriş sayfasına yönlendiriliyor");
        redirectToLogin();
      }
    }
    
    if (status !== "loading") {
      setLoading(false);
    }
  }, [session, status]);
  
  const redirectToLogin = () => {
    console.log("Giriş sayfasına yönlendiriliyor...");
    router.push('/auth/signin');
  };

  if (loading) {
    return (
      <div className="container mx-auto max-w-md px-4 py-8 flex justify-center items-center">
        <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
        <p className="ml-2">Yükleniyor...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="container mx-auto max-w-md px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-800">Erişim Hatası</h1>
        <p className="text-red-600 mt-2">Oturum bilgisi bulunamadı. Lütfen tekrar giriş yapın.</p>
        <button 
          onClick={redirectToLogin}
          className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Giriş Sayfasına Git
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-md px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800">Kontrol Paneli</h1>

      <p className="text-gray-700 mt-2 mb-4">
        Tebrikler, bu sayfayı görüntüleyebiliyorsunuz!
      </p>

      <div className="bg-gray-100 p-4 rounded shadow border border-gray-200">
        <p className="text-gray-800"><strong>Kullanıcı Kimliği:</strong> {user.id}</p>
        <p className="text-gray-800"><strong>E-posta:</strong> {user.email}</p>
        <p className="text-gray-800"><strong>Roller:</strong> {user.roles?.join(', ') || 'Rol bilgisi yok'}</p>
      </div>
    </div>
  );
}
