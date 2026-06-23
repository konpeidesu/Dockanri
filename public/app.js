const avatarColors = ["green", "blue", "orange", "purple"];

const state = {
  page: "dashboard",
  search: "",
  statusFilter: "すべて",
  moduleFilter: "すべて",
  selectedDocumentId: null,
  members: [
    { email: "misaki.tanaka@example.com", name: "田中 美咲", role: "SE", department: "Solution Engineering", isActive: true },
    { email: "ken.sato@example.com", name: "佐藤 健", role: "PE", department: "Product Engineering", isActive: true },
    { email: "aya.suzuki@example.com", name: "鈴木 彩", role: "CSM", department: "Customer Success", isActive: true },
    { email: "takuya.yamamoto@example.com", name: "山本 拓也", role: "PSM", department: "Professional Services", isActive: true },
    { email: "shota.kato@example.com", name: "加藤 翔太", role: "ADMIN", department: "Solution Engineering", isActive: true },
    { email: "naoko.takahashi@example.com", name: "高橋 直子", role: "SE", department: "Solution Engineering", isActive: false }
  ],
  modules: [
    { id: "MOD-001", name: "Falcon", description: "Falcon Platform全般", ownerEmail: "misaki.tanaka@example.com", isActive: true, createdAt: "2026/04/01", updatedAt: "2026/06/18" },
    { id: "MOD-002", name: "FDR", description: "Falcon Data Replicator", ownerEmail: "ken.sato@example.com", isActive: true, createdAt: "2026/04/01", updatedAt: "2026/06/17" },
    { id: "MOD-003", name: "Cloud Security", description: "クラウドセキュリティ製品群", ownerEmail: "aya.suzuki@example.com", isActive: true, createdAt: "2026/04/02", updatedAt: "2026/06/15" },
    { id: "MOD-004", name: "Identity", description: "Identity Protection", ownerEmail: "takuya.yamamoto@example.com", isActive: true, createdAt: "2026/04/02", updatedAt: "2026/06/14" },
    { id: "MOD-005", name: "NG-SIEM", description: "Next-Gen SIEM", ownerEmail: "misaki.tanaka@example.com", isActive: true, createdAt: "2026/04/03", updatedAt: "2026/06/12" },
    { id: "MOD-006", name: "Mobile", description: "モバイル端末保護", ownerEmail: "ken.sato@example.com", isActive: true, createdAt: "2026/04/03", updatedAt: "2026/06/10" },
    { id: "MOD-007", name: "Shield", description: "Shield関連資料", ownerEmail: "aya.suzuki@example.com", isActive: false, createdAt: "2026/04/04", updatedAt: "2026/06/08" }
  ],
  documents: [
    { id: "DOC-024", name: "Falcon Platform 製品紹介資料", category: "製品紹介資料", module: "Falcon", boxUrl: "https://box.example.com/falcon-intro", supportUrl: "https://support.example.com/falcon", ownerEmail: "misaki.tanaka@example.com", managerRole: "SE", status: "レビュー待ち", priority: "高", dueDate: "2026-06-23", memo: "Charlotte AIの新機能を追記", isManaged: true, updated: "2026/06/18 14:18", updatedBy: "田中 美咲" },
    { id: "DOC-023", name: "FDR 導入ガイド", category: "導入手順書", module: "FDR", boxUrl: "https://box.example.com/fdr-guide", supportUrl: "https://support.example.com/fdr", ownerEmail: "ken.sato@example.com", managerRole: "PE", status: "対応中", priority: "中", dueDate: "2026-06-25", memo: "セットアップ画面の差し替え", isManaged: true, updated: "2026/06/17 09:30", updatedBy: "佐藤 健" },
    { id: "DOC-022", name: "Cloud Security 提案テンプレート", category: "提案資料", module: "Cloud Security", boxUrl: "https://box.example.com/cloud-proposal", supportUrl: "https://support.example.com/cloud", ownerEmail: "aya.suzuki@example.com", managerRole: "CSM", status: "差し戻し", priority: "高", dueDate: "2026-06-20", memo: "ライセンス体系と構成図を修正", isManaged: true, updated: "2026/06/15 11:05", updatedBy: "鈴木 彩" },
    { id: "DOC-021", name: "Identity Protection POVガイド", category: "POVガイド", module: "Identity", boxUrl: "https://box.example.com/identity-pov", supportUrl: "https://support.example.com/identity", ownerEmail: "takuya.yamamoto@example.com", managerRole: "PSM", status: "対応中", priority: "中", dueDate: "2026-06-28", memo: "検証シナリオを更新", isManaged: true, updated: "2026/06/14 16:00", updatedBy: "山本 拓也" },
    { id: "DOC-020", name: "NG-SIEM 操作手順書", category: "操作手順書", module: "NG-SIEM", boxUrl: "https://box.example.com/ngsiem-manual", supportUrl: "https://support.example.com/ngsiem", ownerEmail: "misaki.tanaka@example.com", managerRole: "PE", status: "完了", priority: "低", dueDate: "2026-06-12", memo: "最新UI反映済み", isManaged: true, updated: "2026/06/20 16:42", updatedBy: "田中 美咲" },
    { id: "DOC-019", name: "Mobile FAQ", category: "FAQ", module: "Mobile", boxUrl: "https://box.example.com/mobile-faq", supportUrl: "https://support.example.com/mobile", ownerEmail: "ken.sato@example.com", managerRole: "PE", status: "未着手", priority: "低", dueDate: "2026-06-30", memo: "iOS最新版の既知問題を追加予定", isManaged: true, updated: "2026/06/10 10:20", updatedBy: "佐藤 健" },
    { id: "DOC-018", name: "Shield 運用設計ガイド", category: "運用ドキュメント", module: "Shield", boxUrl: "https://box.example.com/shield-guide", supportUrl: "", ownerEmail: "aya.suzuki@example.com", managerRole: "CSM", status: "保留", priority: "中", dueDate: "", memo: "製品方針確定まで保留", isManaged: false, updated: "2026/06/08 13:10", updatedBy: "鈴木 彩" }
  ],
  requests: [
    { id: "REQ-108", documentId: "DOC-024", title: "Falcon Platform 製品紹介資料", reason: "新機能Charlotte AI Detection Triageの追記", priority: "高", status: "レビュー待ち", ownerEmail: "misaki.tanaka@example.com", deadline: "6月23日", overdue: false },
    { id: "REQ-107", documentId: "DOC-023", title: "FDR 導入ガイド", reason: "セットアップ画面のUI変更を反映", priority: "中", status: "対応中", ownerEmail: "ken.sato@example.com", deadline: "6月25日", overdue: false },
    { id: "REQ-106", documentId: "DOC-022", title: "Cloud Security 提案テンプレート", reason: "レビュー指摘3点の修正", priority: "高", status: "差し戻し", ownerEmail: "aya.suzuki@example.com", deadline: "2日超過", overdue: true },
    { id: "REQ-105", documentId: "DOC-021", title: "Identity Protection POVガイド", reason: "検証シナリオと推奨設定の更新", priority: "中", status: "対応中", ownerEmail: "takuya.yamamoto@example.com", deadline: "6月28日", overdue: false },
    { id: "REQ-104", documentId: "DOC-019", title: "Mobile FAQ", reason: "iOS最新版の既知問題を追加", priority: "低", status: "未着手", ownerEmail: "ken.sato@example.com", deadline: "6月30日", overdue: false }
  ],
  activityLogs: [
    { documentId: "DOC-024", time: "2026/06/18 14:18", actor: "田中 美咲", action: "レビュー依頼", detail: "Charlotte AI Detection Triageの紹介スライドを5ページ追加" },
    { documentId: "DOC-024", time: "2026/06/18 10:05", actor: "田中 美咲", action: "ステータス変更", detail: "対応中からレビュー待ちへ変更" },
    { documentId: "DOC-024", time: "2026/06/16 09:12", actor: "加藤 翔太", action: "更新依頼作成", detail: "製品アップデートに伴う更新依頼を作成" },
    { documentId: "DOC-023", time: "2026/06/17 09:30", actor: "佐藤 健", action: "ドキュメント情報更新", detail: "セットアップ画面のスクリーンショットを更新" },
    { documentId: "DOC-023", time: "2026/06/16 15:20", actor: "加藤 翔太", action: "担当者変更", detail: "担当者を佐藤 健に設定" },
    { documentId: "DOC-022", time: "2026/06/17 11:05", actor: "高橋 直子", action: "コメント追加", detail: "ライセンス体系の表記と構成図について修正を依頼" },
    { documentId: "DOC-022", time: "2026/06/17 10:55", actor: "高橋 直子", action: "ステータス変更", detail: "レビュー待ちから差し戻しへ変更" },
    { documentId: "DOC-021", time: "2026/06/14 16:00", actor: "山本 拓也", action: "ドキュメント情報更新", detail: "推奨設定の章を更新" },
    { documentId: "DOC-020", time: "2026/06/20 16:42", actor: "加藤 翔太", action: "完了", detail: "レビュー承認後、正式版へ反映" },
    { documentId: "DOC-020", time: "2026/06/20 16:30", actor: "加藤 翔太", action: "承認", detail: "最新UIの反映内容を承認" },
    { documentId: "DOC-019", time: "2026/06/10 10:20", actor: "佐藤 健", action: "更新依頼作成", detail: "iOS最新版の既知問題追加を依頼" }
  ]
};

