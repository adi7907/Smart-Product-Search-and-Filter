import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../Shop/components/Navbar';
import { useToast } from '../../context/ToastContext';
import { SettingsIcon, BellIcon, ShieldIcon, GlobeIcon, CreditCardIcon, UserIcon, LogOutIcon } from '../../components/Icons';

export default function SettingsPage({ customerAuth, onLogout }) {
  const [activeTab, setActiveTab] = useState('notifications');
  const { showToast } = useToast();

  // Settings State loaded from localStorage or default
  const [settings, setSettings] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('sharadha_app_settings')) || {
        pushNotifications: true,
        whatsappUpdates: true,
        promoEmails: false,
        newsletter: true,
        twoFactor: false,
        biometricLogin: true,
        appTheme: 'light',
        fontSize: 'normal',
        language: 'en',
        currency: 'INR',
        oneClickCheckout: true,
        savedUpi: 'ayush@okaxis',
        personalizedAds: true,
        dataUsageAnalytics: true,
      };
    } catch {
      return {
        pushNotifications: true, whatsappUpdates: true, promoEmails: false, newsletter: true,
        twoFactor: false, biometricLogin: true, appTheme: 'light', fontSize: 'normal',
        language: 'en', currency: 'INR', oneClickCheckout: true, savedUpi: 'ayush@okaxis',
        personalizedAds: true, dataUsageAnalytics: true
      };
    }
  });

  const updateSetting = (key, val) => {
    const updated = { ...settings, [key]: val };
    setSettings(updated);
    localStorage.setItem('sharadha_app_settings', JSON.stringify(updated));
    showToast(`Preference updated successfully ✨`, 'success');
  };

  const tabs = [
    { id: 'notifications', label: 'Notifications & Alerts', icon: BellIcon, desc: 'Manage push alerts, WhatsApp order updates, and newsletters' },
    { id: 'security', label: 'Security & Login', icon: ShieldIcon, desc: 'Two-factor auth, biometric passkeys, and password PIN' },
    { id: 'appearance', label: 'Appearance & Theme', icon: SettingsIcon, desc: 'Display themes, font scales, and layout spacing' },
    { id: 'language', label: 'Language & Region', icon: GlobeIcon, desc: 'Regional language support and currency display formats' },
    { id: 'payment', label: 'Payment Preferences', icon: CreditCardIcon, desc: 'Saved UPI IDs, cards, and 1-click checkout options' },
    { id: 'privacy', label: 'Privacy & Data', icon: UserIcon, desc: 'Cookie consent, personalized ads, and data downloads' },
  ];

  return (
    <div className="min-h-screen bg-[#fdfbf7] text-stone-800 font-sans pb-16">
      <Navbar cartCount={0} setIsCartOpen={() => {}} searchTerm="" setSearchTerm={() => {}} customerAuth={customerAuth} onLogout={onLogout} />

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Breadcrumbs & Title */}
        <div className="mb-8">
          <div className="flex items-center gap-2 text-xs font-bold text-stone-400 mb-2">
            <Link to="/shop" className="hover:text-teal-600">Home</Link>
            <span>/</span>
            <span className="text-stone-700">Account Settings</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-teal-100 text-teal-600 flex items-center justify-center shadow-xs">
              <SettingsIcon className="w-6 h-6 stroke-[2.5]" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-black text-stone-900 tracking-tight">App Settings & Preferences</h1>
              <p className="text-stone-500 text-sm font-medium">Customize your shopping experience, notifications, and account security</p>
            </div>
          </div>
        </div>

        {/* Layout Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-5 items-start">
          
          {/* Sidebar Tabs */}
          <div className="bg-white rounded-2xl p-3 border border-stone-200/80 shadow-sm space-y-1">
            {tabs.map((t) => {
              const Icon = t.icon;
              const isActive = activeTab === t.id;
              return (
                <button
                  key={t.id}
                  onClick={() => setActiveTab(t.id)}
                  className={`w-full text-left p-3.5 rounded-2xl transition-all flex items-center gap-3 cursor-pointer ${
                    isActive
                      ? 'bg-gradient-to-r from-teal-600 to-amber-600 text-white shadow-md shadow-teal-500/20 font-extrabold'
                      : 'text-stone-600 hover:bg-stone-100/80 font-bold'
                  }`}
                >
                  <Icon className={`w-5 h-5 shrink-0 ${isActive ? 'text-white' : 'text-stone-400'}`} />
                  <div className="min-w-0 flex-1">
                    <div className="text-sm leading-snug">{t.label}</div>
                    <div className={`text-[11px] leading-tight truncate ${isActive ? 'text-teal-100' : 'text-stone-400 font-normal'}`}>
                      {t.desc}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Tab Content Panel */}
          <div className="md:col-span-3 bg-white rounded-2xl p-6 md:p-5 border border-stone-200/80 shadow-sm animate-fade-in">
            
            {/* 1. Notifications Tab */}
            {activeTab === 'notifications' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-black text-stone-900 mb-1">Notification Preferences</h3>
                  <p className="text-stone-500 text-sm">Choose how and when we contact you regarding orders and offers.</p>
                </div>
                <div className="divide-y divide-stone-100 border-t border-stone-100 pt-4 space-y-4">
                  
                  <div className="flex items-center justify-between pt-4">
                    <div>
                      <h4 className="font-extrabold text-stone-800 text-sm">Order Status Push Notifications</h4>
                      <p className="text-xs text-stone-400">Instant browser and mobile alerts when out for delivery</p>
                    </div>
                    <Toggle checked={settings.pushNotifications} onChange={(v) => updateSetting('pushNotifications', v)} />
                  </div>

                  <div className="flex items-center justify-between pt-4">
                    <div>
                      <h4 className="font-extrabold text-stone-800 text-sm flex items-center gap-1.5">
                        <span className="text-green-600">💬</span> WhatsApp Live Tracking Updates
                      </h4>
                      <p className="text-xs text-stone-400">Receive delivery partner details and bills directly on WhatsApp</p>
                    </div>
                    <Toggle checked={settings.whatsappUpdates} onChange={(v) => updateSetting('whatsappUpdates', v)} />
                  </div>

                  <div className="flex items-center justify-between pt-4">
                    <div>
                      <h4 className="font-extrabold text-stone-800 text-sm">Festival Promo & Discount Alerts</h4>
                      <p className="text-xs text-stone-400">Special Diwali and Navratri early-bird promotional offers</p>
                    </div>
                    <Toggle checked={settings.promoEmails} onChange={(v) => updateSetting('promoEmails', v)} />
                  </div>

                  <div className="flex items-center justify-between pt-4">
                    <div>
                      <h4 className="font-extrabold text-stone-800 text-sm">Weekly Savories Newsletter</h4>
                      <p className="text-xs text-stone-400">New pickle batch arrivals and traditional culinary stories</p>
                    </div>
                    <Toggle checked={settings.newsletter} onChange={(v) => updateSetting('newsletter', v)} />
                  </div>

                </div>
              </div>
            )}

            {/* 2. Security Tab */}
            {activeTab === 'security' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-black text-stone-900 mb-1">Account Security & Authentication</h3>
                  <p className="text-stone-500 text-sm">Keep your customer account and saved addresses secure.</p>
                </div>
                <div className="divide-y divide-stone-100 border-t border-stone-100 pt-4 space-y-4">
                  
                  <div className="flex items-center justify-between pt-4">
                    <div>
                      <h4 className="font-extrabold text-stone-800 text-sm">Two-Factor Authentication (2FA)</h4>
                      <p className="text-xs text-stone-400">Require an OTP sent to your email/phone when logging in from new devices</p>
                    </div>
                    <Toggle checked={settings.twoFactor} onChange={(v) => updateSetting('twoFactor', v)} />
                  </div>

                  <div className="flex items-center justify-between pt-4">
                    <div>
                      <h4 className="font-extrabold text-stone-800 text-sm">Quick Biometric / Passkey Login</h4>
                      <p className="text-xs text-stone-400">Use Windows Hello or FaceID for instant checkout verification</p>
                    </div>
                    <Toggle checked={settings.biometricLogin} onChange={(v) => updateSetting('biometricLogin', v)} />
                  </div>

                  <div className="pt-6">
                    <h4 className="font-extrabold text-stone-800 text-sm mb-3">Change Security PIN / Password</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-md">
                      <input type="password" placeholder="Current Password" className="px-4 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-sm outline-none focus:border-teal-500" />
                      <input type="password" placeholder="New Password" className="px-4 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-sm outline-none focus:border-teal-500" />
                    </div>
                    <button onClick={() => showToast('Password updated successfully 🔒', 'success')} className="mt-3 px-5 py-2.5 bg-stone-900 text-white font-extrabold text-xs rounded-xl hover:bg-stone-800 cursor-pointer transition-colors">
                      Update Password
                    </button>
                  </div>

                </div>
              </div>
            )}

            {/* 3. Appearance Tab */}
            {activeTab === 'appearance' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-bold text-stone-900 mb-1">Appearance & Theme</h3>
                  <p className="text-stone-500 text-xs">Choose your visual theme preference for the website.</p>
                </div>
                <div className="border-t border-stone-100 pt-6 space-y-6">
                  <div>
                    <h4 className="font-bold text-stone-800 text-xs uppercase tracking-wider mb-3">Display Mode</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-md">
                      {[
                        { id: 'light', label: '☀️ Light Mode', desc: 'Bright ivory & warm teal accents' },
                        { id: 'dark', label: '🌙 Dark Mode', desc: 'Sleek dark theme for night browsing' }
                      ].map((th) => (
                        <button
                          key={th.id}
                          onClick={() => {
                            updateSetting('appTheme', th.id);
                            if (th.id === 'dark') {
                              document.documentElement.classList.add('dark');
                            } else {
                              document.documentElement.classList.remove('dark');
                            }
                          }}
                          className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${
                            settings.appTheme === th.id
                              ? 'border-teal-500 bg-teal-50/60 shadow-xs ring-2 ring-teal-500/20'
                              : 'border-stone-200 hover:bg-stone-50'
                          }`}
                        >
                          <div className="font-bold text-stone-900 text-sm">{th.label}</div>
                          <div className="text-xs text-stone-500 mt-1">{th.desc}</div>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* 4. Language & Region Tab */}
            {activeTab === 'language' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-black text-stone-900 mb-1">Language & Region</h3>
                  <p className="text-stone-500 text-sm">Select your preferred regional display language and currency format.</p>
                </div>
                <div className="border-t border-stone-100 pt-6 space-y-6">
                  
                  <div>
                    <h4 className="font-extrabold text-stone-800 text-sm mb-3">Display Language</h4>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      {[
                        { code: 'en', label: 'English', native: 'English' },
                        { code: 'hi', label: 'Hindi', native: 'हिन्दी' },
                        { code: 'ta', label: 'Tamil', native: 'தமிழ்' },
                        { code: 'te', label: 'Telugu', native: 'తెలుగు' },
                        { code: 'kn', label: 'Kannada', native: 'కన్నడ' },
                        { code: 'mr', label: 'Marathi', native: 'मराठी' },
                      ].map((lang) => (
                        <button
                          key={lang.code}
                          onClick={() => updateSetting('language', lang.code)}
                          className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer flex items-center justify-between ${
                            settings.language === lang.code
                              ? 'border-teal-500 bg-teal-50/60 shadow-xs'
                              : 'border-stone-200 hover:bg-stone-50'
                          }`}
                        >
                          <div>
                            <div className="font-extrabold text-stone-900 text-sm">{lang.native}</div>
                            <div className="text-[11px] text-stone-400 font-semibold">{lang.label}</div>
                          </div>
                          {settings.language === lang.code && <span className="text-teal-600 font-bold text-sm">✓</span>}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-extrabold text-stone-800 text-sm mb-2">Currency Format</h4>
                    <div className="inline-flex items-center gap-2 px-4 py-2.5 bg-stone-100 rounded-xl font-extrabold text-stone-800 text-sm">
                      <span>🇮🇳 Indian Rupee (₹ INR)</span>
                      <span className="text-xs text-stone-400 font-normal">— Default</span>
                    </div>
                  </div>

                </div>
              </div>
            )}

            {/* 5. Payment Tab */}
            {activeTab === 'payment' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-black text-stone-900 mb-1">Payment & Checkout Settings</h3>
                  <p className="text-stone-500 text-sm">Manage instant checkout and default payment handles.</p>
                </div>
                <div className="divide-y divide-stone-100 border-t border-stone-100 pt-4 space-y-4">
                  
                  <div className="flex items-center justify-between pt-4">
                    <div>
                      <h4 className="font-extrabold text-stone-800 text-sm">1-Click Fast Checkout</h4>
                      <p className="text-xs text-stone-400">Skip payment selection and automatically use default UPI ID</p>
                    </div>
                    <Toggle checked={settings.oneClickCheckout} onChange={(v) => updateSetting('oneClickCheckout', v)} />
                  </div>

                  <div className="pt-4">
                    <h4 className="font-extrabold text-stone-800 text-sm mb-2">Default UPI ID</h4>
                    <div className="flex gap-2 max-w-sm">
                      <input
                        type="text"
                        value={settings.savedUpi}
                        onChange={(e) => updateSetting('savedUpi', e.target.value)}
                        className="flex-1 px-4 py-2 bg-stone-50 border border-stone-200 rounded-xl font-bold text-sm text-stone-800 outline-none focus:border-teal-500"
                      />
                      <button onClick={() => showToast('Default UPI verified and saved ✅', 'success')} className="px-4 py-2 bg-teal-600 text-white font-extrabold text-xs rounded-xl hover:bg-teal-700 cursor-pointer">
                        Save
                      </button>
                    </div>
                  </div>

                  <div className="pt-4">
                    <h4 className="font-extrabold text-stone-800 text-sm mb-3">Saved Cards & Accounts</h4>
                    <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200/80 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-6 bg-stone-800 rounded text-white text-[10px] font-black flex items-center justify-center tracking-widest">VISA</div>
                        <div>
                          <div className="font-extrabold text-stone-800 text-xs">HDFC Bank Debit Card ···· 8892</div>
                          <div className="text-[10px] text-stone-400">Expires 08/28 · Verified</div>
                        </div>
                      </div>
                      <span className="text-xs font-bold text-green-600 bg-green-50 px-2.5 py-1 rounded-lg border border-green-200">Default</span>
                    </div>
                  </div>

                </div>
              </div>
            )}

            {/* 6. Privacy Tab */}
            {activeTab === 'privacy' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-black text-stone-900 mb-1">Privacy & Data Analytics</h3>
                  <p className="text-stone-500 text-sm">Control data usage and download your complete shopping records.</p>
                </div>
                <div className="divide-y divide-stone-100 border-t border-stone-100 pt-4 space-y-4">
                  
                  <div className="flex items-center justify-between pt-4">
                    <div>
                      <h4 className="font-extrabold text-stone-800 text-sm">Personalized Culinary Recommendations</h4>
                      <p className="text-xs text-stone-400">Show tailored snack and pickle suggestions based on past orders</p>
                    </div>
                    <Toggle checked={settings.personalizedAds} onChange={(v) => updateSetting('personalizedAds', v)} />
                  </div>

                  <div className="flex items-center justify-between pt-4">
                    <div>
                      <h4 className="font-extrabold text-stone-800 text-sm">Anonymous Analytics & Diagnostics</h4>
                      <p className="text-xs text-stone-400">Help us improve search speed by sharing error reporting logs</p>
                    </div>
                    <Toggle checked={settings.dataUsageAnalytics} onChange={(v) => updateSetting('dataUsageAnalytics', v)} />
                  </div>

                  <div className="pt-6 flex flex-wrap gap-3 items-center justify-between bg-stone-50 p-4 rounded-2xl border border-stone-200">
                    <div>
                      <h4 className="font-extrabold text-stone-800 text-sm">Export Customer Archive</h4>
                      <p className="text-xs text-stone-400">Download JSON copy of all order invoices and saved addresses</p>
                    </div>
                    <button onClick={() => showToast('Preparing data archive... A link will be sent to your email 📥', 'info')} className="px-4 py-2 bg-stone-900 text-white font-extrabold text-xs rounded-xl hover:bg-stone-800 cursor-pointer shrink-0">
                      Request Archive
                    </button>
                  </div>

                  <div className="pt-4 flex flex-wrap gap-3 items-center justify-between bg-red-50/50 p-4 rounded-2xl border border-red-200/60">
                    <div>
                      <h4 className="font-extrabold text-red-900 text-sm">Delete Customer Account</h4>
                      <p className="text-xs text-red-600/80">Permanently erase your wishlist, order records, and stored profile</p>
                    </div>
                    <button onClick={() => {
                      if (window.confirm("Are you absolutely sure you want to delete your customer account?")) {
                        onLogout && onLogout();
                        showToast('Account deleted successfully.', 'info');
                      }
                    }} className="px-4 py-2 bg-red-600 text-white font-extrabold text-xs rounded-xl hover:bg-red-700 cursor-pointer shrink-0">
                      Delete Account
                    </button>
                  </div>

                </div>
              </div>
            )}

          </div>

        </div>
      </div>
    </div>
  );
}

// Reusable animated toggle switch component
function Toggle({ checked, onChange }) {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className={`w-12 h-6.5 rounded-full p-0.5 transition-colors duration-200 ease-in-out cursor-pointer relative shrink-0 ${
        checked ? 'bg-teal-600' : 'bg-stone-300'
      }`}
    >
      <div
        className={`w-5.5 h-5.5 bg-white rounded-full shadow-md transform transition-transform duration-200 ease-in-out ${
          checked ? 'translate-x-5.5' : 'translate-x-0'
        }`}
      />
    </button>
  );
}

