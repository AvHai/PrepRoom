// import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Filter, X } from "lucide-react"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
  SheetClose
} from "@/components/ui/sheet"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Badge } from "@/components/ui/badge"
import { useState, useEffect } from "react"

// Updated company options - make sure these match your actual data
const companyOptions = [
  { id: "google", label: "Google" },
  { id: "microsoft", label: "Microsoft" },
  { id: "amazon", label: "Amazon" },
  { id: "apple", label: "Apple" },
  { id: "meta", label: "Meta" },
  { id: "netflix", label: "Netflix" },
  { id: "tesla", label: "Tesla" },
  { id: "spotify", label: "Spotify" },
  { id: "uber", label: "Uber" },
  { id: "airbnb", label: "Airbnb" }
]

const roleOptions = [
  { id: "software-engineer", label: "Software Engineer" },
  { id: "product-manager", label: "Product Manager" },
  { id: "data-scientist", label: "Data Scientist" },
  { id: "ux-designer", label: "UX Designer" },
  { id: "frontend-developer", label: "Frontend Developer" },
  { id: "backend-developer", label: "Backend Developer" },
  { id: "devops-engineer", label: "DevOps Engineer" },
  { id: "mobile-developer", label: "Mobile Developer" }
]

const tagOptions = [
  { id: "dsa", label: "DSA" },
  { id: "system-design", label: "System Design" },
  { id: "hr-round", label: "HR Round" },
  { id: "coding", label: "Coding" },
  { id: "behavioral", label: "Behavioral" }
]

const locationOptions = [
  { id: "remote", label: "Remote" },
  { id: "bangalore", label: "Bangalore" },
  { id: "hyderabad", label: "Hyderabad" },
  { id: "delhi", label: "Delhi" },
  { id: "mumbai", label: "Mumbai" },
  { id: "pune", label: "Pune" },
  { id: "chennai", label: "Chennai" },
  { id: "kolkata", label: "Kolkata" }
]

