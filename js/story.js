document.addEventListener('DOMContentLoaded', () => {
    renderStories(storiesData);
    setupSearch();
    setupFilters();
    setupDarkMode();
});

function renderStories(stories) {
    const grid = document.getElementById('storiesGrid');
    if (!grid) return;
    if (stories.length === 0) {
        grid.innerHTML = '<div class="loading">✨ Không tìm thấy truyện phù hợp</div>';
        return;
    }
    grid.innerHTML = stories.map(story => `
        <a href="story.html?id=${story.id}" class="story-card">
            <div class="card-img">
                <img src="${story.cover}" alt="${story.title}" loading="lazy">
            </div>
            <div class="card-info">
                <h3>${story.title}</h3>
                <p>${story.author}</p>
                <p><i class="fas fa-tag"></i> ${story.genre}</p>
            </div>
        </a>
    `).join('');
}

function setupSearch() {
    const input = document.getElementById('searchInput');
    if (!input) return;
    input.addEventListener('input', (e) => {
        const keyword = e.target.value.toLowerCase().trim();
        const filtered = storiesData.filter(s => 
            s.title.toLowerCase().includes(keyword) || 
            s.author.toLowerCase().includes(keyword)
        );
        renderStories(filtered);
        // reset active filter
        document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
        document.querySelector('.filter-btn[data-genre="all"]')?.classList.add('active');
    });
}

function setupFilters() {
    const btns = document.querySelectorAll('.filter-btn');
    btns.forEach(btn => {
        btn.addEventListener('click', () => {
            const genre = btn.getAttribute('data-genre');
            btns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            if (genre === 'all') {
                renderStories(storiesData);
            } else {
                const filtered = storiesData.filter(s => s.genre === genre);
                renderStories(filtered);
            }
            // reset search input
            const searchInput = document.getElementById('searchInput');
            if (searchInput) searchInput.value = '';
        });
    });
}

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
