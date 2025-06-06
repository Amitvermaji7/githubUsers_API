import { useState, useEffect } from 'react';
import './styles.css'; // Updated to use the new styles
import Header from './Header';
import Footer from './Footer';

function App() {
  const [repositories, setRepositories] = useState([]);
  const [searchQuery, setSearchQuery] = useState('stars:>1'); // Default search query for trending repos
  const [languageFilter, setLanguageFilter] = useState('');
  const [sortOption, setSortOption] = useState('stars');
  const [theme, setTheme] = useState('light'); // State for theme selection

  const fetchRepositories = async () => {
    try {
      console.log('Fetching repositories...'); // Log before fetching
      const response = await fetch(`https://api.github.com/search/repositories?q=${searchQuery}&sort=${sortOption}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      console.log('Data fetched:', data); // Log the data to inspect the response
      setRepositories(data.items);
    } catch (error) {
      console.error('Error fetching repositories:', error); // Log any errors
    }
  };

  useEffect(() => {
    fetchRepositories(); // Fetch trending repositories on component mount
  }, []); // Empty dependency array to run only once

  useEffect(() => {
    fetchRepositories(); // Fetch repositories whenever searchQuery or sortOption changes
  }, [searchQuery, sortOption]);

  return (
    <div className={theme}> {/* Apply the selected theme class */}
      <Header 
        searchQuery={searchQuery} 
        setSearchQuery={setSearchQuery} 
        languageFilter={languageFilter} 
        setLanguageFilter={setLanguageFilter} 
        sortOption={sortOption} 
        setSortOption={setSortOption} 
        setTheme={setTheme} // Pass the setTheme function to Header
      />
      <div className="container">
        {repositories
          .filter(repo => !languageFilter || repo.language === languageFilter)
          .sort((a, b) => {
            if (sortOption === 'stars') {
              return b.stargazers_count - a.stargazers_count;
            } else {
              return b.forks_count - a.forks_count;
            }
          })
          .map(repo => (
            // Render each repository card
            <div key={repo.id} className="repo-card">
              <div className="repo-header">
                <img src={repo.owner.avatar_url} alt="Owner Avatar" className="owner-avatar" />
                <h2 className='repo_name'>{repo.name}</h2>
              </div>
              <p className="repo-description">{repo.description || "कोई विवरण उपलब्ध नहीं"}</p>
              <div className="repo-stats">
                <div className="stat-item">
                  <span className="stat-icon">⭐</span>
                  <span>{repo.stargazers_count.toLocaleString()}</span>
                </div>
                <div className="stat-item">
                  <span className="stat-icon">🍴</span>
                  <span>{repo.forks_count.toLocaleString()}</span>
                </div>
                <div className="stat-item">
                  <span className="stat-icon">💻</span>
                  <span>{repo.language || "N/A"}</span>
                </div>
              </div>
              <a href={repo.html_url} target="_blank" rel="noopener noreferrer" className="view-repo-btn">
                View Repository
              </a>
            </div>
          ))}
      </div>
      <Footer />
    </div>
  );
}

export default App;
