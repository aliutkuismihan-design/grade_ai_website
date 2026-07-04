# Curriculum Hub Module Spec

## New Route: /curriculum

## Layout: 2-column on desktop (content + sidebar ads), single column on mobile (top + bottom ads)

## Structure:

### Hero Section
- Title: "Complete Curriculum Hub"
- Subtitle: "Exam-ready summaries for every subject — YKS, A-Level, DELF, EOS & more"
- Background: Aurora Academia gradient

### Exam System Tabs (Sticky)
- YKS (Turkey)
- A-Level (UK)
- DELF (French)
- Cambridge CS / IGCSE
- EOS (Turkey)
- SAT

### Subject Grid (per exam system)
Cards for each subject with:
- Icon
- Subject name
- Short description
- "View Topics" button

### Topics Drawer/Modal
When subject clicked:
- Expandable accordion list of topics
- Each topic: summary bullet points (3-5 lines)
- Example: "Quadratic Equations — ax²+bx+c=0, discriminant, roots formula, graph parabola"

### Ad Placements
- Desktop: Right sidebar sticky banner (160x600 or 300x250)
- Desktop: Bottom banner above footer
- Mobile: Top banner below navbar
- Mobile: Bottom sticky banner
- All: Native ad placeholders between subject cards (every 3 cards)

## Data Structure (JSON):
/data/curriculum/yks.json
/data/curriculum/alevel.json
/data/curriculum/delf.json
/data/curriculum/cambridge.json
/data/curriculum/eos.json

Each JSON:
{
  "examSystem": "YKS",
  "locale": "tr",
  "subjects": [
    {
      "id": "math",
      "name": "Matematik",
      "icon": "calculator",
      "description": "TYT & AYT matematik konuları",
      "topics": [
        {"title": "Sayı Basamakları", "summary": "Bir sayının rakamlarının basamak değerleri, basamak sayısı bulma..."},
        ...
      ]
    }
  ]
}

## Files to create:
- app/[locale]/curriculum/page.tsx
- components/curriculum/curriculum-hub.tsx
- components/curriculum/exam-tabs.tsx
- components/curriculum/subject-card.tsx
- components/curriculum/topic-drawer.tsx
- components/ads/sidebar-ad.tsx
- components/ads/inline-ad.tsx
- data/curriculum/*.json (5 files)
- Update navbar with Curriculum link
- Update translations

## AdMob / Ad Config:
- Use existing AdConfig structure
- New ad slot IDs for sidebar and inline
- Test IDs for development
