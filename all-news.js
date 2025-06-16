
// Data berita (bisa diganti dengan fetch dari API)
const allNewsData = [
    {
        id: 1,
        title: "Patch Terbaru Cyberpunk 2077 Rilis!",
        category: "update",
        date: "3 jam yang lalu",
        image: "cyberpunk.jpg",
        excerpt: "CD Projekt Red merilis patch 2.1 dengan berbagai perbaikan dan fitur baru termasuk sistem metro yang dinanti.",
        content: "Patch terbaru Cyberpunk 2077 membawa banyak perbaikan dan fitur baru yang dinantikan pemain..."
    },
    {
        id: 2,
        title: "The Witcher 4 Dikabarkan Mulai Development",
        category: "rumor",
        date: "1 hari yang lalu",
        image: "thewitch3.webp",
        excerpt: "Sumber internal menyebutkan CDPR telah memulai tahap awal pengembangan sekuel The Witcher dengan Unreal Engine 5.",
        content: "Menurut sumber terpercaya, CD Projekt Red telah memulai pengembangan awal untuk The Witcher 4..."
    }
];

// Fungsi untuk menampilkan berita
let visibleItems = 6;
function displayNews(filter = 'all') {
    const newsContainer = document.getElementById('news-container');
    newsContainer.innerHTML = '';
    
    const filteredNews = filter === 'all' 
        ? allNewsData 
        : allNewsData.filter(news => news.category === filter);
    
    filteredNews.slice(0, visibleItems).forEach(news => {
        const newsCard = document.createElement('div');
        newsCard.className = 'bg-gray-700 rounded-lg overflow-hidden hover:shadow-lg hover:shadow-purple-500/20 transition-all transform hover:-translate-y-2';
        newsCard.innerHTML = `
            <img src="${news.image}" alt="News Image" class="w-full h-48 object-cover">
            <div class="p-6">
                <div class="flex justify-between items-center mb-2">
                    <span class="text-sm ${getCategoryClass(news.category)} px-2 py-1 rounded">
                        ${getCategoryName(news.category)}
                    </span>
                    <span class="text-sm text-gray-400">${news.date}</span>
                </div>
                <h3 class="text-xl font-bold mb-2">${news.title}</h3>
                <p class="text-gray-400 mb-4">${news.excerpt}</p>
                <a href="news-detail.html?id=${news.id}" class="text-purple-400 hover:text-purple-300 font-semibold flex items-center group">
                    Read More 
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                    </svg>
                </a>
            </div>
        `;
        newsContainer.appendChild(newsCard);
    });
}

function displayFilteredNews(newsItems) {
    const newsContainer = document.getElementById('news-container');
    const loadMoreBtn = document.getElementById('load-more');
    
    newsContainer.innerHTML = '';

    if (newsItems.length === 0) {
        newsContainer.innerHTML = `
            <div class="col-span-full text-center py-12">
                <svg class="w-16 h-16 mx-auto text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                <h3 class="mt-4 text-lg font-medium text-gray-300">No news found</h3>
                <p class="mt-1 text-gray-500">Try different search terms or filters</p>
            </div>
        `;
        loadMoreBtn.classList.add('hidden');
        return;
    }

    newsItems.forEach(news => {
        const newsCard = document.createElement('div');
        newsCard.className = 'bg-gray-700 rounded-lg overflow-hidden hover:shadow-lg hover:shadow-purple-500/20 transition-all transform hover:-translate-y-2';
        newsCard.innerHTML = `
            <img src="${news.image}" alt="News Image" class="w-full h-48 object-cover">
            <div class="p-6">
                <div class="flex justify-between items-center mb-2">
                    <span class="text-sm ${getCategoryClass(news.category)} px-2 py-1 rounded">
                        ${getCategoryName(news.category)}
                    </span>
                    <span class="text-sm text-gray-400">${news.date}</span>
                </div>
                <h3 class="text-xl font-bold mb-2">${news.title}</h3>
                <p class="text-gray-400 mb-4">${news.excerpt}</p>
                <a href="news-detail.html?id=${news.id}" class="text-purple-400 hover:text-purple-300 font-semibold flex items-center group">
                    Read More 
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                    </svg>
                </a>
            </div>
        `;
        newsContainer.appendChild(newsCard);
    });

    if (document.getElementById('news-search').value) {
        loadMoreBtn.classList.add('hidden');
    } else {
        loadMoreBtn.classList.remove('hidden');
    }
}

function getCategoryClass(category) {
    const classes = {
        update: 'bg-purple-600',
        rumor: 'bg-blue-600',
        release: 'bg-green-600',
        review: 'bg-yellow-600'
    };
    return classes[category] || 'bg-gray-600';
}

function getCategoryName(category) {
    const names = {
        update: 'Update',
        rumor: 'Rumor',
        release: 'Release',
        review: 'Review'
    };
    return names[category] || 'News';
}

function setupFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            filterBtns.forEach(b => b.classList.remove('active', 'bg-purple-600'));
            this.classList.add('active', 'bg-purple-600');
            displayNews(this.dataset.category);
        });
    });
}

function setupLoadMore() {
    const loadMoreBtn = document.getElementById('load-more');
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', function() {
            visibleItems += 3;
            displayNews(document.querySelector('.filter-btn.active').dataset.category);
            if (visibleItems >= allNewsData.length) {
                this.style.display = 'none';
            }
        });
    }
}

function setupSearch() {
    const searchInput = document.getElementById('news-search');
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            const currentFilter = document.querySelector('.filter-btn.active').dataset.category;
            const filteredNews = (currentFilter === 'all' 
                ? allNewsData 
                : allNewsData.filter(news => news.category === currentFilter))
                .filter(news => 
                    news.title.toLowerCase().includes(searchTerm) || 
                    news.excerpt.toLowerCase().includes(searchTerm) ||
                    news.content.toLowerCase().includes(searchTerm)
                );
            displayFilteredNews(filteredNews);
        });
    }
}

function setupMobileMenu() {
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', function () {
            mobileMenu.classList.toggle('hidden');
        });
        const mobileLinks = mobileMenu.querySelectorAll('a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
            });
        });
    }
}

document.addEventListener('DOMContentLoaded', function() {
    displayNews();
    setupFilters();
    setupLoadMore();
    setupSearch();
    setupMobileMenu();
});
