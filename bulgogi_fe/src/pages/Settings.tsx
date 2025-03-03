import type React from "react"

import { useState, useRef } from "react"
import { User, Mail, Moon, Sun, Upload, AlertTriangle } from "lucide-react"

interface UserSettings {
  username: string
  email: string
  avatar: string | null
  theme: "light" | "dark"
}

export default function SettingsPage() {
  const [settings, setSettings] = useState<UserSettings>({
    username: "johndoe",
    email: "john@example.com",
    avatar: null,
    theme: "light",
  })

  const [activeTab, setActiveTab] = useState("profile")
  const [isUploading, setIsUploading] = useState(false)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // 이미지 업로드 처리
  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    setIsUploading(true)
    try {
      // TODO: 실제 이미지 업로드 로직 구현
      const fakeUploadDelay = () => new Promise((resolve) => setTimeout(resolve, 1000))
      await fakeUploadDelay()

      // 임시 URL 생성 (실제로는 서버 응답 URL 사용)
      const imageUrl = URL.createObjectURL(file)
      setSettings((prev) => ({ ...prev, avatar: imageUrl }))
    } catch (error) {
      console.error("Upload failed:", error)
    } finally {
      setIsUploading(false)
    }
  }

  // 설정 저장 처리
  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: 실제 저장 로직 구현
    console.log("Saving settings:", settings)
  }

  // 회원 탈퇴 처리
  const handleDeleteAccount = async () => {
    // TODO: 실제 회원 탈퇴 로직 구현
    console.log("Deleting account...")
  }

  // 테마 변경 처리
  const toggleTheme = () => {
    setSettings((prev) => ({
      ...prev,
      theme: prev.theme === "light" ? "dark" : "light",
    }))
    // TODO: 실제 테마 적용 로직 구현
    document.documentElement.classList.toggle("dark")
  }

  return (
    <div className="min-h-screen bg-white dark:bg-neutral-900 pt-20">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-1">
              <button
                onClick={() => setActiveTab("profile")}
                className={`w-full flex items-center px-4 py-2 text-sm font-medium rounded-lg ${
                  activeTab === "profile"
                    ? "bg-neutral-900 text-white dark:bg-white dark:text-neutral-900"
                    : "text-neutral-600 hover:bg-neutral-100 dark:text-neutral-400 dark:hover:bg-neutral-800"
                }`}
              >
                <User className="h-4 w-4 mr-3" />
                Profile Settings
              </button>
              <button
                onClick={() => setActiveTab("account")}
                className={`w-full flex items-center px-4 py-2 text-sm font-medium rounded-lg ${
                  activeTab === "account"
                    ? "bg-neutral-900 text-white dark:bg-white dark:text-neutral-900"
                    : "text-neutral-600 hover:bg-neutral-100 dark:text-neutral-400 dark:hover:bg-neutral-800"
                }`}
              >
                <Mail className="h-4 w-4 mr-3" />
                Account Settings
              </button>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {activeTab === "profile" && (
              <div className="space-y-6">
                <div className="bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl p-6">
                  <h2 className="text-xl font-semibold mb-6 dark:text-white">Profile Settings</h2>

                  {/* Profile Image */}
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                      Profile Image
                    </label>
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
                            <div className="animate-spin rounded-full h-6 w-6 border-2 border-white"></div>
                          </div>
                        )}
                      </div>
                      <button
                        onClick={() => fileInputRef.current?.click()}
                        className="flex items-center px-4 py-2 border border-neutral-300 dark:border-neutral-600 rounded-lg text-sm font-medium text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-700"
                      >
                        <Upload className="h-4 w-4 mr-2" />
                        Upload New Image
                      </button>
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleImageUpload}
                      />
                    </div>
                  </div>

                  {/* Username */}
                  <div className="mb-6">
                    <label
                      htmlFor="username"
                      className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2"
                    >
                      Username
                    </label>
                    <input
                      type="text"
                      id="username"
                      value={settings.username}
                      onChange={(e) => setSettings((prev) => ({ ...prev, username: e.target.value }))}
                      className="block w-full rounded-lg border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-800 px-4 py-2 text-neutral-900 dark:text-white focus:border-neutral-900 dark:focus:border-white focus:ring-neutral-900 dark:focus:ring-white"
                    />
                  </div>

                  {/* Save Button */}
                  <button
                    onClick={handleSave}
                    className="w-full px-4 py-2 bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 rounded-lg text-sm font-medium hover:bg-neutral-800 dark:hover:bg-neutral-100 transition-colors duration-200"
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            )}

            {activeTab === "account" && (
              <div className="space-y-6">
                <div className="bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl p-6">
                  <h2 className="text-xl font-semibold mb-6 dark:text-white">Account Settings</h2>

                  {/* Email */}
                  <div className="mb-6">
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2"
                    >
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={settings.email}
                      onChange={(e) => setSettings((prev) => ({ ...prev, email: e.target.value }))}
                      className="block w-full rounded-lg border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-800 px-4 py-2 text-neutral-900 dark:text-white focus:border-neutral-900 dark:focus:border-white focus:ring-neutral-900 dark:focus:ring-white"
                    />
                  </div>

                  {/* Theme Toggle */}
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                      Theme
                    </label>
                    <button
                      onClick={toggleTheme}
                      className="flex items-center px-4 py-2 border border-neutral-300 dark:border-neutral-600 rounded-lg text-sm font-medium text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-700"
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

                  {/* Delete Account */}
                  <div className="border-t border-neutral-200 dark:border-neutral-700 pt-6 mt-6">
                    <h3 className="text-lg font-medium text-red-600 dark:text-red-400 mb-4">Danger Zone</h3>
                    <button
                      onClick={() => setShowDeleteConfirm(true)}
                      className="flex items-center px-4 py-2 border border-red-600 dark:border-red-400 rounded-lg text-sm font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20"
                    >
                      <AlertTriangle className="h-4 w-4 mr-2" />
                      Delete Account
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
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

