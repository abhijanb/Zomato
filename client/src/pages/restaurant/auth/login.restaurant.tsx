/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import { useLoginRestaurantMutation } from "../../../api/authApi";
import { loginRestaurant, type LoginRestaurantInput } from "../../../schemas/restaurant/authValidation";
import { useAppDispatch } from "../../../hooks/useAppDispatch";

const Login: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [resturantLogin, { isLoading }] = useLoginRestaurantMutation();

  // checking useselectior
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginRestaurantInput>({
    resolver: zodResolver(loginRestaurant),
    defaultValues: { email: "", password: "", rememberMe: false },
  });
  const onSubmit = (data: LoginRestaurantInput) => {
    console.log("Form data:", data);
    resturantLogin(data)
      .unwrap()
      .then((response) => {
        console.log("Login successful:", response);
        dispatch({ type: "auth/setCredentials", payload: { accesstoken: response.data.accessToken, refreshtoken: response.data.refreshtoken, user: response.data.user } });
        toast.success("Login successful!");
      })
      .catch((error) => {
        toast.error("Login failed. Please check your credentials and try again.");
      });
    toast.success("Login validation passed! (No API call)");
  };

  return (
    <div className="min-h-screen flex flex-col bg-background text-on-background">
      <header className="bg-white/90 backdrop-blur-md fixed top-0 w-full z-50 border-b border-gray-100 shadow-sm">
        <div className="flex justify-between items-center px-6 py-4 max-w-7xl mx-auto w-full">
          <div className="text-xl font-bold text-gray-900 flex items-center gap-2">
            <span className="text-[#E23744] material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>
              restaurant_menu
            </span>
            Partner Portal
          </div>
          <nav className="hidden md:flex items-center space-x-8">
            <a className="font-['Plus_Jakarta_Sans'] font-medium text-sm tracking-tight text-gray-600 hover:text-gray-900 transition-colors" href="#">How it Works</a>
            <a className="font-['Plus_Jakarta_Sans'] font-medium text-sm tracking-tight text-gray-600 hover:text-gray-900 transition-colors" href="#">Pricing</a>
            <a className="font-['Plus_Jakarta_Sans'] font-medium text-sm tracking-tight text-gray-600 hover:text-gray-900 transition-colors" href="#">Success Stories</a>
            <a className="font-['Plus_Jakarta_Sans'] font-medium text-sm tracking-tight text-gray-600 hover:text-gray-900 transition-colors" href="#">Support</a>
          </nav>
          <div className="flex items-center gap-4">
            <a className="font-['Plus_Jakarta_Sans'] font-medium text-sm tracking-tight text-[#E23744] font-semibold border-b-2 border-[#E23744] pb-1" href="#">Login</a>
            <a className="bg-primary text-on-primary px-4 py-2 rounded-lg font-label-lg hover:opacity-90 active:scale-95 duration-150 transition-all" href="#">Register Now</a>
          </div>
        </div>
      </header>

      <main className="flex-grow flex items-center justify-center pt-24 pb-12 px-6">
        <div className="w-full max-w-5xl bg-surface-container-lowest rounded-xl shadow-xl overflow-hidden flex flex-col md:flex-row min-h-[600px] border border-outline-variant">
          {/* Hero Sidebar */}
          <div className="md:w-1/2 relative bg-primary-container p-8 flex flex-col justify-between text-on-primary-container overflow-hidden">
            <div className="relative z-10">
              <h1 className="text-4xl font-extrabold leading-tight mb-4">Welcome back, Partner.</h1>
              <p className="text-base md:text-lg opacity-90 max-w-md">
                Access your restaurant dashboard, track live orders, and grow your culinary business with the Vibrant Cravings network.
              </p>
            </div>
            <div className="relative z-10 space-y-4 mt-8">
              <div className="flex items-start gap-4 bg-white/10 backdrop-blur-sm p-4 rounded-lg border border-white/20">
                <span className="material-symbols-outlined text-white">analytics</span>
                <div>
                  <p className="font-semibold text-white">Real-time Insights</p>
                  <p className="text-xs text-white/80">Monitor your performance and customer preferences instantly.</p>
                </div>
              </div>
              <div className="flex items-start gap-4 bg-white/10 backdrop-blur-sm p-4 rounded-lg border border-white/20">
                <span className="material-symbols-outlined text-white">speed</span>
                <div>
                  <p className="font-semibold text-white">Efficient Management</p>
                  <p className="text-xs text-white/80">Streamline your kitchen operations with our optimized portal.</p>
                </div>
              </div>
            </div>
            <div className="absolute inset-0 z-0">
              <div className="absolute top-[-10%] right-[-10%] w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
              <div className="absolute bottom-[-15%] left-[-15%] w-80 h-80 bg-black/10 rounded-full blur-3xl"></div>
              <img className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-30" alt="High-end restaurant kitchen" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCYJbmfZ8V9LT1Ba0PfFvdFxBqjnfTM52Q8P8BlDgSwjV9AWV4eROQMsG02vvbQOs5a9H3ZEkexd7TyjMTtXyU2PJQ2QlfYIuUf3Ljyb8vKfPa3p7fxIvPNjW7c5NJVe7zVGo-bVAqU87Jand-RLujogLHwmE43sWN9eACvouxpqapcz9-KICHS25LlWOYq67esuikh-5ymvDKfqW0S_WCGvBEzExg4qERbzYrvQlWqGXb9yssVoHYDr1_Z4Nxq4zET2HbX7CHaMuM" />
            </div>
          </div>

          {/* Login Form */}
          <div className="md:w-1/2 p-8 flex flex-col justify-center">
            <div className="max-w-md w-full mx-auto">
              <div className="mb-8 text-center md:text-left">
                <h2 className="text-2xl font-bold text-on-surface mb-2">Partner Login</h2>
                <p className="text-secondary">Please enter your credentials to access the portal.</p>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="space-y-1">
                  <label className="font-semibold text-on-surface-variant block" htmlFor="email">Email Address</label>
                  <div className="relative group">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-outline group-focus-within:text-primary transition-colors">mail</span>
                    <input id="email" type="email" placeholder="chef@yourrestaurant.com" className={`w-full pl-12 pr-4 py-3 bg-surface-container-low border border-outline-variant rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all ${errors.email ? "border-error" : ""}`} {...register("email")} />
                  </div>
                  {errors.email && <p className="text-error text-sm mt-1">{errors.email.message}</p>}
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-on-surface-variant block" htmlFor="password">Password</label>
                  <div className="relative group">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-outline group-focus-within:text-primary transition-colors">lock</span>
                    <input id="password" type={showPassword ? "text" : "password"} placeholder="••••••••" className={`w-full pl-12 pr-12 py-3 bg-surface-container-low border border-outline-variant rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all ${errors.password ? "border-error" : ""}`} {...register("password")} />
                    <button type="button" className="absolute right-4 top-1/2 -translate-y-1/2 text-outline hover:text-on-surface transition-colors" onClick={() => setShowPassword(!showPassword)}>
                      <span className="material-symbols-outlined text-sm">{showPassword ? "visibility_off" : "visibility"}</span>
                    </button>
                  </div>
                  {errors.password && <p className="text-error text-sm mt-1">{errors.password.message}</p>}
                </div>

                <div className="flex items-center justify-between">
                  <label className="flex items-center cursor-pointer group">
                    <div className="relative">
                      <input className="peer sr-only" type="checkbox" {...register("rememberMe")} />
                      <div className="w-5 h-5 border-2 border-outline-variant rounded peer-checked:bg-primary peer-checked:border-primary transition-all"></div>
                      <span className="absolute inset-0 flex items-center justify-center text-white opacity-0 peer-checked:opacity-100 transition-opacity">
                        <span className="material-symbols-outlined !text-[14px]">check</span>
                      </span>
                    </div>
                    <span className="ml-2 text-sm text-secondary group-hover:text-on-surface transition-colors">Remember Me</span>
                  </label>
                  <a className="text-sm text-primary hover:underline" href="#">Forgot Password?</a>
                </div>

                <button type="submit" disabled={isSubmitting} className="w-full bg-primary text-on-primary py-4 rounded-lg font-semibold shadow-md hover:bg-primary/90 active:scale-[0.98] duration-150 transition-all flex items-center justify-center gap-2 disabled:opacity-70">
                  Sign In
                  <span className="material-symbols-outlined">arrow_forward</span>
                </button>

                <div className="relative py-4">
                  <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-outline-variant"></div></div>
                  <div className="relative flex justify-center"><span className="bg-surface-container-lowest px-4 text-outline text-xs uppercase tracking-widest">or</span></div>
                </div>

                <div className="text-center">
                  <p className="text-secondary">Don't have an account? <a className="text-primary font-semibold ml-1 hover:underline" href="#">Register Now</a></p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-gray-50 w-full py-12 mt-auto border-t border-gray-200">
        <div className="flex flex-col md:flex-row justify-between items-center px-8 max-w-7xl mx-auto space-y-4 md:space-y-0">
          <div className="text-lg font-black text-gray-400">Partner Portal</div>
          <div className="flex flex-wrap justify-center gap-8">
            <a href="#" className="text-xs text-gray-500 hover:text-gray-900 underline decoration-[#E23744] underline-offset-4">Privacy Policy</a>
            <a href="#" className="text-xs text-gray-500 hover:text-gray-900 underline decoration-[#E23744] underline-offset-4">Terms of Service</a>
            <a href="#" className="text-xs text-gray-500 hover:text-gray-900 underline decoration-[#E23744] underline-offset-4">Cookie Policy</a>
            <a href="#" className="text-xs text-gray-500 hover:text-gray-900 underline decoration-[#E23744] underline-offset-4">Partner Help Center</a>
            <a href="#" className="text-xs text-gray-500 hover:text-gray-900 underline decoration-[#E23744] underline-offset-4">API Documentation</a>
          </div>
          <div className="text-xs text-gray-500">© 2024 Partner Portal. All rights reserved.</div>
        </div>
      </footer>
    </div>
  );
};

export default Login;