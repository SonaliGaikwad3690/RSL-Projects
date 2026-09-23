export const overviewCards = [
  { label: 'Active Customers', value: '12,480', trend: '+12.4%', tone: 'positive' },
  { label: 'Total Calls', value: '8,930', trend: '+7.8%', tone: 'positive' },
  { label: 'Live Conversations', value: '246', trend: '-2.1%', tone: 'negative' },
  { label: 'Success Rate', value: '94.2%', trend: '+1.6%', tone: 'positive' },
]

export const customers = [
  { id: 'C-1024', name: 'Alicia Gomez', segment: 'Retail', status: 'Warm lead', owner: 'Nina', lastTouch: '2 mins ago' },
  { id: 'C-2048', name: 'Robert Chen', segment: 'Finance', status: 'Qualified', owner: 'Karan', lastTouch: '14 mins ago' },
  { id: 'C-3092', name: 'Priya Shah', segment: 'Healthcare', status: 'Follow-up', owner: 'Sara', lastTouch: '31 mins ago' },
  { id: 'C-4103', name: 'Daniel Brooks', segment: 'Hospitality', status: 'VIP', owner: 'Leah', lastTouch: '1 hour ago' },
  { id: 'C-5119', name: 'Mila Patel', segment: 'Education', status: 'New inquiry', owner: 'Jane', lastTouch: '2 hours ago' },
]

export const callHistory = [
  { id: 'CL-441', customer: 'Alicia Gomez', type: 'Outbound', result: 'Connected', agent: 'Nina', duration: '04:18', date: '09 Sep 2026' },
  { id: 'CL-442', customer: 'Robert Chen', type: 'Inbound', result: 'Qualified', agent: 'Karan', duration: '07:52', date: '09 Sep 2026' },
  { id: 'CL-443', customer: 'Priya Shah', type: 'Outbound', result: 'Follow-up', agent: 'Sara', duration: '03:42', date: '08 Sep 2026' },
  { id: 'CL-444', customer: 'Daniel Brooks', type: 'Inbound', result: 'Escalated', agent: 'Leah', duration: '09:10', date: '08 Sep 2026' },
  { id: 'CL-445', customer: 'Mila Patel', type: 'Outbound', result: 'Queued', agent: 'Jane', duration: '02:26', date: '07 Sep 2026' },
]

export const liveCalls = [
  { customer: 'Angela Moore', product: 'Enterprise plan', queue: 'Priority', duration: '03:24', sentiment: 'Positive', agent: 'Alex' },
  { customer: 'Marco Silva', product: 'Support renewal', queue: 'General', duration: '08:11', sentiment: 'Neutral', agent: 'Reena' },
  { customer: 'Sophia Tran', product: 'New account setup', queue: 'VIP', duration: '12:06', sentiment: 'Positive', agent: 'Mason' },
]

export const campaigns = [
  { name: 'Spring Renewal Push', status: 'Running', reach: '84%', success: '44%', scheduled: '18:00' },
  { name: 'New Client Outreach', status: 'Queued', reach: '62%', success: '38%', scheduled: '20:30' },
  { name: 'VIP Recovery Calls', status: 'Paused', reach: '51%', success: '58%', scheduled: 'Paused' },
]

export const agents = [
  { name: 'Nina', role: 'Sales Lead', status: 'Available', workload: '8 calls/hr', score: '96%' },
  { name: 'Karan', role: 'Support Expert', status: 'On call', workload: '5 calls/hr', score: '92%' },
  { name: 'Sara', role: 'Retention Agent', status: 'Available', workload: '9 calls/hr', score: '94%' },
  { name: 'Leah', role: 'Escalation Specialist', status: 'Busy', workload: '4 calls/hr', score: '98%' },
]

export const adminStats = [
  { label: 'System Uptime', value: '99.98%' },
  { label: 'API Health', value: 'Stable' },
  { label: 'Queue Load', value: '36%' },
  { label: 'Compliance', value: 'On track' },
]

export const supportStats = [
  { label: 'Open tickets', value: '128', detail: '+12 vs yesterday' },
  { label: 'Avg. first response', value: '03:42', detail: 'Within SLA' },
  { label: 'Satisfaction', value: '4.8/5', detail: 'Strong trend' },
]

export const supportTickets = [
  { id: 'TK-1182', customer: 'Mila Patel', issue: 'Billing mismatch on renewal', priority: 'High', owner: 'Nina', status: 'In progress' },
  { id: 'TK-1185', customer: 'Daniel Brooks', issue: 'Need onboarding checklist', priority: 'Medium', owner: 'Karan', status: 'Waiting on customer' },
  { id: 'TK-1191', customer: 'Priya Shah', issue: 'Duplicate contact records', priority: 'Low', owner: 'Sara', status: 'Resolved' },
  { id: 'TK-1197', customer: 'Alicia Gomez', issue: 'Voice bot not completing callback', priority: 'High', owner: 'Leah', status: 'Escalated' },
]

export const customerCareTips = [
  'Send follow-up summary after every resolved chat.',
  'Offer call-back in under 3 minutes for priority tickets.',
  'Review renewal blockers before end-of-day SLA check.',
]
