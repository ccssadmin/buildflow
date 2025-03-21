import React, { useState } from 'react';


const AqsCostEstimation = () => {
  const [selectedSite, setSelectedSite] = useState('MRM Site');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  
  const sites = ['MRM Site', 'Second Site', 'Third Site'];
  
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const selectSite = (site) => {
    setSelectedSite(site);
    setIsDropdownOpen(false);
  };
  
  // Sample data matching exactly what's in the image
  const blocks = [
    {
      id: 'CL00024',
      name: 'A Block (CE)',
      time: '02:54 pm',
      date: '14/05/2024',
      status: 'Inactive',
      approvedBy: 'Quality Surveyor',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip.'
    },
    {
      id: 'CL00024',
      name: 'A Block (CE)',
      time: '02:54 pm',
      date: '14/05/2024',
      status: 'Inactive',
      approvedBy: 'Quality Surveyor',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.'
    },
    {
      id: 'CL00024',
      name: 'B Block (CE)',
      time: '02:54 pm',
      date: '14/05/2024',
      status: 'Inactive',
      approvedBy: 'Quality Surveyor',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.'
    },
    {
      id: 'CL00024',
      name: 'A Block (CE)',
      time: '02:54 pm',
      date: '14/05/2024',
      status: 'Inactive',
      approvedBy: 'Quality Surveyor',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.'
    },
    {
      id: 'CL00024',
      name: 'E block',
      time: '02:54 pm',
      date: '14/05/2024',
      approvedBy: 'Quality Surveyor',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.'
    },
    {
      id: 'CL00024',
      name: 'C Block',
      time: '02:54 pm',
      date: '14/05/2024',
      approvedBy: 'Quality Surveyor',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.'
    },
    {
      id: 'CL00024',
      name: 'D block',
      time: '02:54 pm',
      date: '14/05/2024',
      approvedBy: 'Quality Surveyor',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.'
    },
    {
      id: 'CL00024',
      name: 'D block',
      time: '02:54 pm',
      date: '14/05/2024',
      approvedBy: 'Quality Surveyor',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.'
    }
  ];

  return (
    <div className="container-fluid p-3">
      <div className="row justify-content-between align-items-center mb-3">
        <div className="col-auto">
        <div className="d-flex justify-content-between align-items-center mb-3">
            <select
            className="form-select select-custom"
            value={selectedSite}
            onChange={(e) => setSelectedSite(e.target.value)}
            >
            {sites.map((site, index) => (
                <option key={index} value={site}>{site}</option>
            ))}
            </select>
        </div>
        </div>
        
        <div className="col-auto d-flex align-items-center">
          <button className="sort-button me-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-funnel" viewBox="0 0 16 16">
              <path d="M1.5 1.5A.5.5 0 0 1 2 1h12a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.128.334L10 8.692V13.5a.5.5 0 0 1-.342.474l-3 1A.5.5 0 0 1 6 14.5V8.692L1.628 3.834A.5.5 0 0 1 1.5 3.5v-2z"/>
            </svg>
            <span className="ms-1">Sort By</span>
          </button>
          <button className="create-button">
            + Create
          </button>
        </div>
      </div>
      
      <div className="row g-3 ">
        {blocks.map((block, index) => (
          <div className="col-md-6 border border-1" key={index}>
            <div className="block-card">
              <div className="card-header-info">
                <div className="id-text">ID - {block.id}</div>
                <div className="time-text">{block.time} • {block.date}</div>
              </div>
              
              <div className="card-title-row justify-content-start">
                <h5 className="block-name">{block.name}</h5>
                {block.status && (
                  <span className="inactive-badge">{block.status}</span>
                )}
              </div>
              
              <div className="approval-row">
                <span className="approval-text">Approved by</span>
                <span className="surveyor-badge">{block.approvedBy}</span>
              </div>
              
              <p className="description-text">
                {block.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AqsCostEstimation;