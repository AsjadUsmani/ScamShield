# ScamShield

ScamShield is a web-first scam detection platform focused on suspicious WhatsApp, Telegram, and Instagram messages.  
V1 is intentionally rules-based, fast to ship, and designed for real user feedback before adding ML.

## V1 Goal

Let users paste suspicious message content (plus optional number/link), get a risk rating with reasons, and report scam indicators to a shared database.

Risk labels:
- `Likely Scam`
- `Suspicious`
- `Unclear`
- `Likely Safe`

## Core Features (V1)

1. Message checker (no login)
- Input: message text (required), phone number/platform/links (optional)
- Output: risk label, triggered red flags, and safety actions

2. Rules-based detection engine
- Text patterns: urgency + money/OTP, fake jobs/investments, impersonation/romance signals
- Link checks: shorteners, typo domains, non-HTTPS, suspicious subdomains
- Phone checks: prior reports from local database
- Weighted scoring mapped to one of 4 labels

3. Scam report submission
- Quick report form after scan result
- Category + optional approximate loss + city
- Anonymous-first design for V1

4. Public scam lookup
- Search by phone or URL
- Return report count + common category warning

5. Educational pages
- Common scam patterns
- Safety checklist and response steps

## Proposed Stack

- Frontend: React (Vite) + Tailwind CSS or Material UI
- Backend: Node.js + Express
- Database: MongoDB Atlas
- Monorepo tooling: `pnpm` workspaces + `turbo`

## Monorepo Layout

```text
.
├── apps/
│   ├── web/              # React frontend
│   └── api/              # Express backend
├── packages/
│   └── detection/        # Shared rules/scoring logic
├── docker/
├── pnpm-workspace.yaml
└── turbo.json
```

## API Design (V1)

### `POST /api/check-message`
Checks input content and returns risk analysis.

Request body:
```json
{
  "text": "Congrats! Join now and earn guaranteed daily profit...",
  "phone": "+911234567890",
  "platform": "whatsapp",
  "urls": ["https://bit.ly/example"]
}
```

Response body:
```json
{
  "score": 82,
  "riskLabel": "Likely Scam",
  "reasons": [
    "Urgency language with money request",
    "Guaranteed return claim",
    "Shortened URL detected"
  ],
  "safetyTips": [
    "Do not send money or OTP.",
    "Verify via official channels only.",
    "Block and report the sender."
  ]
}
```

### `POST /api/report`
Stores scam report data.

Request body:
```json
{
  "text": "Same scam text...",
  "phone": "+911234567890",
  "url": "https://bit.ly/example",
  "platform": "whatsapp",
  "category": "investment",
  "approximateLoss": 2500,
  "city": "Lahore"
}
```

### `GET /api/lookup?phone=...&url=...`
Returns aggregate warning information.

Response body:
```json
{
  "matched": true,
  "reportCount": 14,
  "topCategory": "investment",
  "warning": "This phone number has been reported multiple times."
}
```

## Suggested Data Model (MongoDB)

### `reports`

```ts
{
  _id: ObjectId,
  messageHash: string,          // hash of normalized text
  phone?: string,
  url?: string,
  platform?: "whatsapp" | "telegram" | "instagram" | "other",
  category: "job" | "investment" | "romance" | "tech_support" | "other",
  approximateLoss?: number,
  city?: string,
  createdAt: Date
}
```

### `indicators`

```ts
{
  _id: ObjectId,
  type: "keyword" | "domain" | "phone",
  value: string,
  weight: number,
  reason: string,
  active: boolean,
  updatedAt: Date
}
```

## Rule Engine Outline

1. Normalize text (lowercase, strip emojis/punctuation noise)
2. Match regex/keyword groups:
- urgency
- money/OTP/payment
- fake job/investment claims
- impersonation/social pressure
3. Parse and score URLs
4. Check reported phone/url frequency in DB
5. Aggregate weighted score and map:
- `0-24`: Likely Safe
- `25-49`: Unclear
- `50-74`: Suspicious
- `75-100`: Likely Scam

## Roadmap (4-6 Weeks)

1. Week 1: project skeleton + basic web checker UI
2. Week 2: implement `check-message` + first rule packs
3. Week 3: reporting + public lookup
4. Week 4: UX polish + educational content
5. Weeks 5-6: rate limiting, analytics, optional admin view, deployment

## Deployment Targets

- Frontend: Vercel or Netlify
- Backend: Render or Railway
- Database: MongoDB Atlas

## Current Status

This repository is currently scaffold-level (workspace + turbo tooling).  
Next step is to generate `apps/web`, `apps/api`, and `packages/detection` with runnable scripts.
