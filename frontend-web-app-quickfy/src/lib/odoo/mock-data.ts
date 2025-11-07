import type {
  User,
  Workspace,
  DashboardMetrics,
  Ticket,
  Goal,
  Review,
  Campaign,
  SocialMetrics,
  TrafficSource,
  TopPage,
  Report,
} from '@/types';

// Mock Users
export const mockUsers: User[] = [
  {
    id: '1',
    email: 'admin@quickfy.com',
    name: 'Admin User',
    role: 'admin',
    createdAt: '2024-01-01T00:00:00Z',
    lastLogin: new Date().toISOString(),
  },
  {
    id: '2',
    email: 'editor@quickfy.com',
    name: 'Editor User',
    role: 'editor',
    createdAt: '2024-01-15T00:00:00Z',
  },
];

// Mock Workspaces
export const mockWorkspaces: Workspace[] = [
  {
    id: '1',
    name: 'My Company',
    slug: 'my-company',
    plan: 'pro',
    subscriptionStatus: 'active',
    members: [
      {
        id: '1',
        user: mockUsers[0],
        role: 'admin',
        invitedAt: '2024-01-01T00:00:00Z',
        acceptedAt: '2024-01-01T00:00:00Z',
      },
    ],
    createdAt: '2024-01-01T00:00:00Z',
    settings: {
      timezone: 'Europe/Rome',
      currency: 'EUR',
      locale: 'it_IT',
      analytics: {
        connected: true,
        trackingId: 'G-ABCD123456',
        propertyId: '123456789',
      },
      googleAds: {
        connected: true,
        customerId: '123-456-7890',
        conversionId: 'AW-987654321',
        conversionLabel: 'abcDEF123ghiJKL',
      },
    },
  },
];

// Mock Dashboard Metrics
export const mockDashboardMetrics: DashboardMetrics = {
  sessions: {
    current: 12543,
    previous: 10234,
    change: 22.6,
    trend: 'up',
  },
  users: {
    current: 8932,
    previous: 7456,
    change: 19.8,
    trend: 'up',
  },
  conversions: {
    current: 456,
    previous: 412,
    change: 10.7,
    trend: 'up',
  },
  bounceRate: {
    current: 42.3,
    previous: 45.8,
    change: -7.6,
    trend: 'down',
  },
  avgSessionDuration: {
    current: 185, // seconds
    previous: 172,
    change: 7.6,
    trend: 'up',
  },
  pageViews: {
    current: 45678,
    previous: 39123,
    change: 16.8,
    trend: 'up',
  },
};

// Mock Traffic Sources
export const mockTrafficSources: TrafficSource[] = [
  {
    source: 'Organic Search',
    sessions: 5432,
    users: 4123,
    bounceRate: 38.5,
    conversions: 234,
  },
  {
    source: 'Direct',
    sessions: 3210,
    users: 2876,
    bounceRate: 41.2,
    conversions: 123,
  },
  {
    source: 'Social Media',
    sessions: 2345,
    users: 1987,
    bounceRate: 52.3,
    conversions: 67,
  },
  {
    source: 'Referral',
    sessions: 1556,
    users: 1234,
    bounceRate: 35.7,
    conversions: 32,
  },
];

// Mock Top Pages
export const mockTopPages: TopPage[] = [
  {
    path: '/products',
    title: 'Our Products',
    views: 8765,
    avgTime: 245,
    bounceRate: 35.2,
  },
  {
    path: '/services',
    title: 'Services',
    views: 6543,
    avgTime: 198,
    bounceRate: 42.1,
  },
  {
    path: '/about',
    title: 'About Us',
    views: 4321,
    avgTime: 167,
    bounceRate: 48.5,
  },
  {
    path: '/contact',
    title: 'Contact',
    views: 3210,
    avgTime: 123,
    bounceRate: 28.9,
  },
];

// Mock Reports
export const mockReports: Report[] = [
  {
    id: '1',
    name: 'Monthly Traffic Report',
    type: 'looker',
    url: 'https://lookerstudio.google.com/reporting/123',
    createdAt: '2024-01-01T00:00:00Z',
    lastUpdated: new Date().toISOString(),
  },
  {
    id: '2',
    name: 'Conversion Funnel',
    type: 'looker',
    url: 'https://lookerstudio.google.com/reporting/456',
    createdAt: '2024-01-15T00:00:00Z',
    lastUpdated: new Date().toISOString(),
  },
];

