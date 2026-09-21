"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/login");
    }, 1200);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 text-white">
      <div className="mx-auto flex min-h-screen w-full max-w-7xl flex-col px-5 sm:px-8 lg:px-12">
        
        {/* Header */}
        <header className="flex items-center justify-between py-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600 shadow-lg shadow-indigo-600/30">
              <svg
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12h6m-6 4h4M7 4h10a2 2 0 012 2v12a2 2 0 01-2 2H7a2 2 0 01-2-2V6a2 2 0 012-2z"
                />
              </svg>
            </div>

            <div>
              <h1 className="text-lg font-bold tracking-tight">
                TaskFlow
              </h1>
              <p className="text-xs text-slate-400">
                Employee Task Management
              </p>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <section className="flex flex-1 items-center justify-center py-12">
          <div className="grid w-full items-center gap-12 lg:grid-cols-2 lg:gap-20">
            
            {/* Left Content */}
            <div className="text-center lg:text-left">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-indigo-400/20 bg-indigo-500/10 px-4 py-2 text-sm text-indigo-300">
                <span className="h-2 w-2 animate-pulse rounded-full bg-indigo-400" />
                Smart Task Management
              </div>

              <h2 className="text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
                Manage Tasks.
                <br />
                <span className="text-indigo-400">
                  Get Work Done.
                </span>
              </h2>

              <p className="mx-auto mt-6 max-w-xl text-base leading-7 text-slate-400 sm:text-lg lg:mx-0">
                A simple and powerful platform to create, organize, track,
                and manage employee tasks efficiently from one place.
              </p>

              {/* Features */}
              <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-3">
                {[
                  {
                    title: "Organize",
                    text: "Keep tasks structured",
                  },
                  {
                    title: "Track",
                    text: "Monitor task progress",
                  },
                  {
                    title: "Manage",
                    text: "Work efficiently",
                  },
                ].map((feature) => (
                  <div
                    key={feature.title}
                    className="rounded-xl border border-white/10 bg-white/5 p-4 text-left backdrop-blur-sm"
                  >
                    <h3 className="font-semibold text-white">
                      {feature.title}
                    </h3>
                    <p className="mt-1 text-xs leading-5 text-slate-400">
                      {feature.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Card */}
            <div className="flex justify-center lg:justify-end">
              <div className="relative w-full max-w-md">
                
                {/* Glow */}
                <div className="absolute -inset-4 rounded-3xl bg-indigo-600/20 blur-3xl" />

                <div className="relative rounded-3xl border border-white/10 bg-white/[0.06] p-6 shadow-2xl backdrop-blur-xl sm:p-8">
                  
                  {/* Card Header */}
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-slate-400">
                        Workspace
                      </p>
                      <h3 className="mt-1 text-xl font-semibold">
                        Task Overview
                      </h3>
                    </div>

                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-500/20 text-indigo-400">
                      <svg
                        className="h-6 w-6"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M9 5a3 3 0 016 0v1H9V5z"
                        />
                      </svg>
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="mt-8 grid grid-cols-3 gap-3">
                    <div className="rounded-xl bg-white/5 p-4">
                      <p className="text-xs text-slate-400">
                        Tasks
                      </p>
                      <p className="mt-2 text-2xl font-bold">
                        24
                      </p>
                    </div>

                    <div className="rounded-xl bg-white/5 p-4">
                      <p className="text-xs text-slate-400">
                        Active
                      </p>
                      <p className="mt-2 text-2xl font-bold text-indigo-400">
                        12
                      </p>
                    </div>

                    <div className="rounded-xl bg-white/5 p-4">
                      <p className="text-xs text-slate-400">
                        Done
                      </p>
                      <p className="mt-2 text-2xl font-bold text-emerald-400">
                        12
                      </p>
                    </div>
                  </div>

                  {/* Progress */}
                  <div className="mt-7">
                    <div className="mb-2 flex justify-between text-sm">
                      <span className="text-slate-400">
                        Overall progress
                      </span>
                      <span className="font-medium">
                        72%
                      </span>
                    </div>

                    <div className="h-2 overflow-hidden rounded-full bg-white/10">
                      <div className="h-full w-[72%] rounded-full bg-indigo-500" />
                    </div>
                  </div>

                  {/* Loading */}
                  <div className="mt-8 flex items-center justify-center gap-3 border-t border-white/10 pt-6">
                    <div className="h-5 w-5 animate-spin rounded-full border-2 border-white/20 border-t-indigo-400" />

                    <span className="text-sm text-slate-400">
                      Redirecting you to login...
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-white/10 py-5 text-center text-xs text-slate-500">
          © {new Date().getFullYear()} TaskFlow. Employee Task Management System.
        </footer>
      </div>
    </main>
  );
}
