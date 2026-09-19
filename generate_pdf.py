import os
from reportlab.lib.pagesizes import letter
from reportlab.lib import colors
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, HRFlowable
from reportlab.lib.enums import TA_CENTER, TA_LEFT, TA_JUSTIFY

pdf_path = r"C:\Users\SHAKTHI VELU\.gemini\antigravity\scratch\SHAKTHI_VELU_S_Resume.pdf"
doc = SimpleDocTemplate(
    pdf_path,
    pagesize=letter,
    leftMargin=36,
    rightMargin=36,
    topMargin=30,
    bottomMargin=30
)

styles = getSampleStyleSheet()

# Custom Palette
PRIMARY = colors.HexColor("#1A365D")  # Deep Navy
DARK = colors.HexColor("#1F2937")     # Charcoal body text
MUTED = colors.HexColor("#4B5563")    # Subtitle gray
LINE_COLOR = colors.HexColor("#2B6CB0") # Accent Line

name_style = ParagraphStyle(
    "Name",
    parent=styles["Normal"],
    fontName="Helvetica-Bold",
    fontSize=20,
    leading=23,
    alignment=TA_CENTER,
    textColor=PRIMARY
)

title_style = ParagraphStyle(
    "Title",
    parent=styles["Normal"],
    fontName="Helvetica-Bold",
    fontSize=10,
    leading=13,
    alignment=TA_CENTER,
    textColor=DARK
)

contact_style = ParagraphStyle(
    "Contact",
    parent=styles["Normal"],
    fontName="Helvetica",
    fontSize=8.5,
    leading=11,
    alignment=TA_CENTER,
    textColor=MUTED
)

section_header = ParagraphStyle(
    "SecHeader",
    parent=styles["Normal"],
    fontName="Helvetica-Bold",
    fontSize=10.5,
    leading=13,
    textColor=PRIMARY,
    spaceAfter=2
)

body = ParagraphStyle(
    "Body",
    parent=styles["Normal"],
    fontName="Helvetica",
    fontSize=8.5,
    leading=11.5,
    alignment=TA_JUSTIFY,
    textColor=DARK
)

bullet = ParagraphStyle(
    "Bullet",
    parent=styles["Normal"],
    fontName="Helvetica",
    fontSize=8.2,
    leading=11,
    alignment=TA_JUSTIFY,
    textColor=DARK,
    leftIndent=10,
    firstLineIndent=-10
)

item_title = ParagraphStyle(
    "ItemTitle",
    parent=styles["Normal"],
    fontName="Helvetica-Bold",
    fontSize=9,
    leading=11.5,
    textColor=DARK
)

item_right = ParagraphStyle(
    "ItemRight",
    parent=styles["Normal"],
    fontName="Helvetica-Bold",
    fontSize=8.5,
    leading=11.5,
    alignment=TA_LEFT,
    textColor=MUTED
)

story = []

# Header
story.append(Paragraph("SHAKTHI VELU S", name_style))
story.append(Spacer(1, 2))
story.append(Paragraph("Software Developer | Full-Stack & Python Developer | Data Analyst", title_style))
story.append(Spacer(1, 3))
story.append(Paragraph("Vellore, Tamil Nadu, India | +91 7904766163 | shakthivelu1322@gmail.com | linkedin.com/in/shakthivelus13 | github.com/shakthivelu137", contact_style))
story.append(Spacer(1, 6))

def add_section(title_text):
    story.append(Paragraph(title_text.upper(), section_header))
    story.append(HRFlowable(width="100%", thickness=1, color=LINE_COLOR, spaceBefore=1, spaceAfter=4))

# Professional Summary
add_section("Professional Summary")
summary_text = (
    "Results-driven <b>Bachelor of Computer Applications (BCA)</b> graduate (CGPA 8.0) with practical engineering experience in "
    "<b>Python, FastAPI, React, JavaScript, Machine Learning, and Cloud Deployments</b>. Proven track record of architecting, building, "
    "and deploying end-to-end full-stack applications and cross-platform mobile solutions (Capacitor/Android) with GenAI integrations "
    "(Google Gemini), as well as production ML models achieving 99% accuracy. Immediate joiner targeting entry-level "
    "<b>Software Developer</b>, <b>Full-Stack Developer</b>, or <b>Python/Data Analyst</b> roles."
)
story.append(Paragraph(summary_text, body))
story.append(Spacer(1, 5))

