// Supabase configuration. The publishable/anon key is intended for browser use.
// NEVER put a service_role or secret key in this file.
const SUPABASE_URL = "https://uogckssolwkmvtyqslqm.supabase.co";
const SUPABASE_KEY = "sb_publishable_gLmUH3fZ9eWOO_TRflgnQw_ZGdfmknQ";

// Confirm the exact student email domain(s) with Waseda before deployment.
// This is a user-interface check; database policies below also restrict review writes.
const ALLOWED_EMAIL_DOMAINS = ["waseda.jp"];

const supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true
  }
});
const $ = (id) => document.getElementById(id);

const translations = {
  en: {
    brand:"Course Reviews", subtitle:"Course feedback platform", search:"Search courses or instructors...",
    sortName:"Course name", sortWorkload:"Workload", sortEasiness:"Easiness", sortSatisfaction:"Satisfaction",
    allCategories:"All categories", catGrammar:"Grammar", catWrittenExpression:"Written Expression", catReadingComprehension:"Reading Comprehension", catListeningComprehension:"Listening Comprehension", catSocietyCulture:"Society and Culture", catOralExpression:"Oral Expression", catVocabulary:"Vocabulary", catBusinessJapanese:"Business Japanese", catAcademicJapanese:"Academic Japanese", catZeroBeginners:"Japanese for 'Zero' Beginners", catKanji:"Skill-based Japanese(Kanji)", catConversation:"Skill-based Japanese(Conversation)", catNihongo:"Nihongo", catComprehensiveJapanese:"Comprehensive Japanese",
    instructor:"Instructor", noResults:"No matching courses found.", noReviews:"No reviews yet", firstReview:"No reviews yet. Be the first to review this course.",
    reviews:"Reviews", back:"← Back to courses", workload:"Workload", easiness:"Easiness", satisfaction:"Satisfaction",
    workloadScale:"1 = light · 5 = heavy", easinessScale:"1 = difficult · 5 = easy", satisfactionScale:"1 = low · 5 = high", comment:"Comment",
    commentPlaceholder:"Share your experience (optional)", veryLight:"1 — Very light", light:"2 — Light", moderate:"3 — Moderate", heavy:"4 — Heavy", veryHeavy:"5 — Very heavy",
    veryDifficult:"1 — Very difficult", difficult:"2 — Difficult", easy:"4 — Easy", veryEasy:"5 — Very easy", veryLow:"1 — Very low", low:"2 — Low", average:"3 — Average", high:"4 — High", veryHigh:"5 — Very high",
    submit:"Submit review", noRatings:"No reviews yet", ratingSummary:"satisfaction", reviewSingular:"review", reviewPlural:"reviews",
    loadError:"Could not load courses. Please check the connection and permissions.", invalidRating:"Ratings must be between 1 and 5.",
    loginTitle:"Student login", loginDescription:"Enter your Waseda email to receive a one-time code.", emailLabel:"Waseda email", sendCode:"Send code",
    codeLabel:"Email verification code", verifyCode:"Verify and log in", changeEmail:"Use another email", signedInAs:"Signed in as", signOut:"Sign out",
    emailDomainError:"Use an approved Waseda email address.", codeSent:"A code was sent if the address is eligible. Check your inbox and spam folder.",
    loginRequired:"Sign in with your Waseda email to submit a review.", alreadyReviewed:"You have already reviewed this course with this account.",
    reviewLoadError:"Could not load reviews. Check the Supabase table and RLS policies.", reviewSaveError:"Could not save review. Check the database setup and try again.",
    reviewSaved:"Your review has been submitted.", oneReviewRule:"Each signed-in account can submit one review per course.",
    sendCodeError:"Could not send the code. Check the email settings and try again.", verifyCodeError:"That code is invalid or expired. Request a new code.",
    signedOut:"You have signed out.", signOutError:"Could not sign out. Please try again.", otpPrompt:"Enter the code from your email.",
    duplicateReview:"This account already has a review for this course.", reviewDate:"Submitted", genericError:"Something went wrong. Please try again."
  },
  zh: {
    brand:"课程评价", subtitle:"课程反馈平台", search:"搜索课程名称或教员姓名……",
    sortName:"课程名称", sortWorkload:"课程工作量", sortEasiness:"容易程度", sortSatisfaction:"满意度",
    allCategories:"所有类别", catGrammar:"语法", catWrittenExpression:"书面表达", catReadingComprehension:"阅读理解", catListeningComprehension:"听力理解", catSocietyCulture:"社会与文化", catOralExpression:"口语表达", catVocabulary:"词汇", catBusinessJapanese:"商务日语", catAcademicJapanese:"学术日语", catZeroBeginners:"日语零基础入门", catKanji:"专项日语（汉字）", catConversation:"专项日语（会话）", catNihongo:"日本语（Nihongo）", catComprehensiveJapanese:"综合日语",
    instructor:"教员", noResults:"没有找到符合条件的课程。", noReviews:"暂无评价", firstReview:"暂无评价，成为第一个评价这门课程的人吧。",
    reviews:"课程评价", back:"← 返回课程列表", workload:"工作量", easiness:"容易程度", satisfaction:"满意度",
    workloadScale:"1 = 很轻 · 5 = 很重", easinessScale:"1 = 很难 · 5 = 很容易", satisfactionScale:"1 = 很低 · 5 = 很高", comment:"评论",
    commentPlaceholder:"分享你的课程体验（选填）", veryLight:"1 — 非常轻松", light:"2 — 轻松", moderate:"3 — 适中", heavy:"4 — 较重", veryHeavy:"5 — 非常重",
    veryDifficult:"1 — 非常困难", difficult:"2 — 困难", easy:"4 — 容易", veryEasy:"5 — 非常容易", veryLow:"1 — 非常低", low:"2 — 低", average:"3 — 一般", high:"4 — 高", veryHigh:"5 — 非常高",
    submit:"提交评价", noRatings:"暂无评价", ratingSummary:"满意度", reviewSingular:"条评价", reviewPlural:"条评价",
    loadError:"课程加载失败，请检查网络连接和读取权限。", invalidRating:"评分必须在 1 到 5 之间。",
    loginTitle:"学生登录", loginDescription:"输入你的早稻田邮箱以接收一次性验证码。", emailLabel:"早稻田邮箱", sendCode:"发送验证码",
    codeLabel:"邮箱验证码", verifyCode:"验证并登录", changeEmail:"更换邮箱", signedInAs:"当前登录账号：", signOut:"退出登录",
    emailDomainError:"请输入获准使用的早稻田邮箱地址。", codeSent:"如果该邮箱符合要求，验证码已发送。请检查收件箱和垃圾邮件。",
    loginRequired:"请使用早稻田邮箱登录后再提交评价。", alreadyReviewed:"你已使用当前账号评价过这门课程。",
    reviewLoadError:"评价加载失败，请检查 Supabase 数据表和 RLS 策略。", reviewSaveError:"评价保存失败，请检查数据库配置后重试。",
    reviewSaved:"评价已提交。", oneReviewRule:"每个登录账号对每门课程只能提交一条评价。",
    sendCodeError:"验证码发送失败，请检查邮箱设置后重试。", verifyCodeError:"验证码无效或已过期，请重新获取验证码。",
    signedOut:"已退出登录。", signOutError:"退出登录失败，请重试。", otpPrompt:"请输入邮件中的验证码。",
    duplicateReview:"当前账号已经评价过这门课程。", reviewDate:"提交时间", genericError:"发生错误，请重试。"
  }
};

