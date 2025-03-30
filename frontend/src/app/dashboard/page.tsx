"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

// Başlangıçta doğrudan TypeScript tiplerini tanımla - dinamik import yapmak yerine
interface SessionStatus {
  data: any | null;
  status: "loading" | "authenticated" | "unauthenticated";
}

// NextAuth'u devre dışı bırak - manuel oturum kontrolünü kullan
const useManualAuth = (): SessionStatus => {
  return { data: null, status: "unauthenticated" };
};

interface User {
  id?: string;
  email?: string;
  name?: string;
  roles?: string[];
}

export default function Dashboard() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    console.log("Dashboard sayfası yükleniyor...");
    
    // Sadece localStorage kontrolü yap
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

    if (typeof window !== 'undefined') {
      // URL'den yönlendirme kontrolü
      const url = new URL(window.location.href);
      const callbackUrl = url.searchParams.get('callbackUrl');
      
      console.log("URL parametreleri kontrol ediliyor, callbackUrl:", callbackUrl);
      
      // Yerel depolamadaki kimlik bilgilerini kontrol et
      const localAuthExists = checkLocalAuth();
      
      if (!localAuthExists) {
        console.log("Oturum bulunamadı, giriş sayfasına yönlendiriliyor");
        
        // Eğer yönlendirme döngüsünde değilsek giriş sayfasına yönlendir
        if (!url.pathname.includes('/auth/signin')) {
          redirectToLogin();
        }
      }
    }
    
    setLoading(false);
  }, []);
  
  const redirectToLogin = () => {
    console.log("Giriş sayfasına yönlendiriliyor...");
    
    if (typeof window !== 'undefined') {
      // Url parametresi ekleyerek döngü kontrolü yap
      const currentUrl = encodeURIComponent(window.location.href);
      const loginUrl = `/auth/signin?from=dashboard&url=${currentUrl}`;
      window.location.href = loginUrl;
    } else {
      router.push('/auth/signin');
    }
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
