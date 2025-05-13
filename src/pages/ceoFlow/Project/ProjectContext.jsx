import React, { createContext, useContext, useState, ReactNode } from 'react';

// Project Data Types
const initialProjectData = {
  project: {
    project_id: null,
    project_name: "",
    project_description: "",
    project_type_id: null,
    project_type_name: "",
    project_sector_id: null,
    project_sector_name: "",
    project_status: "NotApproved",
    project_start_date: "",
    project_end_date: "",
    project_total_budget: 0,
    project_location: ""
  },
  budget_details: [],
  team_details: [],
  finance_approval_data: [],
  milestone_details: [],
  risk_management_data: [],
  total_employee_count: 0
};

const ProjectContext = createContext();

export const ProjectProvider = ({ children }) => {
  const [projectData, setProjectData] = useState(initialProjectData);
  const [currentStep, setCurrentStep] = useState(0);

  const updateProjectData = (step, data) => {
    setProjectData(prev => ({
      ...prev,
      ...data
    }));
  };

  const nextStep = () => {
    setCurrentStep(prev => prev + 1);
  };

  const prevStep = () => {
    setCurrentStep(prev => prev - 1);
  };

  const fetchProjectDetails = async (projectId) => {
    try {
      const response = await fetch(`/api/Project/getProjectDetails?projectId=${projectId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch project details');
      }
      const data = await response.json();
      setProjectData(data.value);
    } catch (error) {
      console.error('Error fetching project details:', error);
      throw error;
    }
  };

  // Function to format data for the Step 1 API call
  const formatStep1Data = () => {
    const { project } = projectData;
    return {
      projectId: project.project_id || 0,
      projectName: project.project_name,
      projectLocation: project.project_location,
      projectTypeId: project.project_type_id || 0,
      projectSectorId: project.project_sector_id || 0,
      projectStartDate: project.project_start_date,
      expectedCompletionDate: project.project_end_date,
      description: project.project_description
    };
  };

  // Function to format data for the Step 2 API call
  const formatStep2Data = () => {
    const { project, budget_details } = projectData;
    return {
      projectId: project.project_id || 0,
      projectBudgetList: budget_details.map(item => ({
        projectBudgetId: item.project_budget_id || 0,
        projectExpenseCategory: item.project_expense_category,
        estimatedCost: parseFloat(item.estimated_cost) || 0,
        approvedBudget: parseFloat(item.approved_budget) || 0
      }))
    };
  };

  // Function to format data for the Step 3 API call
  const formatStep3Data = () => {
    const { project, team_details } = projectData;
    
    // Initialize empty arrays for each role
    const roleIdMap = {
      pmId: [],
      apmId: [],
      leadEnggId: [],
      siteSupervisorId: [],
      qsId: [],
      aqsId: [],
      siteEnggId: [],
      enggId: [],
      designerId: [],
      vendorId: [],
      subcontractorId: []
    };

    // Map role names to API role IDs
    team_details.forEach(member => {
      switch(member.role) {
        case 'Project Manager':
          roleIdMap.pmId.push(member.emp_id || 0);
          break;
        case 'Assistant Project Manager':
          roleIdMap.apmId.push(member.emp_id || 0);
          break;
        case 'Lead Engineer':
          roleIdMap.leadEnggId.push(member.emp_id || 0);
          break;
        case 'Site Supervisor':
          roleIdMap.siteSupervisorId.push(member.emp_id || 0);
          break;
        case 'Quantity Surveyor':
          roleIdMap.qsId.push(member.emp_id || 0);
          break;
        case 'Assistant Quantity Surveyor':
          roleIdMap.aqsId.push(member.emp_id || 0);
          break;
        case 'Site Engineer':
          roleIdMap.siteEnggId.push(member.emp_id || 0);
          break;
        case 'Engineer':
          roleIdMap.enggId.push(member.emp_id || 0);
          break;
        case 'Designer':
          roleIdMap.designerId.push(member.emp_id || 0);
          break;
        default:
          // Handle other roles if needed
          break;
      }
    });

    return {
      projectId: project.project_id || 0,
      ...roleIdMap
    };
  };

  // Function to format data for the Step 4 API call
  const formatStep4Data = () => {
    const { project, milestone_details } = projectData;
    return {
      projectId: project.project_id || 0,
      milestoneList: milestone_details.map(milestone => ({
        milestoneId: milestone.milestone_id || 0,
        milestoneName: milestone.milestone_name,
        milestoneDescription: milestone.milestone_description,
        milestoneStartDate: milestone.milestone_start_date,
        milestoneEndDate: milestone.milestone_end_date,
        status: milestone.milestone_status
      }))
    };
  };

  // Function to format data for the Step 5 API call (Finance Approval)
  const formatStep5FinanceData = () => {
    const { project, finance_approval_data } = projectData;
    return {
      projectId: project.project_id || 0,
      projectPermissionFinanceApprovalList: finance_approval_data.map(item => ({
        empId: item.emp_id || 0,
        amount: parseFloat(item.amount) || 0
      }))
    };
  };

  const saveStep = async (step) => {
    try {
      let endpoint;
      let requestData;
      let method = 'POST';
      let headers = {
        'Content-Type': 'application/json',
      };
      
      switch(step) {
        case 0: // Project Basic Details
          endpoint = '/api/Project/upsertProject'; // Changed endpoint to match project creation
          requestData = formatStep1Data();
          break;
        case 1: // Budget & Financial Allocation
          endpoint = '/api/Project/upsertProjectBudget';
          requestData = formatStep2Data();
          break;
        case 2: // Project Team
          endpoint = '/api/Project/upsertProjectTeam';
          requestData = formatStep3Data();
          break;
        case 3: // Milestones
          endpoint = '/api/Project/upsertProjectMilestones';
          requestData = formatStep4Data();
          break;
        case 4: // Risks & Finance Approval
          // For simplicity, use finance approval endpoint first
          endpoint = '/api/Project/upsertPermissionFinanceApproval';
          requestData = formatStep5FinanceData();
          break;
        default:
          throw new Error('Invalid step');
      }
      
      // For risk uploads (Step 5), handle separately
      if (step === 4 && projectData.risk_management_data && projectData.risk_management_data.length > 0) {
        // Make a separate call for risks
        const riskData = {
          projectId: projectData.project.project_id || 0,
          riskList: projectData.risk_management_data.map(risk => ({
            riskId: risk.risk_id || 0,
            categoryName: risk.category || '',
            status: risk.status || '',
            description: risk.description || ''
          }))
        };
        
        const riskResponse = await fetch('/api/Project/upsertRisk', {
          method: 'POST',
          headers,
          body: JSON.stringify(riskData),
        });
        
        if (!riskResponse.ok) {
          throw new Error('Failed to save risk data');
        }
      }

      console.log(`Sending request to ${endpoint} with data:`, requestData);
      const response = await fetch(endpoint, {
        method,
        headers,
        body: JSON.stringify(requestData),
      });
      
      if (!response.ok) {
        throw new Error(`Failed to save step ${step + 1} data`);
      }
      
      return await response.json();
    } catch (error) {
      console.error(`Error saving step ${step + 1}:`, error);
      throw error;
    }
  };

  return (
    <ProjectContext.Provider 
      value={{
        projectData,
        setProjectData,
        currentStep,
        nextStep,
        prevStep,
        updateProjectData,
        saveStep,
        fetchProjectDetails
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
};

export const useProject = () => {
  const context = useContext(ProjectContext);
  if (!context) {
    throw new Error('useProject must be used within a ProjectProvider');
  }
  return context;
};