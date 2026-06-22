const state = {
  page: "dashboard",
  search: "",
  statusFilter: "すべて",
  moduleFilter: "すべて",
  documents: [
    { id: "DOC-024", name: "Falcon Platform 製品紹介資料", category: "製品紹介資料", module: "Falcon", owner: "田中 美咲", initials: "TM", avatar: "green", status: "レビュー待ち", updated: "2026/06/18" },
    { id: "DOC-023", name: "FDR 導入ガイド", category: "導入手順書", module: "FDR", owner: "佐藤 健", initials: "SK", avatar: "blue", status: "対応中", updated: "2026/06/17" },
    { id: "DOC-022", name: "Cloud Security 提案テンプレート", category: "提案資料", module: "Cloud Security", owner: "鈴木 彩", initials: "SA", avatar: "orange", status: "差し戻し", updated: "2026/06/15" },
    { id: "DOC-021", name: "Identity Protection POVガイド", category: "POVガイド", module: "Identity", owner: "山本 拓也", initials: "YT", avatar: "purple", status: "対応中", updated: "2026/06/14" },
    { id: "DOC-020", name: "NG-SIEM 操作手順書", category: "操作手順書", module: "NG-SIEM", owner: "田中 美咲", initials: "TM", avatar: "green", status: "完了", updated: "2026/06/12" },
    { id: "DOC-019", name: "Mobile FAQ", category: "FAQ", module: "Mobile", owner: "佐藤 健", initials: "SK", avatar: "blue", status: "未着手", updated: "2026/06/10" },
    { id: "DOC-018", name: "Shield 運用設計ガイド", category: "運用ドキュメント", module: "Shield", owner: "鈴木 彩", initials: "SA", avatar: "orange", status: "保留", updated: "2026/06/08" }
  ],
  requests: [
    { id: "REQ-108", documentId: "DOC-024", title: "Falcon Platform 製品紹介資料", reason: "新機能Charlotte AI Detection Triageの追記", priority: "高", status: "レビュー待ち", owner: "田中 美咲", initials: "TM", avatar: "green", deadline: "6月23日", overdue: false },
    { id: "REQ-107", documentId: "DOC-023", title: "FDR 導入ガイド", reason: "セットアップ画面のUI変更を反映", priority: "中", status: "対応中", owner: "佐藤 健", initials: "SK", avatar: "blue", deadline: "6月25日", overdue: false },
    { id: "REQ-106", documentId: "DOC-022", title: "Cloud Security 提案テンプレート", reason: "レビュー指摘3点の修正", priority: "高", status: "差し戻し", owner: "鈴木 彩", initials: "SA", avatar: "orange", deadline: "2日超過", overdue: true },
    { id: "REQ-105", documentId: "DOC-021", title: "Identity Protection POVガイド", reason: "検証シナリオと推奨設定の更新", priority: "中", status: "対応中", owner: "山本 拓也", initials: "YT", avatar: "purple", deadline: "6月28日", overdue: false },
    { id: "REQ-104", documentId: "DOC-019", title: "Mobile FAQ", reason: "iOS最新版の既知問題を追加", priority: "低", status: "未着手", owner: "佐藤 健", initials: "SK", avatar: "blue", deadline: "6月30日", overdue: false }
  ],
  history: [
    { title: "NG-SIEM 操作手順書を正式版へ反映", description: "検索画面とダッシュボードの操作手順を最新UIに更新しました。", user: "田中 美咲", time: "2026/06/20 16:42", type: "MERGE" },
    { title: "Falcon Platform 製品紹介資料のレビューを依頼", description: "Charlotte AI Detection Triageの紹介スライドを5ページ追加しました。", user: "田中 美咲", time: "2026/06/18 14:18", type: "REVIEW" },
    { title: "Cloud Security 提案テンプレートを差し戻し", description: "ライセンス体系の表記と構成図について修正コメントが追加されました。", user: "高橋 直子", time: "2026/06/17 11:05", type: "COMMENT" },
    { title: "FDR 導入ガイドの更新を開始", description: "セットアップ画面の変更に伴うスクリーンショット差し替えを開始しました。", user: "佐藤 健", time: "2026/06/16 09:30", type: "UPDATE" }
  ]
};

const app = document.querySelector("#app");
const modal = document.querySelector("#requestModal");
const toast = document.querySelector("#toast");

