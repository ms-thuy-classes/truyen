// main.js
let allStories = [];

document.addEventListener('DOMContentLoaded', async () => {
    initDarkMode();
    await loadStories();
    setupFiltersAndSearch();
});

async function loadStories() {
    try {
        allStories = await fetchJSON('stories/stories.json');
        console.log('Đã tải', allStories.length, 'truyện');
        renderStories(allStories);
    } catch (err) {
        document.getElementById('storiesGrid').innerHTML = '<div class="loading">Lỗi tải dữ liệu. Hãy chạy bằng Live Server.</div>';
        console.error(err);
    }
}

function renderStories(stories) {
    const grid = document.getElementById('storiesGrid');
    if (!stories.length) {
        grid.innerHTML = '<div class="loading">✨ Không tìm thấy truyện nào.</div>';
        return;
    }
    grid.innerHTML = stories.map(story => `
        <a href="story.html?slug=${story.slug}" class="story-card">
            <div class="card-img"><img src="${story.cover}" alt="${story.title}" loading="lazy"></div>
            <div class="card-info">
                <h3>${escapeHtml(story.title)}</h3>
                <p>${escapeHtml(story.author)}</p>
                <p class="genre-tag">${getGenreName(story.genre)}</p>
                <p class="status ${story.status === 'full' ? 'full' : 'ongoing'}">${story.status === 'full' ? '✅ Đã full' : '📖 Đang ra'}</p>
                <p class="update">🕒 ${formatDate(story.lastUpdate)}</p>
            </div>
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

function setupFiltersAndSearch() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const searchInput = document.getElementById('searchInput');
    
    let currentGenre = 'all';
    let currentStatus = null;
    let currentSort = null;

    function filterAndSort() {
        let filtered = [...allStories];
        
        // Lọc theo thể loại
        if (currentGenre !== 'all') {
            filtered = filtered.filter(s => s.genre === currentGenre);
        }
        // Lọc theo trạng thái full
        if (currentStatus === 'full') {
            filtered = filtered.filter(s => s.status === 'full');
        }
        // Tìm kiếm
        const keyword = searchInput ? searchInput.value.trim().toLowerCase() : '';
        if (keyword) {
            filtered = filtered.filter(s => s.title.toLowerCase().includes(keyword) || s.author.toLowerCase().includes(keyword));
        }
        // Sắp xếp theo mới cập nhật
        if (currentSort === 'latest') {
            filtered.sort((a,b) => new Date(b.lastUpdate) - new Date(a.lastUpdate));
        } else {
            filtered.sort((a,b) => a.id - b.id); // mặc định theo id
        }
        renderStories(filtered);
    }

    // Xử lý click các nút lọc
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const genre = btn.dataset.genre;
            const status = btn.dataset.status;
            const sort = btn.dataset.sort;
            
            // Reset active class
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            if (genre) {
                currentGenre = genre;
                currentStatus = null;
                currentSort = null;
            } else if (status) {
                currentStatus = status;
                currentGenre = 'all';
                currentSort = null;
                // cũng active nút "Tất cả" nếu đang lọc theo status
                document.querySelector('.filter-btn[data-genre="all"]').classList.add('active');
            } else if (sort) {
                currentSort = sort;
                currentGenre = 'all';
                currentStatus = null;
                document.querySelector('.filter-btn[data-genre="all"]').classList.add('active');
            }
            filterAndSort();
        });
    });
    
    if (searchInput) {
        searchInput.addEventListener('input', () => {
            // khi tìm kiếm, reset active filter nhưng giữ nguyên bộ lọc
            filterAndSort();
        });
    }
}
