import { OdooClient } from '@/lib/odoo/client';
import { mockApi, mockCampaigns } from '@/lib/odoo/mock-data';
import type {
  LoginCredentials,
  AuthResponse,
  DashboardMetrics,
  TrafficSource,
  TopPage,
  Report,
  Ticket,
  CreateTicketData,
  Goal,
  CreateGoalData,
  Review,
  SocialMetrics,
  Campaign,
  CampaignAnalytics,
  CampaignDailyData,
  CampaignStatus,
  AdPlatform,
  AnalyticsOverview,
  DateRange,
  ChartDataPoint,
  TrafficSourceData,
  LandingPageData,
  ComparisonPeriod,
} from '@/types';

const USE_MOCK = process.env.USE_MOCK_API === 'true';

class ApiClient {
  private odoo?: OdooClient;

  constructor() {
    if (!USE_MOCK) {
      const odooUrl = process.env.ODOO_URL;
      const odooDb = process.env.ODOO_DB;

      if (!odooUrl || !odooDb) {
        throw new Error(
          'ODOO_URL and ODOO_DB must be set when USE_MOCK_API is false'
        );
      }

      this.odoo = new OdooClient({
        url: odooUrl,
        db: odooDb,
      });
    }
  }

  // ============================================
  // AUTHENTICATION
  // ============================================

  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    if (USE_MOCK) {
      return mockApi.login(credentials.email, credentials.password);
    }

    // Real Odoo implementation
    if (!this.odoo) throw new Error('Odoo client not initialized');

    await this.odoo.authenticate(credentials.email, credentials.password);
    const session = this.odoo.getSession();

    // Fetch user data from res.users
    const users = await this.odoo.searchRead<{
      id: number;
      name: string;
      email: string;
      image_1920?: string;
    }>('res.users', [{ field: 'id', operator: '=', value: session.uid }], [
      'name',
      'email',
      'image_1920',
    ]);

    const odooUser = users[0];

    // Fetch companies (workspaces) the user has access to
    const companies = await this.odoo.searchRead<{
      id: number;
      name: string;
    }>('res.company', [], ['name']);