const app = document.querySelector("#app");
const requestModal = document.querySelector("#requestModal");
const moduleModal = document.querySelector("#moduleModal");
const detailPanel = document.querySelector("#detailPanel");
const detailBackdrop = document.querySelector("#detailBackdrop");
const toast = document.querySelector("#toast");

const memberByEmail = (email) => state.members.find((member) => member.email.toLowerCase() === String(email || "").toLowerCase());
const ownerName = (email) => memberByEmail(email)?.name || email || "未設定";
const initials = (name) => String(name || "?").split(/\s+/).map((part) => part[0]).join("").slice(0, 2).toUpperCase();
const avatarColor = (email) => avatarColors[Math.abs([...String(email)].reduce((sum, char) => sum + char.charCodeAt(0), 0)) % avatarColors.length];
const escapeHtml = (value) => String(value ?? "").replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[char]));

function avatarForEmail(email) {
  const name = ownerName(email);
  return `<span class="avatar ${avatarColor(email)}">${escapeHtml(initials(name))}</span>`;
}

function statusBadge(status) {
  return `<span class="status-badge status-${escapeHtml(status)}">${escapeHtml(status)}</span>`;
}

function metricCard(label, value, note, icon, accent = "var(--green)", soft = "var(--green-soft)") {
  return `<article class="metric-card" style="--accent:${accent};--accent-soft:${soft}">
    <div class="metric-top"><span>${label}</span><span class="metric-icon">${icon}</span></div>
    <div class="metric-value">${value}</div><div class="metric-note">${note}</div>
  </article>`;
}

