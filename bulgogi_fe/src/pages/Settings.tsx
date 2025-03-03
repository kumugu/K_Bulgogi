"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { User, Mail, Moon, Sun, Upload, AlertTriangle, Check, X, Globe, Github, Twitter, Lock } from "lucide-react"

interface UserSettings {
  username: string
  bio: string
  email: string
  avatar: string | null
  socialLinks: {
    website: string
    github: string
    twitter: string
  }
  emailPreferences: {
    marketing: boolean
    updates: boolean
    comments: boolean
  }
  theme: "light" | "dark"
}

interface SecurityForm {
  newPassword: string
  confirmPassword: string
  newEmail: string
  currentPassword: string
}

export default function SettingsPage() {
  // Core settings state
  const [settings, setSettings] = useState<UserSettings>({
    username: "",
    bio: "",
    email: "",
    avatar: null,
    socialLinks: {
      website: "",
      github: "",
      twitter: "",
    },
    emailPreferences: {
      marketing: true,
      updates: true,
      comments: true,
    },
    theme: "light",
  })

  // UI state
  const [isUploading, setIsUploading] = useState(false)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [successMessage, setSuccessMessage] = useState("")
  const [errorMessage, setErrorMessage] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Security forms state
  const [securityForm, setSecurityForm] = useState<SecurityForm>({
    newPassword: "",
    confirmPassword: "",
    newEmail: "",
    currentPassword: "",
  })
  const [isSecurityUpdating, setIsSecurityUpdating] = useState({
    password: false,
    email: false,
  })

  // Load user data from database
  const loadUserData = async () => {
    const token = localStorage.getItem("token")
    if (!token) {
      showError("You need to be logged in to view settings")
      // Optionally redirect to login page
      // window.location.href = "/login"
      setIsLoading(false)
      return
    }

    try {
      setIsLoading(true)
      // Import auth service dynamically
      const authService = await import("../services/authService")
      const profile = await authService.fetchProfile()
      
      if (profile) {
        setSettings((prev) => ({
          ...prev,
          username: profile.username || prev.username,
          email: profile.email || prev.email,
          // Add other profile fields if they exist in your API response
        }))
        console.log("Profile loaded successfully:", profile)
      }
    } catch (error) {
      console.error("Failed to load settings:", error)
      showError("Failed to load user profile")
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    loadUserData()
  }, [])

  // Security form handlers
  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault()
    if (securityForm.newPassword !== securityForm.confirmPassword) {
      showError("Passwords do not match")
      return
    }
    if (securityForm.newPassword.length < 8) {
      showError("Password must be at least 8 characters long")
      return
    }

    setIsSecurityUpdating((prev) => ({ ...prev, password: true }))
    try {
      // TODO: Implement actual password change
      await new Promise((resolve) => setTimeout(resolve, 1000))
      showSuccess("Password updated successfully")
      setSecurityForm((prev) => ({ ...prev, newPassword: "", confirmPassword: "", currentPassword: "" }))
    } catch (error) {
      showError("Failed to update password")
    } finally {
      setIsSecurityUpdating((prev) => ({ ...prev, password: false }))
    }
  }

  const handleEmailChange = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!securityForm.newEmail) {
      showError("Please enter a new email address")
      return
    }
    if (!securityForm.currentPassword) {
      showError("Please enter your current password")
      return
    }

    setIsSecurityUpdating((prev) => ({ ...prev, email: true }))
    try {
      // TODO: Implement actual email change
      await new Promise((resolve) => setTimeout(resolve, 1000))
      showSuccess("Email updated successfully")
      setSettings((prev) => ({ ...prev, email: securityForm.newEmail }))
      setSecurityForm((prev) => ({ ...prev, newEmail: "", currentPassword: "" }))
    } catch (error) {
      showError("Failed to update email")
    } finally {
      setIsSecurityUpdating((prev) => ({ ...prev, email: false }))
    }
  }

  // Profile handlers
  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    setIsUploading(true)
    try {
      // TODO: Implement actual image upload
      const fakeUploadDelay = () => new Promise((resolve) => setTimeout(resolve, 1000))
      await fakeUploadDelay()

      const imageUrl = URL.createObjectURL(file)
      setSettings((prev) => ({ ...prev, avatar: imageUrl }))
      showSuccess("Profile image updated successfully!")
    } catch (error) {
      showError("Failed to upload image")
    } finally {
      setIsUploading(false)
    }
  }

  const handleProfileSave = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      showSuccess("Profile updated successfully")
    } catch (error) {
      showError("Failed to update profile")
    }
  }

  // Other handlers
  const handleSocialSave = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      showSuccess("Social links updated successfully")
    } catch (error) {
      showError("Failed to update social links")
    }
  }

  const handleEmailPrefsSave = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      showSuccess("Email preferences updated successfully")
    } catch (error) {
      showError("Failed to update email preferences")
    }
  }

  const toggleTheme = () => {
    setSettings((prev) => ({
      ...prev,
      theme: prev.theme === "light" ? "dark" : "light",
    }))
    document.documentElement.classList.toggle("dark")
  }

  const handleDeleteAccount = async () => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      // TODO: Implement actual account deletion and redirect
    } catch (error) {
      showError("Failed to delete account")
    }
  }

  // Notification handlers
  const showSuccess = (message: string) => {
    setSuccessMessage(message)
    setErrorMessage("")
    setTimeout(() => setSuccessMessage(""), 3000)
  }

  const showError = (message: string) => {
    setErrorMessage(message)
    setSuccessMessage("")
    setTimeout(() => setErrorMessage(""), 3000)
  }

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900 pt-20">
      <div className="max-w-2xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-neutral-900 dark:text-white mb-8">Account Settings</h1>

        {/* Notifications */}
        {successMessage && (
          <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center text-green-700">
            <Check className="h-5 w-5 mr-2" />
            {successMessage}
          </div>
        )}
        {errorMessage && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center text-red-700">
            <X className="h-5 w-5 mr-2" />
            {errorMessage}
          </div>
        )}

        {/* Profile Section */}
        <div className="bg-white dark:bg-neutral-800 rounded-xl shadow-sm p-6 mb-6">
          <h2 className="text-xl font-semibold mb-6 flex items-center dark:text-white">
            <User className="h-5 w-5 mr-2" />
            {isLoading ? <span className="animate-pulse">Loading profile...</span> : `${settings.username}'s Profile`}
          </h2>

          <form onSubmit={handleProfileSave} className="space-y-6">
            {/* Profile Image */}
            <div className="flex items-center space-x-6">
              <div className="relative">
                <div className="w-20 h-20 rounded-full bg-neutral-100 dark:bg-neutral-700 flex items-center justify-center overflow-hidden">
                  {settings.avatar ? (
                    <img
                      src={settings.avatar || "/placeholder.svg"}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <User className="h-8 w-8 text-neutral-400" />
                  )}
                </div>
                {isUploading && (
                  <div className="absolute inset-0 bg-black bg-opacity-50 rounded-full flex items-center justify-center">
                    <div className="animate-spin rounded-full h-6 w-6 border-2 border-white" />
                  </div>
                )}
              </div>
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="flex items-center px-4 py-2 border border-neutral-300 dark:border-neutral-600 rounded-lg text-sm font-medium text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-700"
              >
                <Upload className="h-4 w-4 mr-2" />
                Change Photo
              </button>
              <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
            </div>

            {/* Bio */}
            <div>
              <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">Bio</label>
              <textarea
                value={settings.bio}
                onChange={(e) => setSettings((prev) => ({ ...prev, bio: e.target.value }))}
                className="w-full rounded-lg border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-800 px-4 py-2 text-neutral-900 dark:text-white focus:border-neutral-900 dark:focus:border-white focus:ring-neutral-900 dark:focus:ring-white min-h-[100px]"
                placeholder="Write a brief introduction about yourself..."
              />
            </div>

            <button
              type="submit"
              className="w-full px-4 py-2 bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 rounded-lg text-sm font-medium hover:bg-neutral-800 dark:hover:bg-neutral-100 transition-colors duration-200"
            >
              Save Profile
            </button>
          </form>
        </div>

        {/* Security Section */}
        <div className="bg-white dark:bg-neutral-800 rounded-xl shadow-sm p-6 mb-6">
          <h2 className="text-xl font-semibold mb-6 flex items-center dark:text-white">
            <Lock className="h-5 w-5 mr-2" />
            Security Settings
          </h2>

          {/* Password Change Form */}
          <form onSubmit={handlePasswordChange} className="mb-8">
            <h3 className="text-lg font-medium mb-4 dark:text-white">Change Password</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                  Current Password
                </label>
                <input
                  type="password"
                  value={securityForm.currentPassword}
                  onChange={(e) => setSecurityForm((prev) => ({ ...prev, currentPassword: e.target.value }))}
                  className="w-full rounded-lg border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-800 px-4 py-2 text-neutral-900 dark:text-white focus:border-neutral-900 dark:focus:border-white focus:ring-neutral-900 dark:focus:ring-white"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                  New Password
                </label>
                <input
                  type="password"
                  value={securityForm.newPassword}
                  onChange={(e) => setSecurityForm((prev) => ({ ...prev, newPassword: e.target.value }))}
                  className="w-full rounded-lg border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-800 px-4 py-2 text-neutral-900 dark:text-white focus:border-neutral-900 dark:focus:border-white focus:ring-neutral-900 dark:focus:ring-white"
                  required
                  minLength={8}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                  Confirm New Password
                </label>
                <input
                  type="password"
                  value={securityForm.confirmPassword}
                  onChange={(e) => setSecurityForm((prev) => ({ ...prev, confirmPassword: e.target.value }))}
                  className="w-full rounded-lg border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-800 px-4 py-2 text-neutral-900 dark:text-white focus:border-neutral-900 dark:focus:border-white focus:ring-neutral-900 dark:focus:ring-white"
                  required
                />
              </div>
            </div>
            <button
              type="submit"
              disabled={isSecurityUpdating.password}
              className="w-full mt-4 px-4 py-2 bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 rounded-lg text-sm font-medium hover:bg-neutral-800 dark:hover:bg-neutral-100 transition-colors duration-200 disabled:opacity-50"
            >
              {isSecurityUpdating.password ? "Updating Password..." : "Update Password"}
            </button>
          </form>

          {/* Email Change Form */}
          <form onSubmit={handleEmailChange}>
            <h3 className="text-lg font-medium mb-4 dark:text-white">Change Email</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                  Current Email
                </label>
                <input
                  type="email"
                  value={settings.email}
                  className="w-full rounded-lg border border-neutral-300 dark:border-neutral-600 bg-neutral-50 dark:bg-neutral-700 px-4 py-2 text-neutral-900 dark:text-white"
                  disabled
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                  New Email
                </label>
                <input
                  type="email"
                  value={securityForm.newEmail}
                  onChange={(e) => setSecurityForm((prev) => ({ ...prev, newEmail: e.target.value }))}
                  className="w-full rounded-lg border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-800 px-4 py-2 text-neutral-900 dark:text-white focus:border-neutral-900 dark:focus:border-white focus:ring-neutral-900 dark:focus:ring-white"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                  Current Password
                </label>
                <input
                  type="password"
                  value={securityForm.currentPassword}
                  onChange={(e) => setSecurityForm((prev) => ({ ...prev, currentPassword: e.target.value }))}
                  className="w-full rounded-lg border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-800 px-4 py-2 text-neutral-900 dark:text-white focus:border-neutral-900 dark:focus:border-white focus:ring-neutral-900 dark:focus:ring-white"
                  required
                />
              </div>
            </div>
            <button
              type="submit"
              disabled={isSecurityUpdating.email}
              className="w-full mt-4 px-4 py-2 bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 rounded-lg text-sm font-medium hover:bg-neutral-800 dark:hover:bg-neutral-100 transition-colors duration-200 disabled:opacity-50"
            >
              {isSecurityUpdating.email ? "Updating Email..." : "Update Email"}
            </button>
          </form>
        </div>

        {/* Social Links */}
        <div className="bg-white dark:bg-neutral-800 rounded-xl shadow-sm p-6 mb-6">
          <h2 className="text-xl font-semibold mb-6 flex items-center dark:text-white">
            <Globe className="h-5 w-5 mr-2" />
            Social Links
          </h2>

          <form onSubmit={handleSocialSave} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">Website</label>
              <input
                type="url"
                value={settings.socialLinks.website}
                onChange={(e) =>
                  setSettings((prev) => ({
                    ...prev,
                    socialLinks: { ...prev.socialLinks, website: e.target.value },
                  }))
                }
                className="w-full rounded-lg border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-800 px-4 py-2 text-neutral-900 dark:text-white focus:border-neutral-900 dark:focus:border-white focus:ring-neutral-900 dark:focus:ring-white"
                placeholder="https://your-website.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">GitHub</label>
              <div className="flex items-center">
                <span className="text-neutral-500 mr-2">
                  <Github className="h-5 w-5" />
                </span>
                <input
                  type="text"
                  value={settings.socialLinks.github}
                  onChange={(e) =>
                    setSettings((prev) => ({
                      ...prev,
                      socialLinks: { ...prev.socialLinks, github: e.target.value },
                    }))
                  }
                  className="flex-1 rounded-lg border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-800 px-4 py-2 text-neutral-900 dark:text-white focus:border-neutral-900 dark:focus:border-white focus:ring-neutral-900 dark:focus:ring-white"
                  placeholder="username"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">Twitter</label>
              <div className="flex items-center">
                <span className="text-neutral-500 mr-2">
                  <Twitter className="h-5 w-5" />
                </span>
                <input
                  type="text"
                  value={settings.socialLinks.twitter}
                  onChange={(e) =>
                    setSettings((prev) => ({
                      ...prev,
                      socialLinks: { ...prev.socialLinks, twitter: e.target.value },
                    }))
                  }
                  className="flex-1 rounded-lg border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-800 px-4 py-2 text-neutral-900 dark:text-white focus:border-neutral-900 dark:focus:border-white focus:ring-neutral-900 dark:focus:ring-white"
                  placeholder="username"
                />
              </div>
            </div>
            <button
              type="submit"
              className="w-full px-4 py-2 bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 rounded-lg text-sm font-medium hover:bg-neutral-800 dark:hover:bg-neutral-100 transition-colors duration-200"
            >
              Save Social Links
            </button>
          </form>
        </div>

        {/* Email Preferences */}
        <div className="bg-white dark:bg-neutral-800 rounded-xl shadow-sm p-6 mb-6">
          <h2 className="text-xl font-semibold mb-6 flex items-center dark:text-white">
            <Mail className="h-5 w-5 mr-2" />
            Email Preferences
          </h2>

          <form onSubmit={handleEmailPrefsSave} className="space-y-4">
            <div className="space-y-4">
              <label className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={settings.emailPreferences.marketing}
                  onChange={(e) =>
                    setSettings((prev) => ({
                      ...prev,
                      emailPreferences: { ...prev.emailPreferences, marketing: e.target.checked },
                    }))
                  }
                  className="rounded border-neutral-300 text-neutral-900 focus:ring-neutral-900"
                />
                <span className="text-sm text-neutral-700 dark:text-neutral-300">
                  Receive marketing emails about new features and updates
                </span>
              </label>
              <label className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={settings.emailPreferences.updates}
                  onChange={(e) =>
                    setSettings((prev) => ({
                      ...prev,
                      emailPreferences: { ...prev.emailPreferences, updates: e.target.checked },
                    }))
                  }
                  className="rounded border-neutral-300 text-neutral-900 focus:ring-neutral-900"
                />
                <span className="text-sm text-neutral-700 dark:text-neutral-300">
                  Receive important updates about your account
                </span>
              </label>
              <label className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={settings.emailPreferences.comments}
                  onChange={(e) =>
                    setSettings((prev) => ({
                      ...prev,
                      emailPreferences: { ...prev.emailPreferences, comments: e.target.checked },
                    }))
                  }
                  className="rounded border-neutral-300 text-neutral-900 focus:ring-neutral-900"
                />
                <span className="text-sm text-neutral-700 dark:text-neutral-300">
                  Receive notifications about comments on your posts
                </span>
              </label>
            </div>
            <button
              type="submit"
              className="w-full px-4 py-2 bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 rounded-lg text-sm font-medium hover:bg-neutral-800 dark:hover:bg-neutral-100 transition-colors duration-200"
            >
              Save Email Preferences
            </button>
          </form>
        </div>

        {/* Theme Settings */}
        <div className="bg-white dark:bg-neutral-800 rounded-xl shadow-sm p-6 mb-6">
          <h2 className="text-xl font-semibold mb-6 flex items-center dark:text-white">
            {settings.theme === "light" ? <Sun className="h-5 w-5 mr-2" /> : <Moon className="h-5 w-5 mr-2" />}
            Theme
          </h2>

          <button
            onClick={toggleTheme}
            className="w-full flex items-center justify-center px-4 py-2 border border-neutral-300 dark:border-neutral-600 rounded-lg text-sm font-medium text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-700"
          >
            {settings.theme === "light" ? (
              <>
                <Moon className="h-4 w-4 mr-2" />
                Switch to Dark Mode
              </>
            ) : (
              <>
                <Sun className="h-4 w-4 mr-2" />
                Switch to Light Mode
              </>
            )}
          </button>
        </div>

        {/* Danger Zone */}
        <div className="bg-white dark:bg-neutral-800 rounded-xl shadow-sm p-6">
          <h2 className="text-xl font-semibold text-red-600 dark:text-red-400 mb-6 flex items-center">
            <AlertTriangle className="h-5 w-5 mr-2" />
            Danger Zone
          </h2>

          <button
            onClick={() => setShowDeleteConfirm(true)}
            className="w-full px-4 py-2 border border-red-600 dark:border-red-400 text-red-600 dark:text-red-400 rounded-lg text-sm font-medium hover:bg-red-50 dark:hover:bg-red-900/20"
          >
            Delete Account
          </button>
        </div>
      </div>

      {/* Delete Account Confirmation Dialog */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-neutral-800 rounded-xl p-6 max-w-md w-full">
            <h3 className="text-lg font-semibold mb-4 dark:text-white">Delete Account</h3>
            <p className="text-neutral-600 dark:text-neutral-400 mb-6">
              Are you sure you want to delete your account? This action cannot be undone.
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="px-4 py-2 text-sm font-medium text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-700 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  handleDeleteAccount()
                  setShowDeleteConfirm(false)
                }}
                className="px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-lg"
              >
                Delete Account
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
