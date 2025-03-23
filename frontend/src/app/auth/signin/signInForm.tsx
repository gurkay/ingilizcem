"use client";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
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
      console.log('Giriş denemesi başlatılıyor:', { email, timestamp: new Date().toISOString() });
      
      // NextAuth'a daha basit bir çağrı, redirect'i kapatarak ve hata durumlarını yakalayarak
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false, // Otomatik yönlendirme kapalı
      });

      console.log("Giriş sonucu (tam):", JSON.stringify(result));

      if (!result) {
        console.error('Giriş başarısız: NextAuth yanıt döndürmedi');
        toast.error("Giriş işlemi sırasında bir hata oluştu: Sunucu yanıt vermedi");
        setIsLoading(false);
        return;
      }

      if (result.error) {
        console.error('Giriş başarısız:', result.error);
        toast.error(result.error || "Geçersiz kimlik bilgileri");
        setIsLoading(false);
        return;
      }

      if (!result.ok) {
        console.error('Giriş başarısız: HTTP hata kodu', result.status);
        toast.error("Giriş sırasında bir hata oluştu (HTTP " + result.status + ")");
        setIsLoading(false);
        return;
      }

      // Başarılı giriş
      console.log('Giriş başarılı:', { status: result.status, url: result.url });
      toast.success("Giriş başarılı! Yönlendiriliyorsunuz...");
      
      // Basit yönlendirme stratejisi
      setTimeout(() => {
        try {
          // İlk olarak router ile yönlendirmeyi dene
          router.push("/dashboard");
        } catch (e) {
          console.error("Router yönlendirme hatası:", e);
          try {
            // Router başarısız olursa doğrudan window.location ile yönlendir
            window.location.href = "/dashboard";
          } catch (navError) {
            console.error("Yönlendirme tamamen başarısız:", navError);
            toast.error("Yönlendirme başarısız oldu, lütfen manuel olarak dashboard'a gidin");
          }
        }
      }, 1500);
    } catch (error) {
      console.error('Giriş işlemi sırasında hata:', error);
      toast.error("Giriş sırasında beklenmeyen bir hata oluştu");
      setIsLoading(false);
    }
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