function statusBadge(status) {
  return `<span class="status-badge status-${status}">${status}</span>`;
}

function avatar(initials, color = "green") {
  return `<span class="avatar ${color}">${initials}</span>`;
}

function metricCard(label, value, note, icon, accent = "var(--green)", soft = "var(--green-soft)") {
  return `
    <article class="metric-card" style="--accent:${accent};--accent-soft:${soft}">
      <div class="metric-top"><span>${label}</span><span class="metric-icon">${icon}</span></div>
      <div class="metric-value">${value}</div>
      <div class="metric-note">${note}</div>
    </article>`;
}

function pageHeader(eyebrow, title, description, showDate = true) {
  return `
    <header class="page-header">
      <div><p class="eyebrow">${eyebrow}</p><h1>${title}</h1><p>${description}</p></div>
      ${showDate ? '<div class="date-chip">◷ 2026年6月22日（月）</div>' : ""}
    </header>`;
}

function requestRows(requests) {
  if (!requests.length) return '<div class="empty-state">条件に一致する更新依頼はありません。</div>';
  return requests.map((request) => `
    <article class="request-row" data-request-id="${request.id}">
      <span class="priority-dot ${request.priority === "高" ? "high" : request.priority === "中" ? "medium" : ""}"></span>
      <div>
        <p class="request-title">${request.title}</p>
        <div class="request-meta"><span>${request.id}</span><span>${request.reason}</span></div>
      </div>
      <div class="request-side">
        ${statusBadge(request.status)}
        ${avatar(request.initials, request.avatar)}
        <span class="deadline ${request.overdue ? "overdue" : ""}">${request.overdue ? "⚠ " : ""}${request.deadline}</span>
      </div>
    </article>`).join("");
}

function renderDashboard() {
  const statuses = [
    ["対応中", 7, 29, "#3976a8"], ["レビュー待ち", 4, 17, "#d0872d"],
    ["未着手", 5, 21, "#8a958f"], ["完了", 8, 33, "#2d8b62"]
  ];
  app.innerHTML = `
    <section class="page">
      ${pageHeader("OVERVIEW", "おはようございます、加藤さん", "ドキュメントの更新状況を確認しましょう。")}
      <div class="metrics">
        ${metricCard("総ドキュメント", "24", "<strong>＋3</strong> 今月追加", "▤")}
        ${metricCard("更新対応中", "7", "全体の 29%", "↗", "#346a9c", "#e9f1f8")}
        ${metricCard("レビュー待ち", "4", "確認をお願いします", "◎", "#b96c16", "#fff3df")}
        ${metricCard("期限超過", "2", "<strong>要対応</strong> 2件", "!", "#bd4242", "#fcebea")}
      </div>
      <div class="dashboard-grid">
        <section class="panel">
          <div class="panel-header"><h2>優先度の高い更新依頼</h2><button class="text-button" data-navigate="requests">すべて見る →</button></div>
          <div class="request-list">${requestRows(state.requests.slice(0, 5))}</div>
        </section>
        <div class="right-column">
          <section class="panel progress-panel">
            <div class="panel-header"><h2>ステータス別</h2><button class="text-button">今月⌄</button></div>
            <div class="progress-list">
              ${statuses.map(([name, count, width, color]) => `
                <div class="progress-item">
                  <div class="progress-item-top"><span>${name}</span><span>${count}件</span></div>
                  <div class="progress-track"><div class="progress-fill" style="width:${width}%;--bar:${color}"></div></div>
                </div>`).join("")}
            </div>
            <div class="legend">
              ${statuses.map(([name, , , color]) => `<span style="--bar:${color}"><i></i>${name}</span>`).join("")}
            </div>
          </section>
          <section class="panel activity-panel">
            <div class="panel-header"><h2>最近のアクティビティ</h2><button class="text-button" data-navigate="history">履歴 →</button></div>
            <div class="activity-list">
              ${state.history.slice(0, 3).map((item, index) => `
                <div class="activity-item">
                  ${avatar(["TM", "TN", "SK"][index], ["green", "orange", "blue"][index])}
                  <div><p>${item.title}</p><time>${item.time}</time></div>
                </div>`).join("")}
            </div>
          </section>
        </div>
      </div>
    </section>`;
}

