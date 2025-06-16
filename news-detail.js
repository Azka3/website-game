const allNewsData = [
  {
    id: 1,
    title: "Patch Terbaru Cyberpunk 2077 Rilis!",
    category: "update",
    date: "3 jam yang lalu",
    image: "cyberpunk.jpg",
    content: "Patch terbaru Cyberpunk 2077 membawa banyak perbaikan dan fitur baru yang dinantikan pemain..."
  },
  {
    id: 2,
    title: "The Witcher 4 Dikabarkan Mulai Development",
    category: "rumor",
    date: "1 hari yang lalu",
    image: "thewitch3.webp",
    content: "Menurut sumber terpercaya, CD Projekt Red telah memulai pengembangan awal untuk The Witcher 4..."
  }
];

// Ambil ID dari URL
const params = new URLSearchParams(window.location.search);
const newsId = parseInt(params.get('id'));
const news = allNewsData.find(n => n.id === newsId);

const detailContainer = document.getElementById('news-detail');
if (news) {
  detailContainer.innerHTML = `
    <h1 class="text-4xl font-bold mb-4">${news.title}</h1>
    <img src="${news.image}" alt="News Image" class="w-full h-64 object-cover mb-6 rounded-lg">
    <p class="text-sm text-gray-400 mb-2">${news.date} • ${news.category.toUpperCase()}</p>
    <p class="text-lg text-gray-200 leading-relaxed">${news.content}</p>
  `;
} else {
  detailContainer.innerHTML = `<p class="text-red-500">Berita tidak ditemukan.</p>`;
}
