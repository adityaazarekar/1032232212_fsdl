import { useState } from "react";


const init = {
  name: "", email: "", phone: "",
  summary: "", objective: "",
  education: "", skills: "", achievements: "",
  experience: "", internships: ""
};

export default function ResumeBuilder() {
  const [data, setData] = useState(init);
  const [preview, setPreview] = useState(false);

  const f = (label, key, multiline = false) => (
    <div style={{ marginBottom: 12 }}>
      <label style={{ fontWeight: "bold" }}>{label}</label>
      {multiline
        ? <textarea rows={3} value={data[key]} onChange={e => setData({ ...data, [key]: e.target.value })}
            style={{ display: "block", width: "100%", marginTop: 4, padding: 8, borderRadius: 4, border: "1px solid #ccc" }} />
        : <input value={data[key]} onChange={e => setData({ ...data, [key]: e.target.value })}
            style={{ display: "block", width: "100%", marginTop: 4, padding: 8, borderRadius: 4, border: "1px solid #ccc" }} />}
    </div>
  );

  return (
    <div style={{ maxWidth: 700, margin: "30px auto", fontFamily: "sans-serif", padding: 20 }}>
      <h2>Resume Builder</h2>
      {!preview ? (
        <>
          <h4>Personal Info</h4>
          {f("Full Name", "name")} {f("Email", "email")} {f("Phone", "phone")}
          <h4>Professional Summary</h4>{f("Summary", "summary", true)}
          <h4>Career Objective</h4>{f("Objective", "objective", true)}
          <h4>Education</h4>{f("Education", "education", true)}
          <h4>Skills (Academic & Non-Academic)</h4>{f("Skills", "skills", true)}
          <h4>Experience</h4>{f("Experience", "experience", true)}
          <h4>Internships</h4>{f("Internships", "internships", true)}
          <h4>Achievements</h4>{f("Achievements", "achievements", true)}
          <button onClick={() => setPreview(true)}
            style={{ background: "#673ab7", color: "#fff", padding: "10px 28px", border: "none", borderRadius: 6, cursor: "pointer", fontSize: 16 }}>
            Generate Resume
          </button>
        </>
      ) : (
        <div style={{ border: "1px solid #ccc", padding: 24, borderRadius: 8 }}>
          <h2 style={{ margin: 0 }}>{data.name}</h2>
          <p>{data.email} | {data.phone}</p>
          <hr />
          {[["Professional Summary", data.summary], ["Career Objective", data.objective],
            ["Education", data.education], ["Skills", data.skills],
            ["Experience", data.experience], ["Internships", data.internships],
            ["Achievements", data.achievements]].map(([title, val]) => val && (
            <div key={title}>
              <h3 style={{ color: "#673ab7" }}>{title}</h3>
              <p style={{ whiteSpace: "pre-wrap" }}>{val}</p>
            </div>
          ))}
          <button onClick={() => setPreview(false)}
            style={{ background: "#607d8b", color: "#fff", padding: "8px 20px", border: "none", borderRadius: 6, cursor: "pointer" }}>
            ← Edit
          </button>
        </div>
      )}
    </div>
  );
}