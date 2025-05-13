import { useState } from "react"
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

// Mock data for filters
const companyOptions = [
  { id: "google", label: "Google" },
  { id: "microsoft", label: "Microsoft" },
  { id: "amazon", label: "Amazon" },
  { id: "apple", label: "Apple" },
  { id: "meta", label: "Meta" }
]

const roleOptions = [
  { id: "software-engineer", label: "Software Engineer" },
  { id: "product-manager", label: "Product Manager" },
  { id: "data-scientist", label: "Data Scientist" },
  { id: "ux-designer", label: "UX Designer" },
  { id: "frontend-developer", label: "Frontend Developer" }
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
  { id: "mumbai", label: "Mumbai" }
]

const SearchAndFilter = ({ type, onFilterChange, onSearchChange }) => {
  const [searchQuery, setSearchQuery] = useState("")
  const [filters, setFilters] = useState({ tags: [] })
  const [activeFilters, setActiveFilters] = useState([])

  const handleSearch = () => {
    onSearchChange(searchQuery)
  }

  const handleFilterChange = newFilters => {
    const updatedFilters = { ...filters, ...newFilters }
    setFilters(updatedFilters)

    // Update active filters
    const active = []
    if (updatedFilters.company)
      active.push(`Company: ${updatedFilters.company}`)
    if (updatedFilters.role) active.push(`Role: ${updatedFilters.role}`)
    if (updatedFilters.difficulty)
      active.push(`Difficulty: ${updatedFilters.difficulty}`)
    if (updatedFilters.type) active.push(`Type: ${updatedFilters.type}`)
    if (updatedFilters.location)
      active.push(`Location: ${updatedFilters.location}`)
    if (updatedFilters.tags.length > 0) {
      active.push(`Tags: ${updatedFilters.tags.join(", ")}`)
    }

    setActiveFilters(active)
    onFilterChange(updatedFilters)
  }

  const handleTagToggle = tagId => {
    const updatedTags = filters.tags.includes(tagId)
      ? filters.tags.filter(id => id !== tagId)
      : [...filters.tags, tagId]

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
        const updatedTags = filters.tags.filter(
          tag => !tagsToRemove.includes(tag)
        )
        handleFilterChange({ tags: updatedTags })
        break
    }
  }

  return (
    <div className="mb-8 space-y-4">
      <div className="flex flex-col sm:flex-row gap-4">
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
          <Button onClick={handleSearch}>Search</Button>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" className="gap-2">
                <Filter size={16} />
                <span className="hidden sm:inline">Filters</span>
              </Button>
            </SheetTrigger>
            <SheetContent className="overflow-y-auto">
              <SheetHeader>
                <SheetTitle>Filter Options</SheetTitle>
              </SheetHeader>

              <div className="py-6 space-y-6">
                {/* Company Filter */}
                <div className="space-y-2">
                  <Label>Company</Label>
                  <Select
                    value={filters.company}
                    onValueChange={value =>
                      handleFilterChange({ company: value })
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
                    value={filters.role}
                    onValueChange={value => handleFilterChange({ role: value })}
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
                      value={filters.difficulty}
                      onValueChange={value =>
                        handleFilterChange({ difficulty: value })
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
                            checked={filters.tags.includes(tag.id)}
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
                        value={filters.type}
                        onValueChange={value =>
                          handleFilterChange({ type: value })
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
                        value={filters.location}
                        onValueChange={value =>
                          handleFilterChange({ location: value })
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
                <Button variant="outline" onClick={clearFilters}>
                  Clear All
                </Button>
                <SheetClose asChild>
                  <Button>Apply Filters</Button>
                </SheetClose>
              </SheetFooter>
            </SheetContent>
          </Sheet>
        </div>
      </div>

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
              <button onClick={() => removeFilter(filter)} className="ml-1">
                <X size={12} />
              </button>
            </Badge>
          ))}
          <Button
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
