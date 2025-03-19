"use client"

import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Download, Edit, Trash2, Plus, AlertCircle } from 'lucide-react';
import { jsPDF } from 'jspdf';

const ResumeProfile = () => {
  const [name, setName] = useState('Nidhi Patel');
  const [email, setEmail] = useState('nidhipatel@gmail.com');
  const [phone, setPhone] = useState('+91 9082729218');
  const [location, setLocation] = useState('Mumbai');
  const [careerObjective, setCareerObjective] = useState('');
  const [education, setEducation] = useState([
    { degree: 'B.Tech', institution: 'Sardar Patel Institute of Technology, Mumbai', year: '2023 - 2027', cgpa: '7.74/10' },
  ]);
  const [skills, setSkills] = useState(['JavaScript', 'HTML', 'ReactJS', 'CSS']);
  const [workExperience, setWorkExperience] = useState([]);
  const [internships, setInternships] = useState([]);
  const [extraCurricular, setExtraCurricular] = useState([]);
  const [trainings, setTrainings] = useState([]);
  const [projects, setProjects] = useState([]);

  const resumeRef = useRef(null);

  const handleDownload = () => {
    const doc = new jsPDF();
    doc.text("Resume", 10, 10);
    doc.text(`Name: ${name}`, 10, 20);
    doc.text(`Email: ${email}`, 10, 30);
    doc.text(`Phone: ${phone}`, 10, 40);
    doc.text(`Location: ${location}`, 10, 50);
    doc.text(`Career Objective: ${careerObjective}`, 10, 60);
    doc.text("Education:", 10, 80);
    education.forEach((edu, index) => {
      doc.text(`${edu.degree} - ${edu.institution} (${edu.year}) - CGPA: ${edu.cgpa}`, 10, 90 + index * 10);
    });
    doc.text("Skills:", 10, 100 + education.length * 10);
    skills.forEach((skill, index) => {
      doc.text(`${skill}`, 10, 110 + index * 10);
    });

    // Add Work Experience
    doc.text("Work Experience:", 10, 120 + skills.length * 10);
    workExperience.forEach((job, index) => {
      doc.text(`${job.role} at ${job.company} (${job.year})`, 10, 130 + index * 10);
    });

    // Add Internships
    doc.text("Internships:", 10, 140 + workExperience.length * 10);
    internships.forEach((intern, index) => {
      doc.text(`${intern.role} at ${intern.company} (${intern.year})`, 10, 150 + index * 10);
    });

    // Add Extra Curricular
    doc.text("Extra Curricular Activities:", 10, 160 + internships.length * 10);
    extraCurricular.forEach((activity, index) => {
      doc.text(activity, 10, 170 + index * 10);
    });

    // Add Trainings/Courses
    doc.text("Trainings / Courses:", 10, 180 + extraCurricular.length * 10);
    trainings.forEach((course, index) => {
      doc.text(course, 10, 190 + index * 10);
    });

    // Add Projects
    doc.text("Academics / Personal Projects:", 10, 200 + trainings.length * 10);
    projects.forEach((project, index) => {
      doc.text(project, 10, 210 + index * 10);
    });

    doc.save("resume.pdf");
  };

  const handleAddEducation = () => {
    setEducation([...education, { degree: '', institution: '', year: '', cgpa: '' }]);
  };

  const handleEditEducation = (index, field, value) => {
    const updatedEducation = [...education];
    updatedEducation[index][field] = value;
    setEducation(updatedEducation);
  };

  const handleDeleteEducation = (index) => {
    const updatedEducation = education.filter((_, i) => i !== index);
    setEducation(updatedEducation);
  };

  const handleAddSkill = () => {
    setSkills([...skills, '']);
  };

  const handleDeleteSkill = (index) => {
    const updatedSkills = skills.filter((_, i) => i !== index);
    setSkills(updatedSkills);
  };

  // Work Experience handling
  const handleAddWorkExperience = () => {
    setWorkExperience([...workExperience, { role: '', company: '', year: '' }]);
  };

  const handleEditWorkExperience = (index, field, value) => {
    const updatedWorkExperience = [...workExperience];
    updatedWorkExperience[index][field] = value;
    setWorkExperience(updatedWorkExperience);
  };

  const handleDeleteWorkExperience = (index) => {
    const updatedWorkExperience = workExperience.filter((_, i) => i !== index);
    setWorkExperience(updatedWorkExperience);
  };

  // Internships handling
  const handleAddInternship = () => {
    setInternships([...internships, { role: '', company: '', year: '' }]);
  };

  const handleEditInternship = (index, field, value) => {
    const updatedInternships = [...internships];
    updatedInternships[index][field] = value;
    setInternships(updatedInternships);
  };

  const handleDeleteInternship = (index) => {
    const updatedInternships = internships.filter((_, i) => i !== index);
    setInternships(updatedInternships);
  };

  // Extra Curricular Activities handling
  const handleAddExtraCurricular = () => {
    setExtraCurricular([...extraCurricular, '']);
  };

  const handleDeleteExtraCurricular = (index) => {
    const updatedExtraCurricular = extraCurricular.filter((_, i) => i !== index);
    setExtraCurricular(updatedExtraCurricular);
  };

  // Trainings/Courses handling
  const handleAddTraining = () => {
    setTrainings([...trainings, '']);
  };

  const handleDeleteTraining = (index) => {
    const updatedTrainings = trainings.filter((_, i) => i !== index);
    setTrainings(updatedTrainings);
  };

  // Projects handling
  const handleAddProject = () => {
    setProjects([...projects, '']);
  };

  const handleDeleteProject = (index) => {
    const updatedProjects = projects.filter((_, i) => i !== index);
    setProjects(updatedProjects);
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      <Card className="border rounded-md">
        <CardContent className="p-0">
          {/* Alert Banner */}
          <div className="bg-yellow-50 border border-yellow-200 p-3 flex items-center gap-2">
            <AlertCircle size={16} className="text-yellow-600" />
            <p className="text-sm text-yellow-800">This is the resume employers will see when you apply. Please make sure it is up to date.</p>
          </div>

          {/* Resume Content */}
          <div className="p-6" ref={resumeRef}>
            <div className="flex justify-between items-start mb-8">
              <div>
                <input
                  type="text"
                  className="text-2xl font-semibold border-none focus:ring-0"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <input
                  type="email"
                  className="text-gray-600"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <input
                  type="tel"
                  className="text-gray-600"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
                <input
                  type="text"
                  className="text-gray-600"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
              </div>
              <Button variant="outline" className="flex items-center gap-2" onClick={handleDownload}>
                <Download size={16} />
                Download
              </Button>
            </div>

            {/* Career Objective */}
            <div className="border-t pt-4 mb-6">
              <div className="flex justify-between items-center mb-2">
                <h2 className="text-sm font-semibold text-gray-500">CAREER OBJECTIVE</h2>
                <input
                  type="text"
                  className="w-full border p-2"
                  value={careerObjective}
                  onChange={(e) => setCareerObjective(e.target.value)}
                />
              </div>
            </div>

            {/* Education */}
            <div className="border-t pt-4 mb-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-sm font-semibold text-gray-500">EDUCATION</h2>
                <Button variant="ghost" size="sm" className="h-8 px-2 text-blue-500" onClick={handleAddEducation}>
                  <Plus size={16} className="mr-1" /> Add education
                </Button>
              </div>

              {education.map((edu, index) => (
                <div key={index} className="mb-4 border rounded-md p-4">
                  <div className="flex justify-between">
                    <div>
                      <input
                        type="text"
                        value={edu.degree}
                        onChange={(e) => handleEditEducation(index, 'degree', e.target.value)}
                        placeholder="Degree"
                      />
                      <input
                        type="text"
                        value={edu.institution}
                        onChange={(e) => handleEditEducation(index, 'institution', e.target.value)}
                        placeholder="Institution"
                      />
                      <input
                        type="text"
                        value={edu.year}
                        onChange={(e) => handleEditEducation(index, 'year', e.target.value)}
                        placeholder="Year"
                      />
                      <input
                        type="text"
                        value={edu.cgpa}
                        onChange={(e) => handleEditEducation(index, 'cgpa', e.target.value)}
                        placeholder="CGPA"
                      />
                    </div>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleDeleteEducation(index)}>
                        <Trash2 size={16} />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Work Experience */}
            <div className="border-t pt-4 mb-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-sm font-semibold text-gray-500">WORK EXPERIENCE</h2>
                <Button variant="ghost" size="sm" className="h-8 px-2 text-blue-500" onClick={handleAddWorkExperience}>
                  <Plus size={16} className="mr-1" /> Add work experience
                </Button>
              </div>

              {workExperience.map((job, index) => (
                <div key={index} className="mb-4 border rounded-md p-4">
                  <div className="flex justify-between">
                    <div>
                      <input
                        type="text"
                        value={job.role}
                        onChange={(e) => handleEditWorkExperience(index, 'role', e.target.value)}
                        placeholder="Role"
                      />
                      <input
                        type="text"
                        value={job.company}
                        onChange={(e) => handleEditWorkExperience(index, 'company', e.target.value)}
                        placeholder="Company"
                      />
                      <input
                        type="text"
                        value={job.year}
                        onChange={(e) => handleEditWorkExperience(index, 'year', e.target.value)}
                        placeholder="Year"
                      />
                    </div>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleDeleteWorkExperience(index)}>
                        <Trash2 size={16} />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Continue adding similar sections for Internships, Extra Curricular Activities, Trainings, and Projects here */}
            
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ResumeProfile;
