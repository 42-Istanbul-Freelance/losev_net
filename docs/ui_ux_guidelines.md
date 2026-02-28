# UI/UX Guidelines

## Design Philosophy
The application should feel warm, encouraging, and easy to use, reflecting LÖSEV's values. Since the users are middle/high school students (some battling illness), the interface should avoid clinical or overly complex designs.

## Color Palette (LÖSEV Inspired)
- **Primary:** #E30613 (LÖSEV Red - used for CTA, primary buttons)
- **Secondary:** #FDC010 (LÖSEV Yellow - used for badges, highlights)
- **Neutral:** #FFFFFF (Background), #F4F4F4 (Surface), #333333 (Text)
- **Status Colors:**
  - Success: #28A745 (Approved)
  - Warning: #FFC107 (Pending)
  - Danger: #DC3545 (Rejected)

## Mobile-First Approach
- Bottom navigation bar for easy thumb access.
- Large touch targets (minimum 44x44px).
- Vertical scroll-based layouts for forms.
- Card-based displays for activity items.

## Localization (Turkish)
All UI text must be in Turkish.
- "Gönüllülük Saati" instead of "Volunteer Hours"
- "Etkinlik Ekle" instead of "Add Activity"
- "Rozetlerim" instead of "My Badges"
- "Onay Bekleyenler" instead of "Pending Approvals"

## PWA Configuration
- Manifest file with `theme_color`.
- Service worker for offline viewing of hours and profile.
- Splash screen with LÖSEV logo.

## Accessibility (Simplified)
- High contrast for readability.
- Clear error messages in Turkish.
- Simple, linear navigation.
