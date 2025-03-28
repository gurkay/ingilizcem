"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

interface User {
  id?: string;
  email?: string;
  name?: string;
  roles?: string[];
}

export default function Dashboard() {
  const { data: session, status } = useSession();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    console.log("Dashboard sayfası yükleniyor...");
    console.log("NextAuth session durumu:", status);
    
    // 1. Önce NextAuth session'ı kontrol et
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
    }
    
    // 2. NextAuth session yoksa localStorage'a bak
    const checkLocalAuth = () => {
      const storedToken = localStorage.getItem('token');
      const storedUserStr = localStorage.getItem('user');
      
      console.log("Yerel depolama kontrol ediliyor...");
      
      if (storedToken && storedUserStr) {
        try {
          const storedUser = JSON.parse(storedUserStr);
          console.log("Yerel depolamada kullanıcı bulundu:", storedUser);
          setUser(storedUser);
        } catch (e) {
          console.error("Kullanıcı bilgisi ayrıştırılamadı:", e);
          redirectToLogin();
        }
      } else {
        console.log("Yerel depolamada oturum bilgisi bulunamadı");
        redirectToLogin();
      }
      
      setLoading(false);
    };
    
    // 3. Yalnızca client tarafında localStorage'a eriş
    if (typeof window !== 'undefined' && status === "unauthenticated") {
      checkLocalAuth();
    }
  }, [session, status, router]);
  
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