function pageHeader(eyebrow, title, description, actions = "") {
  return `<header class="page-header">
    <div><p class="eyebrow">${eyebrow}</p><h1>${title}</h1><p>${description}</p></div>
    <div class="page-actions">${actions || '<div class="date-chip">◷ 2026年6月23日（火）</div>'}</div>
  </header>`;
}

function requestRows(requests) {
  if (!requests.length) return '<div class="empty-state">条件に一致する更新依頼はありません。</div>';
  return requests.map((request) => `
    <article class="request-row">
      <span class="priority-dot ${request.priority === "高" ? "high" : request.priority === "中" ? "medium" : ""}"></span>
      <div>
        <button class="document-link request-title" data-document-id="${escapeHtml(request.documentId)}">${escapeHtml(request.title)}</button>
        <div class="request-meta"><span>${escapeHtml(request.id)}</span><span>${escapeHtml(request.reason)}</span></div>
      </div>
      <div class="request-side">${statusBadge(request.status)}${avatarForEmail(request.ownerEmail)}
        <span class="deadline ${request.overdue ? "overdue" : ""}">${request.overdue ? "⚠ " : ""}${escapeHtml(request.deadline)}</span>
      </div>
    </article>`).join("");
}

function renderDashboard() {
  const inProgress = state.documents.filter((doc) => doc.status === "対応中").length;
  const reviews = state.documents.filter((doc) => doc.status === "レビュー待ち").length;
  const overdue = state.requests.filter((request) => request.overdue).length;
  app.innerHTML = `<section class="page">
    ${pageHeader("OVERVIEW", "おはようございます、加藤さん", "ドキュメントの更新状況を確認しましょう。")}
    <div class="metrics">
      ${metricCard("総ドキュメント", state.documents.length, "<strong>台帳</strong> 登録済み", "▤")}
      ${metricCard("更新対応中", inProgress, "現在の作業件数", "↗", "#346a9c", "#e9f1f8")}
      ${metricCard("レビュー待ち", reviews, "確認をお願いします", "◎", "#b96c16", "#fff3df")}
      ${metricCard("期限超過", overdue, "<strong>要対応</strong>", "!", "#bd4242", "#fcebea")}
    </div>
    <div class="dashboard-grid">
      <section class="panel"><div class="panel-header"><h2>優先度の高い更新依頼</h2><button class="text-button" data-navigate="requests">すべて見る →</button></div>
        <div class="request-list">${requestRows(state.requests.slice(0, 5))}</div></section>
      <div class="right-column">
        <section class="panel progress-panel"><div class="panel-header"><h2>ステータス別</h2></div>
          <div class="progress-list">${["対応中", "レビュー待ち", "未着手", "完了"].map((status, index) => {
            const count = state.documents.filter((doc) => doc.status === status).length;
            const colors = ["#3976a8", "#d0872d", "#8a958f", "#2d8b62"];
            return `<div class="progress-item"><div class="progress-item-top"><span>${status}</span><span>${count}件</span></div>
              <div class="progress-track"><div class="progress-fill" style="width:${state.documents.length ? count / state.documents.length * 100 : 0}%;--bar:${colors[index]}"></div></div></div>`;
          }).join("")}</div>
        </section>
        <section class="panel activity-panel"><div class="panel-header"><h2>最近のアクティビティ</h2><button class="text-button" data-navigate="history">履歴 →</button></div>
          <div class="activity-list">${state.activityLogs.slice(0, 3).map((item) => `<div class="activity-item">
            <span class="activity-symbol">↺</span><div><p><strong>${escapeHtml(item.actor)}</strong>：${escapeHtml(item.action)}</p><time>${escapeHtml(item.time)}</time></div>
          </div>`).join("")}</div>
        </section>
      </div>
    </div>
  </section>`;
}

function getFilteredDocuments() {
  const query = state.search.toLowerCase();
  return state.documents.filter((doc) => {
    const matchesSearch = [doc.name, doc.category, doc.module, ownerName(doc.ownerEmail), doc.id].some((value) => String(value).toLowerCase().includes(query));
    return matchesSearch && (state.statusFilter === "すべて" || doc.status === state.statusFilter) && (state.moduleFilter === "すべて" || doc.module === state.moduleFilter);
  });
}

