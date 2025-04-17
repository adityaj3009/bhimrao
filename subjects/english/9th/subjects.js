document.addEventListener('DOMContentLoaded', function() {
    const thumbnails = document.querySelectorAll('.video-thumbnail');
    
    thumbnails.forEach(thumbnail => {
        thumbnail.addEventListener('click', function() {
            const videoId = this.dataset.videoId;
            const videoContainer = this.parentNode;
            
            // Replace thumbnail with iframe
            videoContainer.innerHTML = `
                <iframe width="560" height="315" 
                        src="https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1" 
                        title="YouTube video player" 
                        frameborder="0" 
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                        allowfullscreen
                        loading="lazy"></iframe>
            `;
        });
    });

    // Optional: Lazy load thumbnails when they come into view
    if ('IntersectionObserver' in window) {
        const lazyThumbnails = document.querySelectorAll('.video-thumbnail[loading="lazy"]');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.src; // Trigger loading if browser doesn't support native lazy loading
                    observer.unobserve(img);
                }
            });
        });

        lazyThumbnails.forEach(img => {
            observer.observe(img);
        });
    }
});