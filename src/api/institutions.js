import { http, toFormData } from './http';

export const institutionsApi = {
  // Institutions
  async listInstitutions() {
    return await http.get('/institutions/institutions/');
  },
  async createInstitution(payload) {
    return await http.post('/institutions/institutions/', payload);
  },
  async getInstitution(id) {
    return await http.get(`/institutions/institutions/${id}/`);
  },
  async updateInstitution(id, payload) {
    return await http.patch(`/institutions/institutions/${id}/`, payload);
  },
  async deleteInstitution(id) {
    return await http.delete(`/institutions/institutions/${id}/`);
  },

  // Student Records
  async listStudentRecords() {
    return await http.get('/institutions/student-records/');
  },
  async createStudentRecord(payload) {
    return await http.post('/institutions/student-records/', payload);
  },
  async getStudentRecord(id) {
    return await http.get(`/institutions/student-records/${id}/`);
  },
  async updateStudentRecord(id, payload) {
    return await http.patch(`/institutions/student-records/${id}/`, payload);
  },
  async deleteStudentRecord(id) {
    return await http.delete(`/institutions/student-records/${id}/`);
  },

  // Upload/Export
  async uploadStudentRecords(file) {
    const form = new FormData();
    form.append('file', file);
    return await http.post('/institutions/student-records/upload/', form, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
  },
  async exportStudentRecords(format = 'csv') {
    // Return raw response to let caller handle download
    const res = await http.get(`/institutions/student-records/export/?format=${format}`, {
      responseType: 'blob'
    });
    return res;
  }
};


