"use strict";
const menuButton = document.querySelector(".menu-toggle");
const navigation = document.querySelector("#main-nav");
menuButton.addEventListener("click", () => {
  const expanded = menuButton.getAttribute("aria-expanded") !== "true";
  menuButton.setAttribute("aria-expanded", String(expanded));
  menuButton.setAttribute("aria-label", expanded ? "Close navigation" : "Open navigation");
  navigation.classList.toggle("open", expanded);
});
navigation.addEventListener("click", (event) => {
  if (event.target.closest("a")) {
    navigation.classList.remove("open");
    menuButton.setAttribute("aria-expanded", "false");
    menuButton.setAttribute("aria-label", "Open navigation");
  }
});
document.querySelector("#year").textContent = new Date().getFullYear();

const focusContent = {
  leadership: {label:"STRATEGY WITH OPERATIONAL DEPTH",heading:"Lead through scale and change.",description:"Group and country HR leadership spanning workforce planning, organisation design, talent pipelines and employee relations.",evidence:["Led HR & Administration for 3,200 employees across nine international locations at Triton Group.","Implemented organisation restructuring, grades and levels at CWAY.","Supported new business establishment in Cameroon and Ivory Coast."],link:"Explore leadership experience",target:"#experience"},
  operations: {label:"PEOPLE OPERATIONS THAT SUPPORT THE BUSINESS",heading:"Build dependable HR foundations.",description:"Hands-on experience establishing HR functions, standardising people processes and managing employee relations in operational businesses.",evidence:["Managed HR department setup for four steel units at African Steel Mill.","Led collective bargaining negotiations and MOU signoffs at CWAY and Golden Veroleum Liberia.","Managed talent acquisition, compensation, training, administration and grievance resolution."],link:"Explore operations experience",target:"#impact"},
  systems: {label:"TECHNOLOGY WITH A PEOPLE PURPOSE",heading:"Connect people data and processes.",description:"Experience implementing practical HR technology across personnel administration, attendance, reporting and payroll.",evidence:["Reimplemented SAP HRMS across Triton Group: personnel administration, time management and payroll accounting.","Introduced centralised biometrics linked to HRMS and payroll at CWAY.","Implemented biometrics and an electronic HR database at Golden Veroleum Liberia."],link:"Explore HR systems projects",target:"#impact"}
};
const tabs = [...document.querySelectorAll(".focus-tab")];
function selectFocus(tab) {
  const content = focusContent[tab.dataset.focus];
  tabs.forEach(item => { const selected = item === tab; item.classList.toggle("active", selected); item.setAttribute("aria-selected", String(selected)); item.tabIndex = selected ? 0 : -1; });
  document.querySelector("#fit-panel").setAttribute("aria-labelledby", tab.id);
  document.querySelector(".fit-label").textContent = content.label;
  document.querySelector("#fit-heading").textContent = content.heading;
  document.querySelector("#fit-description").textContent = content.description;
  document.querySelector("#fit-evidence").replaceChildren(...content.evidence.map(text => { const li = document.createElement("li"); li.textContent = text; return li; }));
  const link = document.querySelector("#fit-link");
  link.replaceChildren(document.createTextNode(content.link + " "));
  const mark = document.createElement("span"); mark.setAttribute("aria-hidden", "true"); mark.textContent = "+"; link.append(mark); link.href = content.target;
}
tabs.forEach((tab,index) => {
  tab.addEventListener("click", () => selectFocus(tab));
  tab.addEventListener("keydown", event => {
    let next = index;
    if (event.key === "ArrowRight") next = (index + 1) % tabs.length;
    else if (event.key === "ArrowLeft") next = (index + tabs.length - 1) % tabs.length;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = tabs.length - 1;
    else return;
    event.preventDefault(); selectFocus(tabs[next]); tabs[next].focus();
  });
});
const filters = [...document.querySelectorAll(".filter")];
const projects = [...document.querySelectorAll(".project-card")];
filters.forEach(button => button.addEventListener("click", () => {
  filters.forEach(item => {item.classList.toggle("active", item === button); item.setAttribute("aria-pressed", String(item === button));});
  let visible = 0;
  projects.forEach(card => {card.hidden = button.dataset.filter !== "all" && card.dataset.category !== button.dataset.filter; if (!card.hidden) visible++;});
  document.querySelector("#filter-status").textContent = `Showing ${visible} impact ${visible === 1 ? "story" : "stories"}.`;
}));
const stories = {
  sap: {company:"TRITON GROUP · 2015–2019",title:"A connected HR systems foundation.",context:"Triton Group operated across nine international locations, with HR and administration coordinated for 3,200 employees.",actions:["Reimplemented SAP HRMS across the group.","Covered Personnel Administration, Time Management and Payroll Accounting modules.","Worked within a broader remit of workforce planning, compensation and performance management."],result:"A group-wide SAP HRMS reimplementation covering three core people operations areas."},
  biometrics: {company:"CWAY FOOD & BEVERAGES · 2023–2024",title:"From attendance to payroll.",context:"HR leadership for a food and beverages business in Nigeria, with responsibility for local and international staff and organisation-wide people systems.",actions:["Introduced a centralised biometrics system.","Linked the system to HRMS and payroll software.","Enabled attendance reporting at hourly, daily, weekly and monthly intervals."],result:"An integrated attendance, HRMS and payroll setup with reporting at multiple time intervals."},
  performance: {company:"TRITON GROUP · 2015–2019",title:"Performance across nine locations.",context:"A diversified group required structured performance and rewards practices across multiple countries and organisational levels.",actions:["Devised a comprehensive group performance management system.","Introduced a Balanced Scorecard approach for business heads and their direct reports.","Established KRA-based appraisal formats for mid and junior-level employees.","Developed salary and benefits structures aligned with country-specific cost of living benchmarks."],result:"Defined performance frameworks for different leadership levels and country-sensitive salary and benefits structures."},
  relations: {company:"CWAY & GOLDEN VEROLEUM LIBERIA",title:"Negotiation. Agreement. Continuity.",context:"Leadership roles in operational businesses where employee relations, union engagement and grievance resolution were part of the HR remit.",actions:["Led Collective Bargaining Agreement negotiations with union representatives.","At CWAY, engaged senior and junior union associations.","Completed MOU signoffs on new collective bargaining agreements.","Managed employee relations and grievance processes alongside wider HR responsibilities."],result:"Negotiated collective bargaining agreements and signed MOUs, as documented at both CWAY and Golden Veroleum Liberia."},
  expansion: {company:"TRITON GROUP · 2015–2019",title:"New markets. Local foundations.",context:"Triton Group was expanding its international presence while coordinating HR and administration across West and Central Africa.",actions:["Managed and supported new business establishment in Cameroon and Ivory Coast.","Coordinated required government paperwork.","Obtained licences and certificates from relevant government authorities."],result:"New business setup supported in two international locations: Cameroon and Ivory Coast."},
  steel: {company:"AFRICAN STEEL MILL · 2010–2015",title:"HR foundations for four steel units.",context:"HR management in a steel manufacturing business within African Industries Group, with a remit spanning talent, systems, industrial relations and administration.",actions:["Managed HR department setup for four steel units.","Designed and implemented a competency-based selection process.","Implemented biometric attendance to support employee payroll processes.","Led collective bargaining negotiations and instituted monthly labour-management forums."],result:"HR departments established for four steel units, supported by structured selection, attendance and employee relations practices."}
};
const dialog = document.querySelector("#story-dialog");
document.querySelectorAll("[data-story]").forEach(button => button.addEventListener("click", () => {
  const story = stories[button.dataset.story];
  document.querySelector("#story-company").textContent = story.company;
  document.querySelector("#story-title").textContent = story.title;
  document.querySelector("#story-context").textContent = story.context;
  document.querySelector("#story-result").textContent = story.result;
  document.querySelector("#story-actions").replaceChildren(...story.actions.map(text => {const li = document.createElement("li"); li.textContent = text; return li;}));
  dialog.showModal(); document.body.classList.add("dialog-open");
}));
document.querySelector("#close-dialog").addEventListener("click", () => dialog.close());
dialog.addEventListener("click", event => {if (event.target === dialog) {const r=dialog.getBoundingClientRect(); if(event.clientX<r.left || event.clientX>r.right || event.clientY<r.top || event.clientY>r.bottom) dialog.close();}});
dialog.addEventListener("close", () => document.body.classList.remove("dialog-open"));
const countries = {
  Nigeria:"HR leadership at CWAY, Triton Group and African Steel Mill in Lagos. Experience spanning food & beverages, nutrition businesses and steel manufacturing.",
  Liberia:"Head of HR & Administration at Golden Veroleum Liberia. Experience includes HR systems, collective bargaining, national talent development and community infrastructure projects.",
  Cameroon:"Part of the Triton Group HR & Administration remit. Supported new business establishment, including government paperwork, licences and certificates.",
  "Ivory Coast":"Part of the Triton Group HR & Administration remit. Supported new business establishment, including government paperwork, licences and certificates.",
  Ghana:"Included in the nine-location Triton Group HR & Administration remit, covering workforce planning, performance management and compensation structures.",
  Benin:"Included in the nine-location Triton Group HR & Administration remit, covering workforce planning, performance management and compensation structures.",
  Togo:"Included in the nine-location Triton Group HR & Administration remit, covering workforce planning, performance management and compensation structures.",
  "DR Congo":"Included in the nine-location Triton Group HR & Administration remit, covering workforce planning, performance management and compensation structures.",
  "Republic of Congo":"Included in the nine-location Triton Group HR & Administration remit, covering workforce planning, performance management and compensation structures."
};
document.querySelectorAll(".country").forEach(button => button.addEventListener("click", () => {
  document.querySelectorAll(".country").forEach(item => {item.classList.toggle("active", item===button); item.setAttribute("aria-pressed",String(item===button));});
  document.querySelector("#country-title").textContent=button.dataset.country;
  document.querySelector("#country-description").textContent=countries[button.dataset.country];
}));
let copyTimer;
document.querySelector("#copy-email").addEventListener("click", async () => {
  const status=document.querySelector("#copy-status");
  try {await navigator.clipboard.writeText("arunendravphr@gmail.com"); status.textContent="Email address copied.";}
  catch {status.textContent="Select and copy: arunendravphr@gmail.com";}
  clearTimeout(copyTimer); copyTimer=setTimeout(()=>{status.textContent="";},5000);
});
if ("IntersectionObserver" in window) {
  const observer=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(entry.isIntersecting){navigation.querySelectorAll("a").forEach(link=>link.classList.toggle("active",link.hash==="#"+entry.target.id));}});},{rootMargin:"-15% 0px -55% 0px"});
  document.querySelectorAll("main section[id]").forEach(section=>observer.observe(section));
}