let currentLanguage = localStorage.getItem("course-review-language") || "en";
let courses = [];
let reviews = [];
let currentCourse = null;
let currentUser = null;
let pendingEmail = "";
const t = (key) => translations[currentLanguage][key] || key;

function applyLanguage() {
  document.documentElement.lang = currentLanguage === "zh" ? "zh-CN" : "en";
  document.querySelectorAll("[data-i18n]").forEach((element) => {
    const key = element.dataset.i18n;
    if (translations[currentLanguage][key]) element.textContent = t(key);
  });
  document.querySelectorAll("[data-i18n-placeholder]").forEach((element) => {
    element.placeholder = t(element.dataset.i18nPlaceholder);
  });
  $("languageToggle").textContent = currentLanguage === "en" ? "中文" : "English";
  $("languageToggle").setAttribute("aria-label", currentLanguage === "en" ? "Switch to Chinese" : "切换到英文");
  renderCourses();
  if (currentCourse) renderCourseDetails();
  updateAuthUI();
}

function courseKey(course) {
  // Keep the course ID as text to match the SQL table's course_id column.
  return String(course["Course ID"] ?? course["Course Name"] ?? "");
}
function getCourseCategory(course) {
  return String(course["Category"] ?? course["Course Category"] ?? course["Course Type"] ?? course["カテゴリー"] ?? "").trim();
}
function normalizeCategory(value) {
  return String(value ?? "").trim().toLowerCase().replace(/\s+/g, "");
}
function average(items, field) {
  if (!items.length) return null;
  return (items.reduce((sum, item) => sum + Number(item[field]), 0) / items.length).toFixed(1);
}
function getCourseReviews(course) {
  const key = courseKey(course);
  return reviews.filter((review) => String(review.course_id) === key);
}
function myReviewForCourse(course) {
  if (!currentUser) return null;
  return getCourseReviews(course).find((review) => review.user_id === currentUser.id) || null;
}

