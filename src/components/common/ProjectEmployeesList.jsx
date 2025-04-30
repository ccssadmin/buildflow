import React from 'react';
import { Container, Row, Col} from 'react-bootstrap';
import profile_img from "../../assets/images/profile.svg"

const employeeslists = [
  { name: "Ronald Richards", position: "Project Manager", pendingcount: "0", img: profile_img },
  { name: "Gordon Walker", position: "Asst. Project Manager", pendingcount: "2", img: profile_img },
  { name: "Frank Richardson", position: "Site Engineer", pendingcount: "6", img: profile_img },
  { name: "Matt Li", position: "Site Engineer", pendingcount: "8", img: profile_img },
  { name: "Ian Reiter", position: "Quantity Surveyor", pendingcount: "2", img: profile_img },
  { name: "Sigmund Legros", position: "Engineer", pendingcount: "6", img: profile_img },
  { name: "Oscar Rodriguez", position: "Asst. Quantity Surveyor", pendingcount: "2", img: profile_img },
  { name: "Zackary Bauch", position: "Arch. Engineer", pendingcount: "2", img: profile_img },
  { name: "Salvatore Roberts", position: "Project Manager", pendingcount: "5", img: profile_img },
  { name: "Ronald Richards", position: "Project Manager", pendingcount: "0", img: profile_img },
  { name: "Gordon Walker", position: "Asst. Project Manager", pendingcount: "2", img: profile_img },
  { name: "Frank Richardson", position: "Site Engineer", pendingcount: "6", img: profile_img },
  { name: "Matt Li", position: "Site Engineer", pendingcount: "8", img: profile_img },
  { name: "Ian Reiter", position: "Quantity Surveyor", pendingcount: "2", img: profile_img },
  { name: "Sigmund Legros", position: "Engineer", pendingcount: "6", img: profile_img },
  { name: "Oscar Rodriguez", position: "Asst. Quantity Surveyor", pendingcount: "2", img: profile_img },
  { name: "Zackary Bauch", position: "Arch. Engineer", pendingcount: "2", img: profile_img },
  { name: "Salvatore Roberts", position: "Project Manager", pendingcount: "5", img: profile_img },
  { name: "Ronald Richards", position: "Project Manager", pendingcount: "0", img: profile_img },
  { name: "Gordon Walker", position: "Asst. Project Manager", pendingcount: "2", img: profile_img },
  { name: "Frank Richardson", position: "Site Engineer", pendingcount: "6", img: profile_img },
  { name: "Matt Li", position: "Site Engineer", pendingcount: "8", img: profile_img },
  { name: "Ian Reiter", position: "Quantity Surveyor", pendingcount: "2", img: profile_img },
  { name: "Sigmund Legros", position: "Engineer", pendingcount: "6", img: profile_img },
  { name: "Oscar Rodriguez", position: "Asst. Quantity Surveyor", pendingcount: "2", img: profile_img },
  { name: "Zackary Bauch", position: "Arch. Engineer", pendingcount: "2", img: profile_img },
  { name: "Salvatore Roberts", position: "Project Manager", pendingcount: "5", img: profile_img },
  { name: "Ronald Richards", position: "Project Manager", pendingcount: "0", img: profile_img },
  { name: "Gordon Walker", position: "Asst. Project Manager", pendingcount: "2", img: profile_img },
  { name: "Frank Richardson", position: "Site Engineer", pendingcount: "6", img: profile_img },
  { name: "Matt Li", position: "Site Engineer", pendingcount: "8", img: profile_img },
  { name: "Ian Reiter", position: "Quantity Surveyor", pendingcount: "2", img: profile_img },
  { name: "Sigmund Legros", position: "Engineer", pendingcount: "6", img: profile_img },
  { name: "Oscar Rodriguez", position: "Asst. Quantity Surveyor", pendingcount: "2", img: profile_img },
  { name: "Zackary Bauch", position: "Arch. Engineer", pendingcount: "2", img: profile_img },
  { name: "Salvatore Roberts", position: "Project Manager", pendingcount: "5", img: profile_img }
];


const ProjectEmployeesList = ({ employeesList }) => {

  console.log("employeeslists:", employeesList);

  console.log("employees position:", employeesList?.emp_name);


  return (
    <Container className="p-0">
        <div className="headr-projectemployeeslist">
            <Row className="mb-4 align-items-center">
              <Col> 
                  <h2 className="mb-0 title-1">All employees</h2>
              </Col>
            </Row>
        </div>
        <div className="project-employees-list">
          {employeesList.map((employee, index) => (
          <div key={index} className="employee-card d-flex align-items-center">
            <img src={employee.img} className="employee-img" alt="" />
            <div className="">
              <h4 className="title-3 employee-name">
                {employee.emp_name}{employee?.request_count > 0 && <span>{employee.request_count} \
                  Pending</span>}
              </h4>
              <h6 className="employee-name">
                {employee.role}
                </h6>
            </div>
          </div>
          ))}
        </div>
    </Container>
  );
};

export default ProjectEmployeesList;