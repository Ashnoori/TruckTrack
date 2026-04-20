"use client"

import { useState } from "react"
import { Truck, Mail, Lock, User, Eye, EyeOff, ArrowLeft } from "lucide-react"
import { PrimaryButton } from "../primary-button"
import { StatusBadge } from "../status-badge"

type AuthMode = "login" | "signup"
type UserRole = "consumer" | "operator"

interface AuthProps {
  locale?: "en" | "fr"
  onSuccess: (role: UserRole) => void
}

export function Auth({ locale = "en", onSuccess }: AuthProps) {
  const [mode, setMode] = useState<AuthMode>("login")
  const [role, setRole] = useState<UserRole>("consumer")
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")

  const isLogin = mode === "login"
  
  // Labels
  const titleLabel = isLogin 
    ? (locale === "fr" ? "CONNEXION" : "LOG IN")
    : (locale === "fr" ? "INSCRIPTION" : "SIGN UP")
  const switchLabel = isLogin
    ? (locale === "fr" ? "Pas encore de compte?" : "Don't have an account?")
    : (locale === "fr" ? "Déjà un compte?" : "Already have an account?")
  const switchActionLabel = isLogin
    ? (locale === "fr" ? "S'inscrire" : "Sign Up")
    : (locale === "fr" ? "Se connecter" : "Log In")
  const emailLabel = locale === "fr" ? "COURRIEL" : "EMAIL"
  const passwordLabel = locale === "fr" ? "MOT DE PASSE" : "PASSWORD"
  const nameLabel = locale === "fr" ? "NOM COMPLET" : "FULL NAME"
  const submitLabel = isLogin
    ? (locale === "fr" ? "SE CONNECTER" : "LOG IN")
    : (locale === "fr" ? "CRÉER UN COMPTE" : "CREATE ACCOUNT")
  const roleLabel = locale === "fr" ? "JE SUIS UN..." : "I AM A..."
  const consumerLabel = locale === "fr" ? "AMATEUR DE FOOD TRUCKS" : "FOOD TRUCK FAN"
  const operatorLabel = locale === "fr" ? "OPÉRATEUR DE CAMION" : "TRUCK OPERATOR"
  const forgotLabel = locale === "fr" ? "Mot de passe oublié?" : "Forgot password?"

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, authenticate here
    onSuccess(role)
  }

  return (
    <div className="h-screen w-full max-w-md mx-auto bg-app-black flex flex-col">
      <div className="flex-1 overflow-y-auto hide-scrollbar">
        <div className="p-6">
          {/* Logo */}
          <div className="flex flex-col items-center mb-8 pt-8">
            <div className="w-16 h-16 bg-fire-orange flex items-center justify-center mb-4">
              <Truck className="w-8 h-8 text-warm-cream" />
            </div>
            <h1 className="font-display text-3xl text-warm-cream">TRUCKTRACK</h1>
          </div>

          {/* Title */}
          <h2 className="font-display text-2xl text-warm-cream text-center mb-8">
            {titleLabel}
          </h2>

          {/* Role selection (signup only) */}
          {!isLogin && (
            <div className="mb-6">
              <span className="font-mono text-[10px] uppercase tracking-wider text-muted-text block mb-3">
                {roleLabel}
              </span>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setRole("consumer")}
                  className={`p-4 text-center transition-colors ${
                    role === "consumer"
                      ? "bg-fire-orange text-warm-cream"
                      : "bg-charcoal border border-border-dark text-warm-cream hover:bg-graphite"
                  }`}
                >
                  <User className="w-6 h-6 mx-auto mb-2" />
                  <span className="font-mono text-[10px] uppercase tracking-wider block">
                    {consumerLabel}
                  </span>
                </button>
                <button
                  type="button"
                  onClick={() => setRole("operator")}
                  className={`p-4 text-center transition-colors ${
                    role === "operator"
                      ? "bg-fire-orange text-warm-cream"
                      : "bg-charcoal border border-border-dark text-warm-cream hover:bg-graphite"
                  }`}
                >
                  <Truck className="w-6 h-6 mx-auto mb-2" />
                  <span className="font-mono text-[10px] uppercase tracking-wider block">
                    {operatorLabel}
                  </span>
                </button>
              </div>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name field (signup only) */}
            {!isLogin && (
              <div>
                <label className="font-mono text-[10px] uppercase tracking-wider text-muted-text block mb-2">
                  {nameLabel}
                </label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-text" />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder={locale === "fr" ? "Jean Dupont" : "John Doe"}
                    className="w-full bg-charcoal border border-border-dark text-warm-cream pl-12 pr-4 py-3 placeholder:text-muted-text focus:outline-none focus:border-fire-orange"
                  />
                </div>
              </div>
            )}

            {/* Email field */}
            <div>
              <label className="font-mono text-[10px] uppercase tracking-wider text-muted-text block mb-2">
                {emailLabel}
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-text" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="email@example.com"
                  className="w-full bg-charcoal border border-border-dark text-warm-cream pl-12 pr-4 py-3 placeholder:text-muted-text focus:outline-none focus:border-fire-orange"
                />
              </div>
            </div>

            {/* Password field */}
            <div>
              <label className="font-mono text-[10px] uppercase tracking-wider text-muted-text block mb-2">
                {passwordLabel}
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-text" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-charcoal border border-border-dark text-warm-cream pl-12 pr-12 py-3 placeholder:text-muted-text focus:outline-none focus:border-fire-orange"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-text hover:text-warm-cream transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Forgot password (login only) */}
            {isLogin && (
              <div className="text-right">
                <button
                  type="button"
                  className="font-mono text-[10px] uppercase tracking-wider text-fire-orange hover:text-fire-orange-hover transition-colors"
                >
                  {forgotLabel}
                </button>
              </div>
            )}

            {/* Submit button */}
            <PrimaryButton type="submit" className="w-full mt-6">
              {submitLabel}
            </PrimaryButton>
          </form>

          {/* Switch mode */}
          <div className="mt-8 text-center">
            <span className="text-muted-text text-sm">
              {switchLabel}{" "}
            </span>
            <button
              type="button"
              onClick={() => setMode(isLogin ? "signup" : "login")}
              className="font-mono text-[11px] uppercase tracking-wider text-fire-orange hover:text-fire-orange-hover transition-colors"
            >
              {switchActionLabel}
            </button>
          </div>

          {/* Tier info for operators */}
          {!isLogin && role === "operator" && (
            <div className="mt-8 bg-charcoal border border-border-dark p-4">
              <span className="font-mono text-[10px] uppercase tracking-wider text-muted-text block mb-3">
                {locale === "fr" ? "PLANS DISPONIBLES" : "AVAILABLE PLANS"}
              </span>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-warm-cream">Free</span>
                  <StatusBadge variant="muted">$0</StatusBadge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-warm-cream">Starter</span>
                  <StatusBadge variant="muted">$19/mo</StatusBadge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-warm-cream">Pro</span>
                  <StatusBadge variant="accent">$39/mo</StatusBadge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-warm-cream">Festival</span>
                  <StatusBadge variant="open">$79/mo</StatusBadge>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
