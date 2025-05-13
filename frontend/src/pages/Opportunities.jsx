import { useState } from 'react';
import SearchAndFilter from '@/components/shared/SearchAndFilter';
import OpportunityCard from '@/components/shared/OpportunityCard';

const mockOpportunities = [
  {
    id: '1',
    company: { id: 'google', name: 'Google' },
    role: 'Software Engineer, New Grad',
    type: 'full-time',
    location: 'Bangalore, India',
    stipend: '₹27,00,000/year',
    applicationDeadline: '2024-05-30',
    applyLink: 'https://careers.google.com',
    eligibility: 'B.Tech/B.E., M.Tech/M.E. in Computer Science or related field',
    description: 'Join Google as a Software Engineer and work on products that impact millions of users...',
    author: { id: 'user1', name: 'Campus Team' },
    postedOn: '2024-04-01'
  },
  {
    id: '2',
    company: { id: 'microsoft', name: 'Microsoft' },
    role: 'Data Science Intern',
    type: 'internship',
    location: 'Hyderabad, India',
    stipend: '₹80,000/month',
    applicationDeadline: '2024-05-01',
    applyLink: 'https://careers.microsoft.com',
    eligibility: 'Pursuing B.Tech/B.E., M.Tech/M.E. in Computer Science, Statistics, or related field',
    description: "Work with Microsoft's data science team to solve real-world problems...",
    author: { id: 'user2', name: 'HR Team' },
    postedOn: '2024-03-15'
  },
  {
    id: '3',
    company: { id: 'amazon', name: 'Amazon' },
    role: 'Product Manager',
    type: 'full-time',
    location: 'Remote, India',
    stipend: '₹22,00,000/year',
    applicationDeadline: '2024-06-15',
    applyLink: 'https://amazon.jobs',
    eligibility: 'MBA or equivalent with 0-2 years of experience',
    description: "Drive product development for Amazon's e-commerce platform...",
    author: { id: 'user3', name: 'Recruiter' },
    postedOn: '2024-04-10'
  },
  {
    id: '4',
    company: { id: 'apple', name: 'Apple' },
    role: 'iOS Developer Intern',
    type: 'internship',
    location: 'Bangalore, India',
    stipend: '₹75,000/month',
    applicationDeadline: '2024-04-30',
    applyLink: 'https://apple.com/careers',
    eligibility: 'Pursuing B.Tech/B.E. in Computer Science with knowledge of Swift',
    description: "Join Apple's iOS development team for a summer internship...",
    author: { id: 'user4', name: 'University Recruiter' },
    postedOn: '2024-03-20'
  },
  {
    id: '5',
    company: { id: 'meta', name: 'Meta' },
    role: 'Frontend Engineer',
    type: 'full-time',
    location: 'Remote',
    stipend: '₹25,00,000/year',
    applicationDeadline: '2024-05-15',
    applyLink: 'https://meta.com/careers',
    eligibility: 'B.Tech/B.E. in Computer Science or related field with 0-2 years of experience',
    description: "Build the next generation of Meta's web interfaces...",
    author: { id: 'user5', name: 'Tech Recruiter' },
    postedOn: '2024-03-25'
  },
  {
    id: '6',
    company: { id: 'microsoft', name: 'Microsoft' },
    role: 'Product Manager, Azure',
    type: 'full-time',
    location: 'Hyderabad, India',
    stipend: '₹24,00,000/year',
    applicationDeadline: '2024-06-01',
    applyLink: 'https://careers.microsoft.com',
    eligibility: 'MBA with technical background, 0-3 years of experience',
    description: "Drive product strategy for Microsoft's Azure cloud services...",
    author: { id: 'user6', name: 'Azure Team' },
    postedOn: '2024-04-05'
  }
];

const Opportunities = () => {
  const [filteredOpportunities, setFilteredOpportunities] = useState(mockOpportunities);
  const [searchQuery, setSearchQuery] = useState('');

  const handleFilterChange = (filters) => {
    let results = [...mockOpportunities];

    if (filters.company) {
      results = results.filter(item => item.company.id === filters.company);
    }
    if (filters.type) {
      results = results.filter(item => item.type === filters.type);
    }
    if (filters.location) {
      results = results.filter(item => item.location.includes(filters.location));
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      results = results.filter(item =>
        item.role.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query) ||
        item.company.name.toLowerCase().includes(query) ||
        item.location.toLowerCase().includes(query)
      );
    }

    setFilteredOpportunities(results);
  };

  const handleSearchChange = (query) => {
    setSearchQuery(query);

    let results = [...mockOpportunities];
    if (query) {
      const searchLower = query.toLowerCase();
      results = results.filter(item =>
        item.role.toLowerCase().includes(searchLower) ||
        item.description.toLowerCase().includes(searchLower) ||
        item.company.name.toLowerCase().includes(searchLower) ||
        item.location.toLowerCase().includes(searchLower)
      );
    }

    setFilteredOpportunities(results);
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Job & Internship Opportunities</h1>
        <p className="text-muted-foreground">Discover the latest openings at top companies</p>
      </div>

      <SearchAndFilter
        type="opportunities"
        onFilterChange={handleFilterChange}
        onSearchChange={handleSearchChange}
      />

      {filteredOpportunities.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredOpportunities.map(item => (
            <OpportunityCard key={item.id} opportunity={item} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <h3 className="text-xl font-medium mb-2">No opportunities found</h3>
          <p className="text-muted-foreground">Try adjusting your search or filters</p>
        </div>
      )}
    </div>
  );
};

export default Opportunities;
