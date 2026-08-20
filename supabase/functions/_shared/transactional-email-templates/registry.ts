import * as React from 'npm:react@18.3.1'
import { template as seedlingAllocationInvite } from './seedling-allocation-invite.tsx'

export interface TemplateEntry {
  component: React.ComponentType<any>
  subject: string | ((data: any) => string)
  displayName?: string
  previewData?: Record<string, unknown>
  to?: string
}

export const TEMPLATES: Record<string, TemplateEntry> = {
  'seedling-allocation-invite': seedlingAllocationInvite,
}
