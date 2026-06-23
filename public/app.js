const ROLES = ["SE", "PE", "PSE", "CSM"];
const STATUS_QUERY = {
  "未着手": "not_started",
  "対応中": "in_progress",
  "完了": "completed",
  "保留": "on_hold"
};
const QUERY_STATUS = Object.fromEntries(Object.entries(STATUS_QUERY).map(([label, value]) => [value, label]));
const avatarColors = ["green", "blue", "orange", "purple"];
const CURRENT_USER = "川合";

const state = {
  page: "dashboard",
  search: "",
  statusFilter: "すべて",
  moduleFilter: "すべて",
  updatedFilter: "すべて",
  historyDocumentFilter: "すべて",
  historyModuleFilter: "すべて",
  historyCategoryFilter: "すべて",
  selectedDocumentId: null,
  members: [
    { id: "USR-001", name: "田中 美咲", role: "SE", moduleIds: ["MOD-001", "MOD-013", "MOD-014", "MOD-017", "MOD-020"], isActive: true },
    { id: "USR-002", name: "佐藤 健", role: "PE", moduleIds: ["MOD-003", "MOD-017", "MOD-019", "MOD-020"], isActive: true },
    { id: "USR-003", name: "鈴木 彩", role: "CSM", moduleIds: ["MOD-013", "MOD-015", "MOD-016"], isActive: true },
    { id: "USR-004", name: "山本 拓也", role: "PSE", moduleIds: ["MOD-013", "MOD-014", "MOD-019"], isActive: true },
    { id: "USR-005", name: "加藤 翔太", role: "SE", moduleIds: ["MOD-001", "MOD-002", "MOD-013", "MOD-014", "MOD-019"], isActive: true },
    { id: "USR-006", name: "高橋 直子", role: "PE", moduleIds: ["MOD-017", "MOD-018"], isActive: false }
  ],
  modules: [
    { id: "MOD-001", name: "Platform", isActive: true, isImportant: true, createdAt: "2026/04/01", updatedAt: "2026/06/18" },
    { id: "MOD-002", name: "Multi-CID (Flight Control)", isActive: true, isImportant: false, createdAt: "2026/04/01", updatedAt: "2026/06/18" },
    { id: "MOD-003", name: "Prevent,Insight", isActive: true, isImportant: false, createdAt: "2026/04/01", updatedAt: "2026/06/18" },
    { id: "MOD-004", name: "OverWatch", isActive: true, isImportant: false, createdAt: "2026/04/01", updatedAt: "2026/06/18" },
    { id: "MOD-005", name: "Complete", isActive: true, isImportant: false, createdAt: "2026/04/01", updatedAt: "2026/06/18" },
    { id: "MOD-006", name: "DataProtection", isActive: true, isImportant: false, createdAt: "2026/04/01", updatedAt: "2026/06/18" },
    { id: "MOD-007", name: "DeviceControl", isActive: true, isImportant: false, createdAt: "2026/04/01", updatedAt: "2026/06/18" },
    { id: "MOD-008", name: "Firewall Management", isActive: true, isImportant: false, createdAt: "2026/04/01", updatedAt: "2026/06/18" },
    { id: "MOD-009", name: "ExposureManagement", isActive: true, isImportant: false, createdAt: "2026/04/01", updatedAt: "2026/06/18" },
    { id: "MOD-010", name: "Discover", isActive: true, isImportant: false, createdAt: "2026/04/01", updatedAt: "2026/06/18" },
    { id: "MOD-011", name: "Spotlight", isActive: true, isImportant: false, createdAt: "2026/04/01", updatedAt: "2026/06/18" },
    { id: "MOD-012", name: "Surface", isActive: true, isImportant: false, createdAt: "2026/04/01", updatedAt: "2026/06/18" },
    { id: "MOD-013", name: "Cloud Security", isActive: true, isImportant: true, createdAt: "2026/04/02", updatedAt: "2026/06/15" },
    { id: "MOD-014", name: "ITP/ITD", isActive: true, isImportant: true, createdAt: "2026/04/02", updatedAt: "2026/06/14" },
    { id: "MOD-015", name: "Sheild", isActive: true, isImportant: false, createdAt: "2026/04/04", updatedAt: "2026/06/08" },
    { id: "MOD-016", name: "Privileged access", isActive: true, isImportant: false, createdAt: "2026/04/04", updatedAt: "2026/06/08" },
    { id: "MOD-017", name: "NG-SIEM", isActive: true, isImportant: true, createdAt: "2026/04/03", updatedAt: "2026/06/12" },
    { id: "MOD-018", name: "Logscale/LTR", isActive: true, isImportant: false, createdAt: "2026/04/03", updatedAt: "2026/06/12" },
    { id: "MOD-019", name: "FDR", isActive: true, isImportant: false, createdAt: "2026/04/03", updatedAt: "2026/06/12" },
    { id: "MOD-020", name: "Mobile", isActive: true, isImportant: false, createdAt: "2026/04/03", updatedAt: "2026/06/10" },
    { id: "MOD-021", name: "ForIT", isActive: true, isImportant: false, createdAt: "2026/04/05", updatedAt: "2026/06/10" },
    { id: "MOD-022", name: "Charlotte AI", isActive: true, isImportant: false, createdAt: "2026/04/05", updatedAt: "2026/06/10" },
    { id: "MOD-023", name: "Intelligence", isActive: true, isImportant: false, createdAt: "2026/04/05", updatedAt: "2026/06/10" },
    { id: "MOD-024", name: "FileVantage", isActive: true, isImportant: false, createdAt: "2026/04/05", updatedAt: "2026/06/10" },
    { id: "MOD-025", name: "Foundry", isActive: true, isImportant: false, createdAt: "2026/04/05", updatedAt: "2026/06/10" },
    { id: "MOD-026", name: "CloudTranslator", isActive: true, isImportant: false, createdAt: "2026/04/05", updatedAt: "2026/06/10" },
    { id: "MOD-027", name: "AIDR", isActive: true, isImportant: false, createdAt: "2026/04/05", updatedAt: "2026/06/10" }
  ],
  rules: [
    { id: "RULE-001", category: "製品紹介資料", roles: ["SE"], isImportant: true },
    { id: "RULE-002", category: "POV/トライアルガイド", roles: ["SE"], isImportant: true },
    { id: "RULE-003", category: "パラメータシート", roles: ["SE"], isImportant: true },
    { id: "RULE-004", category: "導入手順書/インストール", roles: ["CSM", "PSE"], isImportant: true },
    { id: "RULE-005", category: "操作手順書", roles: ["PE"], isImportant: true },
    { id: "RULE-006", category: "提案関係", roles: ["SE"], isImportant: false },
    { id: "RULE-007", category: "キックオフ関係", roles: ["SE"], isImportant: false },
    { id: "RULE-008", category: "POV/トライアル/有償支援関係", roles: ["SE"], isImportant: false },
    { id: "RULE-009", category: "導入関係", roles: ["CSM", "PSE"], isImportant: false },
    { id: "RULE-010", category: "運用/操作関係", roles: ["PE"], isImportant: false },
    { id: "RULE-011", category: "推奨設定", roles: ["CSM", "PSE"], isImportant: false },
    { id: "RULE-012", category: "その他", roles: ["SE"], isImportant: false }
  ],
  documents: [
    { id: "DOC-024", name: "Falcon Platform 製品紹介資料", category: "製品紹介資料", moduleId: "MOD-001", boxUrl: "https://box.example.com/falcon-intro", supportUrl: "https://support.example.com/falcon", ownerId: "USR-001", status: "対応中", priority: "高", desiredDueDate: "2026-06-30", memo: "Charlotte AIの新機能を追記", isManaged: true, updated: "2026/06/18 14:18", updatedBy: "田中 美咲" },
    { id: "DOC-023", name: "FDR 導入ガイド", category: "導入手順書/インストール", moduleId: "MOD-019", boxUrl: "https://box.example.com/fdr-guide", supportUrl: "https://support.example.com/fdr", ownerId: "USR-004", status: "対応中", priority: "高", desiredDueDate: "2026-07-02", memo: "セットアップ画面の差し替え", isManaged: true, updated: "2026/06/17 09:30", updatedBy: "山本 拓也" },
    { id: "DOC-022", name: "Cloud Security 提案テンプレート", category: "提案関係", moduleId: "MOD-013", boxUrl: "https://box.example.com/cloud-proposal", supportUrl: "https://support.example.com/cloud", ownerId: "USR-005", status: "未着手", priority: "低", desiredDueDate: "2026-06-20", memo: "ライセンス体系と構成図を修正", isManaged: true, updated: "2026/06/15 11:05", updatedBy: "鈴木 彩" },
    { id: "DOC-021", name: "Identity Protection POVガイド", category: "POV/トライアルガイド", moduleId: "MOD-014", boxUrl: "https://box.example.com/identity-pov", supportUrl: "https://support.example.com/identity", ownerId: "USR-005", status: "対応中", priority: "高", desiredDueDate: "2026-06-28", memo: "検証シナリオを更新", isManaged: true, updated: "2026/06/14 16:00", updatedBy: "山本 拓也" },
    { id: "DOC-020", name: "NG-SIEM 操作手順書", category: "操作手順書", moduleId: "MOD-017", boxUrl: "https://box.example.com/ngsiem-manual", supportUrl: "https://support.example.com/ngsiem", ownerId: "USR-002", status: "完了", priority: "中", desiredDueDate: "2026-06-12", memo: "最新UI反映済み", isManaged: true, updated: "2026/06/20 16:42", updatedBy: "田中 美咲" },
    { id: "DOC-019", name: "Mobile FAQ", category: "その他", moduleId: "MOD-020", boxUrl: "https://box.example.com/mobile-faq", supportUrl: "https://support.example.com/mobile", ownerId: "USR-001", status: "未着手", priority: "低", desiredDueDate: "2026-08-23", memo: "iOS最新版の既知問題を追加予定", isManaged: true, updated: "2026/06/10 10:20", updatedBy: "佐藤 健" },
    { id: "DOC-018", name: "Sheild 推奨設定", category: "推奨設定", moduleId: "MOD-015", boxUrl: "https://box.example.com/shield-guide", supportUrl: "", ownerId: "USR-003", status: "保留", priority: "低", desiredDueDate: "", memo: "製品方針確定まで保留", isManaged: false, updated: "2025/05/08 13:10", updatedBy: "鈴木 彩" }
  ],
  requests: [
    { id: "REQ-108", documentId: "DOC-024", reason: "新機能追加", content: "Charlotte AI Detection Triageを追記", attachmentUrl: "", comment: "", priority: "高", status: "対応中", ownerId: "USR-001", desiredDueDate: "2026-06-30" },
    { id: "REQ-107", documentId: "DOC-023", reason: "UI変更", content: "セットアップ画面を更新", attachmentUrl: "", comment: "", priority: "高", status: "対応中", ownerId: "USR-004", desiredDueDate: "2026-07-02" },
    { id: "REQ-106", documentId: "DOC-022", reason: "レビュー指摘", content: "指摘3点を修正", attachmentUrl: "", comment: "", priority: "低", status: "未着手", ownerId: "USR-005", desiredDueDate: "2026-06-20" },
    { id: "REQ-105", documentId: "DOC-021", reason: "検証シナリオ更新", content: "推奨設定を更新", attachmentUrl: "", comment: "", priority: "高", status: "対応中", ownerId: "USR-005", desiredDueDate: "2026-06-28" },
    { id: "REQ-104", documentId: "DOC-019", reason: "FAQ更新", content: "iOS最新版の既知問題を追加", attachmentUrl: "", comment: "", priority: "低", status: "未着手", ownerId: "USR-001", desiredDueDate: "2026-08-23" }
  ],
  activityLogs: [
    { documentId: "DOC-024", time: "2026/06/18 14:18", actor: "田中 美咲", action: "ステータス変更", beforeValue: "未着手", afterValue: "対応中", comment: "対応を開始しました" },
    { documentId: "DOC-024", time: "2026/06/16 09:12", actor: "加藤 翔太", action: "更新依頼作成", beforeValue: "—", afterValue: "REQ-108を作成", comment: "新機能追加に伴う更新" },
    { documentId: "DOC-023", time: "2026/06/17 09:30", actor: "山本 拓也", action: "ドキュメント更新", beforeValue: "旧画面", afterValue: "最新画面", comment: "セットアップ画面の画像を更新" },
    { documentId: "DOC-023", time: "2026/06/16 15:20", actor: "加藤 翔太", action: "担当者変更", beforeValue: "未割当", afterValue: "山本 拓也", comment: "" },
    { documentId: "DOC-022", time: "2026/06/17 11:05", actor: "高橋 直子", action: "コメント追加", beforeValue: "—", afterValue: "レビューコメント追加", comment: "ライセンス体系を再確認してください" },
    { documentId: "DOC-022", time: "2026/06/17 10:55", actor: "高橋 直子", action: "ステータス変更", beforeValue: "対応中", afterValue: "未着手", comment: "" },
    { documentId: "DOC-021", time: "2026/06/14 16:00", actor: "山本 拓也", action: "ドキュメント更新", beforeValue: "旧推奨設定", afterValue: "新推奨設定", comment: "推奨設定の章を更新" },
    { documentId: "DOC-020", time: "2026/06/20 16:42", actor: "加藤 翔太", action: "完了", beforeValue: "対応中", afterValue: "完了", comment: "正式版へ反映しました" },
    { documentId: "DOC-019", time: "2026/06/10 10:20", actor: "佐藤 健", action: "更新依頼作成", beforeValue: "—", afterValue: "REQ-104を作成", comment: "iOS最新版の既知問題追加を依頼" }
  ]
};

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => [...document.querySelectorAll(selector)];
const app = $("#app");
const requestModal = $("#requestModal");
const moduleModal = $("#moduleModal");
const memberModal = $("#memberModal");
const ruleModal = $("#ruleModal");
const detailPanel = $("#detailPanel");
const detailBackdrop = $("#detailBackdrop");
const toast = $("#toast");

