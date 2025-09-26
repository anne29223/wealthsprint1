import Header from '../Header'
import { useState } from 'react'

export default function HeaderExample() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [showMobileFilters, setShowMobileFilters] = useState(false)

  return (
    <Header
      searchQuery={searchQuery}
      onSearchChange={setSearchQuery}
      selectedCategory={selectedCategory}
      onCategoryChange={setSelectedCategory}
      showMobileFilters={showMobileFilters}
      onToggleMobileFilters={() => setShowMobileFilters(!showMobileFilters)}
    />
  )
}