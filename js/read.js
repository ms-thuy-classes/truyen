document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    const storyId = params.get('storyId');
    const chapterId = params.get('chapterId');

    if (!storyId || !chapterId) {
        document.getElementById('readerContainer').innerHTML = '<div class="loading">Lỗi: thiếu thông tin truyện</div>';
        return;
    }

    const story = getStoryById(parseInt(storyId));
    if (!story) {
        document.getElementById('readerContainer').innerHTML = '<div class="loading">Không tìm thấy truyện</div>';
        return;
    }

    const chapter = story.chapters.find(ch => ch.id == chapterId);
    if (!chapter) {
        document.getElementById('readerContainer').innerHTML = '<div class="loading">Chương không tồn tại</div>';
        return;
    }

    // Lưu tiến độ
    saveProgress(story.id, chapter.id);

    const currentIndex = story.chapters.findIndex(ch => ch.id == chapter.id);
    const prevChapter = currentIndex > 0 ? story.chapters[currentIndex - 1] : null;
    const nextChapter = currentIndex < story.chapters.length - 1 ? story.chapters[currentIndex + 1] : null;

    const container = document.getElementById('readerContainer');
    container.innerHTML = `
        <div class="chapter-title">${chapter.title}</div>
        <div class="chapter-content">
            ${chapter.content}
        </div>
        <div class="chapter-nav">
            ${prevChapter ? `<a href="read.html?storyId=${story.id}&chapterId=${prevChapter.id}" class="nav-btn"><i class="fas fa-chevron-left"></i> Chương trước</a>` : '<span></span>'}
            ${nextChapter ? `<a href="read.html?storyId=${story.id}&chapterId=${nextChapter.id}" class="nav-btn">Chương sau <i class="fas fa-chevron-right"></i></a>` : '<span></span>'}
        </div>
        <div class="progress-save">
            <i class="fas fa-check-circle"></i> Đã lưu tiến độ: ${chapter.title}
        </div>
    `;

    setupDarkMode();
});

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
