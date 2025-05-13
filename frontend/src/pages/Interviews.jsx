import { useState } from 'react';
import SearchAndFilter from '@/components/shared/SearchAndFilter';
import InterviewCard from '@/components/shared/InterviewCard';
//import InterviewCard, { InterviewExperience } from '@/components/shared/InterviewCard';
// Mock data for interviews
const mockInterviews = [
    {
      id: "1",
      title: "My Software Engineer Interview at Google",
      company: { id: "google", name: "Google" },
      role: { id: "software-engineer", name: "Software Engineer" },
      date: "2023-12-15",
      difficultyLevel: "hard",
      tags: [
        { id: "dsa", name: "DSA" },
        { id: "system-design", name: "System Design" },
        { id: "coding", name: "Coding" }
      ],
      author: { id: "user1", name: "Alex Johnson" },
      content: "Detailed description of the Google interview process..."
    },
    {
      id: "2",
      title: "Data Science Interview Experience",
      company: { id: "microsoft", name: "Microsoft" },
      role: { id: "data-scientist", name: "Data Scientist" },
      date: "2024-01-10",
      difficultyLevel: "medium",
      tags: [
        { id: "ml", name: "ML" },
        { id: "statistics", name: "Statistics" },
        { id: "behavioral", name: "Behavioral" }
      ],
      author: { id: "user2", name: "Priya Sharma" },
      content: "My experience interviewing for a data science position..."
    },
    {
      id: "3",
      title: "Product Manager Interview at Amazon",
      company: { id: "amazon", name: "Amazon" },
      role: { id: "product-manager", name: "Product Manager" },
      date: "2024-02-05",
      difficultyLevel: "medium",
      tags: [
        { id: "product-sense", name: "Product Sense" },
        { id: "behavioral", name: "Behavioral" }
      ],
      author: { id: "user3", name: "Michael Wong" },
      content: "Amazon PM interview rounds and questions..."
    },
    {
      id: "4",
      title: "Frontend Developer Interview at Meta",
      company: { id: "meta", name: "Meta" },
      role: { id: "frontend-developer", name: "Frontend Developer" },
      date: "2024-03-20",
      difficultyLevel: "hard",
      tags: [
        { id: "javascript", name: "JavaScript" },
        { id: "react", name: "React" },
        { id: "css", name: "CSS" }
      ],
      author: { id: "user4", name: "Sarah Chen" },
      content: "My frontend interview at Meta covered various topics..."
    },
    {
      id: "5",
      title: "UX Designer Interview at Apple",
      company: { id: "apple", name: "Apple" },
      role: { id: "ux-designer", name: "UX Designer" },
      date: "2024-02-28",
      difficultyLevel: "medium",
      tags: [
        { id: "design", name: "Design" },
        { id: "portfolio", name: "Portfolio" },
        { id: "user-research", name: "User Research" }
      ],
      author: { id: "user5", name: "David Kim" },
      content: "The UX interview process at Apple was quite intensive..."
    },
    {
      id: "6",
      title: "Backend Engineer Interview at Amazon",
      company: { id: "amazon", name: "Amazon" },
      role: { id: "backend-engineer", name: "Backend Engineer" },
      date: "2024-01-05",
      difficultyLevel: "hard",
      tags: [
        { id: "system-design", name: "System Design" },
        { id: "algorithms", name: "Algorithms" },
        { id: "distributed-systems", name: "Distributed Systems" }
      ],
      author: { id: "user6", name: "Raj Patel" },
      content:
        "Amazon backend engineering interviews are focused on scalability..."
    }
  ]
  
  const Interviews = () => {
    const [filteredInterviews, setFilteredInterviews] = useState(mockInterviews)
    const [searchQuery, setSearchQuery] = useState("")
  
    const handleFilterChange = filters => {
      let results = [...mockInterviews]
  
      if (filters.company) {
        results = results.filter(i => i.company.id === filters.company)
      }
  
      if (filters.role) {
        results = results.filter(i => i.role.id === filters.role)
      }
  
      if (filters.difficulty) {
        results = results.filter(i => i.difficultyLevel === filters.difficulty)
      }
  
      if (filters.tags && filters.tags.length > 0) {
        results = results.filter(i =>
          i.tags.some(tag => filters.tags.includes(tag.id))
        )
      }
  
      if (searchQuery) {
        const query = searchQuery.toLowerCase()
        results = results.filter(
          i =>
            i.title.toLowerCase().includes(query) ||
            i.content.toLowerCase().includes(query) ||
            i.company.name.toLowerCase().includes(query) ||
            i.role.name.toLowerCase().includes(query)
        )
      }
  
      setFilteredInterviews(results)
    }
  
    const handleSearchChange = query => {
      setSearchQuery(query)
  
      let results = [...mockInterviews]
      if (query) {
        const lower = query.toLowerCase()
        results = results.filter(
          i =>
            i.title.toLowerCase().includes(lower) ||
            i.content.toLowerCase().includes(lower) ||
            i.company.name.toLowerCase().includes(lower) ||
            i.role.name.toLowerCase().includes(lower)
        )
      }
  
      setFilteredInterviews(results)
    }
  
    return (
      <div>
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Interview Experiences</h1>
          <p className="text-muted-foreground">
            Learn from others' interview journeys at top companies
          </p>
        </div>
  
        <SearchAndFilter
          type="interviews"
          onFilterChange={handleFilterChange}
          onSearchChange={handleSearchChange}
        />
  
        {filteredInterviews.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredInterviews.map(interview => (
              <InterviewCard key={interview.id} interview={interview} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <h3 className="text-xl font-medium mb-2">No interviews found</h3>
            <p className="text-muted-foreground">
              Try adjusting your search or filters
            </p>
          </div>
        )}
      </div>
    )
  }
  
  export default Interviews
  