    return {
      user: {
        id: odooUser.id.toString(),
        email: odooUser.email,
        name: odooUser.name,
        role: 'admin', // Determine from groups
        createdAt: new Date().toISOString(),
      },
      token: session.sessionId || '',
      workspaces: companies.map((c) => ({
        id: c.id.toString(),
        name: c.name,
        slug: c.name.toLowerCase().replace(/\s+/g, '-'),
        plan: 'pro',
        subscriptionStatus: 'active',
        members: [],
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
      })),
    };
  }

  // ============================================
  // DASHBOARD
  // ============================================

  async getDashboardMetrics(): Promise<DashboardMetrics> {
    if (USE_MOCK) {
      return mockApi.getDashboardMetrics();
    }

    // Real Odoo implementation
    // This would integrate with custom Odoo modules or external analytics API
    throw new Error('Real dashboard metrics not implemented yet');
  }

  async getTrafficSources(): Promise<TrafficSource[]> {
    if (USE_MOCK) {
      return mockApi.getTrafficSources();
    }

    throw new Error('Real traffic sources not implemented yet');
  }

  async getTopPages(): Promise<TopPage[]> {
    if (USE_MOCK) {
      return mockApi.getTopPages();
    }

    throw new Error('Real top pages not implemented yet');
  }

  async getReports(): Promise<Report[]> {
    if (USE_MOCK) {
      return mockApi.getReports();
    }

    throw new Error('Real reports not implemented yet');
  }

  // ============================================
  // TICKETING
  // ============================================

  async getTickets(): Promise<Ticket[]> {
    if (USE_MOCK) {
      return mockApi.getTickets();
    }

    if (!this.odoo) throw new Error('Odoo client not initialized');

    // Real Odoo implementation using helpdesk.ticket model
    const tickets = await this.odoo.searchRead<{
      id: number;
      name: string;
      description: string;
      stage_id: [number, string];
      priority: string;
      ticket_type_id: [number, string] | false;
      user_id: [number, string] | false;
      create_uid: [number, string];
      create_date: string;
      write_date: string;
      close_date: string | false;
    }>(
      'helpdesk.ticket',
      [],
      [
        'name',
        'description',
        'stage_id',
        'priority',
        'ticket_type_id',
        'user_id',
        'create_uid',
        'create_date',
        'write_date',
        'close_date',
      ]
    );

    return tickets.map((t) => ({
      id: t.id.toString(),
      number: t.id,
      subject: t.name,
      description: t.description || '',
      status: this.mapOdooStageToStatus(t.stage_id[1]),
      priority: this.mapOdooPriority(t.priority),
      category: 'support',
      createdBy: {
        id: t.create_uid[0].toString(),
        name: t.create_uid[1],
        email: '',
        role: 'admin',
        createdAt: '',
      },
      createdAt: t.create_date,
      updatedAt: t.write_date,
      closedAt: t.close_date || undefined,
      comments: [],
    }));
  }

  async createTicket(data: CreateTicketData): Promise<Ticket> {
    if (USE_MOCK) {
      return mockApi.createTicket(data) as Promise<Ticket>;
    }

    if (!this.odoo) throw new Error('Odoo client not initialized');

    const ticketId = await this.odoo.create('helpdesk.ticket', {
      name: data.subject,
      description: data.description,
      priority: data.priority,
    });

    const tickets = await this.odoo.read<{
      id: number;
      name: string;
      description: string;
      create_date: string;
    }>('helpdesk.ticket', [ticketId], ['name', 'description', 'create_date']);

    const ticket = tickets[0];

    return {
      id: ticket.id.toString(),
      number: ticket.id,
      subject: ticket.name,
      description: ticket.description,
      status: 'open',
      priority: data.priority,
      category: data.category,
      createdBy: {
        id: '1',
        name: 'Current User',
        email: '',
        role: 'admin',
        createdAt: '',
      },
      createdAt: ticket.create_date,
      updatedAt: ticket.create_date,
      comments: [],
    };
  }

  // ============================================
  // GOALS
  // ============================================

  async getGoals(): Promise<Goal[]> {
    if (USE_MOCK) {
      return mockApi.getGoals();
    }

    throw new Error('Real goals not implemented yet');
  }

  async createGoal(data: CreateGoalData): Promise<Goal> {
    if (USE_MOCK) {
      return mockApi.createGoal(data) as Promise<Goal>;
    }

    throw new Error('Real create goal not implemented yet');
  }

  // ============================================
  // REVIEWS
  // ============================================

  async getReviews(): Promise<Review[]> {
    if (USE_MOCK) {
      return mockApi.getReviews();
    }

    throw new Error('Real reviews not implemented yet');
  }

  // ============================================
  // SOCIAL
  // ============================================

  async getSocialMetrics(): Promise<SocialMetrics[]> {
    if (USE_MOCK) {
      return mockApi.getSocialMetrics();
    }

    throw new Error('Real social metrics not implemented yet');
  }

  // ============================================
  // CAMPAIGNS
  // ============================================

  async getCampaigns(): Promise<Campaign[]> {
    if (USE_MOCK) {
      return mockApi.getCampaigns();
    }

    throw new Error('Real campaigns not implemented yet');
  }

  async getCampaignsAnalytics(
    dateRange: DateRange,
    comparisonRange?: DateRange,
    platformFilter?: AdPlatform,
    statusFilter?: CampaignStatus
  ): Promise<CampaignAnalytics> {
    if (USE_MOCK) {
      return this.generateMockCampaignsAnalytics(dateRange, comparisonRange, platformFilter, statusFilter);
    }

    throw new Error('Real campaigns analytics not implemented yet');
  }

  // ============================================
  // HELPER METHODS
  // ============================================

  private generateMockCampaignsAnalytics(
    dateRange: DateRange,
    comparisonRange?: DateRange,
    platformFilter?: AdPlatform,
    statusFilter?: CampaignStatus
  ): CampaignAnalytics {
    const campaigns = mockCampaigns.filter(c => {
      if (platformFilter && c.platform !== platformFilter) return false;
      if (statusFilter && c.status !== statusFilter) return false;
      return true;
    });

    const totalSpent = campaigns.reduce((sum, c) => sum + c.spent, 0);
    const totalImpressions = campaigns.reduce((sum, c) => sum + c.impressions, 0);
    const totalClicks = campaigns.reduce((sum, c) => sum + c.clicks, 0);
    const totalConversions = campaigns.reduce((sum, c) => sum + c.conversions, 0);
    const avgCTR = campaigns.length > 0
      ? campaigns.reduce((sum, c) => sum + c.ctr, 0) / campaigns.length
      : 0;
    const avgCPC = campaigns.length > 0
      ? campaigns.reduce((sum, c) => sum + c.cpc, 0) / campaigns.length
      : 0;
    const avgROAS = campaigns.length > 0
      ? campaigns.reduce((sum, c) => sum + c.roas, 0) / campaigns.length
      : 0;

    // Generate daily chart data
    const start = new Date(dateRange.startDate);
    const end = new Date(dateRange.endDate);
    const days = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));

    const spentChart: ChartDataPoint[] = [];
    const clicksChart: ChartDataPoint[] = [];
    const roasChart: ChartDataPoint[] = [];
    const dailyBreakdown: CampaignDailyData[] = [];

    for (let i = 0; i <= days; i++) {
      const date = new Date(start);
      date.setDate(date.getDate() + i);
      const dateStr = date.toISOString().split('T')[0];

      // Weekend factor (30% less on weekends)
      const isWeekend = date.getDay() === 0 || date.getDay() === 6;
      const weekendFactor = isWeekend ? 0.7 : 1;

      // Daily variation (0.8 - 1.2x)
      const dailyVariation = 0.8 + Math.random() * 0.4;

      const baseSpent = totalSpent / (days + 1);
      const baseClicks = totalClicks / (days + 1);
      const baseROAS = avgROAS;

      const dailySpent = baseSpent * weekendFactor * dailyVariation;
      const dailyClicks = baseClicks * weekendFactor * dailyVariation;
      const dailyROAS = baseROAS * (0.9 + Math.random() * 0.2);
      const dailyImpressions = dailyClicks / (avgCTR / 100);
      const dailyConversions = dailyClicks * (totalConversions / totalClicks);
      const dailyCTR = avgCTR * (0.9 + Math.random() * 0.2);
      const dailyCPC = avgCPC * (0.9 + Math.random() * 0.2);

      spentChart.push({
        date: dateStr,
        value: dailySpent,
        comparisonValue: comparisonRange ? dailySpent * (0.85 + Math.random() * 0.3) : undefined,
      });

      clicksChart.push({
        date: dateStr,
        value: dailyClicks,
        comparisonValue: comparisonRange ? dailyClicks * (0.85 + Math.random() * 0.3) : undefined,
      });

      roasChart.push({
        date: dateStr,
        value: dailyROAS,
        comparisonValue: comparisonRange ? dailyROAS * (0.85 + Math.random() * 0.3) : undefined,
      });

      dailyBreakdown.push({
        date: dateStr,
        spent: dailySpent,
        impressions: dailyImpressions,
        clicks: dailyClicks,
        conversions: dailyConversions,
        ctr: dailyCTR,
        cpc: dailyCPC,
        roas: dailyROAS,
      });
    }

    // Generate comparison changes
    const generateChange = () => -5 + Math.random() * 35; // -5% to +30%

    return {
      totalSpent,
      totalImpressions,
      totalClicks,
      totalConversions,
      avgCTR,
      avgCPC,
      avgROAS,
      totalSpentChange: generateChange(),
      totalImpressionsChange: generateChange(),
      totalClicksChange: generateChange(),
      totalConversionsChange: generateChange(),
      avgCTRChange: generateChange(),
      avgCPCChange: generateChange(),
      avgROASChange: generateChange(),
      spentChart,
      clicksChart,
      roasChart,
      dailyBreakdown,
    };
  }

  private mapOdooStageToStatus(
    stage: string
  ): 'open' | 'in_progress' | 'waiting' | 'closed' {
    const stageLower = stage.toLowerCase();
    if (stageLower.includes('new') || stageLower.includes('open')) return 'open';
    if (stageLower.includes('progress')) return 'in_progress';
    if (stageLower.includes('wait')) return 'waiting';
    if (stageLower.includes('done') || stageLower.includes('closed'))
      return 'closed';
    return 'open';
  }

  private mapOdooPriority(
    priority: string
  ): 'low' | 'medium' | 'high' | 'urgent' {
    const priorityMap: Record<string, 'low' | 'medium' | 'high' | 'urgent'> = {
      '0': 'low',
      '1': 'medium',
      '2': 'high',
      '3': 'urgent',
    };
    return priorityMap[priority] || 'medium';
  }

  // ============================================
  // ANALYTICS & DASHBOARD
  // ============================================

  async getAnalyticsOverview(
    dateRange: DateRange,
    comparisonRange?: DateRange,
    countryFilter?: string
  ): Promise<AnalyticsOverview> {
    if (USE_MOCK) {
      return this.generateMockAnalytics(dateRange, comparisonRange, countryFilter);
    }

    throw new Error('Real analytics overview not implemented yet');
  }

  async getAnalyticsChartData(
    dateRange: DateRange,
    metric: 'users' | 'pageViews' | 'conversions',
    comparisonRange?: DateRange,
    countryFilter?: string
  ): Promise<ChartDataPoint[]> {
    if (USE_MOCK) {
      const overview = await this.generateMockAnalytics(dateRange, comparisonRange, countryFilter);

      switch (metric) {
        case 'users':
          return overview.usersChart;
        case 'pageViews':
          return overview.pageViewsChart;
        case 'conversions':
          return overview.conversionsChart;
        default:
          return overview.usersChart;
      }
    }

    throw new Error('Real analytics chart data not implemented yet');
  }

  async getTrafficSourcesDetailed(
    dateRange: DateRange,
    countryFilter?: string
  ): Promise<TrafficSourceData[]> {
    if (USE_MOCK) {
      const overview = await this.generateMockAnalytics(dateRange, undefined, countryFilter);
      return overview.trafficSources;
    }

    throw new Error('Real traffic sources not implemented yet');
  }

  async getLandingPagesData(
    dateRange: DateRange,
    countryFilter?: string
  ): Promise<LandingPageData[]> {
    if (USE_MOCK) {
      const overview = await this.generateMockAnalytics(dateRange, undefined, countryFilter);
      return overview.landingPages;
    }

    throw new Error('Real landing pages not implemented yet');
  }

  // Mock data generator for analytics
  private generateMockAnalytics(
    dateRange: DateRange,
    comparisonRange?: DateRange,
    countryFilter?: string
  ): AnalyticsOverview {
    const { startDate, endDate } = dateRange;
    const start = new Date(startDate);
    const end = new Date(endDate);
    const days = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1;

    // Generate base metrics
    const baseSessions = 15000 + Math.floor(Math.random() * 5000);
    const baseUsers = Math.floor(baseSessions * (0.7 + Math.random() * 0.2));
    const baseKeyEvents = Math.floor(baseSessions * (0.03 + Math.random() * 0.05));
    const basePageViews = Math.floor(baseSessions * (2.5 + Math.random() * 1.5));

    // Calculate comparison changes
    const sessionsChange = -5 + Math.random() * 30;
    const usersChange = -5 + Math.random() * 25;
    const eventsChange = -10 + Math.random() * 40;
    const pageViewsChange = -5 + Math.random() * 20;

    const metrics = {
      sessions: baseSessions,
      sessionsChange,
      activeUsers: baseUsers,
      activeUsersChange: usersChange,
      keyEvents: baseKeyEvents,
      keyEventsChange: eventsChange,
      pageViews: basePageViews,
      pageViewsChange,
      bounceRate: 45 + Math.random() * 15,
      bounceRateChange: -5 + Math.random() * 10,
      avgSessionDuration: 120 + Math.random() * 60,
      avgSessionDurationChange: -10 + Math.random() * 20,
    };

    // Generate chart data
    const usersChart: ChartDataPoint[] = [];
    const pageViewsChart: ChartDataPoint[] = [];
    const conversionsChart: ChartDataPoint[] = [];

    for (let i = 0; i < days; i++) {
      const currentDate = new Date(start);
      currentDate.setDate(start.getDate() + i);
      const dateStr = currentDate.toISOString().split('T')[0];

      // Add some realistic variation
      const dayVariation = 0.8 + Math.random() * 0.4;
      const weekendFactor = currentDate.getDay() === 0 || currentDate.getDay() === 6 ? 0.7 : 1;

      const dayUsers = Math.floor((baseUsers / days) * dayVariation * weekendFactor);
      const dayPageViews = Math.floor((basePageViews / days) * dayVariation * weekendFactor);
      const dayConversions = Math.floor((baseKeyEvents / days) * dayVariation * weekendFactor);

      usersChart.push({
        date: dateStr,
        value: dayUsers,
        comparisonValue: comparisonRange ? Math.floor(dayUsers / (1 + usersChange / 100)) : undefined,
      });

      pageViewsChart.push({
        date: dateStr,
        value: dayPageViews,
        comparisonValue: comparisonRange ? Math.floor(dayPageViews / (1 + pageViewsChange / 100)) : undefined,
      });

      conversionsChart.push({
        date: dateStr,
        value: dayConversions,
        comparisonValue: comparisonRange ? Math.floor(dayConversions / (1 + eventsChange / 100)) : undefined,
      });
    }

    // Traffic sources
    const trafficSources: TrafficSourceData[] = [
      {
        source: 'google',
        medium: 'organic',
        sessions: Math.floor(baseSessions * 0.35),
        keyEvents: Math.floor(baseKeyEvents * 0.4),
        conversionRate: 4.2,
        users: Math.floor(baseUsers * 0.38),
      },
      {
        source: 'google',
        medium: 'cpc',
        sessions: Math.floor(baseSessions * 0.25),
        keyEvents: Math.floor(baseKeyEvents * 0.3),
        conversionRate: 5.1,
        users: Math.floor(baseUsers * 0.22),
      },
      {
        source: '(direct)',
        medium: '(none)',
        sessions: Math.floor(baseSessions * 0.2),
        keyEvents: Math.floor(baseKeyEvents * 0.15),
        conversionRate: 2.8,
        users: Math.floor(baseUsers * 0.21),
      },
      {
        source: 'facebook',
        medium: 'social',
        sessions: Math.floor(baseSessions * 0.12),
        keyEvents: Math.floor(baseKeyEvents * 0.1),
        conversionRate: 3.3,
        users: Math.floor(baseUsers * 0.11),
      },
      {
        source: 'newsletter',
        medium: 'email',
        sessions: Math.floor(baseSessions * 0.08),
        keyEvents: Math.floor(baseKeyEvents * 0.05),
        conversionRate: 2.1,
        users: Math.floor(baseUsers * 0.08),
      },
    ];

    // Landing pages
    const landingPages: LandingPageData[] = [
      {
        page: '/',
        pageTitle: 'Homepage',
        views: Math.floor(basePageViews * 0.3),
        keyEvents: Math.floor(baseKeyEvents * 0.25),
        bounceRate: 42.5,
        avgTimeOnPage: 125,
      },
      {
        page: '/prodotti',
        pageTitle: 'Prodotti',
        views: Math.floor(basePageViews * 0.2),
        keyEvents: Math.floor(baseKeyEvents * 0.35),
        bounceRate: 38.2,
        avgTimeOnPage: 215,
      },
      {
        page: '/offerte',
        pageTitle: 'Offerte Speciali',
        views: Math.floor(basePageViews * 0.15),
        keyEvents: Math.floor(baseKeyEvents * 0.2),
        bounceRate: 35.8,
        avgTimeOnPage: 180,
      },
      {
        page: '/chi-siamo',
        pageTitle: 'Chi Siamo',
        views: Math.floor(basePageViews * 0.1),
        keyEvents: Math.floor(baseKeyEvents * 0.05),
        bounceRate: 55.3,
        avgTimeOnPage: 95,
      },
      {
        page: '/contatti',
        pageTitle: 'Contatti',
        views: Math.floor(basePageViews * 0.08),
        keyEvents: Math.floor(baseKeyEvents * 0.15),
        bounceRate: 28.9,
        avgTimeOnPage: 145,
      },
    ];

    // Devices
    const devices = [
      { device: 'mobile' as const, sessions: Math.floor(baseSessions * 0.6), percentage: 60, users: Math.floor(baseUsers * 0.62) },
      { device: 'desktop' as const, sessions: Math.floor(baseSessions * 0.32), percentage: 32, users: Math.floor(baseUsers * 0.3) },
      { device: 'tablet' as const, sessions: Math.floor(baseSessions * 0.08), percentage: 8, users: Math.floor(baseUsers * 0.08) },
    ];

    // Geographic data
    const geographic = [
      { country: 'Italia', countryCode: 'IT', sessions: Math.floor(baseSessions * 0.65), users: Math.floor(baseUsers * 0.68), bounceRate: 44.2, keyEvents: Math.floor(baseKeyEvents * 0.7) },
      { country: 'Stati Uniti', countryCode: 'US', sessions: Math.floor(baseSessions * 0.12), users: Math.floor(baseUsers * 0.11), bounceRate: 52.1, keyEvents: Math.floor(baseKeyEvents * 0.1) },
      { country: 'Germania', countryCode: 'DE', sessions: Math.floor(baseSessions * 0.08), users: Math.floor(baseUsers * 0.07), bounceRate: 48.5, keyEvents: Math.floor(baseKeyEvents * 0.08) },
      { country: 'Francia', countryCode: 'FR', sessions: Math.floor(baseSessions * 0.06), users: Math.floor(baseUsers * 0.06), bounceRate: 50.2, keyEvents: Math.floor(baseKeyEvents * 0.05) },
      { country: 'Spagna', countryCode: 'ES', sessions: Math.floor(baseSessions * 0.05), users: Math.floor(baseUsers * 0.04), bounceRate: 49.8, keyEvents: Math.floor(baseKeyEvents * 0.04) },
      { country: 'Regno Unito', countryCode: 'GB', sessions: Math.floor(baseSessions * 0.04), users: Math.floor(baseUsers * 0.04), bounceRate: 46.3, keyEvents: Math.floor(baseKeyEvents * 0.03) },
    ];

    return {
      metrics,
      usersChart,
      pageViewsChart,
      conversionsChart,
      trafficSources,
      landingPages,
      devices,
      geographic: countryFilter && countryFilter !== 'all'
        ? geographic.filter(g => g.countryCode === countryFilter.toUpperCase())
        : geographic,
    };
  }
}

// Export singleton instance
export const apiClient = new ApiClient();
