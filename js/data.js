// Dữ liệu truyện mẫu – pastel style
const storiesData = [
    {
        id: 1,
        title: "Hành trình dưới ánh trăng",
        author: "Linh Pastel",
        genre: "fantasy",
        cover: "https://picsum.photos/id/104/300/450",
        description: "Một câu chuyện kỳ ảo về cô gái lạc vào vùng đất của những giấc mơ, nơi ánh trăng có thể chữa lành mọi vết thương.",
        chapters: [
            { id: 1, title: "Khởi đầu trong màn sương", content: "Đêm ấy, bầu trời đầy sao... (nội dung chương 1)" },
            { id: 2, title: "Gặp gỡ thần hộ mệnh", content: "Cô bé nhìn thấy một ánh sáng xanh... (nội dung chương 2)" },
            { id: 3, title: "Lời hứa với gió", content: "Ngọn gió thì thầm một bí mật... (chương 3)" }
        ]
    },
    {
        id: 2,
        title: "Vườn hồng bên kia đồi",
        author: "Mia Pastel",
        genre: "romance",
        cover: "https://picsum.photos/id/106/300/450",
        description: "Chuyện tình nhẹ nhàng giữa hai tâm hồn đồng điệu, nơi những bông hồng nở rộ quanh năm.",
        chapters: [
            { id: 1, title: "Bức thư tay", content: "Ngày đầu thu, cô tìm thấy một bức thư... (chương 1)" },
            { id: 2, title: "Chiều mưa ở quán cà phê", content: "Họ tình cờ gặp nhau... (chương 2)" }
        ]
    },
    {
        id: 3,
        title: "Bí mật thư viện cũ",
        author: "K. Duyên",
        genre: "mystery",
        cover: "https://picsum.photos/id/20/300/450",
        description: "Một cuốn sách không tên, một cánh cửa bí mật và hành trình giải mã ký ức.",
        chapters: [
            { id: 1, title: "Cuốn sách bụi bặm", content: "Thư viện đóng cửa đã lâu... (chương 1)" },
            { id: 2, title: "Dấu chân lạ", content: "Sáng hôm sau, trên sàn nhà... (chương 2)" },
            { id: 3, title: "Lối đi ngầm", content: "Sau kệ sách thứ ba... (chương 3)" },
            { id: 4, title: "Bức ảnh phai màu", content: "Trong chiếc hộp gỗ... (chương 4)" }
        ]
    },
    {
        id: 4,
        title: "Nơi những vì sao chạm đất",
        author: "Nguyễn Pastel",
        genre: "fantasy",
        cover: "https://picsum.photos/id/29/300/450",
        description: "Mỗi đêm, một vì sao rơi xuống khu rừng, và cậu bé mồ côi quyết định đi tìm chúng.",
        chapters: [
            { id: 1, title: "Sao băng đầu tiên", content: "Đêm định mệnh... (chương 1)" },
            { id: 2, title: "Hành tinh nhỏ", content: "Cậu thấy một sinh vật lạ... (chương 2)" }
        ]
    }
];

// Hàm tiện ích để lấy truyện theo id
function getStoryById(id) {
    return storiesData.find(story => story.id === parseInt(id));
}

// Lưu tiến độ đọc (chapterId cuối cùng)
function saveProgress(storyId, chapterId) {
    localStorage.setItem(`progress_${storyId}`, chapterId);
}
function getProgress(storyId) {
    return localStorage.getItem(`progress_${storyId}`);
}
