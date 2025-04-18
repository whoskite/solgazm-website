# Profile Section Reference (MVP)

This document describes the current MVP (Minimum Viable Product) implementation of the Profile section for SOLGAZM.

---

## Features (as of MVP)
- **Wallet Connection:**
  - Users can connect their Solana wallet using the site-wide wallet modal/button.
  - The connected wallet address is displayed in a prominent, styled card.
- **Navigation Integration:**
  - The reusable site navigation header is present at the top of the profile page.
- **Background:**
  - The page uses the branded `/Background_worldofgazm.png` image as a fixed background.
- **Profile Details Placeholder:**
  - A section for future profile information (username, avatar, stats, etc.) is included but not yet functional.

---

## UI/UX
- Profile card is centered and visually prominent.
- Responsive layout, works on desktop and mobile.
- Clear messaging for wallet connection state.

---

## Code Location
- **Profile Page:** `src/app/profile/page.tsx`
- **Navigation Header:** `src/components/Navigation.tsx`
- **Wallet Button:** `src/components/WalletButton.tsx`

---

## Planned Improvements
- Add editable user information (username, avatar, etc.)
- Display NFT holdings, achievements, or activity
- Integrate backend for persistent user profiles
- Add profile settings and security options

---

## Quick Checklist
- [x] Show connect wallet button
- [x] Display connected wallet address
- [x] Add navigation/header
- [x] Apply branded background
- [ ] Add editable profile info
- [ ] Integrate backend
- [ ] Show NFTs, stats, or rewards

---

**This document will be updated as the profile section evolves beyond MVP.**
