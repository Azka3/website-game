// Fungsi untuk menghitung waktu relatif
function timeAgo(timestamp) {
    const now = new Date();
    const seconds = Math.floor((now - timestamp) / 1000);
    
    let interval = Math.floor(seconds / 31536000);
    if (interval >= 1) return interval + " tahun yang lalu";
    
    interval = Math.floor(seconds / 2592000);
    if (interval >= 1) return interval + " bulan yang lalu";
    
    interval = Math.floor(seconds / 86400);
    if (interval >= 1) return interval + " hari yang lalu";
    
    interval = Math.floor(seconds / 3600);
    if (interval >= 1) return interval + " jam yang lalu";
    
    interval = Math.floor(seconds / 60);
    if (interval >= 1) return interval + " menit yang lalu";
    
    return "Baru saja";
}

// Fungsi untuk mengupdate waktu berita
function updateNewsTimes() {
    // Waktu publish berita (dalam format JavaScript Date)
    const newsTimes = [
        new Date(Date.now() - 3 * 60 * 60 * 1000), // 3 jam yang lalu
        new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 hari yang lalu
        new Date(Date.now() - 14 * 24 * 60 * 60 * 1000) // 2 minggu yang lalu
    ];

    // Update elemen waktu
    newsTimes.forEach((time, index) => {
        const element = document.getElementById(`news-time-${index + 1}`);
        if (element) {
            element.textContent = timeAgo(time);
        }
    });
}

// Jalankan saat DOM selesai dimuat
document.addEventListener('DOMContentLoaded', function() {
    updateNewsTimes();
    
    // Anda bisa menambahkan fungsi lain di sini
    // contoh: setupEventListeners();
});

// Fungsi untuk menangani form kontak
function setupContactForm() {
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Ambil nilai form
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;
            
            // Validasi sederhana
            if (!name || !email || !message) {
                alert('Harap isi semua field!');
                return;
            }
            
            // Simulasi pengiriman data
            console.log('Form submitted:', { name, email, message });
            
            // Tampilkan pesan sukses
            alert('Terima kasih! Pesan Anda telah terkirim. Kami akan segera menghubungi Anda.');
            
            // Reset form
            contactForm.reset();
        });
    }
}

// Panggil fungsi saat DOM selesai dimuat
document.addEventListener('DOMContentLoaded', function() {
    updateNewsTimes();
    setupContactForm();
});

// Fungsi untuk animasi scroll smooth
function setupSmoothScroll() {
    // Select semua link footer dengan class footer-link
    const footerLinks = document.querySelectorAll('.footer-link');
    
    footerLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Hitung posisi target dengan offset (misal 100px dari atas)
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - 100;
                
                // Animasi scroll
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Tambahkan efek aktif sementara
                this.classList.add('text-purple-400');
                setTimeout(() => {
                    this.classList.remove('text-purple-400');
                }, 1000);
            }
        });
    });
}

// Panggil fungsi saat DOM selesai dimuat
document.addEventListener('DOMContentLoaded', function() {
    updateNewsTimes();
    setupContactForm();
    setupSmoothScroll();
});

// Mobile Menu Toggle
function setupMobileMenu() {
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
            
            // Ubah ikon antara hamburger dan close
            const icon = mobileMenuButton.querySelector('svg');
            if (mobileMenu.classList.contains('hidden')) {
                icon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>';
            } else {
                icon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>';
            }
        });
        
        // Tutup menu ketika mengklik link di mobile
        const mobileLinks = mobileMenu.querySelectorAll('a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', function() {
                mobileMenu.classList.add('hidden');
                mobileMenuButton.querySelector('svg').innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>';
            });
        });
    }
}

// Panggil fungsi saat DOM selesai dimuat
document.addEventListener('DOMContentLoaded', function() {
    updateNewsTimes();
    setupContactForm();
    setupSmoothScroll();
    setupMobileMenu(); // Tambahkan ini
});