// Mock Tickets
export const mockTickets: Ticket[] = [
  {
    id: '1',
    number: 1001,
    subject: 'Website performance issue',
    description: 'The homepage is loading very slowly',
    status: 'open',
    priority: 'high',
    category: 'bug',
    createdBy: mockUsers[0],
    createdAt: '2024-11-01T10:00:00Z',
    updatedAt: '2024-11-01T10:00:00Z',
    comments: [],
  },
  {
    id: '2',
    number: 1002,
    subject: 'Need help with analytics setup',
    description: 'How do I connect Google Analytics?',
    status: 'in_progress',
    priority: 'medium',
    category: 'support',
    createdBy: mockUsers[0],
    createdAt: '2024-10-30T14:30:00Z',
    updatedAt: '2024-11-01T09:00:00Z',
    comments: [],
  },
];

// Mock Goals
export const mockGoals: Goal[] = [
  {
    id: '1',
    name: 'Increase website traffic',
    description: 'Get 50,000 monthly visitors',
    metric: 'sessions',
    targetValue: 50000,
    currentValue: 42543,
    period: 'monthly',
    startDate: '2024-11-01T00:00:00Z',
    endDate: '2024-11-30T23:59:59Z',
    status: 'on_track',
    progress: 85.1,
    owner: mockUsers[0],
    createdAt: '2024-11-01T00:00:00Z',
  },
  {
    id: '2',
    name: 'Conversion rate goal',
    description: 'Achieve 5% conversion rate',
    metric: 'conversion_rate',
    targetValue: 5.0,
    currentValue: 3.6,
    period: 'monthly',
    startDate: '2024-11-01T00:00:00Z',
    endDate: '2024-11-30T23:59:59Z',
    status: 'at_risk',
    progress: 72.0,
    createdAt: '2024-11-01T00:00:00Z',
  },
];

// Mock Reviews
export const mockReviews: Review[] = [
  {
    id: '1',
    source: 'google',
    rating: 5,
    author: 'Mario Rossi',
    content: 'Ottimo servizio, molto professionale e veloce!',
    sentiment: 'positive',
    categories: ['servizio clienti', 'professionalità'],
    hasResponse: false,
    createdAt: '2024-10-28T15:30:00Z',
  },
  {
    id: '2',
    source: 'google',
    rating: 4,
    author: 'Laura Bianchi',
    content: 'Buona esperienza, ma i tempi di consegna potrebbero essere migliori',
    sentiment: 'neutral',
    categories: ['consegna', 'esperienza'],
    hasResponse: true,
    response: {
      id: 'r1',
      reviewId: '2',
      content:
        'Grazie per il feedback! Stiamo lavorando per migliorare i nostri tempi di consegna.',
      author: mockUsers[0],
      createdAt: '2024-10-29T09:00:00Z',
    },
    createdAt: '2024-10-27T11:20:00Z',
    respondedAt: '2024-10-29T09:00:00Z',
  },
  {
    id: '3',
    source: 'facebook',
    rating: 2,
    author: 'Giuseppe Verdi',
    content: 'Servizio deludente, ho dovuto aspettare troppo',
    sentiment: 'negative',
    categories: ['attesa', 'servizio'],
    hasResponse: false,
    createdAt: '2024-10-25T16:45:00Z',
  },
];

// Mock Social Metrics
export const mockSocialMetrics: SocialMetrics[] = [
  {
    platform: 'facebook',
    followers: 12543,
    followersChange: 234,
    reach: 45678,
    reachChange: 1234,
    engagement: 3.5,
    engagementChange: 0.3,
    posts: 15,
  },
  {
    platform: 'instagram',
    followers: 8932,
    followersChange: 456,
    reach: 32145,
    reachChange: 2345,
    engagement: 4.2,
    engagementChange: 0.5,
    posts: 23,
  },
];

