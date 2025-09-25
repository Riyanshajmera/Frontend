import { Cloudinary } from '@cloudinary/url-gen';
import { auto } from '@cloudinary/url-gen/actions/resize';
import { autoGravity } from '@cloudinary/url-gen/qualifiers/gravity';
import { format, quality } from '@cloudinary/url-gen/actions/delivery';
import { cloudinaryConfig } from '../config/cloudinary';

// Initialize Cloudinary instance
export const cld = new Cloudinary({
  cloud: {
    cloudName: cloudinaryConfig.cloudName
  }
});

// Upload file to Cloudinary with progress tracking
export const uploadToCloudinary = async (file, onProgress = null) => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    const formData = new FormData();
    
    formData.append('file', file);
    formData.append('upload_preset', cloudinaryConfig.uploadPreset);
    formData.append('folder', cloudinaryConfig.folder);
    formData.append('resource_type', 'auto');
    
    // Add timestamp for unique naming
    formData.append('public_id', `cert_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`);

    // Track upload progress
    if (onProgress) {
      xhr.upload.addEventListener('progress', (e) => {
        if (e.lengthComputable) {
          const percentComplete = Math.round((e.loaded / e.total) * 100);
          onProgress(percentComplete);
        }
      });
    }

    xhr.addEventListener('load', () => {
      if (xhr.status === 200) {
        const response = JSON.parse(xhr.responseText);
        resolve({
          url: response.secure_url,
          publicId: response.public_id,
          format: response.format,
          bytes: response.bytes,
          width: response.width,
          height: response.height,
          resourceType: response.resource_type,
          createdAt: response.created_at
        });
      } else {
        reject(new Error(`Upload failed with status: ${xhr.status}`));
      }
    });

    xhr.addEventListener('error', () => {
      reject(new Error('Network error during upload'));
    });

    xhr.open('POST', `https://api.cloudinary.com/v1_1/${cloudinaryConfig.cloudName}/upload`);
    xhr.send(formData);
  });
};

// Get optimized image URL
export const getOptimizedImageUrl = (publicId, options = {}) => {
  const defaultOptions = {
    width: 800,
    height: 600,
    crop: 'limit',
    quality: 'auto',
    format: 'auto'
  };

  const finalOptions = { ...defaultOptions, ...options };

  const img = cld
    .image(publicId)
    .format(finalOptions.format)
    .quality(finalOptions.quality)
    .resize(auto().gravity(autoGravity()).width(finalOptions.width).height(finalOptions.height));

  return img.toURL();
};

// Get thumbnail URL
export const getThumbnailUrl = (publicId) => {
  return getOptimizedImageUrl(publicId, {
    width: 300,
    height: 200,
    crop: 'fill'
  });
};

// Generate multiple image sizes
export const getResponsiveImageUrls = (publicId) => {
  const sizes = [
    { name: 'thumbnail', width: 300, height: 200 },
    { name: 'medium', width: 600, height: 400 },
    { name: 'large', width: 1200, height: 800 },
    { name: 'original', width: null, height: null }
  ];

  return sizes.reduce((acc, size) => {
    acc[size.name] = size.width ? 
      getOptimizedImageUrl(publicId, { width: size.width, height: size.height }) :
      cld.image(publicId).format('auto').quality('auto').toURL();
    return acc;
  }, {});
};

// File validation utilities
export const validateImageFile = (file) => {
  const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
  const maxSize = cloudinaryConfig.maxFileSize;
  
  const errors = [];
  
  if (!validTypes.includes(file.type)) {
    errors.push('File must be an image (JPEG, PNG, or WebP)');
  }
  
  if (file.size > maxSize) {
    errors.push(`File size must be less than ${maxSize / 1024 / 1024}MB`);
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};

// Convert file to base64 for preview
export const fileToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
};

// Delete image from Cloudinary (requires backend implementation)
export const deleteFromCloudinary = async (publicId) => {
  // This should be implemented on your backend for security
  // Frontend cannot directly delete from Cloudinary
  console.warn('Delete operation should be implemented on backend');
  return { success: false, message: 'Delete operation not implemented' };
};