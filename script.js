document.getElementById('fetchBtn').addEventListener('click', () => {
  const url = document.getElementById('urlInput').value.trim();
  const errorEl = document.getElementById('errorMsg');
  const resultDiv = document.getElementById('result');
  const imgEl = document.getElementById('thumbImg');
  const downloadLink = document.getElementById('downloadLink');

  errorEl.classList.add('hidden');
  errorEl.textContent = '';
  resultDiv.classList.add('hidden');

  // Regex to extract video ID
  const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
  const match = url.match(regExp);
  const videoId = match && match[7].length === 11 ? match[7] : null;

  if (!videoId) {
    errorEl.textContent = 'Please enter a valid YouTube URL.';
    errorEl.classList.remove('hidden');
    return;
  }

  const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;

  // Check if maxres exists; fallback to hqdefault
  const img = new Image();
  img.onload = () => {
    imgEl.src = thumbnailUrl;
    downloadLink.href = thumbnailUrl;
    downloadLink.download = `youtube_thumbnail_${videoId}.jpg`;
    resultDiv.classList.remove('hidden');
  };
  img.onerror = () => {
    // fallback
    const fallbackUrl = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
    imgEl.src = fallbackUrl;
    downloadLink.href = fallbackUrl;
    downloadLink.download = `youtube_thumbnail_${videoId}.jpg`;
    resultDiv.classList.remove('hidden');
  };
  img.src = thumbnailUrl;
});