// Mock Campaigns
export const mockCampaigns: Campaign[] = [
  {
    id: '1',
    name: 'Fall Sale 2024',
    platform: 'google_ads',
    status: 'active',
    budget: 10000,
    spent: 5245.67,
    impressions: 185643,
    clicks: 5456,
    conversions: 334,
    ctr: 2.94,
    cpc: 0.96,
    roas: 5.1,
    startDate: '2024-10-01T00:00:00Z',
    endDate: '2024-12-31T23:59:59Z',
  },
  {
    id: '2',
    name: 'Black Friday Campaign',
    platform: 'facebook_ads',
    status: 'paused',
    budget: 15000,
    spent: 14234.50,
    impressions: 456789,
    clicks: 8123,
    conversions: 412,
    ctr: 1.78,
    cpc: 1.75,
    roas: 3.8,
    startDate: '2024-11-15T00:00:00Z',
    endDate: '2024-11-29T23:59:59Z',
  },
  {
    id: '3',
    name: 'Winter Collection Launch',
    platform: 'instagram_ads',
    status: 'active',
    budget: 8000,
    spent: 3567.89,
    impressions: 234567,
    clicks: 4123,
    conversions: 189,
    ctr: 1.76,
    cpc: 0.87,
    roas: 4.5,
    startDate: '2024-11-20T00:00:00Z',
    endDate: '2025-01-15T23:59:59Z',
  },
  {
    id: '4',
    name: 'Brand Awareness Q4',
    platform: 'google_ads',
    status: 'active',
    budget: 20000,
    spent: 12345.23,
    impressions: 892341,
    clicks: 12456,
    conversions: 523,
    ctr: 1.40,
    cpc: 0.99,
    roas: 2.9,
    startDate: '2024-10-01T00:00:00Z',
    endDate: '2024-12-31T23:59:59Z',
  },
  {
    id: '5',
    name: 'Cyber Monday Deals',
    platform: 'facebook_ads',
    status: 'ended',
    budget: 5000,
    spent: 4980.12,
    impressions: 178934,
    clicks: 3421,
    conversions: 287,
    ctr: 1.91,
    cpc: 1.46,
    roas: 6.2,
    startDate: '2024-11-25T00:00:00Z',
    endDate: '2024-12-02T23:59:59Z',
  },
  {
    id: '6',
    name: 'Holiday Gift Guide',
    platform: 'instagram_ads',
    status: 'active',
    budget: 7500,
    spent: 4123.45,
    impressions: 312456,
    clicks: 5234,
    conversions: 298,
    ctr: 1.68,
    cpc: 0.79,
    roas: 5.7,
    startDate: '2024-12-01T00:00:00Z',
    endDate: '2024-12-25T23:59:59Z',
  },
  {
    id: '7',
    name: 'New Year Promotion',
    platform: 'google_ads',
    status: 'active',
    budget: 12000,
    spent: 1234.56,
    impressions: 45678,
    clicks: 789,
    conversions: 45,
    ctr: 1.73,
    cpc: 1.56,
    roas: 2.1,
    startDate: '2024-12-26T00:00:00Z',
    endDate: '2025-01-10T23:59:59Z',
  },
  {
    id: '8',
    name: 'Summer Preview 2025',
    platform: 'facebook_ads',
    status: 'paused',
    budget: 6000,
    spent: 2456.78,
    impressions: 98765,
    clicks: 1876,
    conversions: 92,
    ctr: 1.90,
    cpc: 1.31,
    roas: 3.2,
    startDate: '2024-11-01T00:00:00Z',
  },
  {
    id: '9',
    name: 'Retargeting - Cart Abandoners',
    platform: 'google_ads',
    status: 'active',
    budget: 4500,
    spent: 3987.23,
    impressions: 67890,
    clicks: 2345,
    conversions: 234,
    ctr: 3.45,
    cpc: 1.70,
    roas: 7.8,
    startDate: '2024-11-10T00:00:00Z',
  },
  {
    id: '10',
    name: 'Local Store Promotion',
    platform: 'instagram_ads',
    status: 'active',
    budget: 3000,
    spent: 1678.90,
    impressions: 145678,
    clicks: 2134,
    conversions: 87,
    ctr: 1.46,
    cpc: 0.79,
    roas: 2.8,
    startDate: '2024-11-15T00:00:00Z',
    endDate: '2024-12-15T23:59:59Z',
  },
  {
    id: '11',
    name: 'Student Discount Program',
    platform: 'facebook_ads',
    status: 'ended',
    budget: 2500,
    spent: 2498.45,
    impressions: 123456,
    clicks: 1987,
    conversions: 156,
    ctr: 1.61,
    cpc: 1.26,
    roas: 4.1,
    startDate: '2024-09-01T00:00:00Z',
    endDate: '2024-10-31T23:59:59Z',
  },
  {
    id: '12',
    name: 'Mobile App Downloads',
    platform: 'google_ads',
    status: 'active',
    budget: 9000,
    spent: 7234.12,
    impressions: 567890,
    clicks: 8934,
    conversions: 456,
    ctr: 1.57,
    cpc: 0.81,
    roas: 3.5,
    startDate: '2024-10-15T00:00:00Z',
  },
  {
    id: '13',
    name: 'Product Launch - Winter Boots',
    platform: 'instagram_ads',
    status: 'active',
    budget: 11000,
    spent: 8934.67,
    impressions: 445678,
    clicks: 6789,
    conversions: 389,
    ctr: 1.52,
    cpc: 1.32,
    roas: 4.9,
    startDate: '2024-11-01T00:00:00Z',
    endDate: '2024-12-31T23:59:59Z',
  },
  {
    id: '14',
    name: 'Email Subscribers Re-engagement',
    platform: 'facebook_ads',
    status: 'paused',
    budget: 1500,
    spent: 789.45,
    impressions: 34567,
    clicks: 567,
    conversions: 23,
    ctr: 1.64,
    cpc: 1.39,
    roas: 1.8,
    startDate: '2024-10-20T00:00:00Z',
  },
  {
    id: '15',
    name: 'VIP Customer Exclusive',
    platform: 'google_ads',
    status: 'active',
    budget: 5500,
    spent: 4123.89,
    impressions: 98765,
    clicks: 2456,
    conversions: 312,
    ctr: 2.49,
    cpc: 1.68,
    roas: 8.2,
    startDate: '2024-11-18T00:00:00Z',
    endDate: '2024-12-18T23:59:59Z',
  },
  {
    id: '16',
    name: 'Clearance Sale - Spring Items',
    platform: 'instagram_ads',
    status: 'ended',
    budget: 2000,
    spent: 1999.99,
    impressions: 156789,
    clicks: 1876,
    conversions: 98,
    ctr: 1.20,
    cpc: 1.07,
    roas: 2.5,
    startDate: '2024-09-15T00:00:00Z',
    endDate: '2024-10-15T23:59:59Z',
  },
  {
    id: '17',
    name: 'Influencer Collaboration',
    platform: 'instagram_ads',
    status: 'active',
    budget: 8500,
    spent: 2345.67,
    impressions: 289456,
    clicks: 4123,
    conversions: 201,
    ctr: 1.42,
    cpc: 0.57,
    roas: 6.1,
    startDate: '2024-12-01T00:00:00Z',
    endDate: '2025-01-31T23:59:59Z',
  },
  {
    id: '18',
    name: 'B2B Lead Generation',
    platform: 'google_ads',
    status: 'active',
    budget: 15000,
    spent: 9876.54,
    impressions: 234567,
    clicks: 3456,
    conversions: 178,
    ctr: 1.47,
    cpc: 2.86,
    roas: 1.9,
    startDate: '2024-11-01T00:00:00Z',
  },
];