const SearchAndFilter = ({ type, onFilterChange, onSearchChange }) => {
  const [searchQuery, setSearchQuery] = useState("")
  // Initialize with an empty object with tags property as an empty array
  const [filters, setFilters] = useState({ tags: [] })
  const [activeFilters, setActiveFilters] = useState([])
  // Add a flag to track if component is mounted
  const [isMounted, setIsMounted] = useState(false)

  // Set mounted flag on component mount
  useEffect(() => {
    setIsMounted(true)
    return () => setIsMounted(false)
  }, [])

  const handleSearch = (e) => {
    // Allow for both button click and Enter key press
    if (e) e.preventDefault()
    onSearchChange(searchQuery)
  }

  const handleFilterChange = newFilters => {
    // Create a new object to avoid reference issues
    const updatedFilters = { 
      ...filters,
      ...Object.fromEntries(
        // Filter out undefined values
        Object.entries(newFilters).filter(([_, value]) => value !== undefined)
      )
    }
    
    console.log('Updating filters:', updatedFilters) // Debug log
    
    // Special handling for undefined/empty values
    Object.keys(newFilters).forEach(key => {
      if (newFilters[key] === undefined) {
        delete updatedFilters[key]
      }
    })
    
    setFilters(updatedFilters)
    
    // Update active filters with proper labels
    const active = []
    
    if (updatedFilters.company) {
      const companyLabel = companyOptions.find(opt => opt.id === updatedFilters.company)?.label || updatedFilters.company
      active.push(`Company: ${companyLabel}`)
    }
    
    if (updatedFilters.role) {
      const roleLabel = roleOptions.find(opt => opt.id === updatedFilters.role)?.label || updatedFilters.role
      active.push(`Role: ${roleLabel}`)
    }
    
    if (updatedFilters.difficulty) {
      const diffLabel = updatedFilters.difficulty.charAt(0).toUpperCase() + updatedFilters.difficulty.slice(1)
      active.push(`Difficulty: ${diffLabel}`)
    }
    
    if (updatedFilters.type) {
      const typeLabel = updatedFilters.type === 'full-time' ? 'Full-time' : 'Internship'
      active.push(`Type: ${typeLabel}`)
    }
    
    if (updatedFilters.location) {
      const locationLabel = locationOptions.find(opt => opt.id === updatedFilters.location)?.label || updatedFilters.location
      active.push(`Location: ${locationLabel}`)
    }
    
    if (updatedFilters.tags && updatedFilters.tags.length > 0) {
      const tagLabels = updatedFilters.tags.map(tagId => 
        tagOptions.find(opt => opt.id === tagId)?.label || tagId
      )
      active.push(`Tags: ${tagLabels.join(", ")}`)
    }

    setActiveFilters(active)
    
    // Only trigger parent callback if component is mounted
    if (isMounted) {
      onFilterChange(updatedFilters)
    }
  }

  const handleTagToggle = tagId => {
    const updatedTags = filters.tags?.includes(tagId)
      ? filters.tags.filter(id => id !== tagId)
      : [...(filters.tags || []), tagId]

    handleFilterChange({ tags: updatedTags })
  }

  const clearFilters = () => {
    setFilters({ tags: [] })
    setActiveFilters([])
    onFilterChange({ tags: [] })
  }

  const removeFilter = filter => {
    // Extract filter type and value
    const [filterType, filterValue] = filter.split(": ")

    // Update filters based on type
    switch (filterType.toLowerCase()) {
      case "company":
        handleFilterChange({ company: undefined })
        break
      case "role":
        handleFilterChange({ role: undefined })
        break
      case "difficulty":
        handleFilterChange({ difficulty: undefined })
        break
      case "type":
        handleFilterChange({ type: undefined })
        break
      case "location":
        handleFilterChange({ location: undefined })
        break
      case "tags":
        // Remove individual tags
        const tagsToRemove = filterValue.split(", ")
        const tagIdsToRemove = tagsToRemove.map(tagLabel =>
          tagOptions.find(opt => opt.label === tagLabel)?.id
        ).filter(Boolean)
        const updatedTags = (filters.tags || []).filter(
          tag => !tagIdsToRemove.includes(tag)
        )
        handleFilterChange({ tags: updatedTags })
        break
      default:
        console.warn(`Unknown filter type: ${filterType}`)
    }
  }

  return (
    <div className="mb-8 space-y-4">
      <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-grow">
          <Input
            placeholder={`Search ${
              type === "interviews" ? "interview experiences" : "opportunities"
            }...`}
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="pl-10"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        </div>
        <div className="flex gap-2">
          <Button type="submit">Search</Button>
          <Sheet>
            <SheetTrigger asChild>
              <Button type="button" variant="outline" className="gap-2">
                <Filter size={16} />
                <span className="hidden sm:inline">Filters</span>
                {activeFilters.length > 0 && (
                  <Badge className="ml-1 h-5 w-5 p-0 flex items-center justify-center">
                    {activeFilters.length}
                  </Badge>
                )}
              </Button>
            </SheetTrigger>
            <SheetContent className="overflow-y-auto">
              <SheetHeader>
                <SheetTitle>Filter Options</SheetTitle>
              </SheetHeader>

              <div className="py-6 space-y-6 px-4">
                {/* Company Filter */}
                <div className="space-y-2">
                  <Label>Company</Label>
                  <Select
                    value={filters.company || ""}
                    onValueChange={value =>
                      handleFilterChange({ company: value || undefined })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select company" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Companies</SelectLabel>
                        {companyOptions.map(company => (
                          <SelectItem key={company.id} value={company.id}>
                            {company.label}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>

                {/* Role Filter */}
                <div className="space-y-2">
                  <Label>Role</Label>
                  <Select
                    value={filters.role || ""}
                    onValueChange={value => 
                      handleFilterChange({ role: value || undefined })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Roles</SelectLabel>
                        {roleOptions.map(role => (
                          <SelectItem key={role.id} value={role.id}>
                            {role.label}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>

                {/* Interview-specific filters */}
                {type === "interviews" && (
                  <div className="space-y-2">
                    <Label>Difficulty</Label>
                    <RadioGroup
                      value={filters.difficulty || ""}
                      onValueChange={value =>
                        handleFilterChange({ difficulty: value || undefined })
                      }
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="easy" id="difficulty-easy" />
                        <Label htmlFor="difficulty-easy">Easy</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="medium" id="difficulty-medium" />
                        <Label htmlFor="difficulty-medium">Medium</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="hard" id="difficulty-hard" />
                        <Label htmlFor="difficulty-hard">Hard</Label>
                      </div>
                    </RadioGroup>
                  </div>
                )}

                {/* Tags Filter */}
                {type === "interviews" && (
                  <div className="space-y-2">
                    <Label>Tags</Label>
                    <div className="grid grid-cols-2 gap-2">
                      {tagOptions.map(tag => (
                        <div
                          key={tag.id}
                          className="flex items-center space-x-2"
                        >
                          <Checkbox
                            id={`tag-${tag.id}`}
                            checked={(filters.tags || []).includes(tag.id)}
                            onCheckedChange={() => handleTagToggle(tag.id)}
                          />
                          <label
                            htmlFor={`tag-${tag.id}`}
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            {tag.label}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Opportunity-specific filters */}
                {type === "opportunities" && (
                  <>
                    <div className="space-y-2">
                      <Label>Job Type</Label>
                      <RadioGroup
                        value={filters.type || ""}
                        onValueChange={value =>
                          handleFilterChange({ type: value || undefined })
                        }
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem
                            value="full-time"
                            id="type-full-time"
                          />
                          <Label htmlFor="type-full-time">Full-time</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem
                            value="internship"
                            id="type-internship"
                          />
                          <Label htmlFor="type-internship">Internship</Label>
                        </div>
                      </RadioGroup>
                    </div>

                    <div className="space-y-2">
                      <Label>Location</Label>
                      <Select
                        value={filters.location || ""}
                        onValueChange={value =>
                          handleFilterChange({ location: value || undefined })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select location" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Locations</SelectLabel>
                            {locationOptions.map(location => (
                              <SelectItem key={location.id} value={location.id}>
                                {location.label}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </div>
                  </>
                )}
              </div>

              <SheetFooter className="flex-col sm:flex-row gap-2">
                <Button type="button" variant="outline" onClick={clearFilters}>
                  Clear All
                </Button>
                <SheetClose asChild>
                  <Button type="button">Apply Filters</Button>
                </SheetClose>
              </SheetFooter>
            </SheetContent>
          </Sheet>
        </div>
      </form>

      {/* Active filters */}
      {activeFilters.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {activeFilters.map(filter => (
            <Badge
              key={filter}
              variant="outline"
              className="flex items-center gap-1 py-1"
            >
              {filter}
              <button 
                type="button"
                onClick={() => removeFilter(filter)} 
                className="ml-1"
                aria-label={`Remove ${filter} filter`}
              >
                <X size={12} />
              </button>
            </Badge>
          ))}
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={clearFilters}
            className="text-xs h-7"
          >
            Clear All
          </Button>
        </div>
      )}
    </div>
  )
}

export default SearchAndFilter