// Lấy phần tử DOM
const terminalContent = document.getElementById('terminal-content');

// --- TÙY CHỈNH LỜI CHÚC CỦA BẠN TẠI ĐÂY ---
const friendName = "Nguyễn Ngọc Anh nè"; // <-- THAY TÊN BẠN BÈ
const age = 19; // <-- THAY SỐ TUỔI (hoặc để trống)

const lines = [
    { text: "Khởi chạy quy trình: 'Happy_Birthday_Protocol'...", type: 'system' },
    { text: `Target: ${friendName}`, type: 'system' },
    { text: "Đang tải dữ liệu... 10%...", delay: 150 },
    { text: "Đang tải dữ liệu... 30%...", delay: 100 },
    { text: "Đang tải dữ liệu... 50%...", delay: 200 },
    { text: "Đang tải dữ liệu... 70%...", delay: 100 },
    { text: "Đang tải dữ liệu... 100%.", delay: 150 },
    { text: "Hoàn tất tải.", type: 'system' },
    { text: "Biên dịch lời chúc...", type: 'system' },
    { text: "...", delay: 500 },
    { text: "Deploy phiên bản: 'LoiChucMung' v" + age + ".0", type: 'system' },
    { text: "", delay: 500 }, // Dòng trống
    { text: "--------------------------------------------------", type: 'ascii' },
    { text: `Chúc mừng sinh nhật lần thứ ${age}, ${friendName}! 🎂`, type: 'user' },
    { text: "", delay: 200 },
    { text: "Anh chúc Thu bước sang tuổi mới sẽ luôn khỏe mạnh, xinh đẹp, và hạnh phúc thật nhiều nhé!", type: 'user' },
    { text: "   - (feature) Chúc em luôn tự tin, nhiệt huyết để chinh phục mọi ước mơ và mục tiêu trong cuộc sống", type: 'user' },
    { text: "   - (feature) Hãy cứ sống hết mình, làm điều em thích nhaa", type: 'user' },
    { text: "   - (fix) Loại bỏ 100% bugs 'buồn bã'.", type: 'user' },
    { text: "   - (refactor) Và Sớm kiếm được ny nhá=))", type: 'user' },
    { text: "", delay: 200 },
    { text: "Happy happy và happy birthday!", type: 'user' },
    { text: "From: [MinhHai]", type: 'user' }, // <-- THAY TÊN CỦA BẠN
    { text: "--------------------------------------------------", type: 'ascii' },
    { text: "Quy trình kết thúc. Tự hủy tin nhắn sau...", type: 'system' },
    { text: "User $> ", type: 'prompt' } // Dấu nhắc lệnh cuối cùng
];
// --- KẾT THÚC TÙY CHỈNH ---


// Hàm sleep để tạo độ trễ
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Hàm gõ chữ chính
async function runTypewriter() {
    for (const line of lines) {
        const speed = line.speed || 50; // Tốc độ gõ mặc định
        const delay = line.delay || 0; // Độ trễ trước khi gõ dòng mới

        await sleep(delay);

        // Thêm màu sắc hoặc tiền tố dựa trên 'type'
        let prefix = "";
        let color = "";
        switch (line.type) {
            case 'system':
                prefix = "[System]: ";
                color = "color: #88aaff;"; // Màu xanh nhạt
                break;
            case 'user':
                prefix = "[User]: ";
                color = "color: #a2ffa2;"; // Màu xanh lá
                break;
            case 'ascii':
                color = "color: #ffde88;"; // Màu vàng
                break;
            case 'prompt':
                color = "color: #f0f0f0;"; // Màu trắng
                break;
            default:
                color = "color: #c9d1d9;" // Màu mặc định
        }

        // Tạo phần tử span cho dòng mới
        const lineElement = document.createElement('span');
        if (color) {
            lineElement.style.cssText = color;
        }
        
        terminalContent.appendChild(lineElement);
        
        // Bắt đầu gõ chữ
        const fullText = prefix + line.text;
        for (let i = 0; i < fullText.length; i++) {
            lineElement.textContent += fullText[i];
            // Cuộn xuống dưới cùng
            terminalContent.parentNode.scrollTop = terminalContent.parentNode.scrollHeight;
            await sleep(speed);
        }

        // Thêm con trỏ nhấp nháy nếu là dòng cuối cùng
        if (lines.indexOf(line) === lines.length - 1) {
            const cursor = document.createElement('span');
            cursor.className = 'cursor';
            cursor.textContent = '█';
            lineElement.appendChild(cursor);
        }

        // Thêm dấu xuống dòng
        terminalContent.appendChild(document.createElement('br'));
    }
}

// Bắt đầu chạy
runTypewriter();
