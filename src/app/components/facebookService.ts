'use client';

// Типы для Facebook API
interface Campaign {
  id: string;
  name: string;
  status: string;
  daily_budget: number;
  lifetime_budget: number;
}

interface AdSet {
  id: string;
  name: string;
  campaign_id: string;
  status: string;
  daily_budget: number;
  lifetime_budget: number;
}

interface AdInsight {
  campaign_id: string;
  spend: string;
  actions: { action_type: string; value: string }[];
  date_start: string;
  date_stop: string;
}

interface FacebookCampaign {
  id: string;
  name: string;
  status: 'active' | 'paused';
  budget: number;
  spend: number;
  leads: number;
  cpl: number;
  created: string;
}

// Токен доступа Facebook
const ACCESS_TOKEN = "EAA5fXAEziwMBOx6oM6Mk8BKIQCiedIRzG8FggVet3Bb9PT2LqNXIYG09OZBKsJ9P9rQz4LPqI9oJggFkVcMAQsKZC8GyKwb9XqIZBPLyDQdYeUNnJlUX6FyB1LvVGNrmba29ryLTXc1IA5CHh59jx3JL45rvVNtmmXZAvy4JLE3n6Cj0rqx39ECx3ZBuPLbzOPAPk8XaI";
const AD_ACCOUNT_ID = "act_1317248621797871"; // ID вашего рекламного аккаунта

class FacebookService {
  private accessToken: string;
  private adAccountId: string;

  constructor(accessToken: string, adAccountId: string) {
    this.accessToken = accessToken;
    this.adAccountId = adAccountId;
  }

  // Базовая функция для запросов к Facebook API
  private async fetchFromFacebook(endpoint: string, params: Record<string, any> = {}): Promise<any> {
    const queryParams = new URLSearchParams({
      access_token: this.accessToken,
      ...params
    }).toString();
    
    try {
      const response = await fetch(`https://graph.facebook.com/v19.0/${endpoint}?${queryParams}`);
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Facebook API Error: ${errorData.error?.message || 'Unknown error'}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error("Error fetching from Facebook:", error);
      throw error;
    }
  }

