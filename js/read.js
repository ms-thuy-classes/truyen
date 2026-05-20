// read.js
document.addEventListener('DOMContentLoaded', async () => {
    initDarkMode();
    const params = new URLSearchParams(window.location.search);
    const slug = params.get('slug');
    const chapterId = params.get('chapter');
    if (!slug || !chapterId) {
        document.getElementById('readerContainer').innerHTML = '<div class="loading">Thiếu thông tin truyện/chương.</div>';
        return;
    }
    
    try {
        // Lấy metadata của truyện để biết tên chương và file path
        const storyMeta = await fetchJSON(`stories/${slug}/story.json`);
        const chapter = storyMeta.chapters.find(ch => ch.id == chapterId);
        if (!chapter) throw new Error('Không tìm thấy chương');
        
        // Đọc nội dung file txt
        const contentUrl = `stories/${slug}/${chapter.file}`;
        const response = await fetch(contentUrl);
        if (!response.ok) throw new Error(`Không thể đọc file ${chapter.file}`);
        const content = await response.text();
        
        // Hiển thị
        renderReader(storyMeta, chapter, content, slug);
    } catch (err) {
        console.error(err);
        document.getElementById('readerContainer').innerHTML = `<div class="loading">❌ ${err.message}</div>`;
    }
});

function renderReader(story, chapter, content, slug) {
    const container = document.getElementById('readerContainer');
    container.innerHTML = `
        <div class="chapter-title">${escapeHtml(chapter.title)}</div>
        <div class="chapter-content">${escapeHtml(content).replace(/\n/g, '<br>')}</div>
        <div class="chapter-nav" id="chapterNav"></div>
        <div class="progress-save"><i class="fas fa-check-circle"></i> Đã lưu tiến độ</div>
    `;
    // Lưu tiến độ vào localStorage
    localStorage.setItem(`progress_${slug}`, chapter.id);
    
    // Tạo nút chuyển chương (cần danh sách tất cả chương)
    const currentIndex = story.chapters.findIndex(ch => ch.id == chapter.id);
    const prev = currentIndex > 0 ? story.chapters[currentIndex-1] : null;
    const next = currentIndex < story.chapters.length-1 ? story.chapters[currentIndex+1] : null;
    const navDiv = document.getElementById('chapterNav');
    navDiv.innerHTML = `
        ${prev ? `<a href="read.html?slug=${slug}&chapter=${prev.id}" class="nav-btn"><i class="fas fa-chevron-left"></i> ${prev.title}</a>` : '<span></span>'}
        ${next ? `<a href="read.html?slug=${slug}&chapter=${next.id}" class="nav-btn">${next.title} <i class="fas fa-chevron-right"></i></a>` : '<span></span>'}
    `;
}
