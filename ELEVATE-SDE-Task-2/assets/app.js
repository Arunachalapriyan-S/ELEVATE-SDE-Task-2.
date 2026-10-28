/* CredVault – shared frontend logic. Dummy data lives in localStorage so pages share state.
   Task 3 will replace the CV.* functions with real API calls. */
(function () {
  const STATES = ["Andhra Pradesh","Arunachal Pradesh","Assam","Bihar","Chhattisgarh","Goa","Gujarat","Haryana","Himachal Pradesh","Jharkhand","Karnataka","Kerala","Madhya Pradesh","Maharashtra","Manipur","Meghalaya","Mizoram","Nagaland","Odisha","Punjab","Rajasthan","Sikkim","Tamil Nadu","Telangana","Tripura","Uttar Pradesh","Uttarakhand","West Bengal","Andaman and Nicobar Islands","Chandigarh","Dadra and Nagar Haveli and Daman and Diu","Delhi","Jammu and Kashmir","Ladakh","Lakshadweep","Puducherry"];

  const SEED_APPS = [
    {id:"APP-0001",name:"Meera Krishnan",phone:"9876543210",gender:"Female",city:"Chennai",state:"Tamil Nadu",status:"Approved",date:"2026-10-02",certId:"CERT-1001"},
    {id:"APP-0002",name:"Rahul Verma",phone:"9123456780",gender:"Male",city:"Lucknow",state:"Uttar Pradesh",status:"Pending",date:"2026-10-18"},
    {id:"APP-0003",name:"Ananya Rao",phone:"9988776655",gender:"Female",city:"Bengaluru",state:"Karnataka",status:"Pending",date:"2026-10-21"},
    {id:"APP-0004",name:"Imran Sheikh",phone:"9012345678",gender:"Male",city:"Hyderabad",state:"Telangana",status:"Rejected",date:"2026-10-05"},
    {id:"APP-0005",name:"Sneha Patil",phone:"9876501234",gender:"Female",city:"Pune",state:"Maharashtra",status:"Approved",date:"2026-10-09",certId:"CERT-1002"},
    {id:"APP-0006",name:"Karthik Raja",phone:"9445566778",gender:"Male",city:"Tiruppur",state:"Tamil Nadu",status:"Pending",date:"2026-10-25"},
    {id:"APP-0007",name:"Farhan Ali",phone:"9700011223",gender:"Male",city:"Jaipur",state:"Rajasthan",status:"Approved",date:"2026-09-28",certId:"CERT-1003"}
  ];
  const SEED_CERTS = [
    {id:"CERT-1001",appId:"APP-0001",name:"Meera Krishnan",phone:"9876543210",city:"Chennai",state:"Tamil Nadu",issuedOn:"2026-10-04",status:"Valid"},
    {id:"CERT-1002",appId:"APP-0005",name:"Sneha Patil",phone:"9876501234",city:"Pune",state:"Maharashtra",issuedOn:"2026-10-11",status:"Valid"},
    {id:"CERT-1003",appId:"APP-0007",name:"Farhan Ali",phone:"9700011223",city:"Jaipur",state:"Rajasthan",issuedOn:"2026-09-30",status:"Revoked"}
  ];

  const K = {apps:"cv_apps", certs:"cv_certs", admin:"cv_admin"};
  function read(key, seed) {
    try { const v = JSON.parse(localStorage.getItem(key)); if (Array.isArray(v)) return v; } catch (e) {}
    const copy = JSON.parse(JSON.stringify(seed));
    try { localStorage.setItem(key, JSON.stringify(copy)); } catch (e) {}
    return copy;
  }
  function write(key, val) { try { localStorage.setItem(key, JSON.stringify(val)); } catch (e) {} }
  const pad = (n, w) => String(n).padStart(w, "0");
  const today = () => new Date().toISOString().slice(0, 10);
  const fmt = d => new Date(d + "T00:00:00").toLocaleDateString("en-IN", {day:"2-digit", month:"short", year:"numeric"});
  const esc = s => String(s).replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
  const norm = s => String(s).trim().replace(/^#/, "").toUpperCase();
  const badge = s => `<span class="badge ${s.replace(/\s/g, "")}">${esc(s)}</span>`;

  const CV = {
    STATES, fmt, esc, badge,
    apps: () => read(K.apps, SEED_APPS),
    certs: () => read(K.certs, SEED_CERTS),
    findApp: id => CV.apps().find(a => a.id === norm(id)),
    findCert: id => CV.certs().find(c => c.id === norm(id)),
    addApp(data) {
      const apps = CV.apps();
      const next = apps.reduce((m, a) => Math.max(m, parseInt(a.id.split("-")[1], 10)), 0) + 1;
      const app = {id: "APP-" + pad(next, 4), ...data, status: "Pending", date: today()};
      apps.push(app); write(K.apps, apps); return app;
    },
    issue(appId) {
      const apps = CV.apps(), certs = CV.certs();
      const app = apps.find(a => a.id === appId);
      if (!app || app.status !== "Pending") return;
      const next = certs.reduce((m, c) => Math.max(m, parseInt(c.id.split("-")[1], 10)), 1000) + 1;
      const cert = {id: "CERT-" + next, appId: app.id, name: app.name, phone: app.phone, city: app.city, state: app.state, issuedOn: today(), status: "Valid"};
      app.status = "Approved"; app.certId = cert.id;
      certs.push(cert); write(K.apps, apps); write(K.certs, certs);
    },
    reject(appId) {
      const apps = CV.apps(); const app = apps.find(a => a.id === appId);
      if (app && app.status === "Pending") { app.status = "Rejected"; write(K.apps, apps); }
    },
    revoke(certId) {
      const certs = CV.certs(); const c = certs.find(x => x.id === certId);
      if (c && c.status === "Valid") { c.status = "Revoked"; write(K.certs, certs); }
    },
    reset() { localStorage.removeItem(K.apps); localStorage.removeItem(K.certs); },
    login(u, p) { if (u === "admin" && p === "admin") { sessionStorage.setItem(K.admin, "1"); return true; } return false; },
    logout() { sessionStorage.removeItem(K.admin); },
    isAdmin: () => sessionStorage.getItem(K.admin) === "1",
    requireAdmin(root) { if (!CV.isAdmin()) location.replace(root + "admin/login/index.html"); }
  };
  window.CV = CV;

  /* Header + footer */
  document.addEventListener("DOMContentLoaded", () => {
    const root = document.body.dataset.root || "./";
    const page = document.body.dataset.page || "";
    const logo = `<svg viewBox="0 0 32 32" aria-hidden="true"><circle cx="16" cy="16" r="14" fill="none" stroke="currentColor" stroke-width="2" stroke-dasharray="3 2.4" style="color:var(--seal)"/><circle cx="16" cy="16" r="9" fill="var(--seal)"/><path d="M11.5 16.3l3.2 3.2 5.8-6.3" fill="none" stroke="#fff" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
    const links = [["home","","Home"],["request","request/index.html","Request"],["track","track/index.html","Track"],["verify","verify/index.html","Verify"]];
    const adminLinks = CV.isAdmin()
      ? [["applications","admin/applications/index.html","Applications"],["certificates","admin/certificates/index.html","Certificates"]]
      : [["login","admin/login/index.html","Admin"]];
    const li = ([key, href, label]) => `<li><a class="link" href="${root}${href}"${key === page ? ' aria-current="page"' : ""}>${label}</a></li>`;
    const logout = CV.isAdmin() ? `<li><a class="link" href="#" id="logout">Log out</a></li>` : "";
    const h = document.getElementById("site-header");
    if (h) {
      h.className = "site-header";
      h.innerHTML = `<nav class="nav" aria-label="Main"><a class="brand" href="${root}index.html">${logo}CredVault</a><ul>${links.map(li).join("")}${adminLinks.map(li).join("")}${logout}</ul></nav>`;
      const lo = document.getElementById("logout");
      if (lo) lo.addEventListener("click", e => { e.preventDefault(); CV.logout(); location.href = root + "admin/login/index.html"; });
    }
    const f = document.getElementById("site-footer");
    if (f) f.textContent = "CredVault frontend prototype · ELEVATE SDE Internship · Task 2 · dummy data only";
  });
})();