# Education
add_section("Education")
edu_data = [
    [
        Paragraph("<b>Bachelor of Computer Applications (BCA)</b> — SSS College of Arts, Science & Management, Vellore", item_title),
        Paragraph("2023 – 2026<br/><b>CGPA: 8.0</b>", item_right)
    ],
    [
        Paragraph("<b>Higher Secondary Certificate (HSC)</b> — Sri Ramakrishna BHEL Higher Secondary School, Vellore", item_title),
        Paragraph("2023", item_right)
    ]
]
t_edu = Table(edu_data, colWidths=[430, 110])
t_edu.setStyle(TableStyle([
    ('VALIGN', (0,0), (-1,-1), 'TOP'),
    ('LEFTPADDING', (0,0), (-1,-1), 0),
    ('RIGHTPADDING', (0,0), (-1,-1), 0),
    ('BOTTOMPADDING', (0,0), (-1,-1), 3),
    ('TOPPADDING', (0,0), (-1,-1), 0),
]))
story.append(t_edu)
story.append(Spacer(1, 3))

# Technical Skills
add_section("Technical Skills")
skills_data = [
    [Paragraph("<b>Languages:</b> Python, JavaScript (ES6+), Java, SQL, HTML5, CSS3", body),
     Paragraph("<b>ML & Data:</b> Scikit-Learn, Pandas, NumPy, Matplotlib, Power BI, Excel", body)],
    [Paragraph("<b>Frameworks & Web:</b> FastAPI, React.js, Vite, RESTful APIs, Uvicorn, Streamlit", body),
     Paragraph("<b>Databases:</b> SQLite / aiosqlite, SQLAlchemy, MySQL, Oracle Database", body)],
    [Paragraph("<b>Mobile & Tools:</b> Capacitor (Android), Android Studio, Gradle, Git, GitHub", body),
     Paragraph("<b>Cloud & Auth:</b> Render, Vercel, Google Gemini AI, JWT, Bcrypt, CORS", body)]
]
t_skills = Table(skills_data, colWidths=[265, 275])
t_skills.setStyle(TableStyle([
    ('VALIGN', (0,0), (-1,-1), 'TOP'),
    ('LEFTPADDING', (0,0), (-1,-1), 0),
    ('RIGHTPADDING', (0,0), (-1,-1), 10),
    ('BOTTOMPADDING', (0,0), (-1,-1), 3),
    ('TOPPADDING', (0,0), (-1,-1), 0),
]))
story.append(t_skills)
story.append(Spacer(1, 4))

# Featured Projects
add_section("Featured Projects")

# Project 1: Nivaran
p1_head = [
    [
        Paragraph("<b>Nivaran — AI Health Symptom Analyzer & Cross-Platform Mobile App</b>", item_title),
        Paragraph("Apr 2026 – May 2026", item_right)
    ]
]
t_p1 = Table(p1_head, colWidths=[430, 110])
t_p1.setStyle(TableStyle([('LEFTPADDING', (0,0), (-1,-1), 0), ('RIGHTPADDING', (0,0), (-1,-1), 0), ('BOTTOMPADDING', (0,0), (-1,-1), 1), ('TOPPADDING', (0,0), (-1,-1), 0)]))
story.append(t_p1)
story.append(Paragraph("<i>Live Web: nivaran-3eyn.vercel.app | API: nivaran-api-fd0s.onrender.com | GitHub: github.com/shakthivelu137/nivaran</i>", contact_style))
story.append(Spacer(1, 1))
story.append(Paragraph("• Architected an end-to-end healthcare assistant providing immediate symptom triage, OTC medicine guidance, home remedies, and emergency warnings.", bullet))
story.append(Paragraph("• Built a high-performance <b>FastAPI async backend</b> with dual intelligence: local diagnostic dataset (40+ symptoms, 10+ condition pathways) integrated with <b>Google Gemini 2.0 Flash AI</b> for structured medical summaries.", bullet))
story.append(Paragraph("• Implemented secure authentication with <b>Bcrypt salt hashing</b>, stateless <b>JWT tokens</b>, and SQLite history persistence.", bullet))
story.append(Paragraph("• Engineered a responsive <b>React + Vite</b> SPA and packaged into a native <b>Android APK</b> using <b>Capacitor</b> and Android Studio.", bullet))
story.append(Paragraph("• Deployed decoupled cloud architecture on <b>Render</b> (Python backend) and <b>Vercel</b> (React frontend) with production CORS and environment configurations.", bullet))
story.append(Spacer(1, 4))