function renderDocuments() {
  const docs = getFilteredDocuments();
  const modules = state.modules.filter((module) => module.isActive).map((module) => module.name);
  const actions = `<button class="secondary-button compact-button" id="importDocuments">↑ CSVインポート</button>
    <button class="secondary-button compact-button" id="exportDocuments">↓ CSVエクスポート</button>`;
  app.innerHTML = `<section class="page">
    ${pageHeader("DOCUMENTS", "ドキュメント台帳", "管理対象の資料と更新状況を一覧で確認できます。", actions)}
    <div class="toolbar">
      <input class="filter-input" id="documentSearch" type="search" placeholder="資料名、担当者で検索..." value="${escapeHtml(state.search)}">
      <select class="filter-select" id="statusFilter">${["すべて", "未着手", "対応中", "レビュー待ち", "差し戻し", "完了", "保留"].map((item) => `<option ${state.statusFilter === item ? "selected" : ""}>${item}</option>`).join("")}</select>
      <select class="filter-select" id="moduleFilter">${["すべて", ...modules].map((item) => `<option ${state.moduleFilter === item ? "selected" : ""}>${escapeHtml(item)}</option>`).join("")}</select>
    </div>
    <section class="panel table-panel"><table class="data-table">
      <thead><tr><th>ドキュメント</th><th>モジュール</th><th>担当者</th><th>優先度</th><th>ステータス</th><th>最終更新</th></tr></thead>
      <tbody>${docs.map((doc) => `<tr class="${state.selectedDocumentId === doc.id ? "selected-row" : ""}">
        <td class="doc-cell"><button class="document-link" data-document-id="${escapeHtml(doc.id)}">${escapeHtml(doc.name)}</button><span>${escapeHtml(doc.id)} · ${escapeHtml(doc.category)}</span></td>
        <td><span class="module-pill">${escapeHtml(doc.module)}</span></td>
        <td><div class="owner-cell">${avatarForEmail(doc.ownerEmail)}${escapeHtml(ownerName(doc.ownerEmail))}</div></td>
        <td><span class="priority-label priority-${escapeHtml(doc.priority)}">${escapeHtml(doc.priority)}</span></td>
        <td>${statusBadge(doc.status)}</td><td>${escapeHtml(doc.updated.split(" ")[0])}</td>
      </tr>`).join("")}</tbody>
    </table>${docs.length ? "" : '<div class="empty-state">条件に一致するドキュメントはありません。</div>'}</section>
  </section>`;
  bindDocumentFilters();
  document.querySelector("#importDocuments").addEventListener("click", () => document.querySelector("#documentCsvInput").click());
  document.querySelector("#exportDocuments").addEventListener("click", exportDocuments);
}

function renderRequests() {
  const query = state.search.toLowerCase();
  const requests = state.requests.filter((request) => [request.title, request.reason, ownerName(request.ownerEmail), request.id].some((value) => String(value).toLowerCase().includes(query)));
  app.innerHTML = `<section class="page">
    ${pageHeader("REQUESTS", "更新依頼", "更新作業の担当・期限・レビュー状況を管理します。")}
    <div class="toolbar"><input class="filter-input" id="requestSearch" type="search" placeholder="更新依頼を検索..." value="${escapeHtml(state.search)}"></div>
    <section class="panel"><div class="panel-header"><h2>更新依頼一覧 <span class="subtle-count">(${requests.length})</span></h2><button class="text-button" id="inlineNewRequest">＋ 新規作成</button></div>
      <div class="request-list">${requestRows(requests)}</div></section>
  </section>`;
  document.querySelector("#requestSearch").addEventListener("input", (event) => { state.search = event.target.value; renderRequests(); });
  document.querySelector("#inlineNewRequest").addEventListener("click", openRequestModal);
}

function renderMembers() {
  const actions = `<button class="secondary-button compact-button" id="importMembers">↑ CSVインポート</button>
    <button class="secondary-button compact-button" id="exportMembers">↓ CSVエクスポート</button>`;
  app.innerHTML = `<section class="page">
    ${pageHeader("USER MANAGEMENT", "ユーザー管理", "担当者・レビュー者・承認者として利用するユーザーを管理します。", actions)}
    <section class="panel table-panel"><table class="data-table">
      <thead><tr><th>ユーザー</th><th>ロール</th><th>部署</th><th>状態</th></tr></thead>
      <tbody>${state.members.map((member) => `<tr>
        <td><div class="owner-cell">${avatarForEmail(member.email)}<div class="doc-cell"><strong>${escapeHtml(member.name)}</strong><span>${escapeHtml(member.email)}</span></div></div></td>
        <td><span class="module-pill">${escapeHtml(member.role)}</span></td><td>${escapeHtml(member.department)}</td>
        <td><span class="active-badge ${member.isActive ? "is-active" : "is-inactive"}">${member.isActive ? "有効" : "無効"}</span></td>
      </tr>`).join("")}</tbody>
    </table></section>
    <p class="csv-hint">CSV必須項目：email, name, role, department, is_active</p>
  </section>`;
  document.querySelector("#importMembers").addEventListener("click", () => document.querySelector("#memberCsvInput").click());
  document.querySelector("#exportMembers").addEventListener("click", exportMembers);
}

function renderModules() {
  const actions = `<button class="primary-button compact-button" id="addModule">＋ モジュール追加</button>`;
  app.innerHTML = `<section class="page">
    ${pageHeader("MODULE MASTER", "モジュール管理", "ドキュメントに紐づく製品・機能モジュールを管理します。", actions)}
    <section class="panel table-panel"><table class="data-table">
      <thead><tr><th>モジュール</th><th>説明</th><th>オーナー</th><th>状態</th><th>更新日</th><th></th></tr></thead>
      <tbody>${state.modules.map((module) => `<tr>
        <td class="doc-cell"><strong>${escapeHtml(module.name)}</strong><span>${escapeHtml(module.id)}</span></td>
        <td>${escapeHtml(module.description || "—")}</td>
        <td>${escapeHtml(ownerName(module.ownerEmail))}</td>
        <td><button class="toggle-button ${module.isActive ? "on" : ""}" data-toggle-module="${escapeHtml(module.id)}"><span></span>${module.isActive ? "有効" : "無効"}</button></td>
        <td>${escapeHtml(module.updatedAt)}</td>
        <td><div class="row-actions"><button class="text-button" data-edit-module="${escapeHtml(module.id)}">編集</button><button class="danger-button" data-delete-module="${escapeHtml(module.id)}">削除</button></div></td>
      </tr>`).join("")}</tbody>
    </table></section>
  </section>`;
  document.querySelector("#addModule").addEventListener("click", () => openModuleModal());
  document.querySelectorAll("[data-edit-module]").forEach((button) => button.addEventListener("click", () => openModuleModal(button.dataset.editModule)));
  document.querySelectorAll("[data-toggle-module]").forEach((button) => button.addEventListener("click", () => toggleModule(button.dataset.toggleModule)));
  document.querySelectorAll("[data-delete-module]").forEach((button) => button.addEventListener("click", () => deleteModule(button.dataset.deleteModule)));
}

