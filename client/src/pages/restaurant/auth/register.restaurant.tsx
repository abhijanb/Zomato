/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import {
  restaurantRegisterSchema,
  type RegisterRestaurantInput,
} from "../../../schemas/restaurant/authValidation";
import { useGeo } from "../../../hooks/useGeo";
import { useRegisterRestaurantMutation } from "../../../api/authApi";
import { useNavigate } from "react-router-dom";

type FormData = RegisterRestaurantInput;

const RegisterRestaurant: React.FC = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit, setValue,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(restaurantRegisterSchema),
    defaultValues: {
      restaurantName: "",
      email: "",
      password: "",
      description: "",
      phoneNumber: "",
      licenseNumber: "",
      address: {
        street: "",
        city: "",
        latitude: undefined,
        longitude: undefined,
      },
    },
  });
  const { latitude, longitude, street, city, loading, error } = useGeo();
  useEffect(() => {
    if (street) setValue("address.street", street);
    if (city) setValue("address.city", city);
    if (latitude) setValue("address.latitude", latitude);
    if (longitude) setValue("address.longitude", longitude);
  }, [street, city, latitude, longitude, setValue]);
  const [registerRestaurant, { isLoading }] = useRegisterRestaurantMutation();
  const onSubmit = (data: FormData) => {
    registerRestaurant(data).unwrap()
      .then((response) => {
        toast.success("Registration successful! Please check your email for verification.");
        navigate("/login");
      })
      .catch((err) => {
        toast.error(err?.data?.message || "Registration failed. Please try again.");
      });
  };

  return (
    <div className="min-h-screen flex flex-col bg-background text-on-background">
      {/* TopAppBar */}
      <header className="bg-white/90 backdrop-blur-md fixed top-0 w-full z-50 border-b border-gray-100 shadow-sm">
        <div className="flex justify-between items-center px-6 py-4 max-w-7xl mx-auto w-full">
          <div className="text-xl font-bold text-gray-900 flex items-center gap-2">
            <span
              className="text-[#E23744] material-symbols-outlined"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              restaurant
            </span>
            Partner Portal
          </div>
          <nav className="hidden md:flex items-center space-x-8 font-['Plus_Jakarta_Sans'] font-medium text-sm tracking-tight">
            <a className="text-gray-600 hover:text-gray-900 transition-colors" href="#">
              How it Works
            </a>
            <a className="text-gray-600 hover:text-gray-900 transition-colors" href="#">
              Pricing
            </a>
            <a className="text-gray-600 hover:text-gray-900 transition-colors" href="#">
              Success Stories
            </a>
            <a className="text-gray-600 hover:text-gray-900 transition-colors" href="#">
              Support
            </a>
          </nav>
          <div className="flex items-center space-x-4">
            <button className="text-gray-600 hover:text-gray-900 font-['Plus_Jakarta_Sans'] font-medium text-sm px-4 py-2 hover:bg-gray-50 rounded-md transition-all active:scale-95 duration-150">
              Login
            </button>
            <button className="bg-[#E23744] text-white font-['Plus_Jakarta_Sans'] font-semibold text-sm px-5 py-2.5 rounded-lg transition-all active:scale-95 duration-150 shadow-md">
              Register Now
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow pt-24 pb-20">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Sidebar / Value Proposition */}
          <div className="lg:col-span-5 lg:sticky lg:top-32 space-y-8">
            <div className="relative rounded-xl overflow-hidden aspect-[4/3] shadow-lg group">
              <img
                alt="Bustling modern kitchen"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDbzUBTMs-GY5cakns2pz3AcGZ71PppckX9JniDRtw1CUBqyPuTg20w0i_vfeZepp1O_13ty9FglQhf7S5fY46tnujF6Ekxp39ZrmNvTr3j-CRGN90HW2XTzc3nkxKDHbiis2d0AIzK6aDrEfhULp_tuCAJc7BSO-gXiPQI3tUPXQWyPLeCNeyypnGKBYdZFpHjF2xpNLUaRLwJycM4_OhCQu6saM6by12t4TPQIPssab92nfU2ANcXaO0E_Re_Prxar6gv2vqgwTo"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-8">
                <span className="inline-flex items-center px-3 py-1 rounded-full bg-primary text-white text-xs uppercase tracking-wider mb-4 w-fit">
                  Join the Fleet
                </span>
                <h2 className="text-4xl font-extrabold tracking-tight text-white mb-2">
                  Reach thousands of hungry customers
                </h2>
                <p className="text-gray-200 text-base">
                  Partner with Vibrant Cravings and watch your business grow with our
                  industry-leading delivery logistics and marketing tools.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-4">
              <div className="flex items-start gap-4 p-4 bg-surface-container-lowest rounded-xl border border-outline-variant/30">
                <div className="p-2 bg-primary-fixed rounded-lg">
                  <span className="material-symbols-outlined text-primary">trending_up</span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-on-surface">30% Growth Average</h3>
                  <p className="text-sm text-secondary">
                    Our partners see a significant increase in orders within the first 3 months.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-4 bg-surface-container-lowest rounded-xl border border-outline-variant/30">
                <div className="p-2 bg-primary-fixed rounded-lg">
                  <span className="material-symbols-outlined text-primary">support_agent</span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-on-surface">24/7 Dedicated Support</h3>
                  <p className="text-sm text-secondary">
                    A personal account manager to help you optimize your menu and performance.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Registration Form */}
          <div className="lg:col-span-7">
            <div className="bg-surface-container-lowest border border-outline-variant/20 rounded-xl p-8 shadow-sm">
              <div className="mb-8">
                <h1 className="text-3xl font-bold text-on-surface mb-1">Register Your Restaurant</h1>
                <p className="text-base text-secondary">
                  Fill out the form below to start your partnership application. Our team will review
                  your details within 48 hours.
                </p>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                {/* Section 1: Restaurant Information */}
                <div className="space-y-6">
                  <div className="flex items-center gap-2 pb-1 border-b border-outline-variant/30">
                    <span className="material-symbols-outlined text-primary">info</span>
                    <h3 className="text-xl font-semibold text-on-surface">Restaurant Information</h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="font-semibold text-on-surface-variant">Restaurant Name</label>
                      <input
                        className={`w-full bg-surface-container px-4 py-3 rounded-lg border-none ring-1 ring-outline-variant/50 focus:ring-2 focus:ring-primary outline-none transition-all ${errors.restaurantName ? "ring-error" : ""
                          }`}
                        placeholder="e.g. The Rustic Kitchen"
                        type="text"
                        {...register("restaurantName")}
                      />
                      {errors.restaurantName && (
                        <p className="text-error text-sm mt-1">{errors.restaurantName.message}</p>
                      )}
                    </div>

                    <div className="space-y-1">
                      <label className="font-semibold text-on-surface-variant">Email Address</label>
                      <input
                        className={`w-full bg-surface-container px-4 py-3 rounded-lg border-none ring-1 ring-outline-variant/50 focus:ring-2 focus:ring-primary outline-none transition-all ${errors.email ? "ring-error" : ""
                          }`}
                        placeholder="owner@restaurant.com"
                        type="email"
                        {...register("email")}
                      />
                      {errors.email && (
                        <p className="text-error text-sm mt-1">{errors.email.message}</p>
                      )}
                    </div>

                    <div className="space-y-1">
                      <label className="font-semibold text-on-surface-variant">Password</label>
                      <input
                        className={`w-full bg-surface-container px-4 py-3 rounded-lg border-none ring-1 ring-outline-variant/50 focus:ring-2 focus:ring-primary outline-none transition-all ${errors.password ? "ring-error" : ""
                          }`}
                        placeholder="Min. 6 characters"
                        type="password"
                        {...register("password")}
                      />
                      {errors.password && (
                        <p className="text-error text-sm mt-1">{errors.password.message}</p>
                      )}
                    </div>

                    <div className="space-y-1">
                      <label className="font-semibold text-on-surface-variant">Phone Number</label>
                      <input
                        className={`w-full bg-surface-container px-4 py-3 rounded-lg border-none ring-1 ring-outline-variant/50 focus:ring-2 focus:ring-primary outline-none transition-all ${errors.phoneNumber ? "ring-error" : ""
                          }`}
                        placeholder="+1 (555) 000-0000"
                        type="tel"
                        {...register("phoneNumber")}
                      />
                      {errors.phoneNumber && (
                        <p className="text-error text-sm mt-1">{errors.phoneNumber.message}</p>
                      )}
                    </div>

                    <div className="md:col-span-2 space-y-1">
                      <label className="font-semibold text-on-surface-variant">License Number</label>
                      <input
                        className={`w-full bg-surface-container px-4 py-3 rounded-lg border-none ring-1 ring-outline-variant/50 focus:ring-2 focus:ring-primary outline-none transition-all ${errors.licenseNumber ? "ring-error" : ""
                          }`}
                        placeholder="State Health Department License ID"
                        type="text"
                        {...register("licenseNumber")}
                      />
                      {errors.licenseNumber && (
                        <p className="text-error text-sm mt-1">{errors.licenseNumber.message}</p>
                      )}
                    </div>

                    <div className="md:col-span-2 space-y-1">
                      <label className="font-semibold text-on-surface-variant">Description</label>
                      <textarea
                        className={`w-full bg-surface-container px-4 py-3 rounded-lg border-none ring-1 ring-outline-variant/50 focus:ring-2 focus:ring-primary outline-none transition-all ${errors.description ? "ring-error" : ""
                          }`}
                        placeholder="Tell us about your cuisine, specialty dishes, and atmosphere. Description should be meaningful."
                        rows={4}
                        {...register("description")}
                      />
                      {errors.description && (
                        <p className="text-error text-sm mt-1">{errors.description.message}</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Section 2: Location Details */}
                <div className="space-y-6">
                  <div className="flex items-center gap-2 pb-1 border-b border-outline-variant/30">
                    <span className="material-symbols-outlined text-primary">location_on</span>
                    <h3 className="text-xl font-semibold text-on-surface">Location Details</h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="md:col-span-2 space-y-1">
                      <label className="font-semibold text-on-surface-variant">Street Address</label>
                      <input
                        className={`w-full bg-surface-container px-4 py-3 rounded-lg border-none ring-1 ring-outline-variant/50 focus:ring-2 focus:ring-primary outline-none transition-all ${errors.address?.street ? "ring-error" : ""
                          }`}
                        placeholder="123 Culinary Ave"
                        type="text"
                        {...register("address.street")}
                      />
                      {errors.address?.street && (
                        <p className="text-error text-sm mt-1">{errors.address.street.message}</p>
                      )}
                    </div>

                    <div className="space-y-1">
                      <label className="font-semibold text-on-surface-variant">City</label>
                      <input
                        className={`w-full bg-surface-container px-4 py-3 rounded-lg border-none ring-1 ring-outline-variant/50 focus:ring-2 focus:ring-primary outline-none transition-all ${errors.address?.city ? "ring-error" : ""
                          }`}
                        placeholder="New York"
                        type="text"
                        {...register("address.city")}
                      />
                      {errors.address?.city && (
                        <p className="text-error text-sm mt-1">{errors.address.city.message}</p>
                      )}
                    </div>

                    <div className="space-y-1">
                      <label className="font-semibold text-on-surface-variant">Latitude</label>
                      <input
                        className={`w-full bg-surface-container px-4 py-3 rounded-lg border-none ring-1 ring-outline-variant/50 focus:ring-2 focus:ring-primary outline-none transition-all ${errors.address?.latitude ? "ring-error" : ""
                          }`}
                        placeholder="40.7128"
                        step="any"
                        type="number"
                        {...register("address.latitude", { valueAsNumber: true })}
                      />
                      {errors.address?.latitude && (
                        <p className="text-error text-sm mt-1">{errors.address.latitude.message}</p>
                      )}
                    </div>

                    <div className="space-y-1">
                      <label className="font-semibold text-on-surface-variant">Longitude</label>
                      <input
                        className={`w-full bg-surface-container px-4 py-3 rounded-lg border-none ring-1 ring-outline-variant/50 focus:ring-2 focus:ring-primary outline-none transition-all ${errors.address?.longitude ? "ring-error" : ""
                          }`}
                        placeholder="-74.0060"
                        step="any"
                        type="number"
                        {...register("address.longitude", { valueAsNumber: true })}
                      />
                      {errors.address?.longitude && (
                        <p className="text-error text-sm mt-1">{errors.address.longitude.message}</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <div className="pt-8 border-t border-outline-variant/30 flex flex-col items-center gap-4">
                  <button
                    className="w-full md:w-auto min-w-[240px] bg-primary text-on-primary text-2xl font-bold px-8 py-4 rounded-xl shadow-xl hover:shadow-2xl hover:bg-primary-container transition-all active:scale-95 duration-150 flex items-center justify-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed"
                    type="submit"
                    disabled={isSubmitting || isLoading}
                  >
                    Submit Application
                    <span className="material-symbols-outlined">send</span>
                  </button>
                  <p className="text-xs text-secondary text-center">
                    By clicking submit, you agree to our{" "}
                    <a className="text-primary font-semibold hover:underline" href="#">
                      Partner Terms of Service
                    </a>
                    .
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-50 w-full py-12 mt-auto border-t border-gray-200">
        <div className="flex flex-col md:flex-row justify-between items-center px-8 max-w-7xl mx-auto space-y-4 md:space-y-0">
          <div className="text-lg font-black text-gray-400 flex items-center gap-2">
            <span className="material-symbols-outlined text-gray-400">restaurant</span>
            Partner Portal
          </div>
          <div className="flex flex-wrap justify-center gap-6">
            <a
              className="font-['Plus_Jakarta_Sans'] text-xs text-gray-500 hover:text-gray-900 transition-all underline-offset-4 hover:underline decoration-[#E23744]"
              href="#"
            >
              Privacy Policy
            </a>
            <a
              className="font-['Plus_Jakarta_Sans'] text-xs text-gray-500 hover:text-gray-900 transition-all underline-offset-4 hover:underline decoration-[#E23744]"
              href="#"
            >
              Terms of Service
            </a>
            <a
              className="font-['Plus_Jakarta_Sans'] text-xs text-gray-500 hover:text-gray-900 transition-all underline-offset-4 hover:underline decoration-[#E23744]"
              href="#"
            >
              Cookie Policy
            </a>
            <a
              className="font-['Plus_Jakarta_Sans'] text-xs text-gray-500 hover:text-gray-900 transition-all underline-offset-4 hover:underline decoration-[#E23744]"
              href="#"
            >
              Partner Help Center
            </a>
            <a
              className="font-['Plus_Jakarta_Sans'] text-xs text-gray-500 hover:text-gray-900 transition-all underline-offset-4 hover:underline decoration-[#E23744]"
              href="#"
            >
              API Documentation
            </a>
          </div>
          <p className="font-['Plus_Jakarta_Sans'] text-xs text-gray-500">
            © 2024 Partner Portal. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default RegisterRestaurant;