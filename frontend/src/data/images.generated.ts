/**
 * Сгенерировано scripts/optimize-images.py — руками не править.
 *
 * base    — префикс вариантов: `${base}-${width}.avif`
 * width/height — размеры оригинала, из них <Picture> ставит атрибуты
 *   width и height: без них браузер не знает высоту до загрузки и
 *   страница дёргается — это и есть CLS в Core Web Vitals.
 */
export type ImageSet = { base: string; width: number; height: number; widths: number[] }

export const imageSets: Record<string, ImageSet> = {
  '/alexander.jpg': { base: '/img/alexander', width: 800, height: 800, widths: [640, 800] },
  '/avatar-ana.jpg': { base: '/img/avatar-ana', width: 480, height: 480, widths: [480] },
  '/avatar-daniel.jpg': { base: '/img/avatar-daniel', width: 480, height: 480, widths: [480] },
  '/avatar-mark.jpg': { base: '/img/avatar-mark', width: 480, height: 480, widths: [480] },
  '/avatar-priya.jpg': { base: '/img/avatar-priya', width: 480, height: 480, widths: [480] },
  '/avatar-sofia.jpg': { base: '/img/avatar-sofia', width: 480, height: 480, widths: [480] },
  '/avatar-tom.jpg': { base: '/img/avatar-tom', width: 480, height: 480, widths: [480] },
  '/herman.jpg': { base: '/img/herman', width: 800, height: 800, widths: [640, 800] },
  '/work-aimore.jpg': { base: '/img/work-aimore', width: 1200, height: 750, widths: [640, 1200] },
  '/work-aimorelove.jpg': { base: '/img/work-aimorelove', width: 1200, height: 750, widths: [640, 1200] },
  '/work-alice.jpg': { base: '/img/work-alice', width: 1200, height: 750, widths: [640, 1200] },
  '/work-balance.jpg': { base: '/img/work-balance', width: 1200, height: 750, widths: [640, 1200] },
  '/work-casa-marena.jpg': { base: '/img/work-casa-marena', width: 1200, height: 750, widths: [640, 1200] },
  '/work-cleargate.jpg': { base: '/img/work-cleargate', width: 1200, height: 750, widths: [640, 1200] },
  '/work-feasty.jpg': { base: '/img/work-feasty', width: 1600, height: 1000, widths: [640, 1280] },
  '/work-finora.jpg': { base: '/img/work-finora', width: 1200, height: 750, widths: [640, 1200] },
  '/work-happyroom.jpg': { base: '/img/work-happyroom', width: 1200, height: 750, widths: [640, 1200] },
  '/work-hotel.jpg': { base: '/img/work-hotel', width: 1200, height: 750, widths: [640, 1200] },
  '/work-kestra.jpg': { base: '/img/work-kestra', width: 1200, height: 750, widths: [640, 1200] },
  '/work-momentum.jpg': { base: '/img/work-momentum', width: 1200, height: 750, widths: [640, 1200] },
  '/work-mstpd.jpg': { base: '/img/work-mstpd', width: 1200, height: 750, widths: [640, 1200] },
  '/work-nexora.jpg': { base: '/img/work-nexora', width: 1200, height: 750, widths: [640, 1200] },
  '/work-sales.jpg': { base: '/img/work-sales', width: 1200, height: 750, widths: [640, 1200] },
  '/blog/animations-costing-conversions.jpg': { base: '/img/blog/animations-costing-conversions', width: 1600, height: 1066, widths: [640, 1280] },
  '/blog/dark-mode-is-not-a-feature.jpg': { base: '/img/blog/dark-mode-is-not-a-feature', width: 1600, height: 1067, widths: [640, 1280] },
  '/blog/design-system-nobody-maintains.jpg': { base: '/img/blog/design-system-nobody-maintains', width: 1600, height: 1200, widths: [640, 1280] },
  '/blog/handoff-is-a-process.jpg': { base: '/img/blog/handoff-is-a-process', width: 1600, height: 1067, widths: [640, 1280] },
  '/blog/landing-page-design-problem.jpg': { base: '/img/blog/landing-page-design-problem', width: 1600, height: 1066, widths: [640, 1280] },
  '/blog/six-weeks-or-it-never-ships.jpg': { base: '/img/blog/six-weeks-or-it-never-ships', width: 1600, height: 1066, widths: [640, 1280] },
  '/blog/stop-testing-onboarding-on-designers.jpg': { base: '/img/blog/stop-testing-onboarding-on-designers', width: 1600, height: 1066, widths: [640, 1280] },
  '/blog/what-we-ask-before-we-quote.jpg': { base: '/img/blog/what-we-ask-before-we-quote', width: 1600, height: 1066, widths: [640, 1280] },
}
