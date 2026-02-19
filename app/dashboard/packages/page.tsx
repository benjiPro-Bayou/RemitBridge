'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { 
  ArrowLeft, 
  Package, 
  Plus,
  Edit,
  Trash2,
  ChevronRight,
  Save,
  X
} from 'lucide-react'
import { useApp, GiftPackage } from '@/lib/context/AppContext'
import { useLanguage } from '@/lib/context/LanguageContext'

export default function DashboardPackagesPage() {
  const router = useRouter()
  const { t, language } = useLanguage()
  const { giftPackages, updateGiftPackage } = useApp()
  const [editingPackage, setEditingPackage] = useState<GiftPackage | null>(null)
  const [showAddModal, setShowAddModal] = useState(false)

  const [editForm, setEditForm] = useState({
    title: '',
    titleAm: '',
    description: '',
    descriptionAm: '',
    price: 0,
    icon: '🎁',
    color: 'from-blue-400 to-blue-600'
  })

  const colors = [
    'from-blue-400 to-blue-600',
    'from-green-400 to-green-600',
    'from-purple-400 to-purple-600',
    'from-pink-400 to-pink-600',
    'from-yellow-400 to-yellow-600',
    'from-red-400 to-red-600',
  ]

  const icons = ['🎁', '🎂', '🎄', '💒', '👶', '💕', '✨', '🎉']

  const handleEdit = (pkg: GiftPackage) => {
    setEditForm({
      title: pkg.title,
      titleAm: pkg.titleAm,
      description: pkg.description,
      descriptionAm: pkg.descriptionAm,
      price: pkg.price,
      icon: pkg.icon,
      color: pkg.color
    })
    setEditingPackage(pkg)
  }

  const handleSave = () => {
    if (!editingPackage) return
    updateGiftPackage({
      ...editingPackage,
      ...editForm
    })
    setEditingPackage(null)
  }

  const handleAdd = () => {
    const newPackage: GiftPackage = {
      id: Date.now().toString(),
      ...editForm,
      items: editForm.description.split(', '),
      itemsAm: editForm.descriptionAm.split(', '),
      active: true
    }
    // This would normally call a function to add to state
    setShowAddModal(false)
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="gradient-bg px-5 pt-8 pb-6 rounded-b-3xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button onClick={() => router.back()} className="text-white">
              <ArrowLeft size={24} />
            </button>
            <h1 className="text-white text-xl font-bold">{t('dashboard.packages')}</h1>
          </div>
          <button 
            onClick={() => setShowAddModal(true)}
            className="bg-white/20 text-white px-4 py-2 rounded-xl flex items-center gap-2"
          >
            <Plus size={18} />
            <span className="text-sm">{t('dashboard.addPackage')}</span>
          </button>
        </div>
      </header>

      <div className="px-5 -mt-4 pb-6 space-y-3">
        {giftPackages.map((pkg) => (
          <div key={pkg.id} className="card">
            {editingPackage?.id === pkg.id ? (
              <div className="space-y-4">
                <div className="flex gap-2">
                  {icons.map((icon) => (
                    <button
                      key={icon}
                      onClick={() => setEditForm({ ...editForm, icon })}
                      className={`w-10 h-10 rounded-lg text-xl flex items-center justify-center ${
                        editForm.icon === icon ? 'bg-primary-blue text-white' : 'bg-gray-100'
                      }`}
                    >
                      {icon}
                    </button>
                  ))}
                </div>
                
                <input
                  type="text"
                  value={editForm.title}
                  onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                  placeholder="Title (English)"
                  className="input-field"
                />
                <input
                  type="text"
                  value={editForm.titleAm}
                  onChange={(e) => setEditForm({ ...editForm, titleAm: e.target.value })}
                  placeholder="Title (Amharic)"
                  className="input-field"
                />
                <input
                  type="text"
                  value={editForm.description}
                  onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                  placeholder="Description (English)"
                  className="input-field"
                />
                <input
                  type="text"
                  value={editForm.descriptionAm}
                  onChange={(e) => setEditForm({ ...editForm, descriptionAm: e.target.value })}
                  placeholder="Description (Amharic)"
                  className="input-field"
                />
                <input
                  type="number"
                  value={editForm.price}
                  onChange={(e) => setEditForm({ ...editForm, price: parseFloat(e.target.value) || 0 })}
                  placeholder="Price"
                  className="input-field"
                />
                
                <div className="flex gap-2">
                  {colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setEditForm({ ...editForm, color })}
                      className={`flex-1 h-8 rounded-lg bg-gradient-to-r ${color} ${
                        editForm.color === color ? 'ring-2 ring-offset-2 ring-gray-400' : ''
                      }`}
                    />
                  ))}
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => setEditingPackage(null)}
                    className="flex-1 py-2 rounded-xl border border-border text-gray-600 flex items-center justify-center gap-2"
                  >
                    <X size={18} /> {t('common.cancel')}
                  </button>
                  <button
                    onClick={handleSave}
                    className="flex-1 py-2 rounded-xl bg-primary-blue text-white flex items-center justify-center gap-2"
                  >
                    <Save size={18} /> {t('common.save')}
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-4">
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${pkg.color} flex items-center justify-center text-2xl`}>
                  {pkg.icon}
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-gray-800">{language === 'am' ? pkg.titleAm : pkg.title}</h3>
                  <p className="text-sm text-gray-500">{language === 'am' ? pkg.descriptionAm : pkg.description}</p>
                  <p className="text-primary-blue font-bold mt-1">${pkg.price}</p>
                </div>
                <button
                  onClick={() => handleEdit(pkg)}
                  className="p-2 hover:bg-gray-100 rounded-lg"
                >
                  <Edit size={18} className="text-gray-500" />
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Add Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-5" onClick={() => setShowAddModal(false)}>
          <div className="bg-white w-full max-w-md rounded-2xl p-5" onClick={e => e.stopPropagation()}>
            <h3 className="text-lg font-bold text-gray-800 mb-4">{t('dashboard.addPackage')}</h3>
            <div className="space-y-3">
              <input
                type="text"
                value={editForm.title}
                onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                placeholder="Title (English)"
                className="input-field"
              />
              <input
                type="text"
                value={editForm.titleAm}
                onChange={(e) => setEditForm({ ...editForm, titleAm: e.target.value })}
                placeholder="Title (Amharic)"
                className="input-field"
              />
              <input
                type="number"
                value={editForm.price}
                onChange={(e) => setEditForm({ ...editForm, price: parseFloat(e.target.value) || 0 })}
                placeholder="Price"
                className="input-field"
              />
            </div>
            <div className="flex gap-3 mt-5">
              <button 
                onClick={() => setShowAddModal(false)}
                className="flex-1 py-3 rounded-xl border border-border font-medium text-gray-600"
              >
                {t('common.cancel')}
              </button>
              <button 
                onClick={handleAdd}
                className="flex-1 btn-primary"
              >
                {t('common.save')}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
