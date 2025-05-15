import { useEffect, useState } from 'react';
import SearchAndFilter from '@/components/shared/SearchAndFilter';
import OpportunityCard from '@/components/shared/OpportunityCard';



const Opportunities = () => {
  const [opportunities, setOpportunities] = useState([]);
  const [filteredOpportunities, setFilteredOpportunities] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({});

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_BASE_URL}/opportunity/`, {
      credentials: 'include',
    })
      .then(res => res.json())
      .then(data => {
        setOpportunities(data);
        setFilteredOpportunities(data);
      })
      .catch(err => {
        console.error('Failed to fetch opportunities:', err);
      });
  }, []);


   const filterAndSearch = (filters, query) => {
    let results = [...opportunities];

    if (filters.company) {
      results = results.filter(item => item?.company?.id === filters.company);
    }
    if (filters.type) {
      results = results.filter(item => item?.type === filters.type);
    }
    if (filters.location) {
      results = results.filter(item => item?.location?.toLowerCase().includes(filters.location.toLowerCase()));
    }

    if (query) {
      const lowerQuery = query.toLowerCase();
      results = results.filter(item =>
        item?.role?.toLowerCase().includes(lowerQuery) ||
        item?.description?.toLowerCase().includes(lowerQuery) ||
        item?.company?.name?.toLowerCase().includes(lowerQuery) ||
        item?.location?.toLowerCase().includes(lowerQuery)
      );
    }

    setFilteredOpportunities(results);
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    filterAndSearch(newFilters, searchQuery);
  };

  const handleSearchChange = (query) => {
    setSearchQuery(query);
    filterAndSearch(filters, query);
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
