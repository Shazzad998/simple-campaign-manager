export interface Contact {
    id: number;
    name: string;
    email: string;
    created_at:string
}

export type CampaignRecipient = {
  id: number
  contact: Contact | null
  status: "pending" | "sent" | "failed"
  response: string | null
  sent_at: string | null
}

export type Campaign = {
  id: number
  subject: string
  body: string
  created_at: string
  recipients: CampaignRecipient[]
}

export type CampaignListItem = {
  id: number
  subject: string
  created_at: string
  recipient_count: number
  success_count: number
  failed_count: number
}