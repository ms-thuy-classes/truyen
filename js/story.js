console.log("🔵 story.js: Bắt đầu chạy");

document.addEventListener('DOMContentLoaded', () => {
    console.log("🟢 DOM đã sẵn sàng");
    
    const params = new URLSearchParams(window.location.search);
    const storyId = params.get('id');
    console.log("📌 storyId từ URL:", storyId);

    if (!storyId) {
        document.getElementById('storyDetail').innerHTML = '<div class="loading">❌ Không có mã truyện. <a href="index.html">Về trang chủ</a></div>';
        document.getElementById('chaptersList').innerHTML = '';
        return;
    }

    const story = getStoryById(storyId);
    if (!story) {
        document.getElementById('storyDetail').innerHTML = `<div class="loading">❌ Không tìm thấy truyện với ID = ${storyId}</div>`;
        document.getElementById('chaptersList').innerHTML = '';
        return;
    }

    // Hiển thị chi tiết
    document.getElementById('storyDetail').innerHTML = `
        <div class="story-header">
            <div class="story-cover"><img src="${story.cover}" alt="${story.title}"></div>
            <div class="story-meta">
                <h1>${story.title}</h1>
                <p><i class="fas fa-user-pen"></i> ${story.author}</p>
                <p><i class="fas fa-tag"></i> ${story.genre}</p>
                <p>${story.description}</p>
            </div>
        </div>
    `;

    // Hiển thị danh sách chương
    const chaptersDiv = document.getElementById('chaptersList');
    if (!story.chapters || story.chapters.length === 0) {
        chaptersDiv.innerHTML = '<p>Chưa có chương nào.</p>';
        return;
    }

    chaptersDiv.innerHTML = story.chapters.map((ch, idx) => `
        <a href="read.html?storyId=${story.id}&chapterId=${ch.id}" class="chapter-item">
            <span><i class="fas fa-bookmark"></i> Chương ${idx+1}: ${ch.title}</span>
        </a>
    `).join('');
    
    console.log(`✅ Đã render ${story.chapters.length} chương cho truyện ${story.title}`);
});

// Dark mode (giống như cũ)
function setupDarkMode() {
    const toggle = document.getElementById('darkModeToggle');
    if (!toggle) return;
    const isDark = localStorage.getItem('darkMode') === 'true';
    if (isDark) document.body.classList.add('dark-mode');
    toggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
    });
}
setupDarkMode();

// Tìm kiếm ở header (chuyển về index)
const searchInput = document.getElementById('searchInput');
if (searchInput) {
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            const keyword = e.target.value.trim();
            if (keyword) window.location.href = `index.html?search=${encodeURIComponent(keyword)}`;
        }
    });
}
