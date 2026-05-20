// story.js
document.addEventListener('DOMContentLoaded', async () => {
    initDarkMode();
    const params = new URLSearchParams(window.location.search);
    const slug = params.get('slug');
    if (!slug) {
        document.getElementById('storyDetail').innerHTML = '<div class="loading">❌ Thiếu slug truyện.</div>';
        return;
    }
    try {
        const storyMeta = await fetchJSON(`stories/${slug}/story.json`);
        displayStoryDetail(storyMeta, slug);
        displayChapters(storyMeta, slug);
    } catch (err) {
        console.error(err);
        document.getElementById('storyDetail').innerHTML = '<div class="loading">Không tìm thấy truyện. Kiểm tra lại đường dẫn.</div>';
    }
});

function displayStoryDetail(story, slug) {
    const container = document.getElementById('storyDetail');
    container.innerHTML = `
        <div class="story-header">
            <div class="story-cover"><img src="${story.cover}" alt="${story.title}"></div>
            <div class="story-meta">
                <h1>${escapeHtml(story.title)}</h1>
                <p><i class="fas fa-user-pen"></i> ${escapeHtml(story.author)}</p>
                <p><i class="fas fa-tag"></i> ${getGenreName(story.genre)}</p>
                <p class="status-badge ${story.status}">${story.status === 'full' ? 'Đã hoàn thành' : 'Đang cập nhật'}</p>
                <p>${escapeHtml(story.description)}</p>
            </div>
        </div>
    `;
}

function displayChapters(story, slug) {
    const chaptersDiv = document.getElementById('chaptersList');
    if (!story.chapters || story.chapters.length === 0) {
        chaptersDiv.innerHTML = '<p>Chưa có chương nào.</p>';
        return;
    }
    chaptersDiv.innerHTML = story.chapters.map((ch, idx) => `
        <a href="read.html?slug=${slug}&chapter=${ch.id}" class="chapter-item">
            <span><i class="fas fa-bookmark"></i> Chương ${ch.id}: ${escapeHtml(ch.title)}</span>
        </a>
    `).join('');
}

function getGenreName(genre) {
    const map = {
        'ngon-tinh': '💖 Ngôn tình',
        'dam-my': '🌈 Đam mỹ',
        'linh-di': '👻 Linh dị',
        'xuyen-khong': '⏳ Xuyên không'
    };
    return map[genre] || genre;
}
