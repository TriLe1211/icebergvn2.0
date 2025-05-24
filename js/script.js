const enTranslations = {
  // Navigation
  'home': 'HOME',
  'about': 'ABOUT',
  'cooperation': 'COOPERATION',
  'contact': 'CONTACT',

  // Home page
  'content-intro': 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.',
  'features-title': 'Why Choose Take Box?',
  'features-detail-1': 'Active 24/7, no need for staff',
  'features-detail-2': 'Save operating costs',
  'features-detail-3': 'Easy to manage and maintain',
  'features-detail-4': 'User-friendly interface',
  'features-detail-5': 'Support multiple payment methods',
  'features-detail-6': 'Detailed revenue reports',
  'partners-title': 'Our Partners',
  // About page
  'about_us': 'About Us',
  'our_mission': 'Our Mission',
  'our_team': 'Our Team',

  // Contact page
  'contact_us': 'Contact Us',
  'your_name': 'Your Name',
  'your_email': 'Your Email',
  'your_message': 'Your Message',
  'send': 'Send Message',

  // Footer
  'follow_us': 'Follow Us',
  'privacy_policy': 'Privacy Policy',
  'terms_conditions': 'Terms & Conditions'
}; 

const viTranslations = {
  // Navigation
  'home': 'TRANG CHỦ',
  'about': 'GIỚI THIỆU',
  'cooperation': 'HỢP TÁC',
  'contact': 'LIÊN HỆ',

  // Home page
  'content-intro': 'Máy bán hàng tự động cao cấp tại Việt Nam dành cho bạn. Máy bán hàng tự động đã trở thành thiết bị phổ biến ở các nước và khu vực phát triển vì sự thuận tiện, tiên tiến, văn mình và hoạt động cả ngày lẫn đêm của nó.',
  'features-title': 'Tại sao lại chọn Take Box?',
  'features-detail-1': 'Hoạt động 24/7, không cần nhân viên',
  'features-detail-2': 'Tiết kiệm chi phí vận hành',
  'features-detail-3': 'Dễ dàng quản lý và bảo trì',
  'features-detail-4': 'Giao diện thân thiện với người dùng',
  'features-detail-5': 'Hỗ trợ nhiều phương thức thanh toán',
  'features-detail-6': 'Báo cáo doanh thu chi tiết',
  'partners-title': 'Đối tác của chúng tôi',
  // About page
  'about_us': 'Về chúng tôi',
  'our_mission': 'Sứ mệnh của chúng tôi',
  'our_team': 'Đội ngũ của chúng tôi',

  // Contact page
  'contact_us': 'Liên hệ với chúng tôi',
  'your_name': 'Họ và tên',
  'your_email': 'Email của bạn',
  'your_message': 'Nội dung tin nhắn',
  'send': 'Gửi tin nhắn',

  // Footer
  'follow_us': 'Theo dõi chúng tôi',
  'privacy_policy': 'Chính sách bảo mật',
  'terms_conditions': 'Điều khoản và điều kiện'
}; 

// Lấy ngôn ngữ từ localStorage hoặc mặc định là 'vi'
let currentLang = localStorage.getItem("language") || "vi";

// Hàm chuyển đổi ngôn ngữ
function changeLanguage(lang) {
  currentLang = lang;
  localStorage.setItem("language", lang);
  updateContent();
  updateLanguageButton();
}

// Hàm cập nhật nội dung theo ngôn ngữ
function updateContent() {
  const translations = currentLang === "vi" ? viTranslations : enTranslations;

  document.querySelectorAll("[data-translate]").forEach((element) => {
    const key = element.getAttribute("data-translate");
    if (translations[key]) {
      element.textContent = translations[key];
    }
  });
}

// Hàm cập nhật nút ngôn ngữ
function updateLanguageButton() {
  const button = document.getElementById("languageDropdown");
  if (!button) return; // Thoát nếu không tìm thấy nút

  const flag = button.querySelector("img");
  if (!flag) return; // Thoát nếu không tìm thấy hình ảnh

  // Sử dụng đường dẫn tuyệt đối
  const imgPath = "/img/";

  if (currentLang === "vi") {
    flag.src = imgPath + "vn-flag.png";
    flag.alt = "VN";
  } else {
    flag.src = imgPath + "en-flag.png";
    flag.alt = "EN";
  }
}

// Khởi tạo nội dung khi trang được load
document.addEventListener("DOMContentLoaded", () => {
  updateContent();
  updateLanguageButton();
});

// Function to check if element is in viewport
function isInViewport(element) {
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

// Function to handle scroll animation
function handleScrollAnimation() {
  const elements = document.querySelectorAll('.fade-in-left, .fade-in-right, .fade-in-up');
  
  elements.forEach(element => {
    if (isInViewport(element)) {
      element.classList.add('animate');
    }
  });
}

// Add scroll event listener
window.addEventListener('scroll', handleScrollAnimation);
// Check on initial load
window.addEventListener('load', handleScrollAnimation);

// Function to include HTML components
async function includeHTML(elementId, path) {
  try {
    const response = await fetch(path);
    const html = await response.text();
    document.getElementById(elementId).innerHTML = html;
    
    // Initialize language after loading navbar
    if (elementId === 'navbar-container') {
      const currentLang = localStorage.getItem('language') || 'vi';
      changeLanguage(currentLang);
    }
    return true;
  } catch (error) {
    console.error('Error loading component:', error);
    return false;
  }
}

// Load navbar
document.addEventListener('DOMContentLoaded', function() {
    fetch('../pages/navbar.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('navbar-container').innerHTML = data;
            // Initialize language after loading navbar
            const currentLang = localStorage.getItem('language') || 'vi';
            changeLanguage(currentLang);
            // Set active nav link immediately after navbar is loaded
            setActiveNavLink();
        })
        .catch(error => console.error('Error loading navbar:', error));
});

// Add active class to current page link
function setActiveNavLink() {
    const currentPage = window.location.pathname.split('/').pop() || 'home.html';
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        // Remove any existing active styles
        link.classList.remove('active');
        link.style.borderTop = 'none';
        
        // Get the href value and extract the page name
        const href = link.getAttribute('href');
        const pageName = href.split('/').pop();
        
        // Check if this is the current page
        if (pageName === currentPage || 
            (currentPage === '' && pageName === 'home.html') ||
            (currentPage === 'index.html' && pageName === 'home.html')) {
            link.classList.add('active');
            link.style.borderTop = '3px solid var(--primary-color)';
        }
    });
}

// Also call setActiveNavLink when URL changes
window.addEventListener('popstate', setActiveNavLink);