"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  Lock,
  User,
  Loader2,
  ShieldCheck,
  ArrowRight,
  Eye,
  EyeOff,
  AlertCircle,
} from "lucide-react";
import logo from "@/assets/logo100.png";

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setError(data.error || "Identifiants incorrects");
        return;
      }
      router.replace("/");
      router.refresh();
    } catch {
      setError("Erreur de connexion. Veuillez réessayer.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full grid lg:grid-cols-2 bg-white">
      {/* ─── Left brand panel ───────────────────────────────────────────── */}
      <div className="relative hidden lg:flex flex-col justify-between p-12 xl:p-16 overflow-hidden bg-gradient-to-br from-emerald-950 via-emerald-800 to-green-700 text-white">
        {/* grid pattern */}
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-[0.07] pointer-events-none"
        >
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern
                id="grid"
                width="44"
                height="44"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M 44 0 L 0 0 0 44"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="0.6"
                />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>

        {/* ambient glows */}
        <div
          aria-hidden="true"
          className="absolute -top-40 -right-40 w-[28rem] h-[28rem] rounded-full bg-emerald-400/25 blur-3xl pointer-events-none"
        />
        <div
          aria-hidden="true"
          className="absolute -bottom-48 -left-24 w-[32rem] h-[32rem] rounded-full bg-green-300/15 blur-3xl pointer-events-none"
        />

        {/* top — wordmark */}
        <div className="relative z-10 flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-white/10 backdrop-blur-sm ring-1 ring-white/15 flex items-center justify-center">
            <Image src={logo} alt="Hexagrow" width={28} height={28} />
          </div>
          <span className="text-lg font-semibold tracking-tight">
            Hexagrow
          </span>
        </div>

        {/* middle — tagline */}
        <div className="relative z-10 max-w-xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm ring-1 ring-white/15 text-xs font-medium text-emerald-50/90 mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-300 animate-pulse" />
            Panneau d&apos;administration
          </div>
          <h2 className="text-4xl xl:text-[2.75rem] font-semibold leading-[1.05] tracking-tight">
            Cultiver l&apos;avenir,
            <br />
            <span className="bg-gradient-to-r from-emerald-200 to-white bg-clip-text text-transparent">
              une récolte à la fois.
            </span>
          </h2>
          <p className="mt-6 text-emerald-100/80 text-lg leading-relaxed max-w-md">
            Pilotez vos produits, vos commandes et vos clients depuis un espace
            unifié, sécurisé et taillé pour la performance.
          </p>
        </div>

        {/* bottom — trust signals */}
        <div className="relative z-10 flex items-center justify-between gap-6 text-sm text-emerald-100/70">
          <div className="flex items-center gap-2">
            <ShieldCheck size={16} className="text-emerald-200" />
            <span>Connexion chiffrée</span>
          </div>
          <div className="flex items-center gap-3 tracking-[0.08em] text-xs uppercase">
            <span className="font-semibold text-emerald-50">ISO 9001</span>
            <span className="text-emerald-100/30">·</span>
            <span className="font-semibold text-emerald-50">14001</span>
            <span className="text-emerald-100/30">·</span>
            <span className="font-semibold text-emerald-50">45001</span>
          </div>
        </div>
      </div>

      {/* ─── Right form panel ───────────────────────────────────────────── */}
      <div className="flex items-center justify-center px-6 py-12 sm:px-10 lg:px-16">
        <div className="w-full max-w-md">
          {/* mobile-only logo */}
          <div className="flex lg:hidden items-center gap-3 mb-10">
            <div className="w-10 h-10 rounded-lg bg-emerald-50 flex items-center justify-center">
              <Image src={logo} alt="Hexagrow" width={28} height={28} />
            </div>
            <span className="text-xl font-semibold text-gray-900 tracking-tight">
              Hexagrow
            </span>
          </div>

          <div className="mb-10">
            <h1 className="text-[2rem] font-semibold tracking-tight text-gray-900 leading-tight">
              Bon retour
            </h1>
            <p className="mt-2 text-gray-500">
              Identifiez-vous pour accéder à votre tableau de bord.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5" noValidate>
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-900 mb-2"
              >
                Utilisateur
              </label>
              <div className="relative group">
                <User
                  size={18}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-emerald-600 transition-colors pointer-events-none"
                />
                <input
                  id="username"
                  type="text"
                  autoComplete="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  placeholder="admin"
                  className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-4 focus:ring-emerald-500/15 focus:border-emerald-500 focus:bg-white transition-all"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-900"
                >
                  Mot de passe
                </label>
              </div>
              <div className="relative group">
                <Lock
                  size={18}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-emerald-600 transition-colors pointer-events-none"
                />
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="••••••••"
                  className="w-full pl-11 pr-11 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-4 focus:ring-emerald-500/15 focus:border-emerald-500 focus:bg-white transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((s) => !s)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 text-gray-400 hover:text-gray-700 rounded-md hover:bg-gray-100 transition-colors"
                  aria-label={
                    showPassword
                      ? "Masquer le mot de passe"
                      : "Afficher le mot de passe"
                  }
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {error && (
              <div
                role="alert"
                className="flex items-start gap-2.5 bg-red-50 border border-red-100 text-red-800 text-sm px-4 py-3 rounded-xl"
              >
                <AlertCircle
                  size={18}
                  className="shrink-0 mt-0.5 text-red-500"
                />
                <span className="font-medium">{error}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="group w-full flex items-center justify-center gap-2 bg-gray-900 hover:bg-gray-800 active:bg-black disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-medium py-3 rounded-xl transition-all shadow-sm hover:shadow-md"
            >
              {loading ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  <span>Connexion en cours…</span>
                </>
              ) : (
                <>
                  <span>Se connecter</span>
                  <ArrowRight
                    size={18}
                    className="group-hover:translate-x-0.5 transition-transform"
                  />
                </>
              )}
            </button>
          </form>

          <div className="mt-12 pt-6 border-t border-gray-100">
            <p className="text-xs text-gray-400 text-center leading-relaxed">
              © {new Date().getFullYear()} Hexagrow · Accès restreint au
              personnel autorisé
              <br />
              <span className="inline-flex items-center gap-1 mt-1 text-gray-300">
                <ShieldCheck size={11} />
                Toutes les connexions sont journalisées
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}