const escapeHtml = (value) => String(value ?? "").replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[char]));
const memberById = (id) => state.members.find((item) => item.id === id);
const moduleById = (id) => state.modules.find((item) => item.id === id);
const ruleByCategory = (category) => state.rules.find((item) => item.category === category);
const documentById = (id) => state.documents.find((item) => item.id === id);
const initials = (name) => String(name || "?").split(/\s+/).map((part) => part[0]).join("").slice(0, 2).toUpperCase();
const avatarColor = (id) => avatarColors[Math.abs([...String(id)].reduce((sum, char) => sum + char.charCodeAt(0), 0)) % avatarColors.length];
const formatDate = (date) => `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
const formatDisplayDate = (value) => value ? value.replaceAll("-", "/") : "未設定";
const formatDateTime = (date) => `${formatDisplayDate(formatDate(date))} ${String(date.getHours()).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")}`;

function avatar(memberId) {
  const member = memberById(memberId);
  return `<span class="avatar ${avatarColor(memberId)}">${escapeHtml(initials(member?.name))}</span>`;
}

function statusBadge(status) {
  return `<span class="status-badge status-${escapeHtml(status)}">${escapeHtml(status)}</span>`;
}

function priorityBadge(priority) {
  return `<span class="priority-label priority-${escapeHtml(priority)}">${escapeHtml(priority)}</span>`;
}

function pageHeader(eyebrow, title, description, actions = "") {
  return `<header class="page-header"><div><p class="eyebrow">${eyebrow}</p><h1>${title}</h1><p>${description}</p></div>
    <div class="page-actions">${actions || '<div class="date-chip">◷ 2026年6月23日（火）</div>'}</div></header>`;
}

function calculatePriority(doc) {
  const importantModule = Boolean(moduleById(doc.moduleId)?.isImportant);
  const importantDocument = Boolean(ruleByCategory(doc.category)?.isImportant);
  if (importantModule && importantDocument) return "高";
  if (importantDocument) return "中";
  return "低";
}

function calculateDueDate(priority, base = new Date()) {
  const due = new Date(base);
  if (priority === "高") due.setDate(due.getDate() + 14);
  else if (priority === "中") due.setMonth(due.getMonth() + 1);
  else due.setMonth(due.getMonth() + 2);
  return formatDate(due);
}

function autoAssign(doc) {
  const roles = ruleByCategory(doc.category)?.roles || [];
  return state.members.find((member) => member.isActive && member.moduleIds.includes(doc.moduleId) && roles.includes(member.role)) || null;
}

function documentManagementRoles(doc) {
  return ruleByCategory(doc.category)?.roles.join("、") || "未設定";
}

function isOverdue(doc) {
  if (!doc?.desiredDueDate || doc.status === "完了") return false;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return new Date(`${doc.desiredDueDate}T00:00:00`) < today;
}

function applyMasterRules() {
  state.documents.forEach((doc) => {
    doc.priority = calculatePriority(doc);
    const assignee = autoAssign(doc);
    if (assignee) doc.ownerId = assignee.id;
  });
}

function metricCard(label, value, note, icon, filter, accent = "var(--green)", soft = "var(--green-soft)") {
  return `<button class="metric-card metric-button" data-dashboard-filter="${escapeHtml(filter)}" style="--accent:${accent};--accent-soft:${soft}">
    <span class="metric-top"><span>${label}</span><span class="metric-icon">${icon}</span></span>
    <span class="metric-value">${value}</span><span class="metric-note">${note}</span></button>`;
}

function requestRows(requests) {
  if (!requests.length) return '<div class="empty-state">条件に一致する更新依頼はありません。</div>';
  return requests.map((request) => {
    const doc = documentById(request.documentId);
    const owner = memberById(request.ownerId);
    return `<article class="request-row"><span class="priority-dot ${request.priority === "高" ? "high" : request.priority === "中" ? "medium" : ""}"></span>
      <div><button class="document-link request-title" data-document-id="${request.documentId}">${escapeHtml(doc?.name)}</button>
      <div class="request-meta"><span>${request.id}</span><span>${escapeHtml(request.content)}</span></div></div>
      <div class="request-side">${statusBadge(request.status)}${avatar(request.ownerId)}
      <span class="deadline ${isOverdue(doc) ? "overdue" : ""}">${isOverdue(doc) ? "⚠ " : ""}${escapeHtml(owner?.name || "未割当")} · ${formatDisplayDate(request.desiredDueDate)}</span></div></article>`;
  }).join("");
}

function renderDashboard() {
  const count = (status) => state.documents.filter((doc) => doc.status === status).length;
  const overdue = state.documents.filter(isOverdue).length;
  const chartStatuses = ["未着手", "対応中", "完了", "保留"];
  const maxStatusCount = Math.max(1, overdue, ...chartStatuses.map(count));
  const chartColors = ["#8a958f", "#3976a8", "#2d8b62", "#756493"];
  app.innerHTML = `<section class="page">${pageHeader("OVERVIEW", "おはようございます、加藤さん", "カードを選択すると対象ドキュメントへ移動します。")}
    <div class="metrics">
      ${metricCard("総ドキュメント", state.documents.length, "すべて表示", "▤", "")}
      ${metricCard("未着手", count("未着手"), "対応待ち", "○", "not_started", "#727c77", "#eff1f0")}
      ${metricCard("対応中", count("対応中"), "作業中の資料", "↗", "in_progress", "#346a9c", "#e9f1f8")}
      ${metricCard("完了", count("完了"), "反映済み", "✓", "completed", "#2d8b62", "#e8f3ed")}
      ${metricCard("保留", count("保留"), "対応見送り", "—", "on_hold", "#756493", "#eeeaf5")}
      ${metricCard("期限超過", overdue, "要対応", "!", "overdue", "#bd4242", "#fcebea")}
    </div>
    <div class="dashboard-grid"><section class="panel"><div class="panel-header"><h2>優先度の高い更新依頼</h2><button class="text-button" data-navigate="requests">すべて見る →</button></div>
      <div class="request-list">${requestRows(state.requests.slice(0, 5))}</div></section>
      <div class="right-column"><section class="panel progress-panel"><div class="panel-header"><h2>ステータス別</h2></div>
        <div class="status-chart-list">${chartStatuses.map((status, index) => `<button class="status-chart-button" data-dashboard-filter="${STATUS_QUERY[status]}">
          <span class="status-chart-label"><span>${status}</span><strong>${count(status)}</strong></span>
          <span class="status-chart-track"><span class="status-chart-bar" style="width:${count(status) / maxStatusCount * 100}%;--bar:${chartColors[index]}"></span></span>
        </button>`).join("")}
        <button class="status-chart-button" data-dashboard-filter="overdue"><span class="status-chart-label"><span>期限超過</span><strong>${overdue}</strong></span>
          <span class="status-chart-track"><span class="status-chart-bar" style="width:${overdue / maxStatusCount * 100}%;--bar:#bd4242"></span></span></button></div></section>
        <section class="panel activity-panel"><div class="panel-header"><h2>最近のアクティビティ</h2><button class="text-button" data-navigate="history">履歴 →</button></div>
        <div class="activity-list">${state.activityLogs.slice(0, 3).map((item) => `<div class="activity-item"><span class="activity-symbol">↺</span><div><p><strong>${escapeHtml(item.actor)}</strong>：${escapeHtml(item.action)}</p><time>${item.time}</time></div></div>`).join("")}</div></section></div>
    </div></section>`;
}

function filteredDocuments() {
  const query = state.search.toLowerCase();
  return state.documents.filter((doc) => {
    const module = moduleById(doc.moduleId)?.name || "";
    const owner = memberById(doc.ownerId)?.name || "";
    const searchable = [doc.name, doc.category, module, owner, doc.id].some((value) => value.toLowerCase().includes(query));
    const statusMatch = state.statusFilter === "すべて" || doc.status === state.statusFilter || (state.statusFilter === "期限超過" && isOverdue(doc));
    return searchable && statusMatch && (state.moduleFilter === "すべて" || doc.moduleId === state.moduleFilter) && matchesUpdatedFilter(doc);
  });
}

function matchesUpdatedFilter(doc) {
  if (state.updatedFilter === "すべて") return true;
  const updatedAt = new Date(`${doc.updated.split(" ")[0].replaceAll("/", "-")}T00:00:00`);
  const ageDays = (new Date() - updatedAt) / 86400000;
  if (state.updatedFilter === "1m") return ageDays <= 31;
  if (state.updatedFilter === "3m") return ageDays <= 93;
  if (state.updatedFilter === "6m") return ageDays <= 186;
  if (state.updatedFilter === "1y_stale") return ageDays >= 365;
  return true;
}

function renderDocuments() {
  const docs = filteredDocuments();
  const actions = `<button class="secondary-button compact-button" id="importDocuments">↑ CSVインポート</button><button class="secondary-button compact-button" id="exportDocuments">↓ CSVエクスポート</button>`;
  app.innerHTML = `<section class="page">${pageHeader("DOCUMENTS", "ドキュメント台帳", "資料名を選択すると右側に詳細と履歴を表示します。", actions)}
    <div class="toolbar"><input class="filter-input" id="documentSearch" type="search" placeholder="資料名、担当者で検索..." value="${escapeHtml(state.search)}">
      <select class="filter-select" id="statusFilter">${["すべて", "未着手", "対応中", "完了", "保留", "期限超過"].map((item) => `<option ${state.statusFilter === item ? "selected" : ""}>${item}</option>`).join("")}</select>
      <select class="filter-select" id="moduleFilter"><option>すべて</option>${state.modules.map((module) => `<option value="${module.id}" ${state.moduleFilter === module.id ? "selected" : ""}>${escapeHtml(module.name)}</option>`).join("")}</select>
      <select class="filter-select" id="updatedFilter"><option value="すべて">最終更新日：すべて</option><option value="1m" ${state.updatedFilter === "1m" ? "selected" : ""}>1ヶ月以内</option><option value="3m" ${state.updatedFilter === "3m" ? "selected" : ""}>3ヶ月以内</option><option value="6m" ${state.updatedFilter === "6m" ? "selected" : ""}>6ヶ月以内</option><option value="1y_stale" ${state.updatedFilter === "1y_stale" ? "selected" : ""}>1年以上更新なし</option></select>
    </div>
    <section class="panel table-panel"><table class="data-table"><thead><tr><th>ドキュメント</th><th>モジュール</th><th>担当者</th><th>優先度</th><th>ステータス</th><th>更新希望期限</th><th>最終更新日</th></tr></thead>
    <tbody>${docs.map((doc) => `<tr class="${state.selectedDocumentId === doc.id ? "selected-row" : ""}"><td class="doc-cell"><button class="document-link" data-document-id="${doc.id}">${escapeHtml(doc.name)}</button><span>${doc.id} · ${escapeHtml(doc.category)}</span></td>
      <td><span class="module-pill">${escapeHtml(moduleById(doc.moduleId)?.name)}</span></td><td><div class="owner-cell">${avatar(doc.ownerId)}${escapeHtml(memberById(doc.ownerId)?.name || "未割当")}</div></td>
      <td>${priorityBadge(doc.priority)}</td><td>${statusBadge(doc.status)}</td><td>${formatDisplayDate(doc.desiredDueDate)}</td><td>${escapeHtml(doc.updated.split(" ")[0])}</td></tr>`).join("")}</tbody></table>
      ${docs.length ? "" : '<div class="empty-state">条件に一致するドキュメントはありません。</div>'}</section></section>`;
  bindDocumentFilters();
  $("#importDocuments").addEventListener("click", () => $("#documentCsvInput").click());
  $("#exportDocuments").addEventListener("click", exportDocuments);
}

function renderRequests() {
  const query = state.search.toLowerCase();
  const requests = state.requests.filter((request) => {
    const doc = documentById(request.documentId);
    return [request.id, request.reason, request.content, doc?.name].some((value) => String(value).toLowerCase().includes(query));
  });
  app.innerHTML = `<section class="page">${pageHeader("REQUESTS", "更新依頼", "優先度・期限・担当者は運用ルールから自動決定されます。")}
    <div class="toolbar"><input class="filter-input" id="requestSearch" type="search" placeholder="更新依頼を検索..." value="${escapeHtml(state.search)}"></div>
    <section class="panel"><div class="panel-header"><h2>更新依頼一覧 <span class="subtle-count">(${requests.length})</span></h2><button class="text-button" id="inlineNewRequest">＋ 新規作成</button></div>
    <div class="request-list">${requestRows(requests)}</div></section></section>`;
  $("#requestSearch").addEventListener("input", (event) => { state.search = event.target.value; renderRequests(); bindCommon(); });
  $("#inlineNewRequest").addEventListener("click", openRequestModal);
}

function renderMembers() {
  const actions = `<button class="secondary-button compact-button" id="importMembers">↑ CSVインポート</button><button class="secondary-button compact-button" id="exportMembers">↓ CSVエクスポート</button><button class="primary-button compact-button" id="addMember">＋ ユーザー追加</button>`;
  app.innerHTML = `<section class="page">${pageHeader("USER MANAGEMENT", "ユーザー管理", "ロールと担当モジュールを管理します。", actions)}
    <section class="panel table-panel"><table class="data-table"><thead><tr><th>ユーザー</th><th>ロール</th><th>担当モジュール</th><th>状態</th><th></th></tr></thead>
    <tbody>${state.members.map((member) => `<tr><td><div class="owner-cell">${avatar(member.id)}<div class="doc-cell"><strong>${escapeHtml(member.name)}</strong><span>${member.id}</span></div></div></td>
      <td><span class="module-pill">${member.role}</span></td><td><div class="tag-list">${member.moduleIds.map((id) => `<span>${escapeHtml(moduleById(id)?.name || id)}</span>`).join("") || "—"}</div></td>
      <td><button class="toggle-button ${member.isActive ? "on" : ""}" data-toggle-member="${member.id}"><span></span>${member.isActive ? "有効" : "無効"}</button></td>
      <td><button class="text-button" data-edit-member="${member.id}">編集</button></td></tr>`).join("")}</tbody></table></section>
    <p class="csv-hint">CSV項目：user_id, name, role, modules（|区切り）, is_active</p></section>`;
  $("#addMember").addEventListener("click", () => openMemberModal());
  $("#importMembers").addEventListener("click", () => $("#memberCsvInput").click());
  $("#exportMembers").addEventListener("click", exportMembers);
  $$("[data-edit-member]").forEach((button) => button.addEventListener("click", () => openMemberModal(button.dataset.editMember)));
  $$("[data-toggle-member]").forEach((button) => button.addEventListener("click", () => toggleMember(button.dataset.toggleMember)));
}

function renderModules() {
  app.innerHTML = `<section class="page">${pageHeader("MODULE MASTER", "モジュール管理", "重要モジュールは優先度の自動計算に利用されます。", '<button class="primary-button compact-button" id="addModule">＋ モジュール追加</button>')}
    <section class="panel table-panel"><table class="data-table"><thead><tr><th>モジュール</th><th>重要モジュール</th><th>状態</th><th></th></tr></thead>
    <tbody>${state.modules.map((module) => `<tr><td class="doc-cell"><strong>${escapeHtml(module.name)}</strong><span>${module.id}</span></td>
      <td><span class="important-badge ${module.isImportant ? "important" : ""}">${module.isImportant ? "重要" : "通常"}</span></td>
      <td><button class="toggle-button ${module.isActive ? "on" : ""}" data-toggle-module="${module.id}"><span></span>${module.isActive ? "有効" : "無効"}</button></td>
      <td><div class="row-actions"><button class="text-button" data-edit-module="${module.id}">編集</button><button class="danger-button" data-delete-module="${module.id}">削除</button></div></td></tr>`).join("")}</tbody></table></section></section>`;
  $("#addModule").addEventListener("click", () => openModuleModal());
  $$("[data-edit-module]").forEach((button) => button.addEventListener("click", () => openModuleModal(button.dataset.editModule)));
  $$("[data-toggle-module]").forEach((button) => button.addEventListener("click", () => toggleModule(button.dataset.toggleModule)));
  $$("[data-delete-module]").forEach((button) => button.addEventListener("click", () => deleteModule(button.dataset.deleteModule)));
}

function renderRules() {
  app.innerHTML = `<section class="page">${pageHeader("DOCUMENT TYPES", "ドキュメント種別管理", "種別ごとの管理ロールと重要度を定義し、優先度・期限・担当者判定へ反映します。", '<button class="primary-button compact-button" id="addRule">＋ 種別追加</button>')}
    <section class="panel table-panel"><table class="data-table"><thead><tr><th>ドキュメント種別</th><th>管理ロール</th><th>重要ドキュメント</th><th></th></tr></thead>
    <tbody>${state.rules.map((rule) => `<tr><td class="doc-cell"><strong>${escapeHtml(rule.category)}</strong><span>${rule.id}</span></td>
      <td><div class="tag-list">${rule.roles.map((role) => `<span>${role}</span>`).join("")}</div></td>
      <td><span class="important-badge ${rule.isImportant ? "important" : ""}">${rule.isImportant ? "重要" : "通常"}</span></td>
      <td><div class="row-actions"><button class="text-button" data-edit-rule="${rule.id}">編集</button><button class="danger-button" data-delete-rule="${rule.id}">削除</button></div></td></tr>`).join("")}</tbody></table></section></section>`;
  $("#addRule").addEventListener("click", () => openRuleModal());
  $$("[data-edit-rule]").forEach((button) => button.addEventListener("click", () => openRuleModal(button.dataset.editRule)));
  $$("[data-delete-rule]").forEach((button) => button.addEventListener("click", () => deleteRule(button.dataset.deleteRule)));
}

function filteredHistory() {
  return state.activityLogs.filter((log) => {
    const doc = documentById(log.documentId);
    return (state.historyDocumentFilter === "すべて" || log.documentId === state.historyDocumentFilter)
      && (state.historyModuleFilter === "すべて" || doc?.moduleId === state.historyModuleFilter)
      && (state.historyCategoryFilter === "すべて" || doc?.category === state.historyCategoryFilter);
  }).sort((a, b) => b.time.localeCompare(a.time));
}

function renderHistory() {
  const logs = filteredHistory();
  app.innerHTML = `<section class="page">${pageHeader("DOCUMENT HISTORY", "更新履歴", "ドキュメントごとの操作履歴を確認できます。")}
    <div class="toolbar"><select class="filter-select" id="historyDocumentFilter"><option>すべて</option>${state.documents.map((doc) => `<option value="${doc.id}" ${state.historyDocumentFilter === doc.id ? "selected" : ""}>${escapeHtml(doc.name)}</option>`).join("")}</select>
      <select class="filter-select" id="historyModuleFilter"><option>すべて</option>${state.modules.map((module) => `<option value="${module.id}" ${state.historyModuleFilter === module.id ? "selected" : ""}>${escapeHtml(module.name)}</option>`).join("")}</select>
      <select class="filter-select" id="historyCategoryFilter"><option>すべて</option>${state.rules.map((rule) => `<option ${state.historyCategoryFilter === rule.category ? "selected" : ""}>${escapeHtml(rule.category)}</option>`).join("")}</select></div>
    <section class="panel table-panel"><table class="data-table history-table"><thead><tr><th>日時</th><th>ドキュメント</th><th>ユーザー</th><th>操作内容</th><th>変更前</th><th>変更後</th><th>コメント</th></tr></thead>
    <tbody>${logs.map((log) => { const doc = documentById(log.documentId); return `<tr><td>${log.time}</td><td class="doc-cell"><button class="document-link" data-document-id="${log.documentId}">${escapeHtml(doc?.name)}</button><span>${escapeHtml(moduleById(doc?.moduleId)?.name)} · ${escapeHtml(doc?.category)}</span></td>
      <td>${escapeHtml(log.actor)}</td><td><span class="module-pill">${escapeHtml(log.action)}</span></td><td>${escapeHtml(log.beforeValue || "—")}</td><td>${escapeHtml(log.afterValue || log.changeSummary || "—")}</td><td>${escapeHtml(log.comment || "—")}</td></tr>`; }).join("")}</tbody></table>
      ${logs.length ? "" : '<div class="empty-state">条件に一致する履歴はありません。</div>'}</section></section>`;
  ["Document", "Module", "Category"].forEach((name) => $(`#history${name}Filter`).addEventListener("change", (event) => { state[`history${name}Filter`] = event.target.value; renderHistory(); bindCommon(); }));
}

function renderPlaceholder() {
  app.innerHTML = '<section class="page placeholder-page"><div><div class="placeholder-icon">⚙</div><h1>設定</h1><p>この機能は次の開発フェーズで実装予定です。</p></div></section>';
}

function render() {
  $$(".nav-item[data-page]").forEach((item) => item.classList.toggle("active", item.dataset.page === state.page));
  if (state.page === "dashboard") renderDashboard();
  else if (state.page === "documents") renderDocuments();
  else if (state.page === "requests") renderRequests();
  else if (state.page === "history") renderHistory();
  else if (state.page === "members") renderMembers();
  else if (state.page === "modules") renderModules();
  else if (state.page === "rules") renderRules();
  else renderPlaceholder();
  bindCommon();
}

function bindCommon() {
  $$("[data-navigate]").forEach((button) => button.addEventListener("click", () => navigate(button.dataset.navigate)));
  $$("[data-document-id]").forEach((button) => button.addEventListener("click", () => openDetailPanel(button.dataset.documentId)));
  $$("[data-dashboard-filter]").forEach((button) => button.addEventListener("click", () => openFilteredDocuments(button.dataset.dashboardFilter)));
}

function navigate(page, query = "") {
  state.page = page;
  state.search = "";
  if (page === "documents" && !query) state.statusFilter = "すべて";
  closeDetailPanel();
  history.pushState({ page }, "", `/${page === "dashboard" ? "" : page}${query}`);
  render();
  $(".sidebar").classList.remove("open");
  scrollTo({ top: 0, behavior: "smooth" });
}

function openFilteredDocuments(filter) {
  state.statusFilter = filter === "overdue" ? "期限超過" : (QUERY_STATUS[filter] || "すべて");
  navigate("documents", filter === "overdue" ? "?filter=overdue" : (filter ? `?status=${encodeURIComponent(filter)}` : ""));
}

function applyUrl() {
  const path = location.pathname.split("/").filter(Boolean)[0] || "dashboard";
  state.page = ["documents", "requests", "history", "members", "modules", "rules", "settings"].includes(path) ? path : "dashboard";
  const params = new URLSearchParams(location.search);
  const status = params.get("status");
  state.statusFilter = params.get("filter") === "overdue" ? "期限超過" : (QUERY_STATUS[status] || "すべて");
}

function bindDocumentFilters() {
  $("#documentSearch").addEventListener("input", (event) => { state.search = event.target.value; renderDocuments(); bindCommon(); });
  $("#statusFilter").addEventListener("change", (event) => {
    state.statusFilter = event.target.value;
    const slug = STATUS_QUERY[event.target.value];
    const query = event.target.value === "期限超過" ? "?filter=overdue" : (slug ? `?status=${slug}` : "");
    history.replaceState({}, "", `/documents${query}`);
    renderDocuments(); bindCommon();
  });
  $("#moduleFilter").addEventListener("change", (event) => { state.moduleFilter = event.target.value; renderDocuments(); bindCommon(); });
  $("#updatedFilter").addEventListener("change", (event) => { state.updatedFilter = event.target.value; renderDocuments(); bindCommon(); });
}

function openDetailPanel(documentId) {
  const doc = documentById(documentId);
  if (!doc) return showToast("対象ドキュメントが見つかりません", true);
  state.selectedDocumentId = documentId;
  const logs = state.activityLogs.filter((log) => log.documentId === documentId).sort((a, b) => b.time.localeCompare(a.time));
  detailPanel.innerHTML = `<div class="detail-panel-header"><div><p class="eyebrow">${doc.id}</p><h2>${escapeHtml(doc.name)}</h2></div><button class="detail-close" id="closeDetailPanel">×</button></div>
    <div class="detail-panel-body"><div class="detail-badges">${statusBadge(doc.status)}${priorityBadge(doc.priority)}</div>
    <section class="detail-section"><h3>ドキュメント情報</h3><dl class="detail-list">
      ${detailRow("モジュール", moduleById(doc.moduleId)?.name)}${detailRow("カテゴリ", doc.category)}
      ${detailRow("管理ロール", documentManagementRoles(doc))}${detailRow("担当者", memberById(doc.ownerId)?.name || "未割当")}
      ${detailLink("Boxリンク", doc.boxUrl)}${detailLink("サポートサイト", doc.supportUrl)}
      ${detailRow("ステータス", doc.status)}${detailRow("優先度", doc.priority)}
      ${detailRow("更新希望期限", formatDisplayDate(doc.desiredDueDate))}${detailRow("最終更新日時", doc.updated)}
      ${detailRow("最終更新者", doc.updatedBy)}
    </dl></section>
    <section class="detail-section"><h3>ステータス・更新希望期限を変更</h3>
      <form class="detail-edit-form" id="detailUpdateForm">
        <div class="form-grid"><label>ステータス<select id="detailStatus">${["未着手", "対応中", "完了", "保留"].map((status) => `<option ${doc.status === status ? "selected" : ""}>${status}</option>`).join("")}</select></label>
        <label>更新希望期限<input id="detailDueDate" type="date" value="${escapeHtml(doc.desiredDueDate || "")}"></label></div>
        <label>コメント（任意）<textarea id="detailChangeComment" rows="3" placeholder="変更理由や補足を入力してください"></textarea></label>
        <div class="modal-actions"><button class="primary-button compact-button" type="submit">変更を保存</button></div>
      </form>
    </section>
    <section class="detail-section"><h3>メモ</h3><p class="detail-memo">${escapeHtml(doc.memo || "メモはありません。")}</p></section>
    <section class="detail-section"><div class="section-title-row"><h3>更新タイムライン</h3><span>${logs.length}件</span></div>
      <div class="mini-timeline">${logs.length ? logs.map((log) => `<article class="mini-timeline-item"><span class="mini-timeline-dot"></span><div>
        <div class="timeline-heading"><strong>${escapeHtml(log.action)}</strong><time>${log.time}</time></div>
        ${log.afterValue ? `<p class="timeline-result">${escapeHtml(log.afterValue)}</p>` : `<p>${escapeHtml(log.changeSummary || "—")}</p>`}
        ${log.comment ? `<p class="timeline-comment">コメント：${escapeHtml(log.comment)}</p>` : ""}<span>実施ユーザー：${escapeHtml(log.actor)}</span>
      </div></article>`).join("") : '<p class="empty-timeline">履歴はまだありません。</p>'}</div></section></div>`;
  detailPanel.classList.add("open");
  detailBackdrop.classList.remove("hidden");
  document.body.classList.add("detail-open");
  $("#closeDetailPanel").addEventListener("click", closeDetailPanel);
  $("#detailUpdateForm").addEventListener("submit", saveDetailChanges);
}

function addActivityLog(documentId, action, beforeValue, afterValue, comment = "") {
  state.activityLogs.unshift({
    documentId,
    time: formatDateTime(new Date()),
    actor: CURRENT_USER,
    action,
    beforeValue,
    afterValue,
    comment,
    changeSummary: `${beforeValue || "—"} → ${afterValue || "—"}`
  });
}

function saveDetailChanges(event) {
  event.preventDefault();
  const doc = documentById(state.selectedDocumentId);
  if (!doc) return;
  const nextStatus = $("#detailStatus").value;
  const nextDueDate = $("#detailDueDate").value;
  const comment = $("#detailChangeComment").value.trim();
  let changed = false;

  if (nextStatus !== doc.status) {
    const oldStatus = doc.status;
    doc.status = nextStatus;
    addActivityLog(doc.id, nextStatus === "完了" ? "完了" : "ステータス変更", oldStatus, nextStatus, comment);
    state.requests.filter((request) => request.documentId === doc.id).forEach((request) => { request.status = nextStatus; });
    changed = true;
  }

  if (nextDueDate !== (doc.desiredDueDate || "")) {
    const oldDueDate = doc.desiredDueDate || "未設定";
    doc.desiredDueDate = nextDueDate;
    addActivityLog(doc.id, "更新希望期限変更", formatDisplayDate(oldDueDate), formatDisplayDate(nextDueDate), comment);
    state.requests.filter((request) => request.documentId === doc.id).forEach((request) => { request.desiredDueDate = nextDueDate; });
    changed = true;
  }

  if (!changed && comment) {
    addActivityLog(doc.id, "コメント追加", "—", "コメントを追加", comment);
    changed = true;
  }

  if (!changed) return showToast("変更内容がありません", true);
  doc.updated = formatDateTime(new Date());
  doc.updatedBy = CURRENT_USER;
  render();
  openDetailPanel(doc.id);
  showToast("変更を保存し、タイムラインへ記録しました");
}

function detailRow(label, value) {
  return `<div><dt>${label}</dt><dd>${escapeHtml(value || "—")}</dd></div>`;
}

function detailLink(label, url) {
  return `<div><dt>${label}</dt><dd>${url ? `<a href="${escapeHtml(url)}" target="_blank" rel="noopener">リンクを開く ↗</a>` : "—"}</dd></div>`;
}

function closeDetailPanel() {
  state.selectedDocumentId = null;
  detailPanel.classList.remove("open");
  detailBackdrop.classList.add("hidden");
  document.body.classList.remove("detail-open");
}

function updateRequestPreview() {
  const doc = documentById($("#requestDocument").value);
  if (!doc) return;
  const priority = calculatePriority(doc);
  const due = $("#requestDeadline").value || calculateDueDate(priority);
  const assignee = autoAssign(doc);
  $("#requestAutoPreview").innerHTML = `<strong>自動判定</strong><span>優先度：${priority}</span><span>担当者：${escapeHtml(assignee?.name || "該当者なし")}</span><span>期限：${formatDisplayDate(due)}</span>`;
}

function openRequestModal() {
  $("#requestDocument").innerHTML = state.documents.map((doc) => `<option value="${doc.id}">${escapeHtml(doc.name)}</option>`).join("");
  $("#requestDeadline").value = "";
  requestModal.classList.remove("hidden");
  updateRequestPreview();
}

function closeModal(modal, form) {
  modal.classList.add("hidden");
  form?.reset();
}

function fillMultiSelect(select, values) {
  [...select.options].forEach((option) => { option.selected = values.includes(option.value); });
}

function selectedValues(select) {
  return [...select.selectedOptions].map((option) => option.value);
}

function selectedModuleIds() {
  return $$("#memberModules input:checked").map((input) => input.value);
}

function openMemberModal(id = "") {
  const member = memberById(id);
  $("#memberModalTitle").textContent = member ? "ユーザーを編集" : "ユーザーを追加";
  $("#memberEditId").value = member?.id || "";
  $("#memberName").value = member?.name || "";
  $("#memberRole").value = member?.role || "SE";
  const selected = member?.moduleIds || [];
  $("#memberModules").innerHTML = state.modules.filter((module) => module.isActive).map((module) => `<label class="module-check-item ${selected.includes(module.id) ? "selected" : ""}">
    <input type="checkbox" value="${module.id}" ${selected.includes(module.id) ? "checked" : ""}><span>${escapeHtml(module.name)}</span>
  </label>`).join("");
  $$("#memberModules input").forEach((input) => input.addEventListener("change", () => input.closest(".module-check-item").classList.toggle("selected", input.checked)));
  $("#memberActive").checked = member?.isActive ?? true;
  memberModal.classList.remove("hidden");
}

function openModuleModal(id = "") {
  const module = moduleById(id);
  $("#moduleModalTitle").textContent = module ? "モジュールを編集" : "モジュールを追加";
  $("#moduleEditId").value = module?.id || "";
  $("#moduleName").value = module?.name || "";
  $("#moduleActive").checked = module?.isActive ?? true;
  $("#moduleImportant").checked = module?.isImportant ?? false;
  moduleModal.classList.remove("hidden");
}

function openRuleModal(id = "") {
  const rule = state.rules.find((item) => item.id === id);
  $("#ruleModalTitle").textContent = rule ? "ドキュメント種別を編集" : "ドキュメント種別を追加";
  $("#ruleEditId").value = rule?.id || "";
  $("#ruleCategory").value = rule?.category || "";
  fillMultiSelect($("#ruleRoles"), rule?.roles || []);
  $("#ruleImportant").checked = rule?.isImportant ?? false;
  ruleModal.classList.remove("hidden");
}

function toggleMember(id) {
  const member = memberById(id); member.isActive = !member.isActive; applyMasterRules(); renderMembers(); showToast(`${member.name}を${member.isActive ? "有効" : "無効"}にしました`);
}

function toggleModule(id) {
  const module = moduleById(id); module.isActive = !module.isActive; module.updatedAt = formatDisplayDate(formatDate(new Date())); renderModules(); showToast(`${module.name}を${module.isActive ? "有効" : "無効"}にしました`);
}

function deleteModule(id) {
  const module = moduleById(id);
  if (state.documents.some((doc) => doc.moduleId === id)) return showToast("ドキュメントで使用中のため削除できません", true);
  if (!confirm(`${module.name}を削除しますか？`)) return;
  state.modules = state.modules.filter((item) => item.id !== id); state.members.forEach((member) => member.moduleIds = member.moduleIds.filter((moduleId) => moduleId !== id)); renderModules();
}

function deleteRule(id) {
  const rule = state.rules.find((item) => item.id === id);
  if (state.documents.some((doc) => doc.category === rule.category)) return showToast("ドキュメントで使用中のため削除できません", true);
  if (!confirm(`${rule.category}を削除しますか？`)) return;
  state.rules = state.rules.filter((item) => item.id !== id); renderRules();
}

function parseCsv(text) {
  const rows = []; let row = [], field = "", quoted = false;
  const value = String(text).replace(/^\uFEFF/, "");
  for (let i = 0; i < value.length; i += 1) {
    const char = value[i];
    if (quoted) {
      if (char === '"' && value[i + 1] === '"') { field += '"'; i += 1; }
      else if (char === '"') quoted = false; else field += char;
    } else if (char === '"') quoted = true;
    else if (char === ",") { row.push(field); field = ""; }
    else if (char === "\n") { row.push(field); rows.push(row); row = []; field = ""; }
    else if (char !== "\r") field += char;
  }
  if (quoted) throw new Error("閉じられていない引用符があります。");
  if (field || row.length) { row.push(field); rows.push(row); }
  const clean = rows.filter((item) => item.some((cell) => cell.trim()));
  if (clean.length < 2) throw new Error("ヘッダーとデータが必要です。");
  const headers = clean[0].map((item) => item.trim().toLowerCase());
  return clean.slice(1).map((cells, index) => ({ line: index + 2, values: Object.fromEntries(headers.map((header, i) => [header, (cells[i] || "").trim()])) }));
}

function boolValue(value, line) {
  if (["true", "1", "有効", "はい"].includes(value.toLowerCase())) return true;
  if (["false", "0", "無効", "いいえ"].includes(value.toLowerCase())) return false;
  throw new Error(`${line}行目: is_activeが不正です。`);
}

function requireColumns(rows, columns) {
  const headers = Object.keys(rows[0]?.values || {});
  const missing = columns.filter((column) => !headers.includes(column));
  if (missing.length) throw new Error(`必須項目がありません: ${missing.join(", ")}`);
}

async function importMembers(file) {
  try {
    const rows = parseCsv(await file.text());
    requireColumns(rows, ["name", "role", "modules", "is_active"]);
    let added = 0, updated = 0;
    rows.forEach(({ line, values }) => {
      if (!ROLES.includes(values.role)) throw new Error(`${line}行目: roleは${ROLES.join("/")}で指定してください。`);
      const moduleNames = values.modules.split("|").map((item) => item.trim()).filter(Boolean);
      const moduleIds = moduleNames.map((name) => state.modules.find((module) => module.name === name)?.id);
      if (moduleIds.some((id) => !id)) throw new Error(`${line}行目: 未登録のモジュールがあります。`);
      const existing = state.members.find((member) => member.id === values.user_id || member.name === values.name);
      const data = { name: values.name, role: values.role, moduleIds, isActive: boolValue(values.is_active, line) };
      if (existing) { Object.assign(existing, data); updated += 1; }
      else { state.members.push({ id: nextId("USR", state.members), ...data }); added += 1; }
    });
    applyMasterRules(); renderMembers(); showToast(`${added}件追加、${updated}件更新しました`);
  } catch (error) { showToast(`CSV取込エラー: ${error.message}`, true); }
}

async function importDocuments(file) {
  try {
    const rows = parseCsv(await file.text());
    requireColumns(rows, ["document_id", "title", "module", "category", "box_url", "support_url", "owner_name", "status", "memo", "is_managed"]);
    let added = 0, updated = 0;
    rows.forEach(({ line, values }) => {
      const module = state.modules.find((item) => item.name === values.module);
      const owner = state.members.find((item) => item.name === values.owner_name);
      if (!module || !owner || !ruleByCategory(values.category)) throw new Error(`${line}行目: モジュール、担当者、種別のいずれかが未登録です。`);
      const existing = state.documents.find((doc) => doc.id === values.document_id || doc.name === values.title);
      const base = { id: values.document_id || nextId("DOC", state.documents), name: values.title, moduleId: module.id, category: values.category, boxUrl: values.box_url, supportUrl: values.support_url, ownerId: owner.id, status: values.status || "未着手", memo: values.memo, isManaged: boolValue(values.is_managed, line), updated: formatDateTime(new Date()), updatedBy: "CSVインポート" };
      base.priority = calculatePriority(base); base.desiredDueDate = values.desired_due_date || calculateDueDate(base.priority);
      if (existing) { Object.assign(existing, base); updated += 1; } else { state.documents.push(base); added += 1; }
    });
    $("#documentNavCount").textContent = state.documents.length; renderDocuments(); bindCommon(); showToast(`${added}件追加、${updated}件更新しました`);
  } catch (error) { showToast(`CSV取込エラー: ${error.message}`, true); }
}

function csvEscape(value) {
  const text = String(value ?? ""); return /[",\r\n]/.test(text) ? `"${text.replace(/"/g, '""')}"` : text;
}

function downloadCsv(filename, headers, rows) {
  const content = [headers, ...rows].map((row) => row.map(csvEscape).join(",")).join("\r\n");
  const url = URL.createObjectURL(new Blob([`\uFEFF${content}`], { type: "text/csv;charset=utf-8" }));
  const link = document.createElement("a"); link.href = url; link.download = filename; link.click(); URL.revokeObjectURL(url);
}

function exportMembers() {
  downloadCsv("members.csv", ["user_id", "name", "role", "modules", "is_active"], state.members.map((member) => [member.id, member.name, member.role, member.moduleIds.map((id) => moduleById(id)?.name).join("|"), member.isActive]));
}

function exportDocuments() {
  const headers = ["document_id", "title", "module", "category", "box_url", "support_url", "owner_name", "status", "priority", "desired_due_date", "memo", "is_managed"];
  downloadCsv("documents.csv", headers, state.documents.map((doc) => [doc.id, doc.name, moduleById(doc.moduleId)?.name, doc.category, doc.boxUrl, doc.supportUrl, memberById(doc.ownerId)?.name, doc.status, doc.priority, doc.desiredDueDate, doc.memo, doc.isManaged]));
}

function nextId(prefix, items) {
  const max = Math.max(0, ...items.map((item) => Number(item.id.replace(/\D/g, "")) || 0));
  return `${prefix}-${String(max + 1).padStart(3, "0")}`;
}

function showToast(message, error = false) {
  toast.querySelector("span").textContent = error ? "!" : "✓"; toast.querySelector("p").textContent = message;
  toast.classList.toggle("error", error); toast.classList.remove("hidden");
  clearTimeout(showToast.timer); showToast.timer = setTimeout(() => toast.classList.add("hidden"), error ? 5000 : 3000);
}

$$(".nav-item[data-page]").forEach((item) => item.addEventListener("click", () => navigate(item.dataset.page)));
$("#newRequestButton").addEventListener("click", openRequestModal);
$("#closeModal").addEventListener("click", () => closeModal(requestModal, $("#requestForm")));
$("#cancelModal").addEventListener("click", () => closeModal(requestModal, $("#requestForm")));
$("#closeModuleModal").addEventListener("click", () => closeModal(moduleModal, $("#moduleForm")));
$("#cancelModuleModal").addEventListener("click", () => closeModal(moduleModal, $("#moduleForm")));
$("#closeMemberModal").addEventListener("click", () => closeModal(memberModal, $("#memberForm")));
$("#cancelMemberModal").addEventListener("click", () => closeModal(memberModal, $("#memberForm")));
$("#closeRuleModal").addEventListener("click", () => closeModal(ruleModal, $("#ruleForm")));
$("#cancelRuleModal").addEventListener("click", () => closeModal(ruleModal, $("#ruleForm")));
$("#mobileMenu").addEventListener("click", () => $(".sidebar").classList.toggle("open"));
detailBackdrop.addEventListener("click", closeDetailPanel);
[requestModal, moduleModal, memberModal, ruleModal].forEach((modal) => modal.addEventListener("click", (event) => { if (event.target === modal) closeModal(modal, modal.querySelector("form")); }));
$("#requestDocument").addEventListener("change", updateRequestPreview);
$("#requestDeadline").addEventListener("change", updateRequestPreview);

$("#globalSearch").addEventListener("input", (event) => {
  state.search = event.target.value;
  if (state.search && !["documents", "requests"].includes(state.page)) state.page = "documents";
  render();
});

$("#memberCsvInput").addEventListener("change", async (event) => { if (event.target.files[0]) await importMembers(event.target.files[0]); event.target.value = ""; });
$("#documentCsvInput").addEventListener("change", async (event) => { if (event.target.files[0]) await importDocuments(event.target.files[0]); event.target.value = ""; });

$("#memberForm").addEventListener("submit", (event) => {
  event.preventDefault();
  const id = $("#memberEditId").value; const existing = memberById(id);
  const data = { name: $("#memberName").value.trim(), role: $("#memberRole").value, moduleIds: selectedModuleIds(), isActive: $("#memberActive").checked };
  if (!data.moduleIds.length) return showToast("担当モジュールを選択してください", true);
  if (existing) Object.assign(existing, data); else state.members.push({ id: nextId("USR", state.members), ...data });
  applyMasterRules();
  closeModal(memberModal, $("#memberForm")); renderMembers(); showToast(existing ? "ユーザーを更新しました" : "ユーザーを追加しました");
});

$("#moduleForm").addEventListener("submit", (event) => {
  event.preventDefault();
  const id = $("#moduleEditId").value; const existing = moduleById(id); const name = $("#moduleName").value.trim();
  if (state.modules.some((module) => module.name === name && module.id !== id)) return showToast("同名のモジュールがあります", true);
  const data = { name, isActive: $("#moduleActive").checked, isImportant: $("#moduleImportant").checked, updatedAt: formatDisplayDate(formatDate(new Date())) };
  if (existing) Object.assign(existing, data); else state.modules.push({ id: nextId("MOD", state.modules), ...data, createdAt: formatDisplayDate(formatDate(new Date())) });
  applyMasterRules();
  closeModal(moduleModal, $("#moduleForm")); renderModules(); showToast(existing ? "モジュールを更新しました" : "モジュールを追加しました");
});

$("#ruleForm").addEventListener("submit", (event) => {
  event.preventDefault();
  const id = $("#ruleEditId").value; const existing = state.rules.find((item) => item.id === id); const category = $("#ruleCategory").value.trim();
  if (state.rules.some((rule) => rule.category === category && rule.id !== id)) return showToast("同じ種別のルールがあります", true);
  const data = { category, roles: selectedValues($("#ruleRoles")), isImportant: $("#ruleImportant").checked };
  if (!data.roles.length) return showToast("管理ロールを選択してください", true);
  if (existing) { const old = existing.category; Object.assign(existing, data); state.documents.forEach((doc) => { if (doc.category === old) doc.category = category; }); }
  else state.rules.push({ id: nextId("RULE", state.rules), ...data });
  applyMasterRules();
  closeModal(ruleModal, $("#ruleForm")); renderRules(); showToast(existing ? "ドキュメント種別を更新しました" : "ドキュメント種別を追加しました");
});

$("#requestForm").addEventListener("submit", (event) => {
  event.preventDefault();
  const doc = documentById($("#requestDocument").value);
  const priority = calculatePriority(doc); const assignee = autoAssign(doc);
  if (!assignee) return showToast("管理ロールとモジュールに一致する有効ユーザーがいません", true);
  const dueDate = $("#requestDeadline").value || calculateDueDate(priority);
  const request = { id: nextId("REQ", state.requests), documentId: doc.id, reason: $("#requestReason").value.trim(), content: $("#requestContent").value.trim(), attachmentUrl: $("#requestAttachmentUrl").value.trim(), comment: $("#requestComment").value.trim(), priority, status: "未着手", ownerId: assignee.id, desiredDueDate: dueDate };
  state.requests.unshift(request);
  Object.assign(doc, { ownerId: assignee.id, priority, status: "未着手", desiredDueDate: dueDate, updated: formatDateTime(new Date()), updatedBy: "加藤 翔太" });
  addActivityLog(doc.id, "更新依頼作成", "—", `${request.content}／優先度${priority}／担当者${assignee.name}`, request.comment);
  $("#requestNavCount").textContent = state.requests.length;
  closeModal(requestModal, $("#requestForm")); showToast("更新依頼を作成しました"); render();
});

addEventListener("popstate", () => { applyUrl(); closeDetailPanel(); render(); });
addEventListener("keydown", (event) => {
  if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") { event.preventDefault(); $("#globalSearch").focus(); }
  if (event.key === "Escape") { closeDetailPanel(); [requestModal, moduleModal, memberModal, ruleModal].forEach((modal) => { if (!modal.classList.contains("hidden")) closeModal(modal, modal.querySelector("form")); }); }
});

applyUrl();
$("#documentNavCount").textContent = state.documents.length;
$("#requestNavCount").textContent = state.requests.length;
render();