// Mock API functions
export const mockApi = {
  // Auth
  login: async (email: string, password: string) => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    if (email === 'admin@quickfy.com' && password === 'password') {
      return {
        user: mockUsers[0],
        token: 'mock-jwt-token',
        workspaces: mockWorkspaces,
      };
    }
    throw new Error('Invalid credentials');
  },

  // Dashboard
  getDashboardMetrics: async () => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    return mockDashboardMetrics;
  },

  getTrafficSources: async () => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    return mockTrafficSources;
  },

  getTopPages: async () => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    return mockTopPages;
  },

  getReports: async () => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    return mockReports;
  },

  // Tickets
  getTickets: async () => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    return mockTickets;
  },

  createTicket: async (data: unknown) => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return { id: '3', number: 1003, ...(data as object) };
  },

  // Goals
  getGoals: async () => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    return mockGoals;
  },

  createGoal: async (data: unknown) => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return { id: '3', ...(data as object) };
  },

  // Reviews
  getReviews: async () => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    return mockReviews;
  },

  // Social
  getSocialMetrics: async () => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    return mockSocialMetrics;
  },

  // Campaigns
  getCampaigns: async () => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    return mockCampaigns;
  },

  // ============================================
  // WORKSPACE MANAGEMENT
  // ============================================

  getWorkspaces: async () => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    return mockWorkspaces;
  },

  getWorkspace: async (id: string) => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    const workspace = mockWorkspaces.find((w) => w.id === id);
    if (!workspace) throw new Error('Workspace not found');
    return workspace;
  },

  createWorkspace: async (data: any) => {
    await new Promise((resolve) => setTimeout(resolve, 800));
    const newWorkspace: Workspace = {
      id: Date.now().toString(),
      name: data.name,
      slug: data.slug,
      plan: 'starter',
      subscriptionStatus: 'trialing',
      trialEndsAt: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(),
      members: [
        {
          id: '1',
          user: mockUsers[0],
          role: 'admin',
          invitedAt: new Date().toISOString(),
          acceptedAt: new Date().toISOString(),
        },
      ],
      createdAt: new Date().toISOString(),
      settings: {
        timezone: 'Europe/Rome',
        currency: 'EUR',
        locale: 'it_IT',
        analytics: {
          connected: false,
        },
        googleAds: {
          connected: false,
        },
      },
    };
    // Don't push to mockWorkspaces - the store will handle adding it
    // mockWorkspaces.push(newWorkspace);
    return newWorkspace;
  },

  updateWorkspace: async (id: string, data: any) => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    const index = mockWorkspaces.findIndex((w) => w.id === id);
    if (index === -1) throw new Error('Workspace not found');

    mockWorkspaces[index] = {
      ...mockWorkspaces[index],
      ...data,
      settings: data.settings
        ? { ...mockWorkspaces[index].settings, ...data.settings }
        : mockWorkspaces[index].settings,
    };
    return mockWorkspaces[index];
  },

  deleteWorkspace: async (id: string) => {
    await new Promise((resolve) => setTimeout(resolve, 800));
    const index = mockWorkspaces.findIndex((w) => w.id === id);
    if (index === -1) throw new Error('Workspace not found');
    mockWorkspaces.splice(index, 1);
  },

  // ============================================
  // WORKSPACE MEMBERS
  // ============================================

  inviteMember: async (workspaceId: string, data: any) => {
    await new Promise((resolve) => setTimeout(resolve, 600));
    const workspace = mockWorkspaces.find((w) => w.id === workspaceId);
    if (!workspace) throw new Error('Workspace not found');

    const newMember: any = {
      id: Date.now().toString(),
      user: {
        id: Date.now().toString(),
        email: data.email,
        name: data.email.split('@')[0],
        role: data.role,
        createdAt: new Date().toISOString(),
      },
      role: data.role,
      invitedAt: new Date().toISOString(),
      // acceptedAt undefined = pending
    };

    workspace.members.push(newMember);
    return newMember;
  },

  updateMemberRole: async (workspaceId: string, memberId: string, data: any) => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    const workspace = mockWorkspaces.find((w) => w.id === workspaceId);
    if (!workspace) throw new Error('Workspace not found');

    const member = workspace.members.find((m) => m.id === memberId);
    if (!member) throw new Error('Member not found');

    member.role = data.role;
    member.user.role = data.role;
  },

  removeMember: async (workspaceId: string, memberId: string) => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    const workspace = mockWorkspaces.find((w) => w.id === workspaceId);
    if (!workspace) throw new Error('Workspace not found');

    const index = workspace.members.findIndex((m) => m.id === memberId);
    if (index === -1) throw new Error('Member not found');

    workspace.members.splice(index, 1);
  },

  resendInvite: async (_workspaceId: string, _memberId: string) => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    // Simulate API call
  },
};
