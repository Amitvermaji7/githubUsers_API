import React from 'react';
import './Header.css'; // Importing the new CSS for the header

const Header = ({ searchQuery, setSearchQuery, languageFilter, setLanguageFilter, sortOption, setSortOption, setTheme }) => {
  return (
    <header className="header">
      <div className="header-content">
        <img src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png" alt="GitHub Logo" className="github-logo" />
        <h1 className="header-title">GitHub Repository Explorer</h1>
        <div className="search-container">
          <input
            type="text"
            placeholder="Search repositories..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <select onChange={(e) => setLanguageFilter(e.target.value)}>
            <option value="">All Languages</option>
            <option value="JavaScript">JavaScript</option>
            <option value="Python">Python</option>
            <option value="Java">Java</option>
            {/* Add more languages as needed */}
          </select>
          <select onChange={(e) => setSortOption(e.target.value)}>
            <option value="stars">Sort by Stars</option>
            <option value="forks">Sort by Forks</option>
          </select>
          <select onChange={(e) => setTheme(e.target.value)}>
            <option value="light">Light Theme</option>
            <option value="dark">Dark Theme</option>
            <option value="blue">Blue Theme</option>
            <option value="green">Green Theme</option>
            {/* Add more themes as needed */}
          </select>
        </div>
      </div>
    </header>
  );
};

export default Header;
