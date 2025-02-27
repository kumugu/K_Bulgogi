import { useEffect } from "react";
import { isTokenValid } from "../services/authService";
import Link from "next/link";
import { ArrowRight } from "react-feather";

export default function LandingPage() {
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { isTokenValid } = await import("../services/authService");
        if (await isTokenValid()) {
          window.location.href = "/blogHome"; // 경로를 적절히 수정하세요
        }
      } catch (error) {
        console.error("Auth check failed:", error);
      }
    };

    checkAuth();
  }, []);

  return (
    <div className="min-h-screen bg-white pt-16">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <h1 className="font-serif text-5xl md:text-7xl font-bold tracking-tight text-neutral-900 leading-tight">
                A space to <span className="italic">deliciously</span> cook up your thoughts
              </h1>
              <p className="text-xl md:text-2xl text-neutral-600 leading-relaxed max-w-lg">
                Cook up your ideas deliciously at Bulgogi.
                <span className="line-through mx-1">Bulgogi</span>
                <span className="font-medium">Blog</span> to share your own stories.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/signup"
                  className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-full text-white bg-neutral-900 hover:bg-neutral-800 transition-colors duration-200"
                >
                  Get Started
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
                <Link
                  href="/login"
                  className="inline-flex items-center justify-center px-6 py-3 border border-neutral-900 text-base font-medium rounded-full text-neutral-900 bg-white hover:bg-neutral-50 transition-colors duration-200"
                >
                  Login
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-neutral-100 shadow-xl">
                <img
                  src="/placeholder.svg?height=600&width=800"
                  alt="Writing inspiration"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 w-48 h-48 bg-neutral-100 rounded-full mix-blend-multiply blur-xl opacity-70"></div>
              <div className="absolute -top-6 -right-6 w-72 h-72 bg-neutral-200 rounded-full mix-blend-multiply blur-xl opacity-70"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-neutral-50">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-neutral-900 mb-4">The Special Flavor of Bulgogi</h2>
            <p className="text-xl text-neutral-600 max-w-2xl mx-auto">
              Special features that enrich your writing experience
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Intuitive Editor",
                description: "Provides a clean and intuitive writing environment that doesn't interrupt your flow of thoughts.",
              },
              {
                title: "Beautiful Typography",
                description: "Makes your writing stand out with comfortable fonts and spacing.",
              },
              {
                title: "Community Participation",
                description: "Communicate with people who share the same interests and exchange feedback.",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-xl shadow-sm border border-neutral-200 hover:shadow-md transition-shadow duration-200"
              >
                <h3 className="font-serif text-xl font-semibold text-neutral-900 mb-3">{feature.title}</h3>
                <p className="text-neutral-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="py-20">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
          <blockquote className="text-center">
            <p className="font-serif text-2xl md:text-3xl italic text-neutral-800 max-w-3xl mx-auto leading-relaxed">
              "Bulgogi is not just a simple blog platform. It has completely changed how I organize and express my thoughts."
            </p>
            <footer className="mt-8">
              <div className="flex items-center justify-center">
                <div className="flex-shrink-0 mr-3">
                  <img className="h-10 w-10 rounded-full" src="/placeholder.svg?height=40&width=40" alt="User avatar" />
                </div>
                <div className="text-base">
                  <div className="font-medium text-neutral-900">Kim Ji-min</div>
                  <div className="text-neutral-500">Writer & Blogger</div>
                </div>
              </div>
            </footer>
          </blockquote>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-neutral-900 text-white">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-serif text-3xl md:text-4xl font-bold mb-6">Start Bulgogi Right Now</h2>
          <p className="text-xl text-neutral-300 max-w-2xl mx-auto mb-8">The world is waiting for your story.</p>
          <Link
            href="/signup"
            className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-full text-neutral-900 bg-white hover:bg-neutral-100 transition-colors duration-200"
          >
            Start for Free
          </Link>
        </div>
      </section>
    </div>
  );
}