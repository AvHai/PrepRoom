import { useEffect, useState } from 'react';
import SearchAndFilter from '@/components/shared/SearchAndFilter';
import InterviewCard from '@/components/shared/InterviewCard';

const Interviews = () => {
  const [interviews, setInterviews] = useState([]);
  const [filteredInterviews, setFilteredInterviews] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_BASE_URL}/interviews/`, {
      credentials: 'include',
    })
      .then(res => res.json())
      .then(data => {
        setInterviews(data);
        setFilteredInterviews(data);
      })
      .catch(err => {
        console.error('Failed to fetch interviews:', err);
      });
  }, []);

  const handleFilterChange = filters => {
    let results = [...interviews];

    if (filters.company) {
      results = results.filter(i => i.company && i.company.id === filters.company);
    }

    if (filters.role) {
      results = results.filter(i => i.role && i.role.id === filters.role);
    }

    if (filters.difficulty) {
      results = results.filter(i => i.difficultyLevel === filters.difficulty);
    }

    if (filters.tags && filters.tags.length > 0) {
      results = results.filter(i =>
        i.tags && i.tags.some(tag => filters.tags.includes(tag.id))
      );
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      results = results.filter(
        i =>
          i.title.toLowerCase().includes(query) ||
          i.content.toLowerCase().includes(query) ||
          i.company.name.toLowerCase().includes(query) ||
          i.role.name.toLowerCase().includes(query)
      );
    }

    setFilteredInterviews(results);
  };

  const handleSearchChange = query => {
    setSearchQuery(query);

    let results = [...interviews];
    if (query) {
      const lower = query.toLowerCase();
      results = results.filter(
        i =>
          i.title.toLowerCase().includes(lower) ||
          i.content.toLowerCase().includes(lower) ||
          i.company.name.toLowerCase().includes(lower) ||
          i.role.name.toLowerCase().includes(lower)
      );
    }

    setFilteredInterviews(results);
  };

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
  );
};

export default Interviews;