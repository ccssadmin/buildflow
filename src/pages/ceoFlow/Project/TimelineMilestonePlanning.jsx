import React, { useState } from "react";

const initialMilestones = [
  { milestone: "Foundation Work", description: "Complete excavation and concrete laying", start: "", end: "", status: "Planned" },
  { milestone: "Structural Framing", description: "Assemble steel and structural framing", start: "", end: "", status: "Planned" },
  { milestone: "Roofing Installation", description: "Complete installation of roofing system", start: "", end: "", status: "Planned" },
  { milestone: "Exterior Walls", description: "Brickwork, plastering, and painting", start: "", end: "", status: "Planned" },
  { milestone: "Plumbing & Electrical Work", description: "Install pipes, wiring, and fixtures", start: "", end: "", status: "Planned" },
  { milestone: "Interior Design & Finishing", description: "Install doors, windows & interiors", start: "", end: "", status: "Planned" },
  { milestone: "Final Inspection & Handover", description: "Quality check and handover to client", start: "", end: "", status: "Planned" },
];

const TimelineMilestoneTable = () => {
  const [milestones, setMilestones] = useState(initialMilestones);

  const handleChange = (index, field, value) => {
    const updated = [...milestones];
    updated[index][field] = value;
    setMilestones(updated);
  };

  return (
    <div className="overflow-x-auto mt-10 px-6 w-full">
      {/* Heading */}
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">
        Timeline & Milestone Planning
      </h2>

      {/* Table */}
      <table className="w-full text-left border border-gray text-sm">
      <thead style={{ backgroundColor: '#EBEBEB' }} className="text-gray-700 uppercase">
  <tr>
    <th className="p-3 border">Milestone</th>
    <th className="p-3 border">Description</th>
    <th className="p-3 border">Start Date</th>
    <th className="p-3 border">End Date</th>
    <th className="p-3 border">Status</th>
  </tr>
</thead>


        <tbody>
          {milestones.map((row, idx) => (
            <tr key={idx} className="text-gray-800">
              <td className="p-3 border">{row.milestone}</td>
              <td className="p-3 border">{row.description}</td>
              <td className="p-3 border">
                {/* Read-only Start Date */}
                <div className="w-full bg-transparent text-gray">{row.start || "DD/MM/YYYY"}</div>
              </td>
              <td className="p-3 border">
                {/* Read-only End Date */}
                <div className="w-full bg-transparent text-gray">{row.end || "DD/MM/YYYY"}</div>
              </td>
              <td className="p-3 border relative">
                <select
                  className="border-white"
                  value={row.status}
                  onChange={(e) => handleChange(idx, "status", e.target.value)}
                >
                  <option>Planned</option>
                  <option>In Progress</option>
                  <option>Completed</option>
                </select>
                {/* Dropdown Arrow */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Add Column Button */}
      <div className="flex justify-end mt-4  ">
      <div className="flex justify-between w-full ">
      <button className="text-orange font-semibold text-sm border-0 bg-transparent  ">
    + Add Column
</button>

</div>

</div>
    </div>
  );
};

export default TimelineMilestoneTable; //ui only


// import React, { useState, useEffect } from "react";
// import { Button } from "react-bootstrap";
// import Swal from "sweetalert2";
// import { useProject } from "../../../hooks/Ceo/useCeoProject";
// import { useParams } from "react-router-dom";

// const TimelineContainer = () => {
//   const { projectId } = useParams();
//   const { createProjectMilestone, loading, currentProject } = useProject();
//   const [formData, setFormData] = useState({
//     projectId: null,
//     milestones: [
//       {
//         id: 1,
//         name: "Initial Planning",
//         description: "Project kickoff and initial planning phase",
//         startDate: "",
//         endDate: "",
//         status: "Planned"
//       }
//     ]
//   });

//   useEffect(() => {
//     // Get project ID from URL params, localStorage or current project
//     const storedProjectId = localStorage.getItem("projectId");
//     const resolvedProjectId = projectId || storedProjectId || (currentProject?.projectId || currentProject?.data?.projectid);
    
//     if (resolvedProjectId) {
//       console.log("⚠️ Setting project ID in timeline:", resolvedProjectId);
//       setFormData(prev => ({
//         ...prev,
//         projectId: resolvedProjectId
//       }));
//     } else {
//       console.error("❌ No project ID found in timeline component!");
//     }
//   }, [projectId, currentProject]);

//   const handleMilestoneChange = (id, field, value) => {
//     setFormData(prev => ({
//       ...prev,
//       milestones: prev.milestones.map(milestone => 
//         milestone.id === id ? { ...milestone, [field]: value } : milestone
//       )
//     }));
//   };

//   const handleAddMilestone = () => {
//     const newId = formData.milestones.length > 0 
//       ? Math.max(...formData.milestones.map(m => m.id)) + 1 
//       : 1;
      
//     setFormData(prev => ({
//       ...prev,
//       milestones: [
//         ...prev.milestones, 
//         {
//           id: newId,
//           name: `Milestone ${newId}`,
//           description: "",
//           startDate: "",
//           endDate: "",
//           status: "Planned"
//         }
//       ]
//     }));
//   };

//   const handleSubmit = async () => {
//     if (!formData.projectId) {
//       Swal.fire({
//         icon: "error",
//         title: "No Project Selected",
//         text: "Please create or select a project first."
//       });
//       return;
//     }

//     // Validate required fields
//     const invalidMilestones = formData.milestones.filter(
//       m => !m.name || !m.startDate || !m.endDate
//     );

//     if (invalidMilestones.length > 0) {
//       Swal.fire({
//         icon: "warning",
//         title: "Incomplete Data",
//         text: "Please fill in all required fields (name, start date, end date) for all milestones."
//       });
//       return;
//     }

//     // Format the milestone data according to API requirements
//     const formattedMilestones = formData.milestones.map(milestone => ({
//       milestoneId: 0,
//       milestoneName: milestone.name,
//       milestoneDescription: milestone.description,
//       milestoneStartDate: milestone.startDate,
//       milestoneEndDate: milestone.endDate,
//       milestoneStatus: milestone.status
//     }));
    
//     // Create the DTO structure the API expects
//     const milestoneDto = {
//       projectId: parseInt(formData.projectId),
//       milestoneList: formattedMilestones
//     };
    
//     console.log("Submitting milestones:", milestoneDto);
    
//     try {
//       const response = await createProjectMilestone(formData.projectId, milestoneDto);
      
//       if (response.success) {
//         Swal.fire({
//           icon: "success",
//           title: "Success!",
//           text: "Project milestones have been saved successfully.",
//           timer: 1500,
//           showConfirmButton: false
//         });
//       } else {
//         throw new Error(response.message || "Failed to save milestones");
//       }
//     } catch (error) {
//       console.error("Error saving milestones:", error);
//       Swal.fire({
//         icon: "error",
//         title: "Error",
//         text: error.message || "Something went wrong. Please try again."
//       });
//     }
//   };

//   // Simple milestone row renderer
//   const renderMilestoneRow = (milestone) => {
//     return (
//       <div className="card mb-3" key={milestone.id}>
//         <div className="card-body">
//           <div className="row">
//             <div className="col-md-6">
//               <div className="form-group mb-3">
//                 <label>Milestone Name</label>
//                 <input 
//                   type="text"
//                   className="form-control"
//                   value={milestone.name}
//                   onChange={(e) => handleMilestoneChange(milestone.id, 'name', e.target.value)}
//                   placeholder="Enter milestone name"
//                 />
//               </div>
//               <div className="form-group mb-3">
//                 <label>Description</label>
//                 <textarea
//                   className="form-control"
//                   value={milestone.description}
//                   onChange={(e) => handleMilestoneChange(milestone.id, 'description', e.target.value)}
//                   placeholder="Enter description"
//                   rows="2"
//                 />
//               </div>
//             </div>
//             <div className="col-md-6">
//               <div className="row">
//                 <div className="col-md-6">
//                   <div className="form-group mb-3">
//                     <label>Start Date</label>
//                     <input 
//                       type="date"
//                       className="form-control"
//                       value={milestone.startDate}
//                       onChange={(e) => handleMilestoneChange(milestone.id, 'startDate', e.target.value)}
//                     />
//                   </div>
//                 </div>
//                 <div className="col-md-6">
//                   <div className="form-group mb-3">
//                     <label>End Date</label>
//                     <input 
//                       type="date"
//                       className="form-control"
//                       value={milestone.endDate}
//                       onChange={(e) => handleMilestoneChange(milestone.id, 'endDate', e.target.value)}
//                     />
//                   </div>
//                 </div>
//               </div>
//               <div className="form-group">
//                 <label>Status</label>
//                 <select
//                   className="form-control"
//                   value={milestone.status}
//                   onChange={(e) => handleMilestoneChange(milestone.id, 'status', e.target.value)}
//                 >
//                   <option value="Planned">Planned</option>
//                   <option value="In Progress">In Progress</option>
//                   <option value="Completed">Completed</option>
//                   <option value="Delayed">Delayed</option>
//                 </select>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   };

//   return (
//     <div className="container-fluid">
//       <div className="row mb-4">
//         <div className="col-12">
//           <h4 className="mb-3">Timeline & Milestone Planning</h4>
//           <p>Project ID: {formData.projectId || "Not selected"}</p>
//         </div>
//       </div>
      
//       <div className="row mb-4">
//         <div className="col-12">
//           {formData.milestones.map(renderMilestoneRow)}
//         </div>
//       </div>
      
//       <div className="row mb-4">
//         <div className="col-12">
//           <Button 
//             variant="outline-primary" 
//             onClick={handleAddMilestone}
//             style={{
//               backgroundColor: '#FF6F00',
//               border: 'none',
//               color: 'white',
//               padding: '8px 20px',
//               fontSize: '14px',
//             }}
//           >
//             + Add Milestone
//           </Button>
//         </div>
//       </div>

//       <div className="row mt-4">
//         <div className="col-12 d-flex justify-content-end">
//           <Button 
//             variant="primary" 
//             onClick={handleSubmit}
//             disabled={loading}
//             style={{
//               backgroundColor: '#FF6F00',
//               border: 'none',
//               padding: '10px 30px',
//               fontSize: '16px',
//             }}
//           >
//             {loading ? "Saving..." : "Save Milestones"}
//           </Button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TimelineContainer; //working chatgpt code