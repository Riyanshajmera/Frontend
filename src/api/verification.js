import { http } from './http';

export const verificationApi = {
  // Verify by URL
  async verifyByUrl(certificate_url, metadata = {}) {
    return await http.post('/verification/verify/', { 
      certificate_url,
      ...metadata
    });
  },

  // Verify by direct file upload
  async verifyByFile(file, metadata = {}) {
    const formData = new FormData();
    formData.append('certificate_file', file);
    
    // Add metadata
    Object.keys(metadata).forEach(key => {
      formData.append(key, metadata[key]);
    });

    return await http.post('/verification/verify-file/', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
  },

  // Verify using Cloudinary URL with additional context
  async verifyByCloudinaryUrl(cloudinary_url, originalFilename = '', publicId = '') {
    return await http.post('/verification/verify/', { 
      certificate_url: cloudinary_url,
      source: 'cloudinary',
      original_filename: originalFilename,
      public_id: publicId,
      timestamp: new Date().toISOString()
    });
  },

  // Get verification history
  async getVerificationHistory(limit = 10, offset = 0) {
    return await http.get(`/verification/history/?limit=${limit}&offset=${offset}`);
  },

  // Download verification report
  async downloadReport(verification_id) {
    return await http.get(`/verification/report/${verification_id}/`, {
      responseType: 'blob'
    });
  },

  // Get verification statistics
  async getStats() {
    return await http.get('/verification/stats/');
  },

  // Delete verification record
  async deleteVerification(verification_id) {
    return await http.delete(`/verification/${verification_id}/`);
  }
};