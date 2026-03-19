import React, { useState } from "react";

function App() {
  const [form, setForm] = useState({
    Age: "",
    Gender: "",
    Education_Level: "",
    Years_of_Experience: "",
    Job_Role: "",
    Department: "",
    Location: "",
    Performance_Rating: "",
    Skills: "",
    Company_Tier: "",
    Certifications: "",
    Past_Companies: ""
  });

  const [salary, setSalary] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const predict = async (e) => {
    e.preventDefault();

    const res = await fetch("http://127.0.0.1:8000/api/predict", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        ...form,
        Age: Number(form.Age),
        Years_of_Experience: Number(form.Years_of_Experience),
        Performance_Rating: Number(form.Performance_Rating),
        Past_Companies: Number(form.Past_Companies)
      })
    });

    const data = await res.json();
    setSalary(data.predicted_salary);
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">💰 Salary Predictor</h1>

      <form onSubmit={predict} className="card p-4 shadow">

        {/* AGE */}
        <input className="form-control mb-2" name="Age" placeholder="Age" onChange={handleChange} />

        {/* GENDER */}
        <select className="form-control mb-2" name="Gender" onChange={handleChange}>
          <option>Select Gender</option>
          <option>Male</option>
          <option>Female</option>
        </select>

        {/* EDUCATION */}
        <select className="form-control mb-2" name="Education_Level" onChange={handleChange}>
          <option>Education Level</option>
          <option>Bachelor</option>
          <option>Master</option>
          <option>PhD</option>
        </select>

        {/* EXPERIENCE */}
        <input className="form-control mb-2" name="Years_of_Experience" placeholder="Years of Experience" onChange={handleChange} />

        {/* JOB ROLE */}
        <select className="form-control mb-2" name="Job_Role" onChange={handleChange}>
          <option>Job Role</option>
          <option>Software Engineer</option>
          <option>Data Scientist</option>
          <option>Manager</option>
        </select>

        {/* DEPARTMENT */}
        <select className="form-control mb-2" name="Department" onChange={handleChange}>
          <option>Department</option>
          <option>IT</option>
          <option>HR</option>
          <option>Finance</option>
        </select>

        {/* LOCATION */}
        <select className="form-control mb-2" name="Location" onChange={handleChange}>
          <option>Location</option>
          <option>Hyderabad</option>
          <option>Bangalore</option>
          <option>Chennai</option>
        </select>

        {/* PERFORMANCE */}
        <select className="form-control mb-2" name="Performance_Rating" onChange={handleChange}>
          <option>Performance Rating</option>
          <option>1</option>
          <option>2</option>
          <option>3</option>
          <option>4</option>
          <option>5</option>
        </select>

        {/* SKILLS */}
        <select className="form-control mb-2" name="Skills" onChange={handleChange}>
          <option>Skills</option>
          <option>Python</option>
          <option>Java</option>
          <option>SQL</option>
        </select>

        {/* COMPANY */}
        <select className="form-control mb-2" name="Company_Tier" onChange={handleChange}>
          <option>Company Tier</option>
          <option>Startup</option>
          <option>Mid-Size</option>
          <option>Enterprise</option>
        </select>

        {/* CERTIFICATIONS */}
        <select className="form-control mb-2" name="Certifications" onChange={handleChange}>
          <option>Certifications</option>
          <option>None</option>
          <option>Basic</option>
          <option>Advanced</option>
        </select>

        {/* PAST COMPANIES */}
        <input className="form-control mb-3" name="Past_Companies" placeholder="Past Companies" onChange={handleChange} />

        <button className="btn btn-primary w-100">Predict Salary</button>
      </form>

      {salary && (
        <div className="alert alert-success mt-4 text-center">
          💸 Predicted Salary: ₹{(salary / 100000).toFixed(2)} LPA
        </div>
      )}
    </div>
  );
}

export default App;