function getFilteredDocuments() {
  const query = state.search.toLowerCase();
  return state.documents.filter((doc) => {
    const matchesSearch = [doc.name, doc.category, doc.module, doc.owner, doc.id].some((value) => value.toLowerCase().includes(query));
    const matchesStatus = state.statusFilter === "すべて" || doc.status === state.statusFilter;
    const matchesModule = state.moduleFilter === "すべて" || doc.module === state.moduleFilter;
    return matchesSearch && matchesStatus && matchesModule;
  });
}

function renderDocuments() {
  const docs = getFilteredDocuments();
  const modules = [...new Set(state.documents.map((doc) => doc.module))];
  app.innerHTML = `
    <section class="page">
      ${pageHeader("DOCUMENTS", "ドキュメント台帳", "管理対象の資料と更新状況を一覧で確認できます。")}
      <div class="toolbar">
        <input class="filter-input" id="documentSearch" type="search" placeholder="資料名、担当者で検索..." value="${state.search}">
        <select class="filter-select" id="statusFilter">
          ${["すべて", "未着手", "対応中", "レビュー待ち", "差し戻し", "完了", "保留"].map((item) => `<option ${state.statusFilter === item ? "selected" : ""}>${item}</option>`).join("")}
        </select>
        <select class="filter-select" id="moduleFilter">
          ${["すべて", ...modules].map((item) => `<option ${state.moduleFilter === item ? "selected" : ""}>${item}</option>`).join("")}
        </select>
      </div>
      <section class="panel table-panel">
        <table class="data-table">
          <thead><tr><th>ドキュメント</th><th>モジュール</th><th>担当者</th><th>ステータス</th><th>最終更新</th></tr></thead>
          <tbody>
            ${docs.map((doc) => `
              <tr>
                <td class="doc-cell"><strong>${doc.name}</strong><span>${doc.id} · ${doc.category}</span></td>
                <td><span class="module-pill">${doc.module}</span></td>
                <td><div class="owner-cell">${avatar(doc.initials, doc.avatar)}${doc.owner}</div></td>
                <td>${statusBadge(doc.status)}</td>
                <td>${doc.updated}</td>
              </tr>`).join("")}
          </tbody>
        </table>
        ${docs.length ? "" : '<div class="empty-state">条件に一致するドキュメントはありません。</div>'}
      </section>
    </section>`;
  bindDocumentFilters();
}

function renderRequests() {
  const query = state.search.toLowerCase();
  const requests = state.requests.filter((request) => [request.title, request.reason, request.owner, request.id].some((value) => value.toLowerCase().includes(query)));
  app.innerHTML = `
    <section class="page">
      ${pageHeader("REQUESTS", "更新依頼", "更新作業の担当・期限・レビュー状況を管理します。")}
      <div class="toolbar">
        <input class="filter-input" id="requestSearch" type="search" placeholder="更新依頼を検索..." value="${state.search}">
      </div>
      <section class="panel">
        <div class="panel-header"><h2>更新依頼一覧 <span style="color:var(--muted);font-weight:400">(${requests.length})</span></h2><button class="text-button" id="inlineNewRequest">＋ 新規作成</button></div>
        <div class="request-list">${requestRows(requests)}</div>
      </section>
    </section>`;
  document.querySelector("#requestSearch").addEventListener("input", (event) => { state.search = event.target.value; renderRequests(); });
  document.querySelector("#inlineNewRequest").addEventListener("click", openModal);
}

function renderHistory() {
  app.innerHTML = `
    <section class="page">
      ${pageHeader("HISTORY", "更新履歴", "誰が、いつ、何を変更したかを時系列で確認できます。")}
      <div class="history-timeline">
        ${state.history.map((item) => `
          <article class="history-item">
            <div class="history-dot">✓</div>
            <div class="history-card">
              <p class="eyebrow">${item.type}</p>
              <h3>${item.title}</h3>
              <p>${item.description}</p>
              <div class="history-meta"><span>担当: ${item.user}</span><time>${item.time}</time></div>
            </div>
          </article>`).join("")}
      </div>
    </section>`;
}

function renderPlaceholder(title, icon) {
  app.innerHTML = `
    <section class="page placeholder-page">
      <div><div class="placeholder-icon">${icon}</div><h1>${title}</h1><p>この機能は次の開発フェーズで実装予定です。</p></div>
    </section>`;
}

