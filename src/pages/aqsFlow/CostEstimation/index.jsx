import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const AqsCostEstimation = () => {
  const [selectedSite, setSelectedSite] = useState('MRM Site');

  // Sample data to match the image
  const blocks = [
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
      status: '',
      approvedBy: 'Quality Surveyor',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.'
    },
    {
      id: 'CL00024',
      name: 'C Block',
      time: '02:54 pm',
      date: '14/05/2024',
      status: '',
      approvedBy: 'Quality Surveyor',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.'
    },
    {
      id: 'CL00024',
      name: 'D block',
      time: '02:54 pm',
      date: '14/05/2024',
      status: '',
      approvedBy: 'Quality Surveyor',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.'
    },
    {
      id: 'CL00024',
      name: 'D block',
      time: '02:54 pm',
      date: '14/05/2024',
      status: '',
      approvedBy: 'Quality Surveyor',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.'
    }
  ];

  return (
    <div className="container-fluid p-3">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div className="dropdown">
          <button 
            className="btn btn-light dropdown-toggle text-start" 
            type="button" 
            id="siteDropdown" 
            data-bs-toggle="dropdown" 
            aria-expanded="false"
            style={{ backgroundColor: '#f2f2f2', width: '250px', textAlign: 'left' }}
          >
            {selectedSite}
          </button>
          <ul className="dropdown-menu" aria-labelledby="siteDropdown">
            <li><a className="dropdown-item" href="#" onClick={() => setSelectedSite('MRM Site')}>MRM Site</a></li>
            <li><a className="dropdown-item" href="#" onClick={() => setSelectedSite('Other Site')}>Other Site</a></li>
          </ul>
        </div>
        <div className="d-flex">
          <button className="btn btn-light me-2" style={{ backgroundColor: '#f2f2f2' }}>
            <i className="bi bi-funnel"></i> Sort By
          </button>
          <button className="btn text-white" style={{ backgroundColor: '#FF7A00' }}>
            <i className="bi bi-plus"></i> Create
          </button>
        </div>
      </div>

      <div className="row g-3">
        {blocks.map((block, index) => (
          <div className="col-md-6" key={index}>
            <div className="card border-0 shadow-sm mb-2">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <div>
                    <small className="text-muted">ID - {block.id}</small>
                  </div>
                  <div>
                    <small className="text-muted">{block.time} • {block.date}</small>
                  </div>
                </div>
                
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <h5 className="card-title mb-0">{block.name}</h5>
                  {block.status && (
                    <span className="badge bg-secondary text-white" style={{ fontSize: '0.7rem', backgroundColor: '#6c757d' }}>
                      {block.status}
                    </span>
                  )}
                </div>
                
                <div className="mb-2">
                  <small className="text-muted">Approved by</small>
                  <span className="badge ms-2 text-white" style={{ backgroundColor: '#4361EE', fontSize: '0.8rem' }}>
                    {block.approvedBy}
                  </span>
                </div>
                
                <p className="card-text" style={{ fontSize: '0.8rem', color: '#6c757d' }}>
                  {block.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AqsCostEstimation;