function renderHistory() {
  app.innerHTML = `<section class="page">
    ${pageHeader("HISTORY", "更新履歴", "誰が、いつ、何を変更したかを時系列で確認できます。")}
    <div class="history-timeline">${state.activityLogs.map((item) => {
      const doc = state.documents.find((document) => document.id === item.documentId);
      return `<article class="history-item"><div class="history-dot">✓</div><div class="history-card">
        <p class="eyebrow">${escapeHtml(item.action)}</p><h3>${escapeHtml(doc?.name || item.documentId)}</h3>
        <p>${escapeHtml(item.detail)}</p><div class="history-meta"><span>実行者: ${escapeHtml(item.actor)}</span><time>${escapeHtml(item.time)}</time></div>
      </div></article>`;
    }).join("")}</div>
  </section>`;
}

function renderPlaceholder(title, icon) {
  app.innerHTML = `<section class="page placeholder-page"><div><div class="placeholder-icon">${icon}</div><h1>${title}</h1><p>この機能は次の開発フェーズで実装予定です。</p></div></section>`;
}

function render() {
  document.querySelectorAll(".nav-item[data-page]").forEach((item) => item.classList.toggle("active", item.dataset.page === state.page));
  if (state.page === "dashboard") renderDashboard();
  else if (state.page === "documents") renderDocuments();
  else if (state.page === "requests") renderRequests();
  else if (state.page === "history") renderHistory();
  else if (state.page === "members") renderMembers();
  else if (state.page === "modules") renderModules();
  else renderPlaceholder("設定", "⚙");
  bindCommonInteractions();
}

function bindCommonInteractions() {
  document.querySelectorAll("[data-navigate]").forEach((button) => button.addEventListener("click", () => navigate(button.dataset.navigate)));
  document.querySelectorAll("[data-document-id]").forEach((button) => button.addEventListener("click", () => openDetailPanel(button.dataset.documentId)));
}

