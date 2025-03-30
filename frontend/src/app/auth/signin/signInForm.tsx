"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export default function SignInForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setIsLoading(true);

    if (!email || !password) {
      toast.error("Email ve şifre gereklidir");
      setIsLoading(false);
      return;
    }

    try {
      console.log(`Giriş denemesi (${new Date().toISOString()}):`, { email });
      
      // Önce NextAuth.js ile deneyelim
      let result;
      try {
        result = await signIn("credentials", {
          email,
          password,
          redirect: false,
        });
        
        console.log('NextAuth sonucu:', result);
        
        if (result?.ok) {
          toast.success("NextAuth ile giriş başarılı!");
          redirectToDashboard();
          return;
        }
      } catch (nextAuthError) {
        console.error('NextAuth hatası:', nextAuthError);
        // NextAuth hatası durumunda manuel yönteme devam et
      }

      // NextAuth başarısız olursa, manuel olarak backend API'yle iletişim kuralım
      console.log('Manuel giriş deneniyor...');
      
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://ingilizcem.net';
      const response = await fetch(`${apiUrl}/api/auth/signin`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Manuel giriş başarısız:', response.status, errorText);
        toast.error(`Giriş başarısız: ${response.status} ${response.statusText}`);
        setIsLoading(false);
        return;
      }

      const data = await response.json();
      console.log('Manuel giriş başarılı:', data);
      
      if (!data.accessToken) {
        console.error('Token bulunamadı!');
        toast.error("Kimlik doğrulama başarısız: Token bulunamadı");
        setIsLoading(false);
        return;
      }
      
      // Tarayıcı local storage'a token ve kullanıcı bilgilerini kaydet
      localStorage.setItem('token', data.accessToken);
      localStorage.setItem('user', JSON.stringify({
        id: data.id,
        email: data.email,
        name: data.username || data.email,
        roles: data.roles
      }));
      
      console.log('Token ve kullanıcı bilgileri kaydedildi');
      
      toast.success("Manuel giriş başarılı!");
      redirectToDashboard();
    } catch (error) {
      console.error('Giriş sırasında bir hata oluştu:', error);
      toast.error("Bağlantı hatası: Giriş sırasında bir sorun oluştu");
      setIsLoading(false);
    }
  }
  
  function redirectToDashboard() {
    console.log("Dashboard'a yönlendiriliyor...");
    
    // 2 saniye bekle ve yönlendir (toast'u görmek için)
    setTimeout(() => {
      try {
        console.log("window.location.href:::", window.location.href);
        // Mutlak URL kullan
        const baseUrl = window.location.origin;
        const dashboardUrl = `${baseUrl}/dashboard`;
        console.log("Yönlendirme URL'si:", dashboardUrl);
        
        window.location.href = dashboardUrl;
      } catch (e) {
        console.error("window.location hatası:", e);
        try {
          // Alternatif olarak router'ı dene
          router.push("/dashboard");
          router.refresh();
        } catch (routerError) {
          console.error("router.push hatası:", routerError);
          toast.error("Yönlendirme başarısız");
        }
      }
    }, 2000);
  }

  return (
    <div className="container mx-auto max-w-md p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Giriş Yap</h1>
      <form onSubmit={handleSubmit}>
        <div className="space-y-4">
          <div>
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
              type="email"
              name="email"
              id="email"
              placeholder="Email adresinizi girin"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Şifre
            </label>
            <input
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
              type="password"
              name="password"
              id="password"
              placeholder="Şifrenizi girin"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>
        <button
          className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          type="submit"
          disabled={isLoading}
        >
          {isLoading ? (
            <div className="flex items-center justify-center">
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
              Giriş yapılıyor...
            </div>
          ) : (
            "Giriş Yap"
          )}
        </button>
      </form>
      <ToastContainer 
        position="top-right" 
        autoClose={2000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
      />
    </div>
  );
}
