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
      console.log('SignInForm:::handleSubmit:::email:', email);
      
      const result = await signIn("credentials", {
        email,
        password,
        redirect: true,
        redirectTo: "/dashboard"
      });

      console.log('SignInForm:::handleSubmit:::result:', result);

      if (!result?.ok) {
        console.error('SignInForm:::handleSubmit:::error:', result?.error);
        toast.error(result?.error || "Giriş başarısız oldu");
      } else {
        console.log('SignInForm:::handleSubmit:::success:', result);
        toast.success("Giriş başarılı!");
        
        // Session'ın oluşması için kısa bir bekleme
        setTimeout(() => {
          router.push("/dashboard");
          router.refresh();
        }, 1000);
      }
    } catch (error) {
      console.error('SignInForm:::handleSubmit:::error:', error);
      toast.error("Giriş sırasında bir hata oluştu");
    } finally {
      setIsLoading(false);
    }
  }

  // async function handleSubmit(event: React.FormEvent) {
  //   event.preventDefault();
  //   setIsLoading(true);

  //   if (!email || !password) {
  //     toast.error("Email ve şifre gereklidir");
  //     setIsLoading(false);
  //     return;
  //   }

  //   try {
  //     console.log('Manuel giriş denemesi başlatılıyor:', { email });
      
  //     // NextAuth kullanmadan doğrudan backend API'sine istek yap
  //     const response = await fetch('/api/auth/manual-signin', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({ email, password }),
  //     });

  //     const result = await response.json();
  //     console.log('Giriş sonucu:', result);

  //     if (!response.ok) {
  //       toast.error(result.error || "Giriş başarısız oldu");
  //       setIsLoading(false);
  //       return;
  //     }

  //     // Başarılı giriş
  //     toast.success("Giriş başarılı!");
      
  //     // Tarayıcı local storage'a token ve kullanıcı bilgilerini kaydet
  //     if (result.accessToken) {
  //       // Tüm kullanıcı bilgilerini localStorage'a kaydet
  //       localStorage.setItem('token', result.accessToken);
  //       localStorage.setItem('user', JSON.stringify({
  //         id: result.id,
  //         email: result.email,
  //         name: result.name,
  //         roles: result.roles
  //       }));
        
  //       console.log('Token ve kullanıcı bilgileri kaydedildi:', {
  //         token: result.accessToken.substring(0, 20) + '...',
  //         user: result.email
  //       });
  //     }
      
  //     // Basit yönlendirme, 1 saniye bekle
  //     setTimeout(() => {
  //       try {
  //         console.log("Dashboard'a yönlendiriliyor...");
  //         // Önce window.location.href ile yönlendir
  //         router.push("/dashboard");
  //         // window.location.href = "/dashboard";
  //       } catch (e) {
  //         console.error("window.location hatası:", e);
  //         try {
  //           // Alternatif olarak router'ı dene
  //           router.push("/dashboard");
  //         } catch (routerError) {
  //           console.error("router.push hatası:", routerError);
  //           toast.error("Yönlendirme başarısız oldu");
  //         }
  //       }
  //     }, 3000);
  //   } catch (error) {
  //     console.error('Giriş hatası:', error);
  //     toast.error("Bağlantı hatası oluştu");
  //     setIsLoading(false);
  //   }
  // }

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