function navigate(page) {
  state.page = page;
  state.search = "";
  closeDetailPanel();
  render();
  document.querySelector(".sidebar").classList.remove("open");
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function bindDocumentFilters() {
  document.querySelector("#documentSearch").addEventListener("input", (event) => { state.search = event.target.value; renderDocuments(); bindCommonInteractions(); });
  document.querySelector("#statusFilter").addEventListener("change", (event) => { state.statusFilter = event.target.value; renderDocuments(); bindCommonInteractions(); });
  document.querySelector("#moduleFilter").addEventListener("change", (event) => { state.moduleFilter = event.target.value; renderDocuments(); bindCommonInteractions(); });
}

function openDetailPanel(documentId) {
  const doc = state.documents.find((document) => document.id === documentId);
  if (!doc) return showToast("対象ドキュメントが見つかりません", true);
  state.selectedDocumentId = documentId;
  const logs = state.activityLogs.filter((log) => log.documentId === documentId).sort((a, b) => b.time.localeCompare(a.time));
  detailPanel.innerHTML = `<div class="detail-panel-header">
    <div><p class="eyebrow">${escapeHtml(doc.id)}</p><h2>${escapeHtml(doc.name)}</h2></div>
    <button class="detail-close" id="closeDetailPanel" aria-label="詳細を閉じる">×</button>
  </div>
  <div class="detail-panel-body">
    <div class="detail-badges">${statusBadge(doc.status)}<span class="priority-label priority-${escapeHtml(doc.priority)}">優先度 ${escapeHtml(doc.priority)}</span></div>
    <section class="detail-section"><h3>基本情報</h3><dl class="detail-list">
      ${detailRow("モジュール", doc.module)}${detailRow("カテゴリ", doc.category)}
      ${detailLinkRow("Boxリンク", doc.boxUrl)}${detailLinkRow("サポートサイト", doc.supportUrl)}
      ${detailRow("管理者", ownerName(doc.ownerEmail))}${detailRow("管理ロール", doc.managerRole)}
      ${detailRow("更新期限", doc.dueDate || "未設定")}${detailRow("最終更新", doc.updated)}
      ${detailRow("最終更新者", doc.updatedBy)}${detailRow("管理対象", doc.isManaged ? "はい" : "いいえ")}
    </dl></section>
    <section class="detail-section"><h3>メモ</h3><p class="detail-memo">${escapeHtml(doc.memo || "メモはありません。")}</p></section>
    <section class="detail-section"><div class="section-title-row"><h3>更新タイムライン</h3><span>${logs.length}件</span></div>
      <div class="mini-timeline">${logs.length ? logs.map((log) => `<article class="mini-timeline-item">
        <span class="mini-timeline-dot"></span><div><div class="timeline-heading"><strong>${escapeHtml(log.action)}</strong><time>${escapeHtml(log.time)}</time></div>
        <p>${escapeHtml(log.detail)}</p><span>実行者：${escapeHtml(log.actor)}</span></div>
      </article>`).join("") : '<p class="empty-timeline">履歴はまだありません。</p>'}</div>
    </section>
  </div>`;
  detailPanel.classList.add("open");
  detailBackdrop.classList.remove("hidden");
  document.body.classList.add("detail-open");
  document.querySelector("#closeDetailPanel").addEventListener("click", closeDetailPanel);
  if (state.page === "documents") {
    document.querySelectorAll("tr").forEach((row) => row.classList.remove("selected-row"));
    document.querySelector(`[data-document-id="${CSS.escape(documentId)}"]`)?.closest("tr")?.classList.add("selected-row");
  }
}

function detailRow(label, value) {
  return `<div><dt>${label}</dt><dd>${escapeHtml(value || "—")}</dd></div>`;
}

function detailLinkRow(label, url) {
  return `<div><dt>${label}</dt><dd>${url ? `<a href="${escapeHtml(url)}" target="_blank" rel="noopener">リンクを開く ↗</a>` : "—"}</dd></div>`;
}

function closeDetailPanel() {
  state.selectedDocumentId = null;
  detailPanel.classList.remove("open");
  detailBackdrop.classList.add("hidden");
  document.body.classList.remove("detail-open");
}

function openRequestModal() {
  document.querySelector("#requestDocument").innerHTML = state.documents.map((doc) => `<option value="${escapeHtml(doc.id)}">${escapeHtml(doc.name)}</option>`).join("");
  document.querySelector("#requestOwner").innerHTML = state.members.filter((member) => member.isActive).map((member) => `<option value="${escapeHtml(member.email)}">${escapeHtml(member.name)}</option>`).join("");
  document.querySelector("#requestReviewer").innerHTML = state.members.filter((member) => member.isActive).map((member) => `<option value="${escapeHtml(member.email)}">${escapeHtml(member.name)}</option>`).join("");
  const deadline = new Date();
  deadline.setDate(deadline.getDate() + 7);
  document.querySelector("#requestDeadline").value = deadline.toISOString().slice(0, 10);
  requestModal.classList.remove("hidden");
}

function closeRequestModal() {
  requestModal.classList.add("hidden");
  document.querySelector("#requestForm").reset();
}

function openModuleModal(moduleId = "") {
  const module = state.modules.find((item) => item.id === moduleId);
  document.querySelector("#moduleModalTitle").textContent = module ? "モジュールを編集" : "モジュールを追加";
  document.querySelector("#moduleEditId").value = module?.id || "";
  document.querySelector("#moduleName").value = module?.name || "";
  document.querySelector("#moduleDescription").value = module?.description || "";
  document.querySelector("#moduleOwner").innerHTML = state.members.filter((member) => member.isActive).map((member) => `<option value="${escapeHtml(member.email)}">${escapeHtml(member.name)} (${escapeHtml(member.email)})</option>`).join("");
  document.querySelector("#moduleOwner").value = module?.ownerEmail || state.members.find((member) => member.isActive)?.email || "";
  document.querySelector("#moduleActive").checked = module?.isActive ?? true;
  moduleModal.classList.remove("hidden");
  document.querySelector("#moduleName").focus();
}

function closeModuleModal() {
  moduleModal.classList.add("hidden");
  document.querySelector("#moduleForm").reset();
}

function toggleModule(moduleId) {
  const module = state.modules.find((item) => item.id === moduleId);
  if (!module) return;
  module.isActive = !module.isActive;
  module.updatedAt = formatDate(new Date());
  renderModules();
  showToast(`${module.name}を${module.isActive ? "有効" : "無効"}にしました`);
}

function deleteModule(moduleId) {
  const module = state.modules.find((item) => item.id === moduleId);
  if (!module) return;
  if (state.documents.some((doc) => doc.module === module.name)) {
    return showToast("ドキュメントで使用中のモジュールは削除できません", true);
  }
  if (!window.confirm(`${module.name}を削除しますか？`)) return;
  state.modules = state.modules.filter((item) => item.id !== moduleId);
  renderModules();
  showToast("モジュールを削除しました");
}

function parseCsv(text) {
  const rows = [];
  let row = [], field = "", quoted = false;
  const normalized = String(text).replace(/^\uFEFF/, "");
  for (let index = 0; index < normalized.length; index += 1) {
    const char = normalized[index];
    if (quoted) {
      if (char === '"' && normalized[index + 1] === '"') { field += '"'; index += 1; }
      else if (char === '"') quoted = false;
      else field += char;
    } else if (char === '"') quoted = true;
    else if (char === ",") { row.push(field); field = ""; }
    else if (char === "\n") { row.push(field); rows.push(row); row = []; field = ""; }
    else if (char !== "\r") field += char;
  }
  if (quoted) throw new Error("閉じられていないダブルクォートがあります。");
  if (field || row.length) { row.push(field); rows.push(row); }
  const nonEmpty = rows.filter((item) => item.some((cell) => cell.trim() !== ""));
  if (nonEmpty.length < 2) throw new Error("ヘッダーと1件以上のデータが必要です。");
  const headers = nonEmpty[0].map((header) => header.trim().toLowerCase());
  if (new Set(headers).size !== headers.length) throw new Error("CSVヘッダーが重複しています。");
  return nonEmpty.slice(1).map((cells, rowIndex) => ({
    rowNumber: rowIndex + 2,
    values: Object.fromEntries(headers.map((header, index) => [header, (cells[index] ?? "").trim()]))
  }));
}

function requireHeaders(rows, required) {
  const headers = Object.keys(rows[0]?.values || {});
  const missing = required.filter((header) => !headers.includes(header));
  if (missing.length) throw new Error(`必須項目がありません: ${missing.join(", ")}`);
}

function parseBoolean(value, rowNumber, field) {
  const normalized = String(value).trim().toLowerCase();
  if (["true", "1", "yes", "有効", "はい"].includes(normalized)) return true;
  if (["false", "0", "no", "無効", "いいえ"].includes(normalized)) return false;
  throw new Error(`${rowNumber}行目: ${field}はtrue/falseで指定してください。`);
}

async function importMembers(file) {
  try {
    const rows = parseCsv(await file.text());
    requireHeaders(rows, ["email", "name", "role", "department", "is_active"]);
    const imported = rows.map(({ rowNumber, values }) => {
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) throw new Error(`${rowNumber}行目: emailが不正です。`);
      if (!values.name || !values.role) throw new Error(`${rowNumber}行目: nameとroleは必須です。`);
      return { email: values.email.toLowerCase(), name: values.name, role: values.role, department: values.department, isActive: parseBoolean(values.is_active, rowNumber, "is_active") };
    });
    let added = 0, updated = 0;
    imported.forEach((member) => {
      const index = state.members.findIndex((item) => item.email.toLowerCase() === member.email);
      if (index >= 0) { state.members[index] = member; updated += 1; }
      else { state.members.push(member); added += 1; }
    });
    renderMembers();
    showToast(`${added}件追加、${updated}件更新しました`);
  } catch (error) {
    showToast(`CSV取込エラー: ${error.message}`, true);
  }
}

