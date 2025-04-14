'use client';

interface Campaign {
  id: string;
  name: string;
  status: string;
  daily_budget?: number;
  lifetime_budget?: number;
  created_time?: string;
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

const ACCESS_TOKEN = "EAA5fXAEziwMBOx6oM6Mk8BKIQCiedIRzG8FggVet3Bb9PT2LqNXIYG09OZBKsJ9P9rQz4LPqI9oJggFkVcMAQsKZC8GyKwb9XqIZBPLyDQdYeUNnJlUX6FyB1LvVGNrmba29ryLTXc1IA5CHh59jx3JL45rvVNtmmXZAvy4JLE3n6Cj0rqx39ECx3ZBuPLbzOPAPk8XaI";
const AD_ACCOUNT_ID = "act_1317248621797871";

class FacebookService {
  constructor(private accessToken: string, private adAccountId: string) {}

  private async fetchFromFacebook(endpoint: string, params: Record<string, any> = {}): Promise<any> {
    const queryParams = new URLSearchParams({
      access_token: this.accessToken,
      ...params,
    }).toString();

    const res = await fetch(`https://graph.facebook.com/v19.0/${endpoint}?${queryParams}`);
    if (!res.ok) throw new Error(await res.text());
    return res.json();
  }

  async getCampaigns(): Promise<FacebookCampaign[]> {
    try {
      const campaigns = await this.fetchFromFacebook(`${this.adAccountId}/campaigns`, {
        fields: 'id,name,status,created_time,daily_budget,lifetime_budget',
        limit: 50,
      });

      const ids = campaigns.data.map((c: Campaign) => c.id);
      const insights = await this.getCampaignInsights(ids);

      return campaigns.data.map((campaign: Campaign) => {
        const campaignInsights = insights.find(i => i.campaign_id === campaign.id) || {
          spend: '0',
          actions: [],
        };

        const leads = parseInt(
          campaignInsights.actions.find((a: any) => a.action_type === 'lead' || a.action_type === 'offsite_conversion.fb_form')?.value || '0'
        );
        const spend = parseFloat(campaignInsights.spend || '0');

        return {
          id: campaign.id,
          name: campaign.name,
          status: campaign.status.toLowerCase() === 'active' ? 'active' : 'paused',
          budget: Number(((campaign.daily_budget || campaign.lifetime_budget || 0) / 100).toFixed(2)),
          spend,
          leads,
          cpl: leads > 0 ? spend / leads : 0,
          created: campaign.created_time
            ? new Date(campaign.created_time).toLocaleDateString('ru-RU', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
              })
            : '-',
        };
      });
    } catch (e) {
      console.error("Ошибка при получении кампаний:", e);
      return this.getDemoCampaigns();
    }
  }

  private async getCampaignInsights(campaignIds: string[]): Promise<AdInsight[]> {
    if (!campaignIds.length) return [];

    const res = await this.fetchFromFacebook(`${this.adAccountId}/insights`, {
      level: 'campaign',
      fields: 'campaign_id,spend,actions',
      time_range: JSON.stringify({
        since: '2023-01-01',
        until: new Date().toISOString().split('T')[0],
      }),
      limit: 500,
    });

    return res.data || [];
  }

  async updateCampaignStatus(id: string, status: 'active' | 'paused') {
    try {
      const res = await fetch(`https://graph.facebook.com/v19.0/${id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          status: status.toUpperCase(),
          access_token: this.accessToken,
        }),
      });
      return res.ok;
    } catch {
      return false;
    }
  }

  async updateCampaignBudget(id: string, budget: number) {
    try {
      const res = await fetch(`https://graph.facebook.com/v19.0/${id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          daily_budget: Math.round(budget * 100),
          access_token: this.accessToken,
        }),
      });
      return res.ok;
    } catch {
      return false;
    }
  }

  getDemoCampaigns(): FacebookCampaign[] {
    return [
      {
        id: 'demo1',
        name: 'AI Targetolog | Алматы',
        status: 'active',
        budget: 12.34,
        spend: 9.87,
        leads: 7,
        cpl: 1.41,
        created: '14/04/2025',
      },
    ];
  }
}

export const facebookService = new FacebookService(ACCESS_TOKEN, AD_ACCOUNT_ID);
export type { FacebookCampaign };