# Project 2: Network Attack Classification
p2_head = [
    [
        Paragraph("<b>Network Attack Classification System — ML Intrusion Detection</b>", item_title),
        Paragraph("Oct 2025 – Nov 2025", item_right)
    ]
]
t_p2 = Table(p2_head, colWidths=[430, 110])
t_p2.setStyle(TableStyle([('LEFTPADDING', (0,0), (-1,-1), 0), ('RIGHTPADDING', (0,0), (-1,-1), 0), ('BOTTOMPADDING', (0,0), (-1,-1), 1), ('TOPPADDING', (0,0), (-1,-1), 0)]))
story.append(t_p2)
story.append(Paragraph("<i>Live Demo: Streamlit App | GitHub: github.com/shakthivelu137/network-attack-classification</i>", contact_style))
story.append(Spacer(1, 1))
story.append(Paragraph("• Built an ML intrusion detection system classifying network traffic into 5 categories using the NSL-KDD benchmark dataset (125,000+ records).", bullet))
story.append(Paragraph("• Trained and benchmarked Decision Tree, Random Forest, and SVM classifiers; achieved <b>99% validation accuracy</b> with Random Forest.", bullet))
story.append(Paragraph("• Engineered an interactive <b>Streamlit dashboard</b> for real-time traffic classification, model comparison, and feature-importance analysis.", bullet))
story.append(Spacer(1, 4))

# Project 3: Courier Management System
p3_head = [
    [
        Paragraph("<b>Courier Management System — Salesforce CRM</b>", item_title),
        Paragraph("Dec 2025 – Mar 2026", item_right)
    ]
]
t_p3 = Table(p3_head, colWidths=[430, 110])
t_p3.setStyle(TableStyle([('LEFTPADDING', (0,0), (-1,-1), 0), ('RIGHTPADDING', (0,0), (-1,-1), 0), ('BOTTOMPADDING', (0,0), (-1,-1), 1), ('TOPPADDING', (0,0), (-1,-1), 0)]))
story.append(t_p3)
story.append(Paragraph("<i>GitHub: github.com/SHAKTHIVELU13/Courier-Management-System</i>", contact_style))
story.append(Spacer(1, 1))
story.append(Paragraph("• Designed a Salesforce CRM application to manage courier booking, shipment tracking, and delivery operations end-to-end.", bullet))
story.append(Paragraph("• Configured custom objects, validation rules, page layouts, and real-time Reports & Dashboards to improve workflow efficiency.", bullet))
story.append(Spacer(1, 5))

# Internship Experience
add_section("Internship Experience")
intern_head = [
    [
        Paragraph("<b>Java Web Development Intern</b> — Redback IT Solutions, Vellore", item_title),
        Paragraph("May 2025", item_right)
    ]
]
t_intern = Table(intern_head, colWidths=[430, 110])
t_intern.setStyle(TableStyle([('LEFTPADDING', (0,0), (-1,-1), 0), ('RIGHTPADDING', (0,0), (-1,-1), 0), ('BOTTOMPADDING', (0,0), (-1,-1), 1), ('TOPPADDING', (0,0), (-1,-1), 0)]))
story.append(t_intern)
story.append(Paragraph("• Developed web application components using <b>Java, HTML, CSS, JDBC, Servlets, JSP</b>, and REST APIs integrated with MySQL schemas.", bullet))
story.append(Paragraph("• Collaborated using Git and GitHub for version control and branch workflows in a team environment.", bullet))
story.append(Spacer(1, 5))

# Certifications
add_section("Certifications")
story.append(Paragraph("• <b>Salesforce Administrator with AI Agentforce</b> — Salesforce SmartBridge (Jul 2026)", bullet))
story.append(Paragraph("• <b>Oracle Database Foundation</b> — ADROIT (Nov 2025)", bullet))
story.append(Paragraph("• <b>Advanced Data Science with Python</b> — Infosys Springboard (Oct 2025)", bullet))

doc.build(story)
print("PDF successfully built at:", pdf_path)
