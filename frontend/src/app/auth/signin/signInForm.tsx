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
      console.log('Giriş denemeleri başlatılıyor:', { email });
      
      // NextAuth.js'i en basit şekilde çağırıyoruz - tüm opsiyonel parametreleri kaldırdık
      // callbackUrl, redirect parametreleri URL hatalarına sebep olduğu için kullanmıyoruz
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false, // URL oluşturma hatalarını önlemek için otomatik yönlendirme kapalı
      });

      console.log("Giriş sonucu:", result);

      if (!result) {
        toast.error("Giriş işlemi sırasında bir hata oluştu");
        setIsLoading(false);
        return;
      }

      if (result.error) {
        toast.error(result.error || "Giriş bilgileri hatalı");
        setIsLoading(false);
        return;
      }

      // Başarılı giriş
      toast.success("Giriş başarılı!");
      
      // Basit yönlendirme stratejisi, 1.5 saniye bekleyip yönlendirme yap
      setTimeout(() => {
        try {
          // window.location kullanarak URL hatalarından kaçınıyoruz
          window.location.href = "/dashboard";
        } catch (e) {
          console.error("Yönlendirme hatası:", e);
          toast.error("Yönlendirme başarısız oldu, lütfen manuel olarak dashboard'a gidin");
        }
      }, 1500);
    } catch (error) {
      console.error('Giriş hatası:', error);
      toast.error("Giriş sırasında bir hata oluştu");
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
