import api from './http';

const unwrap = async (promise) => (await promise).data.data;

export const authApi = {
  login: (payload) => unwrap(api.post('/auth/login', payload)),
  register: (payload) => unwrap(api.post('/auth/register', payload))
};

export const donationApi = {
  list: (params) => unwrap(api.get('/donations', { params })),
  create: (payload) => unwrap(api.post('/donations', payload))
};

export const corporateApi = {
  listProposals: (params) => unwrap(api.get('/corporate/proposals', { params })),
  createProposal: (payload) => unwrap(api.post('/corporate/proposals', payload)),
  reviewProposal: (id, payload) => unwrap(api.patch(`/corporate/proposals/${id}/review`, payload))
};

export const animalApi = {
  list: () => unwrap(api.get('/animal-programs')),
  create: (payload) => unwrap(api.post('/animal-programs', payload))
};

export const scholarshipApi = {
  list: () => unwrap(api.get('/scholarships')),
  create: (payload) => unwrap(api.post('/scholarships', payload)),
  apply: (payload) => unwrap(api.post('/scholarships/applications', payload)),
  listApplications: () => unwrap(api.get('/scholarships/applications')),
  reviewApplication: (id, payload) => unwrap(api.patch(`/scholarships/applications/${id}/review`, payload))
};

export const analyticsApi = {
  adminSummary: () => unwrap(api.get('/admin/analytics/summary')),
  admin: () => unwrap(api.get('/analytics/admin')),
  corporate: () => unwrap(api.get('/analytics/corporate')),
  volunteer: () => unwrap(api.get('/analytics/volunteer'))
};