  // Получить все кампании
  async getCampaigns(): Promise<FacebookCampaign[]> {
    try {
      // Запрос кампаний
      const campaignsResponse = await this.fetchFromFacebook(`${this.adAccountId}/campaigns`, {
        fields: 'id,name,status,created_time,daily_budget,lifetime_budget',
        limit: 50
      });
      
      if (!campaignsResponse.data || !Array.isArray(campaignsResponse.data)) {
        return [];
      }
      
      // Получим инсайты для этих кампаний (расходы и конверсии)
      const campaignIds = campaignsResponse.data.map((campaign: Campaign) => campaign.id);
      const insights = await this.getCampaignInsights(campaignIds);
      
      // Трансформируем данные в формат для нашего UI
      return campaignsResponse.data.map((campaign: Campaign) => {
        const campaignInsights = insights.find((insight: any) => insight.campaign_id === campaign.id) || {
          spend: '0',
          actions: []
        };
        
        // Ищем конверсии в действиях (если есть)
        const leadsAction = campaignInsights.actions?.find(
          (action: any) => action.action_type === 'lead' || action.action_type === 'offsite_conversion.fb_form'
        );
        
        const leads = leadsAction ? parseInt(leadsAction.value, 10) : 0;
        const spend = parseFloat(campaignInsights.spend || '0');
        
        return {
          id: campaign.id,
          name: campaign.name,
          status: campaign.status.toLowerCase() === 'active' ? 'active' : 'paused',
          budget: parseFloat((campaign.daily_budget || campaign.lifetime_budget || 0) / 100).toFixed(2),
          spend: spend,
          leads: leads,
          cpl: leads > 0 ? spend / leads : 0,
          created: new Date(campaign.created_time).toLocaleDateString('ru-RU', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
          })
        };
      });
    } catch (error) {
      console.error("Error getting campaigns:", error);
      // В случае ошибки возвращаем демо-данные
      return this.getDemoCampaigns();
    }
  }

  // Получить инсайты для кампаний (расходы и конверсии)
  private async getCampaignInsights(campaignIds: string[]): Promise<any[]> {
    try {
      // Если нет кампаний, возвращаем пустой массив
      if (!campaignIds.length) return [];
      
      // Формируем запрос для получения данных по нескольким кампаниям
      const params = {
        level: 'campaign',
        fields: 'campaign_id,spend,actions',
        time_range: JSON.stringify({
          'since': '2023-01-01',
          'until': new Date().toISOString().split('T')[0]
        }),
        time_increment: 1,
        limit: 500
      };
      
      const insightsResponse = await this.fetchFromFacebook(`${this.adAccountId}/insights`, params);
      
      if (!insightsResponse.data || !Array.isArray(insightsResponse.data)) {
        return [];
      }
      
      return insightsResponse.data;
    } catch (error) {
      console.error("Error getting campaign insights:", error);
      return [];
    }
  }

  // Получить данные по датам для графика
  async getChartData(startDate: string, endDate: string): Promise<{
    dates: string[];
    spend: number[];
    leads: number[];
  }> {
    try {
      // Формируем запрос для получения данных по датам
      const params = {
        level: 'account',
        fields: 'spend,actions',
        time_range: JSON.stringify({
          'since': startDate,
          'until': endDate
        }),
        time_increment: 1,
        limit: 500
      };
      
      const insightsResponse = await this.fetchFromFacebook(`${this.adAccountId}/insights`, params);
      
      if (!insightsResponse.data || !Array.isArray(insightsResponse.data)) {
        return this.getDemoChartData();
      }
      
      // Обрабатываем данные для графика
      const chartData = {
        dates: [] as string[],
        spend: [] as number[],
        leads: [] as number[]
      };
      
      insightsResponse.data.forEach((dayData: AdInsight) => {
        // Форматируем дату (DD/MM)
        const date = new Date(dayData.date_start);
        const formattedDate = `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}`;
        
        // Ищем конверсии в действиях (если есть)
        const leadsAction = dayData.actions?.find(
          (action: any) => action.action_type === 'lead' || action.action_type === 'offsite_conversion.fb_form'
        );
        
        const leads = leadsAction ? parseInt(leadsAction.value, 10) : 0;
        const spend = parseFloat(dayData.spend || '0');
        
        chartData.dates.push(formattedDate);
        chartData.spend.push(spend);
        chartData.leads.push(leads);
      });
      
      return chartData;
    } catch (error) {
      console.error("Error getting chart data:", error);
      return this.getDemoChartData();
    }
  }

  // Изменить статус кампании (запуск/пауза)
  async updateCampaignStatus(campaignId: string, status: 'active' | 'paused'): Promise<boolean> {
    try {
      const endpoint = `${campaignId}`;
      const response = await fetch(`https://graph.facebook.com/v19.0/${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          status: status.toUpperCase(),
          access_token: this.accessToken
        })
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Facebook API Error: ${errorData.error?.message || 'Unknown error'}`);
      }
      
      return true;
    } catch (error) {
      console.error("Error updating campaign status:", error);
      return false;
    }
  }

  // Изменить бюджет кампании
  async updateCampaignBudget(campaignId: string, budget: number): Promise<boolean> {
    try {
      // Бюджет в Facebook API указывается в центах
      const budgetInCents = Math.round(budget * 100);
      
      const endpoint = `${campaignId}`;
      const response = await fetch(`https://graph.facebook.com/v19.0/${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          daily_budget: budgetInCents,
          access_token: this.accessToken
        })
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Facebook API Error: ${errorData.error?.message || 'Unknown error'}`);
      }
      
      return true;
    } catch (error) {
      console.error("Error updating campaign budget:", error);
      return false;
    }
  }

  // Demo данные для случая, когда API недоступен
  getDemoCampaigns(): FacebookCampaign[] {
    return [
      {
        id: 'cam_23x87a5',
        name: 'Ремонт квартир | Москва | 14.04',
        status: 'active',
        budget: 10.00,
        spend: 8.76,
        leads: 6,
        cpl: 1.46,
        created: '14/04/2025'
      },
      {
        id: 'cam_76b43c2',
        name: 'Доставка еды | Спб | 12.04',
        status: 'paused',
        budget: 15.00,
        spend: 12.25,
        leads: 9,
        cpl: 1.36,
        created: '12/04/2025'
      },
      {
        id: 'cam_45d98f1',
        name: 'IT-курсы | Москва | 10.04',
        status: 'active',
        budget: 20.00,
        spend: 5.43,
        leads: 3,
        cpl: 1.81,
        created: '10/04/2025'
      }
    ];
  }

  // Demo данные для графика
  getDemoChartData(): { dates: string[], spend: number[], leads: number[] } {
    return {
      dates: ['10/04', '11/04', '12/04', '13/04', '14/04', '15/04'],
      spend: [5.25, 8.75, 12.30, 15.80, 10.45, 26.44],
      leads: [2, 4, 8, 12, 6, 18]
    };
  }
}

// Создаем и экспортируем экземпляр сервиса
export const facebookService = new FacebookService(ACCESS_TOKEN, AD_ACCOUNT_ID);

// Экспортируем типы
export type { FacebookCampaign };