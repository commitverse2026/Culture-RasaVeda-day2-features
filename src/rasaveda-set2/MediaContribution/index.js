import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./styles.css";

export default function MediaContribution() {
  // STEP 1: Create recipe object with media[] in useState
  const [recipe, setRecipe] = useState({
    id: 1,
    name: "Traditional Hyderabadi Biryani",
    description: "Aromatic rice dish layered with marinated chicken and traditional spices",
    region: "Hyderabad, India",
    cuisine: "Mughlai",
    media: [
      {
        id: 1,
        type: "image",
        url: "https://images.unsplash.com/photo-1563379091339-03b21ab4a5f8?w=400",
        title: "Freshly cooked Biryani"
      },
      {
        id: 2,
        type: "image",
        url: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=400",
        title: "Traditional cooking pot (Handi)"
      },
      {
        id: 3,
        type: "video",
        url: "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4",
        thumbnail: "https://images.unsplash.com/photo-1563379091339-03b21ab4a5f8?w=400",
        title: "Cooking process tutorial"
      }
    ]
  });

  // STEP 6: Add useState for lightboxItem
  const [lightboxItem, setLightboxItem] = useState(null);
  const [uploadError, setUploadError] = useState("");

  // Helper function to generate unique ID
  const generateId = () => {
    return Date.now() + Math.random().toString(36).substr(2, 9);
  };

  // Helper function to get file type
  const getFileType = (file) => {
    if (file.type.startsWith('image/')) return 'image';
    if (file.type.startsWith('video/')) return 'video';
    return null;
  };

  // Helper function to validate file size (max 50MB for videos, 10MB for images)
  const validateFile = (file) => {
    const maxSize = file.type.startsWith('image/') ? 10 * 1024 * 1024 : 50 * 1024 * 1024;
    if (file.size > maxSize) {
      const sizeInMB = maxSize / (1024 * 1024);
      return `File size exceeds ${sizeInMB}MB limit`;
    }
    return null;
  };

  // STEP 3 & 4: On file select, create object URL and add to media[]
  const handleFileUpload = (event) => {
    const files = Array.from(event.target.files);
    setUploadError("");

    files.forEach(file => {
      // Validate file type
      const fileType = getFileType(file);
      if (!fileType) {
        setUploadError(`Unsupported file type: ${file.type}. Please upload images or videos.`);
        return;
      }

      // Validate file size
      const error = validateFile(file);
      if (error) {
        setUploadError(error);
        return;
      }

      // Create object URL for preview
      const objectUrl = URL.createObjectURL(file);
      
      // Create new media object
      const newMedia = {
        id: generateId(),
        type: fileType,
        url: objectUrl,
        title: file.name.split('.')[0], // Use filename without extension as title
        file: file, // Store original file for reference
        size: file.size,
        lastModified: file.lastModified
      };

      // For videos, we can generate a thumbnail later (optional)
      if (fileType === 'video') {
        newMedia.thumbnail = objectUrl; // Use same URL as fallback
      }

      // Add to media array
      setRecipe(prev => ({
        ...prev,
        media: [...prev.media, newMedia]
      }));
    });

    // Clear the input value to allow re-uploading the same file
    event.target.value = '';
  };

  // Function to remove media item
  const removeMedia = (id) => {
    const mediaToRemove = recipe.media.find(item => item.id === id);
    
    // Revoke object URL to free memory
    if (mediaToRemove && mediaToRemove.url.startsWith('blob:')) {
      URL.revokeObjectURL(mediaToRemove.url);
    }
    
    setRecipe(prev => ({
      ...prev,
      media: prev.media.filter(item => item.id !== id)
    }));
  };

  // STEP 7: Open lightbox
  const openLightbox = (item) => {
    setLightboxItem(item);
    document.body.style.overflow = 'hidden'; // Prevent scrolling when lightbox is open
  };

  // Close lightbox
  const closeLightbox = () => {
    setLightboxItem(null);
    document.body.style.overflow = 'auto'; // Restore scrolling
  };

  // Navigate in lightbox
  const navigateLightbox = (direction) => {
    const currentIndex = recipe.media.findIndex(item => item.id === lightboxItem.id);
    let newIndex;
    
    if (direction === 'next') {
      newIndex = (currentIndex + 1) % recipe.media.length;
    } else {
      newIndex = (currentIndex - 1 + recipe.media.length) % recipe.media.length;
    }
    
    setLightboxItem(recipe.media[newIndex]);
  };

  // Handle keyboard events for lightbox
  React.useEffect(() => {
    const handleKeyDown = (event) => {
      if (!lightboxItem) return;
      
      switch(event.key) {
        case 'Escape':
          closeLightbox();
          break;
        case 'ArrowLeft':
          navigateLightbox('prev');
          break;
        case 'ArrowRight':
          navigateLightbox('next');
          break;
        default:
          break;
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxItem]);

  // Clean up object URLs on component unmount
  React.useEffect(() => {
    return () => {
      recipe.media.forEach(item => {
        if (item.url && item.url.startsWith('blob:')) {
          URL.revokeObjectURL(item.url);
        }
      });
    };
  }, []);

  return (
    <div className="feature-page media-page">
      <Link to="/" className="page-back">← Back</Link>
      <h1>📸 Photo & Video Contribution Module</h1>

      {/* Recipe Information */}
      <div className="recipe-info-card">
        <h2>{recipe.name}</h2>
        <p className="recipe-description">{recipe.description}</p>
        <div className="recipe-meta">
          <span className="meta-tag">📍 {recipe.region}</span>
          <span className="meta-tag">🍽️ {recipe.cuisine}</span>
          <span className="meta-tag">📷 {recipe.media.length} media items</span>
        </div>
      </div>

      {/* STEP 2: File upload input */}
      <div className="upload-section">
        <h3>📤 Contribute Media</h3>
        <div className="upload-area">
          <input
            type="file"
            id="mediaUpload"
            accept="image/*,video/*"
            onChange={handleFileUpload}
            multiple
            className="file-input"
          />
          <label htmlFor="mediaUpload" className="upload-label">
            <div className="upload-icon">📁</div>
            <div className="upload-text">
              Click or drag to upload
              <span className="upload-hint">Images (JPG, PNG, GIF) or Videos (MP4, WebM)</span>
              <span className="upload-limit">Max: 10MB for images, 50MB for videos</span>
            </div>
          </label>
        </div>
        {uploadError && <div className="error-message">{uploadError}</div>}
      </div>

      {/* STEP 5: Render media gallery grid */}
      <div className="gallery-section">
        <h3>🖼️ Media Gallery ({recipe.media.length} items)</h3>
        {recipe.media.length === 0 ? (
          <div className="empty-gallery">
            <p>No media uploaded yet. Be the first to contribute photos or videos!</p>
          </div>
        ) : (
          <div className="media-grid">
            {recipe.media.map((item) => (
              <div key={item.id} className="media-item">
                <div 
                  className="media-preview" 
                  onClick={() => openLightbox(item)}
                >
                  {item.type === 'image' ? (
                    <img src={item.url} alt={item.title} loading="lazy" />
                  ) : (
                    <div className="video-preview">
                      <video src={item.url} poster={item.thumbnail} />
                      <div className="play-overlay">
                        <span className="play-icon">▶️</span>
                      </div>
                    </div>
                  )}
                  <div className="media-type-badge">
                    {item.type === 'image' ? '📷' : '🎥'}
                  </div>
                </div>
                <div className="media-info">
                  <p className="media-title">{item.title}</p>
                  <button 
                    onClick={() => removeMedia(item.id)}
                    className="remove-btn"
                    title="Remove media"
                  >
                    🗑️
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox Overlay */}
      {lightboxItem && (
        <div className="lightbox-overlay" onClick={closeLightbox}>
          <div className="lightbox-container" onClick={(e) => e.stopPropagation()}>
            <button className="lightbox-close" onClick={closeLightbox}>✕</button>
            
            {recipe.media.length > 1 && (
              <>
                <button 
                  className="lightbox-nav lightbox-prev" 
                  onClick={() => navigateLightbox('prev')}
                >
                  ‹
                </button>
                <button 
                  className="lightbox-nav lightbox-next" 
                  onClick={() => navigateLightbox('next')}
                >
                  ›
                </button>
              </>
            )}
            
            <div className="lightbox-content">
              {lightboxItem.type === 'image' ? (
                <img 
                  src={lightboxItem.url} 
                  alt={lightboxItem.title} 
                  className="lightbox-image"
                />
              ) : (
                <video 
                  src={lightboxItem.url} 
                  controls 
                  autoPlay 
                  className="lightbox-video"
                />
              )}
            </div>
            
            <div className="lightbox-caption">
              <h4>{lightboxItem.title}</h4>
              <p>Click outside to close • Use arrow keys to navigate</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}