async function loadCourses() {
  const { data, error } = await supabaseClient.from("CJL Courses").select("*");
  if (error) {
    console.error("Failed to load courses:", error);
    $("course-list").textContent = t("loadError");
    return;
  }
  courses = data || [];
  renderCourses();
}
async function loadReviews() {
  const { data, error } = await supabaseClient.from("reviews")
    .select("id, course_id, user_id, workload, easiness, satisfaction, comment, created_at")
    .order("created_at", { ascending: true });
  if (error) {
    console.error("Failed to load reviews:", error);
    $("reviewList").textContent = t("reviewLoadError");
    return false;
  }
  reviews = data || [];
  renderCourses();
  if (currentCourse) renderCourseDetails();
  return true;
}
function getVisibleCourses() {
  const query = $("searchInput").value.trim().toLowerCase();
  const selectedCategory = $("categoryFilter").value;
  const sortBy = $("sortSelect").value;
  const filtered = courses.filter((course) => {
    const matchesSearch =
      String(course["Course Name"] ?? "").toLowerCase().includes(query) ||
      String(course["Instructor"] ?? "").toLowerCase().includes(query);
    const matchesCategory = !selectedCategory ||
      normalizeCategory(getCourseCategory(course)) === normalizeCategory(selectedCategory);
    return matchesSearch && matchesCategory;
  });
  filtered.sort((a, b) => {
    if (sortBy === "name") return String(a["Course Name"] ?? "").localeCompare(String(b["Course Name"] ?? ""));
    const ar = getCourseReviews(a), br = getCourseReviews(b);
    if (!ar.length && br.length) return 1;
    if (ar.length && !br.length) return -1;
    return Number(average(br, sortBy) ?? 0) - Number(average(ar, sortBy) ?? 0);
  });
  return filtered;
}
function renderCourses() {
  const list = $("course-list");
  if (!list) return;
  list.replaceChildren();
  const visibleCourses = getVisibleCourses();
  if (!visibleCourses.length) {
    const empty = document.createElement("p");
    empty.className = "empty-state";
    empty.textContent = t("noResults");
    list.appendChild(empty);
    return;
  }
  visibleCourses.forEach((course) => {
    const card = document.createElement("button");
    card.type = "button";
    card.className = "course-card";
    card.addEventListener("click", () => openCourse(course));
    const name = document.createElement("h3");
    name.textContent = course["Course Name"] ?? "Unnamed Course";
    const instructor = document.createElement("p");
    instructor.textContent = `${t("instructor")}: ${course["Instructor"] ?? "Unknown"}`;
    const courseReviews = getCourseReviews(course);
    const stats = document.createElement("p");
    stats.className = "course-card-stats";
    stats.textContent = courseReviews.length
      ? `★ ${average(courseReviews, "satisfaction")} ${t("ratingSummary")} · ${courseReviews.length} ${courseReviews.length === 1 ? t("reviewSingular") : t("reviewPlural")}`
      : t("noReviews");
    card.append(name, instructor, stats);
    list.appendChild(card);
  });
}
function openCourse(course) {
  currentCourse = course;
  $("detailCourseName").textContent = course["Course Name"] ?? "Unnamed Course";
  $("detailInstructor").textContent = `${t("instructor")}: ${course["Instructor"] ?? "Unknown"}`;
  renderCourseDetails();
  $("courseDetails").classList.remove("hidden");
  document.body.classList.add("modal-open");
  $("backButton").focus();
}
function closeCourse() {
  $("courseDetails").classList.add("hidden");
  document.body.classList.remove("modal-open");
  currentCourse = null;
}
function renderCourseDetails() {
  if (!currentCourse) return;
  const courseReviews = getCourseReviews(currentCourse);
  $("detailWorkload").textContent = average(courseReviews, "workload") ?? "—";
  $("detailEasiness").textContent = average(courseReviews, "easiness") ?? "—";
  $("detailSatisfaction").textContent = average(courseReviews, "satisfaction") ?? "—";
  const list = $("reviewList");
  list.replaceChildren();
  if (!courseReviews.length) {
    const empty = document.createElement("p");
    empty.className = "empty-state";
    empty.textContent = t("firstReview");
    list.appendChild(empty);
  } else {
    [...courseReviews].reverse().forEach((review) => {
      const article = document.createElement("article");
      article.className = "review-item";
      const ratings = document.createElement("p");
      ratings.className = "review-ratings";
      ratings.textContent = `${t("workload")}: ${review.workload}/5 · ${t("easiness")}: ${review.easiness}/5 · ${t("satisfaction")}: ${review.satisfaction}/5`;
      article.appendChild(ratings);
      if (review.comment) {
        const comment = document.createElement("p");
        comment.textContent = review.comment;
        article.appendChild(comment);
      }
      const date = document.createElement("small");
      date.className = "muted";
      date.textContent = review.created_at ? `${t("reviewDate")}: ${new Date(review.created_at).toLocaleString()}` : "";
      article.appendChild(date);
      list.appendChild(article);
    });
  }

  const ownReview = myReviewForCourse(currentCourse);
  $("reviewForm").classList.toggle("hidden", !currentUser || Boolean(ownReview));
  if (!currentUser) {
    $("reviewAccessMessage").textContent = t("loginRequired");
    $("reviewAccessMessage").classList.remove("hidden");
  } else if (ownReview) {
    $("reviewAccessMessage").textContent = t("alreadyReviewed");
    $("reviewAccessMessage").classList.remove("hidden");
  } else {
    $("reviewAccessMessage").textContent = "";
    $("reviewAccessMessage").classList.add("hidden");
  }
}
function updateAuthUI() {
  const signedIn = Boolean(currentUser);
  $("signedOutView").classList.toggle("hidden", signedIn);
  $("signedInView").classList.toggle("hidden", !signedIn);
  $("signedInEmail").textContent = currentUser?.email || "";
  if (currentCourse) renderCourseDetails();
}

