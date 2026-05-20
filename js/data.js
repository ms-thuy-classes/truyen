console.log("🔵 data.js: Bắt đầu load");

const storiesData = [
    {
        id: 1,
        title: "Hành trình dưới ánh trăng",
        author: "Linh Pastel",
        genre: "fantasy",
        cover: "https://picsum.photos/id/104/300/450",
        description: "Một câu chuyện kỳ ảo về cô gái lạc vào vùng đất của những giấc mơ.",
        chapters: [
            { id: 1, title: "Khởi đầu trong màn sương", content: "Nội dung chương 1..." },
            { id: 2, title: "Gặp gỡ thần hộ mệnh", content: "Nội dung chương 2..." },
            { id: 3, title: "Lời hứa với gió", content: "Nội dung chương 3..." }
        ]
    },
    {
        id: 2,
        title: "Vườn hồng bên kia đồi",
        author: "Mia Pastel",
        genre: "romance",
        cover: "https://picsum.photos/id/106/300/450",
        description: "Chuyện tình nhẹ nhàng giữa hai tâm hồn đồng điệu.",
        chapters: [
            { id: 1, title: "Bức thư tay", content: "Nội dung chương 1..." },
            { id: 2, title: "Chiều mưa ở quán cà phê", content: "Nội dung chương 2..." }
        ]
    }
];

function getStoryById(id) {
    const numericId = parseInt(id);
    const story = storiesData.find(s => s.id === numericId);
    if (!story) console.error(`❌ Không tìm thấy truyện ID = ${id}`);
    else console.log(`✅ Tìm thấy truyện: ${story.title}`);
    return story;
}

function saveProgress(storyId, chapterId) {
    localStorage.setItem(`progress_${storyId}`, chapterId);
}
function getProgress(storyId) {
    return localStorage.getItem(`progress_${storyId}`);
}

console.log(`🟢 data.js: Đã load xong, có ${storiesData.length} truyện`);
