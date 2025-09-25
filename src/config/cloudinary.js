// Cloudinary configuration
export const cloudinaryConfig = {
  cloudName: import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || 'djdacaeua',
  apiKey: import.meta.env.VITE_CLOUDINARY_API_KEY || '536429198697758',
  uploadPreset: import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET || 'certificate_upload',
  folder: 'certificates',
  maxFileSize: parseInt(import.meta.env.VITE_MAX_FILE_SIZE) || 10485760, // 10MB
  allowedFormats: ['jpg', 'jpeg', 'png', 'pdf'],
  transformation: {
    quality: 'auto',
    format: 'auto',
    crop: 'limit',
    width: 1200,
    height: 800
  }
};

export const getCloudinaryUploadUrl = () => {
  return `https://api.cloudinary.com/v1_1/${cloudinaryConfig.cloudName}/image/upload`;
};

export const validateFile = (file) => {
  const errors = [];
  
  if (file.size > cloudinaryConfig.maxFileSize) {
    errors.push(`File size must be less than ${cloudinaryConfig.maxFileSize / 1024 / 1024}MB`);
  }
  
  const fileExtension = file.name.split('.').pop().toLowerCase();
  if (!cloudinaryConfig.allowedFormats.includes(fileExtension)) {
    errors.push(`File type must be one of: ${cloudinaryConfig.allowedFormats.join(', ')}`);
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};