async function importDocuments(file) {
  const required = ["document_id", "title", "module", "category", "box_url", "support_url", "owner_email", "manager_role", "status", "priority", "due_date", "memo", "is_managed"];
  try {
    const rows = parseCsv(await file.text());
    requireHeaders(rows, required);
    const imported = rows.map(({ rowNumber, values }) => {
      if (!values.document_id && !values.title) throw new Error(`${rowNumber}行目: document_idまたはtitleが必要です。`);
      if (!values.title || !values.module || !values.owner_email) throw new Error(`${rowNumber}行目: title、module、owner_emailは必須です。`);
      if (!memberByEmail(values.owner_email)) throw new Error(`${rowNumber}行目: owner_emailに一致するユーザーがいません。`);
      if (values.due_date && Number.isNaN(Date.parse(values.due_date))) throw new Error(`${rowNumber}行目: due_dateが不正です。`);
      return {
        id: values.document_id || `DOC-${String(state.documents.length + rowNumber).padStart(3, "0")}`, name: values.title,
        module: values.module, category: values.category, boxUrl: values.box_url, supportUrl: values.support_url,
        ownerEmail: values.owner_email.toLowerCase(), managerRole: values.manager_role, status: values.status || "未着手",
        priority: values.priority || "中", dueDate: values.due_date, memo: values.memo,
        isManaged: parseBoolean(values.is_managed, rowNumber, "is_managed"), updated: formatDateTime(new Date()), updatedBy: "CSVインポート"
      };
    });
    let added = 0, updated = 0;
    imported.forEach((doc) => {
      const index = state.documents.findIndex((item) => item.id === doc.id || item.name.toLowerCase() === doc.name.toLowerCase());
      if (index >= 0) { state.documents[index] = { ...state.documents[index], ...doc }; updated += 1; }
      else { state.documents.push(doc); added += 1; }
      if (!state.modules.some((module) => module.name.toLowerCase() === doc.module.toLowerCase())) {
        state.modules.push({ id: nextModuleId(), name: doc.module, description: "CSVインポートで自動追加", ownerEmail: doc.ownerEmail, isActive: true, createdAt: formatDate(new Date()), updatedAt: formatDate(new Date()) });
      }
    });
    document.querySelector("#documentNavCount").textContent = state.documents.length;
    renderDocuments();
    bindCommonInteractions();
    showToast(`${added}件追加、${updated}件更新しました`);
  } catch (error) {
    showToast(`CSV取込エラー: ${error.message}`, true);
  }
}