function isAllowedEmail(email) {
  const parts = String(email || "").trim().toLowerCase().split("@");
  if (parts.length !== 2) return false;
  const domain = parts[1];
  return ALLOWED_EMAIL_DOMAINS.some((allowed) => domain === allowed || domain.endsWith("." + allowed));
}

$("sendCodeForm").addEventListener("submit", async (event) => {
  event.preventDefault();
  const email = $("emailInput").value.trim().toLowerCase();
  const message = $("authMessage");
  message.textContent = "";
  if (!isAllowedEmail(email)) {
    message.textContent = t("emailDomainError");
    return;
  }
  $("sendCodeButton").disabled = true;
  try {
    const { error } = await supabaseClient.auth.signInWithOtp({
      email,
      options: { shouldCreateUser: true }
    });
    if (error) throw error;
    pendingEmail = email;
    $("verifyCodeForm").classList.remove("hidden");
    $("otpInput").focus();
    message.textContent = t("codeSent");
  } catch (error) {
    console.error("OTP send failed:", error);
    message.textContent = t("sendCodeError");
  } finally {
    $("sendCodeButton").disabled = false;
  }
});
$("verifyCodeForm").addEventListener("submit", async (event) => {
  event.preventDefault();
  const token = $("otpInput").value.trim();
  const email = pendingEmail || $("emailInput").value.trim().toLowerCase();
  const message = $("authMessage");
  if (!email || !token) {
    message.textContent = t("otpPrompt");
    return;
  }
  try {
    const { data, error } = await supabaseClient.auth.verifyOtp({
      email,
      token,
      type: "email"
    });
    if (error) throw error;
    currentUser = data.user || data.session?.user || null;
    $("otpInput").value = "";
    message.textContent = "";
    updateAuthUI();
    await loadReviews();
  } catch (error) {
    console.error("OTP verification failed:", error);
    message.textContent = t("verifyCodeError");
  }
});
$("changeEmailButton").addEventListener("click", () => {
  pendingEmail = "";
  $("verifyCodeForm").classList.add("hidden");
  $("otpInput").value = "";
  $("authMessage").textContent = "";
  $("emailInput").focus();
});
$("signOutButton").addEventListener("click", async () => {
  const { error } = await supabaseClient.auth.signOut();
  if (error) {
    console.error("Sign-out failed:", error);
    $("authMessage").textContent = t("signOutError");
    return;
  }
  currentUser = null;
  $("authMessage").textContent = t("signedOut");
  updateAuthUI();
  await loadReviews();
});
$("reviewForm").addEventListener("submit", async (event) => {
  event.preventDefault();
  if (!currentCourse || !currentUser) {
    alert(t("loginRequired"));
    return;
  }
  if (myReviewForCourse(currentCourse)) {
    alert(t("alreadyReviewed"));
    renderCourseDetails();
    return;
  }
  const review = {
    course_id: courseKey(currentCourse),
    user_id: currentUser.id,
    workload: Number($("workloadInput").value),
    easiness: Number($("easinessInput").value),
    satisfaction: Number($("satisfactionInput").value),
    comment: $("commentInput").value.trim() || null
  };
  if ([review.workload, review.easiness, review.satisfaction].some((value) => value < 1 || value > 5)) {
    alert(t("invalidRating"));
    return;
  }
  $("submitReviewButton").disabled = true;
  try {
    const { error } = await supabaseClient.from("reviews").insert(review);
    if (error) {
      if (error.code === "23505") throw new Error("DUPLICATE_REVIEW");
      throw error;
    }
    $("commentInput").value = "";
    $("reviewForm").reset();
    await loadReviews();
    renderCourseDetails();
    renderCourses();
    alert(t("reviewSaved"));
  } catch (error) {
    console.error("Review submission failed:", error);
    alert(error.message === "DUPLICATE_REVIEW" ? t("duplicateReview") : t("reviewSaveError"));
  } finally {
    $("submitReviewButton").disabled = false;
  }
});

$("searchInput").addEventListener("input", renderCourses);
$("categoryFilter").addEventListener("change", renderCourses);
$("sortSelect").addEventListener("change", renderCourses);
$("backButton").addEventListener("click", closeCourse);
$("languageToggle").addEventListener("click", () => {
  currentLanguage = currentLanguage === "en" ? "zh" : "en";
  localStorage.setItem("course-review-language", currentLanguage);
  applyLanguage();
});
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && currentCourse) closeCourse();
});

supabaseClient.auth.onAuthStateChange((_event, session) => {
  // Defer database calls to avoid doing additional Supabase work inside the auth callback.
  queueMicrotask(async () => {
    currentUser = session?.user || null;
    updateAuthUI();
    await loadReviews();
  });
});

async function init() {
  applyLanguage();
  const { data: { session } } = await supabaseClient.auth.getSession();
  currentUser = session?.user || null;
  updateAuthUI();
  await Promise.all([loadCourses(), loadReviews()]);
}
init();