function render() {
  document.querySelectorAll(".nav-item[data-page]").forEach((item) => item.classList.toggle("active", item.dataset.page === state.page));
  if (state.page === "dashboard") renderDashboard();
  else if (state.page === "documents") renderDocuments();
  else if (state.page === "requests") renderRequests();
  else if (state.page === "history") renderHistory();
  else if (state.page === "members") renderPlaceholder("メンバー管理", "♙");
  else renderPlaceholder("設定", "⚙");
  bindNavigationLinks();
}

function navigate(page) {
  state.page = page;
  state.search = "";
  render();
  document.querySelector(".sidebar").classList.remove("open");
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function bindNavigationLinks() {
  document.querySelectorAll("[data-navigate]").forEach((button) => button.addEventListener("click", () => navigate(button.dataset.navigate)));
}

function bindDocumentFilters() {
  document.querySelector("#documentSearch").addEventListener("input", (event) => { state.search = event.target.value; renderDocuments(); });
  document.querySelector("#statusFilter").addEventListener("change", (event) => { state.statusFilter = event.target.value; renderDocuments(); });
  document.querySelector("#moduleFilter").addEventListener("change", (event) => { state.moduleFilter = event.target.value; renderDocuments(); });
}

function openModal() {
  const select = document.querySelector("#requestDocument");
  select.innerHTML = state.documents.map((doc) => `<option value="${doc.id}">${doc.name}</option>`).join("");
  const deadline = new Date();
  deadline.setDate(deadline.getDate() + 7);
  document.querySelector("#requestDeadline").value = deadline.toISOString().slice(0, 10);
  modal.classList.remove("hidden");
  document.querySelector("#requestReason").focus();
}

function closeModal() {
  modal.classList.add("hidden");
  document.querySelector("#requestForm").reset();
}

function showToast(message) {
  toast.querySelector("p").textContent = message;
  toast.classList.remove("hidden");
  window.setTimeout(() => toast.classList.add("hidden"), 3000);
}

document.querySelectorAll(".nav-item[data-page]").forEach((item) => item.addEventListener("click", () => navigate(item.dataset.page)));
document.querySelector("#newRequestButton").addEventListener("click", openModal);
document.querySelector("#closeModal").addEventListener("click", closeModal);
document.querySelector("#cancelModal").addEventListener("click", closeModal);
document.querySelector("#mobileMenu").addEventListener("click", () => document.querySelector(".sidebar").classList.toggle("open"));
modal.addEventListener("click", (event) => { if (event.target === modal) closeModal(); });

document.querySelector("#globalSearch").addEventListener("input", (event) => {
  state.search = event.target.value;
  if (state.search && !["documents", "requests"].includes(state.page)) state.page = "documents";
  render();
});

document.querySelector("#requestForm").addEventListener("submit", (event) => {
  event.preventDefault();
  const documentId = document.querySelector("#requestDocument").value;
  const documentData = state.documents.find((doc) => doc.id === documentId);
  const owner = document.querySelector("#requestOwner").value;
  const ownerMap = {
    "田中 美咲": ["TM", "green"], "佐藤 健": ["SK", "blue"],
    "鈴木 彩": ["SA", "orange"], "山本 拓也": ["YT", "purple"]
  };
  const deadlineValue = document.querySelector("#requestDeadline").value;
  const deadlineDate = new Date(`${deadlineValue}T00:00:00`);
  const [initials, color] = ownerMap[owner];
  state.requests.unshift({
    id: `REQ-${109 + state.requests.length - 5}`,
    documentId,
    title: documentData.name,
    reason: document.querySelector("#requestReason").value,
    priority: document.querySelector("#requestPriority").value,
    status: "未着手",
    owner,
    initials,
    avatar: color,
    deadline: `${deadlineDate.getMonth() + 1}月${deadlineDate.getDate()}日`,
    overdue: false
  });
  documentData.status = "未着手";
  document.querySelector("#requestNavCount").textContent = state.requests.length;
  closeModal();
  showToast("更新依頼を作成しました");
  if (state.page === "dashboard" || state.page === "requests") render();
});

document.addEventListener("keydown", (event) => {
  if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
    event.preventDefault();
    document.querySelector("#globalSearch").focus();
  }
  if (event.key === "Escape" && !modal.classList.contains("hidden")) closeModal();
});

render();