function csvEscape(value) {
  const string = String(value ?? "");
  return /[",\r\n]/.test(string) ? `"${string.replace(/"/g, '""')}"` : string;
}

function downloadCsv(filename, headers, rows) {
  const content = [headers.join(","), ...rows.map((row) => row.map(csvEscape).join(","))].join("\r\n");
  const url = URL.createObjectURL(new Blob([`\uFEFF${content}`], { type: "text/csv;charset=utf-8" }));
  const anchor = document.createElement("a");
  anchor.href = url; anchor.download = filename; document.body.appendChild(anchor); anchor.click(); anchor.remove();
  URL.revokeObjectURL(url);
}

function exportMembers() {
  downloadCsv("members.csv", ["email", "name", "role", "department", "is_active"],
    state.members.map((member) => [member.email, member.name, member.role, member.department, member.isActive]));
  showToast("ユーザーCSVを出力しました");
}

function exportDocuments() {
  const headers = ["document_id", "title", "module", "category", "box_url", "support_url", "owner_email", "manager_role", "status", "priority", "due_date", "memo", "is_managed"];
  downloadCsv("documents.csv", headers, state.documents.map((doc) => [doc.id, doc.name, doc.module, doc.category, doc.boxUrl, doc.supportUrl, doc.ownerEmail, doc.managerRole, doc.status, doc.priority, doc.dueDate, doc.memo, doc.isManaged]));
  showToast("ドキュメントCSVを出力しました");
}

function formatDate(date) {
  return `${date.getFullYear()}/${String(date.getMonth() + 1).padStart(2, "0")}/${String(date.getDate()).padStart(2, "0")}`;
}

function formatDateTime(date) {
  return `${formatDate(date)} ${String(date.getHours()).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")}`;
}

function nextModuleId() {
  const max = Math.max(0, ...state.modules.map((module) => Number(module.id.replace(/\D/g, "")) || 0));
  return `MOD-${String(max + 1).padStart(3, "0")}`;
}

function showToast(message, isError = false) {
  toast.querySelector("span").textContent = isError ? "!" : "✓";
  toast.querySelector("p").textContent = message;
  toast.classList.toggle("error", isError);
  toast.classList.remove("hidden");
  clearTimeout(showToast.timer);
  showToast.timer = window.setTimeout(() => toast.classList.add("hidden"), isError ? 5000 : 3000);
}

document.querySelectorAll(".nav-item[data-page]").forEach((item) => item.addEventListener("click", () => navigate(item.dataset.page)));
document.querySelector("#newRequestButton").addEventListener("click", openRequestModal);
document.querySelector("#closeModal").addEventListener("click", closeRequestModal);
document.querySelector("#cancelModal").addEventListener("click", closeRequestModal);
document.querySelector("#closeModuleModal").addEventListener("click", closeModuleModal);
document.querySelector("#cancelModuleModal").addEventListener("click", closeModuleModal);
document.querySelector("#mobileMenu").addEventListener("click", () => document.querySelector(".sidebar").classList.toggle("open"));
detailBackdrop.addEventListener("click", closeDetailPanel);
requestModal.addEventListener("click", (event) => { if (event.target === requestModal) closeRequestModal(); });
moduleModal.addEventListener("click", (event) => { if (event.target === moduleModal) closeModuleModal(); });

document.querySelector("#globalSearch").addEventListener("input", (event) => {
  state.search = event.target.value;
  if (state.search && !["documents", "requests"].includes(state.page)) state.page = "documents";
  render();
});

document.querySelector("#memberCsvInput").addEventListener("change", async (event) => {
  const [file] = event.target.files; if (file) await importMembers(file); event.target.value = "";
});
document.querySelector("#documentCsvInput").addEventListener("change", async (event) => {
  const [file] = event.target.files; if (file) await importDocuments(file); event.target.value = "";
});

document.querySelector("#moduleForm").addEventListener("submit", (event) => {
  event.preventDefault();
  const editId = document.querySelector("#moduleEditId").value;
  const name = document.querySelector("#moduleName").value.trim();
  const duplicate = state.modules.find((module) => module.name.toLowerCase() === name.toLowerCase() && module.id !== editId);
  if (duplicate) return showToast("同名のモジュールが既にあります", true);
  const existing = state.modules.find((module) => module.id === editId);
  const values = { name, description: document.querySelector("#moduleDescription").value.trim(), ownerEmail: document.querySelector("#moduleOwner").value, isActive: document.querySelector("#moduleActive").checked, updatedAt: formatDate(new Date()) };
  if (existing) {
    const oldName = existing.name;
    Object.assign(existing, values);
    state.documents.forEach((doc) => { if (doc.module === oldName) doc.module = name; });
  } else state.modules.push({ id: nextModuleId(), ...values, createdAt: formatDate(new Date()) });
  closeModuleModal(); renderModules(); showToast(existing ? "モジュールを更新しました" : "モジュールを追加しました");
});

document.querySelector("#requestForm").addEventListener("submit", (event) => {
  event.preventDefault();
  const documentId = document.querySelector("#requestDocument").value;
  const doc = state.documents.find((item) => item.id === documentId);
  const deadlineValue = document.querySelector("#requestDeadline").value;
  const deadlineDate = new Date(`${deadlineValue}T00:00:00`);
  state.requests.unshift({
    id: `REQ-${109 + state.requests.length - 5}`, documentId, title: doc.name,
    reason: document.querySelector("#requestReason").value, priority: document.querySelector("#requestPriority").value,
    status: "未着手", ownerEmail: document.querySelector("#requestOwner").value,
    deadline: `${deadlineDate.getMonth() + 1}月${deadlineDate.getDate()}日`, overdue: false
  });
  doc.status = "未着手"; doc.priority = document.querySelector("#requestPriority").value; doc.dueDate = deadlineValue;
  state.activityLogs.unshift({ documentId, time: formatDateTime(new Date()), actor: "加藤 翔太", action: "更新依頼作成", detail: document.querySelector("#requestReason").value });
  document.querySelector("#requestNavCount").textContent = state.requests.length;
  closeRequestModal(); showToast("更新依頼を作成しました"); render();
});

document.addEventListener("keydown", (event) => {
  if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") { event.preventDefault(); document.querySelector("#globalSearch").focus(); }
  if (event.key === "Escape") {
    closeDetailPanel();
    if (!requestModal.classList.contains("hidden")) closeRequestModal();
    if (!moduleModal.classList.contains("hidden")) closeModuleModal();
  }
});

document.querySelector("#documentNavCount").textContent = state.documents.length;
document.querySelector("#requestNavCount").textContent = state.requests.length;
render();
