export type SubscriptionCategory = 'Streaming' | 'Software' | 'Gaming' | 'Other';

export interface Subscription {
  id: string;
  name: string;
  monthlyCost: number;
  category: SubscriptionCategory;
  renewalDate: string;
}
