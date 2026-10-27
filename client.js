/**
 * Material You skin for the DeepSeek Harness Web GUI.
 *
 * Design language: Material 3 / Material You.
 *   - one seed color generates a full light/dark tonal role set,
 *   - tonal surfaces instead of heavy borders, pill navigation, 28px sheets,
 *   - material state layers, a pointer ripple and springy press feedback,
 *   - a seed picker in Settings, on the new-session hero and in the composer.
 *
 * Everything is additive: token override layer + one stylesheet + additive
 * slot registrations. Disabling the plugin removes every trace of the skin.
 */
window.__ModuleLoader__.load({
  id: '@local/material-you-skin',
  factory(require) {
    const React = require('react');
    const h = React.createElement;

    const PKG = '@local/material-you-skin';
    const NS = 'material-you';
    const PREFS_KEY = 'material-you.prefs.v1';

    /* ------------------------------------------------------------------ */
    /* Copy                                                               */
    /* ------------------------------------------------------------------ */

    const EN = {
      panel: 'Material You',
      panelHint: 'Dynamic color, tonal surfaces and expressive motion.',
      color: 'Color',
      colorHint: 'Pick a seed. The whole interface re-tones around it.',
      motion: 'Expressive motion',
      motionHint: 'Springy press feedback and material ripples.',
      ambient: 'Ambient color',
      ambientHint: 'Slow tonal light behind the interface.',
      on: 'On',
      off: 'Off',
      reset: 'Reset to Peach',
      palette: 'Palette',
      nextPalette: 'Switch palette',
      'palette.peach': 'Peach',
      'palette.lavender': 'Lavender',
      'palette.sage': 'Sage',
      'palette.ocean': 'Ocean',
      'palette.rose': 'Rose',
      'palette.sand': 'Sand',
    };

    const ZH = {
      panel: 'Material You',
      panelHint: '动态取色、色调表面与灵动动效。',
      color: '颜色',
      colorHint: '选择一个种子色，整套界面随之重新生成色调。',
      motion: '灵动动效',
      motionHint: '弹簧按压反馈与 Material 涟漪。',
      ambient: '环境色',
      ambientHint: '界面背后缓慢流动的色调光。',
      on: '开',
      off: '关',
      reset: '恢复蜜桃色',
      palette: '调色板',
      nextPalette: '切换配色',
      'palette.peach': '蜜桃',
      'palette.lavender': '薰衣草',
      'palette.sage': '鼠尾草',
      'palette.ocean': '海洋',
      'palette.rose': '玫瑰',
      'palette.sand': '沙丘',
    };

    /* ------------------------------------------------------------------ */
    /* Seeds and tonal scheme                                             */
    /* ------------------------------------------------------------------ */

    const SEEDS = [
      { id: 'peach', hue: 18, sat: 72, swatch: ['#FFB59D', '#FFDBCF', '#8B4A3A'] },
      { id: 'lavender', hue: 268, sat: 52, swatch: ['#CFBCFF', '#E9DDFF', '#625B71'] },
      { id: 'sage', hue: 145, sat: 34, swatch: ['#B7D8B9', '#D7E8D4', '#3F5D46'] },
      { id: 'ocean', hue: 205, sat: 62, swatch: ['#9CCBF5', '#CFE5FF', '#31577A'] },
      { id: 'rose', hue: 340, sat: 58, swatch: ['#F6B4C8', '#FFD9E2', '#7B3F4E'] },
      { id: 'sand', hue: 42, sat: 48, swatch: ['#E8C97A', '#F5E1A7', '#5D4A16'] },
    ];

    const DEFAULT_PREFS = { seed: 'peach', motion: 'on', ambient: 'on' };

    function clamp(value) {
      return Math.max(0, Math.min(100, Math.round(value)));
    }

    function hsl(hueValue, satValue, lightValue) {
      const h = ((Math.round(hueValue) % 360) + 360) % 360;
      return 'hsl(' + h + ' ' + clamp(satValue) + '% ' + clamp(lightValue) + '%)';
    }

function makeScheme(seed, dark) {
  const h = seed.hue;
  const s = seed.sat;
  if (!dark) {
    return {
      primary: hsl(h, s, 36),
      primaryHover: hsl(h, s, 42),
      primaryActive: hsl(h, s, 30),
      onPrimary: hsl(h, 100, 99),
      primaryContainer: hsl(h, 100, 84),
      onPrimaryContainer: hsl(h, s, 12),
      secondary: hsl(h + 18, s * 0.45, 34),
      onSecondary: hsl(h + 18, 100, 99),
      secondaryContainer: hsl(h + 18, s * 0.75, 84),
      onSecondaryContainer: hsl(h + 18, s * 0.5, 12),
      tertiary: hsl(h + 118, s * 0.6, 32),
      onTertiary: hsl(h + 118, 100, 99),
      tertiaryContainer: hsl(h + 118, s * 0.7, 86),
      onTertiaryContainer: hsl(h + 118, s * 0.5, 12),
      error: '#B3261E',
      onError: '#FFFFFF',
      errorContainer: '#F9DEDC',
      onErrorContainer: '#410E0B',
      success: '#1B6E2A',
      warn: '#8A4F00',
      surface: hsl(h, s * 0.6, 94),
      surfaceDim: hsl(h, s * 0.5, 88),
      surfaceContainerLowest: hsl(h, s * 0.5, 99),
      surfaceContainerLow: hsl(h, s * 0.65, 92),
      surfaceContainer: hsl(h, s * 0.6, 88),
      surfaceContainerHigh: hsl(h, s * 0.55, 84),
      surfaceContainerHighest: hsl(h, s * 0.5, 80),
      onSurface: hsl(h, s * 0.25, 10),
      onSurfaceVariant: hsl(h, s * 0.2, 28),
      outline: hsl(h, s * 0.2, 42),
      outlineVariant: hsl(h, s * 0.35, 70),
      inverseSurface: hsl(h, s * 0.25, 18),
      inverseOnSurface: hsl(h, s * 0.4, 96),
      inversePrimary: hsl(h, s, 78),
      scrim: '#000000',
      ambient1: hsl(h, s * 0.9, 82),
      ambient2: hsl(h + 35, s * 0.7, 80),
      ambient3: hsl(h + 110, s * 0.6, 84),
    };
  }
  return {
    primary: hsl(h, s * 0.95, 80),
    primaryHover: hsl(h, s, 86),
    primaryActive: hsl(h, s, 72),
    onPrimary: hsl(h, s, 16),
    primaryContainer: hsl(h, s * 0.8, 28),
    onPrimaryContainer: hsl(h, s, 92),
    secondary: hsl(h + 18, s * 0.5, 80),
    onSecondary: hsl(h + 18, s * 0.5, 16),
    secondaryContainer: hsl(h + 18, s * 0.5, 24),
    onSecondaryContainer: hsl(h + 18, s * 0.6, 92),
    tertiary: hsl(h + 118, s * 0.55, 80),
    onTertiary: hsl(h + 118, s * 0.5, 16),
    tertiaryContainer: hsl(h + 118, s * 0.5, 26),
    onTertiaryContainer: hsl(h + 118, s * 0.55, 92),
    error: '#FFB4AB',
    onError: '#690005',
    errorContainer: '#93000A',
    onErrorContainer: '#FFDAD6',
    success: '#8FE39A',
    warn: '#FFC46B',
    surface: hsl(h, s * 0.35, 8),
    surfaceDim: hsl(h, s * 0.35, 6),
    surfaceContainerLowest: hsl(h, s * 0.4, 4),
    surfaceContainerLow: hsl(h, s * 0.4, 10),
    surfaceContainer: hsl(h, s * 0.35, 13),
    surfaceContainerHigh: hsl(h, s * 0.32, 17),
    surfaceContainerHighest: hsl(h, s * 0.3, 21),
    onSurface: hsl(h, s * 0.3, 94),
    onSurfaceVariant: hsl(h, s * 0.25, 82),
    outline: hsl(h, s * 0.22, 65),
    outlineVariant: hsl(h, s * 0.25, 30),
    inverseSurface: hsl(h, s * 0.3, 92),
    inverseOnSurface: hsl(h, s * 0.25, 12),
    inversePrimary: hsl(h, s, 36),
    scrim: '#000000',
    ambient1: hsl(h, s * 0.7, 20),
    ambient2: hsl(h + 35, s * 0.6, 18),
    ambient3: hsl(h + 110, s * 0.5, 22),
  };
}

    function kebab(name) {
      return name.replace(/[A-Z]/g, function (letter) {
        return '-' + letter.toLowerCase();
      });
    }

    function seedById(id) {
      for (let index = 0; index < SEEDS.length; index += 1) {
        if (SEEDS[index].id === id) return SEEDS[index];
      }
      return SEEDS[0];
    }

    function tokenPairs(seedId) {
      const seed = seedById(seedId);
      const light = makeScheme(seed, false);
      const dark = makeScheme(seed, true);
      const pairs = {};

      function add(name, role) {
        pairs[name] = { light: light[role], dark: dark[role] };
      }

      add('--dsw-alias-bg-base', 'surface');
      add('--dsw-alias-bg-layer-1', 'surfaceContainerLow');
      add('--dsw-alias-bg-layer-2', 'surfaceContainer');
      add('--dsw-alias-bg-layer-3', 'surfaceContainerHigh');
      add('--dsw-alias-bg-overlay', 'surfaceContainerHigh');
      add('--dsw-alias-bg-module-platform', 'surfaceContainerLow');
      add('--dsw-alias-border-l1', 'outlineVariant');
      add('--dsw-alias-border-l2', 'outline');
      add('--dsw-alias-border-l3', 'outline');
      add('--dsw-alias-border-l4', 'outline');
      add('--dsw-alias-brand-primary', 'primary');
      add('--dsw-alias-brand-text', 'onPrimary');
      add('--dsw-alias-label-primary', 'onSurface');
      add('--dsw-alias-label-primary-bluish', 'onSurface');
      add('--dsw-alias-label-secondary', 'onSurfaceVariant');
      add('--dsw-alias-label-tertiary', 'onSurfaceVariant');
      add('--dsw-alias-label-caption', 'onSurfaceVariant');
      add('--dsw-alias-label-shimmer', 'onSurface');
      add('--dsw-alias-state-error-primary', 'error');
      add('--dsw-alias-state-idle-primary', 'outline');
      add('--dsw-alias-state-success-primary', 'success');
      add('--dsw-alias-state-warn-primary', 'warn');
      add('--dsw-alias-state-business-primary', 'primary');
      add('--dsw-alias-state-business-tertiary', 'primaryContainer');
      add('--dsw-alias-button-primary-fill', 'primary');
      add('--dsw-alias-button-primary-hover', 'primaryHover');
      add('--dsw-alias-button-elevated-fill', 'surfaceContainerLow');
      add('--dsw-alias-button-floating-fill', 'surfaceContainerHigh');
      add('--dsw-alias-button-floating-hover', 'surfaceContainerHighest');
      add('--dsw-alias-button-info-fill', 'primary');
      add('--dsw-alias-button-info-hover', 'primaryHover');
      add('--dsw-alias-interactive-bg-active', 'primaryContainer');
      add('--dsw-alias-interactive-bg-hover', 'surfaceContainerHigh');
      add('--dsw-alias-interactive-bg-hover-solid', 'surfaceContainerHigh');
      add('--dsw-alias-link', 'primary');
      add('--dsw-alias-markdown-code-block', 'surfaceContainerLowest');
      add('--dsw-alias-scrollbar-bg-l1', 'outlineVariant');
      add('--dsw-alias-scrollbar-hover-l1', 'outline');
      add('--dsw-alias-settings-card-fill', 'surfaceContainerLow');
      add('--dsw-specific-sidebar-fill', 'surfaceContainerLow');
      add('--dsw-specific-input-major', 'surfaceContainerLowest');
      add('--dsw-specific-selector', 'surfaceContainerHigh');
      add('--dsw-specific-bubble', 'primaryContainer');
      add('--dsw-specific-menu', 'surfaceContainerHigh');
      add('--dsw-focus-ring-color', 'primary');

      Object.keys(light).forEach(function (role) {
        pairs['--m3-' + kebab(role)] = { light: light[role], dark: dark[role] };
      });

      pairs['--m3-seed-a'] = { light: seed.swatch[0], dark: seed.swatch[0] };
      pairs['--m3-seed-b'] = { light: seed.swatch[1], dark: seed.swatch[1] };
      pairs['--m3-seed-c'] = { light: seed.swatch[2], dark: seed.swatch[2] };

      return pairs;
    }

    /* ------------------------------------------------------------------ */
    /* Preferences                                                        */
    /* ------------------------------------------------------------------ */

    function normalizePrefs(value) {
      const source = value && typeof value === 'object' ? value : {};
      const known = SEEDS.some(function (seed) {
        return seed.id === source.seed;
      });
      return {
        seed: known ? source.seed : DEFAULT_PREFS.seed,
        motion: source.motion === 'off' ? 'off' : 'on',
        ambient: source.ambient === 'off' ? 'off' : 'on',
      };
    }

    function readPrefs() {
      try {
        const raw = window.localStorage.getItem(PREFS_KEY);
        if (!raw) return normalizePrefs(DEFAULT_PREFS);
        return normalizePrefs(JSON.parse(raw));
      } catch (error) {
        return normalizePrefs(DEFAULT_PREFS);
      }
    }

    function writePrefs(value) {
      try {
        window.localStorage.setItem(PREFS_KEY, JSON.stringify(value));
      } catch (error) {
        /* storage is optional; the skin still works for this session */
      }
    }

    let prefs = readPrefs();
    const listeners = new Set();
    let applyTokens = null;
    let stampBody = null;
    let translate = function (key) { return key; };

    function getPrefs() {
      return prefs;
    }

    function subscribe(listener) {
      listeners.add(listener);
      return function () {
        listeners.delete(listener);
      };
    }

    function usePrefs() {
      return React.useSyncExternalStore(subscribe, getPrefs, getPrefs);
    }

    function setPrefs(patch) {
      const next = normalizePrefs(Object.assign({}, prefs, patch));
      if (next.seed === prefs.seed && next.motion === prefs.motion && next.ambient === prefs.ambient) {
        return prefs;
      }
      const seedChanged = next.seed !== prefs.seed;
      prefs = next;
      writePrefs(next);
      if (stampBody) stampBody();
      if (seedChanged && applyTokens) applyTokens();
      listeners.forEach(function (listener) {
        listener();
      });
      return prefs;
    }

    function seedLabel(seed) {
      const key = 'palette.' + seed.id;
      const text = translate(key);
      return text === key ? seed.id : text;
    }

    /* ------------------------------------------------------------------ */
    /* Stylesheet                                                         */
    /* ------------------------------------------------------------------ */

    const ROW = 'body[data-m3-skin] [data-chat-flow] [data-chat-flow-kind]:not([hidden]):not(:empty):not([data-chat-flow-kind=turn-tail]):not(:has(>[data-slot="conversation.chat.node"]:empty))';

    const CSS = `
body[data-m3-skin] {
  --dsw-radius-xs: 10px;
  --dsw-radius-sm: 14px;
  --dsw-radius-md: 18px;
  --dsw-radius-lg: 24px;
  --dsw-radius-xl: 32px;
  --dsw-radius-panel: 32px;
  --dsh-font-family-text: "SF Pro Rounded", "Google Sans", "Product Sans", "Nunito", "Avenir Next", "PingFang SC", "Microsoft YaHei", sans-serif;
  --dsh-font-family-code-default: "SF Mono", "JetBrains Mono", "Fira Code", Consolas, "PingFang SC", monospace;
  --m3-ease-emphasized: cubic-bezier(.2, 0, 0, 1);
  --m3-ease-spring: cubic-bezier(.34, 1.56, .64, 1);
  --m3-dur-short: 180ms;
  --m3-dur-medium: 320ms;
  --m3-dur-long: 520ms;
  --m3-shadow-1: 0 2px 5px rgba(0,0,0,.06), 0 8px 24px -12px rgba(0,0,0,.24);
  --m3-shadow-2: 0 4px 10px rgba(0,0,0,.07), 0 24px 60px -30px rgba(0,0,0,.4);

  --m3p: var(--m3-primary, var(--dsw-alias-brand-primary));
  --m3onp: var(--m3-on-primary, var(--dsw-alias-brand-text));
  --m3pc: var(--m3-primary-container, color-mix(in srgb, var(--dsw-alias-brand-primary) 22%, var(--dsw-alias-bg-base)));
  --m3onpc: var(--m3-on-primary-container, var(--dsw-alias-label-primary));
  --m3s: var(--m3-secondary, var(--dsw-alias-brand-primary));
  --m3sc: var(--m3-secondary-container, color-mix(in srgb, var(--dsw-alias-brand-primary) 14%, var(--dsw-alias-bg-layer-1)));
  --m3onsc: var(--m3-on-secondary-container, var(--dsw-alias-label-primary));
  --m3t: var(--m3-tertiary, var(--dsw-alias-state-warn-primary));
  --m3tc: var(--m3-tertiary-container, color-mix(in srgb, var(--dsw-alias-state-warn-primary) 20%, var(--dsw-alias-bg-base)));
  --m3ontc: var(--m3-on-tertiary-container, var(--dsw-alias-label-primary));
  --m3surf: var(--m3-surface, var(--dsw-alias-bg-base));
  --m3surf-lowest: var(--m3-surface-container-lowest, var(--dsw-alias-bg-layer-1));
  --m3surf-low: var(--m3-surface-container-low, var(--dsw-alias-bg-layer-1));
  --m3surf-c: var(--m3-surface-container, var(--dsw-alias-bg-layer-2));
  --m3surf-high: var(--m3-surface-container-high, var(--dsw-alias-bg-layer-3, var(--dsw-alias-bg-layer-2)));
  --m3surf-highest: var(--m3-surface-container-highest, var(--dsw-alias-bg-overlay));
  --m3onsurf: var(--m3-on-surface, var(--dsw-alias-label-primary));
  --m3onsurfv: var(--m3-on-surface-variant, var(--dsw-alias-label-secondary));
  --m3outline: var(--m3-outline, var(--dsw-alias-border-l2));
  --m3outlinev: var(--m3-outline-variant, var(--dsw-alias-border-l1));
  --m3err: var(--m3-error, var(--dsw-alias-state-error-primary));
  --m3errc: var(--m3-error-container, color-mix(in srgb, var(--dsw-alias-state-error-primary) 16%, var(--dsw-alias-bg-base)));
  --m3onerr: var(--m3-on-error, var(--dsw-alias-label-primary));
  --m3onerr-c: var(--m3-on-error-container, var(--dsw-alias-label-primary));
  --m3inv: var(--m3-inverse-surface, var(--dsw-alias-bg-overlay));
  --m3oninv: var(--m3-inverse-on-surface, var(--dsw-alias-label-primary));
  --m3amb1: var(--m3-ambient-1, var(--dsw-alias-brand-primary));
  --m3amb2: var(--m3-ambient-2, var(--dsw-alias-state-warn-primary));
  --m3amb3: var(--m3-ambient-3, var(--dsw-alias-state-success-primary));

  color-scheme: light;
  font-family: var(--dsh-font-family-text);
  background-color: var(--m3surf);
  accent-color: var(--m3p);
}
body[data-m3-skin][data-ds-dark-theme] {
  color-scheme: dark;
}

body[data-m3-skin] :is(#root, #app, [data-slot=root]) {
  background-color: var(--m3surf) !important;
  background-image:
    radial-gradient(70rem 54rem at -10% -12%, var(--m3pc) 0%, transparent 60%),
    radial-gradient(58rem 46rem at 110% -4%, var(--m3tc) 0%, transparent 58%),
    radial-gradient(64rem 52rem at 50% 120%, var(--m3sc) 0%, transparent 62%),
    linear-gradient(125deg, color-mix(in srgb, var(--m3pc) 62%, var(--m3surf)) 0%, var(--m3surf) 48%, color-mix(in srgb, var(--m3tc) 55%, var(--m3surf)) 100%) !important;
  background-attachment: fixed;
}
body[data-m3-skin][data-ds-dark-theme] :is(#root, #app, [data-slot=root]) {
  background-image:
    radial-gradient(70rem 54rem at -10% -12%, color-mix(in srgb, var(--m3pc) 88%, transparent) 0%, transparent 62%),
    radial-gradient(58rem 46rem at 110% -4%, color-mix(in srgb, var(--m3tc) 78%, transparent) 0%, transparent 60%),
    radial-gradient(64rem 52rem at 50% 120%, color-mix(in srgb, var(--m3sc) 76%, transparent) 0%, transparent 64%),
    linear-gradient(125deg, color-mix(in srgb, var(--m3pc) 55%, var(--m3surf)) 0%, var(--m3surf) 50%, color-mix(in srgb, var(--m3tc) 50%, var(--m3surf)) 100%) !important;
}
body[data-m3-skin][data-m3-ambient=off] :is(#root, #app, [data-slot=root]) {
  background-image: none !important;
}

body[data-m3-skin] ::selection {
  background: color-mix(in srgb, var(--m3p) 32%, transparent);
  color: var(--m3onsurf);
}
body[data-m3-skin] :is(code, pre, kbd, samp) {
  font-family: var(--dsh-font-family-code-default);
}
body[data-m3-skin] :is(h1, h2, h3, h4) {
  letter-spacing: -0.022em;
}

body[data-m3-skin] :is([data-pane=sidebar], [data-side=sidebar], [data-slot=sidebar], .dshDesktopSidebarSurface) {
  background-color: var(--m3surf-low) !important;
  background-image:
    radial-gradient(22rem 22rem at 115% -5%, color-mix(in srgb, var(--m3tc) 90%, transparent), transparent 62%),
    radial-gradient(20rem 20rem at -20% 105%, color-mix(in srgb, var(--m3sc) 80%, transparent), transparent 60%),
    linear-gradient(165deg, var(--m3pc) 0%, var(--m3surf-low) 52%, var(--m3surf) 100%) !important;
  border-right: 0 !important;
  border-radius: 0 36px 36px 0;
  box-shadow: 26px 0 80px -64px rgba(0,0,0,.55);
  backdrop-filter: blur(24px) saturate(1.2);
}
body[data-m3-skin] [data-slot=sidebar] :is(button, a, [role=button], [role=option], [role=treeitem], [role=link]) {
  border: 0 !important;
  border-radius: 999px !important;
  background-color: transparent !important;
  box-shadow: none !important;
  transition:
    background-color var(--m3-dur-short) var(--m3-ease-emphasized),
    color var(--m3-dur-short) var(--m3-ease-emphasized),
    transform var(--m3-dur-short) var(--m3-ease-spring);
}
body[data-m3-skin] [data-slot=sidebar] :is(button, a, [role=button], [role=option], [role=treeitem], [role=link]):hover {
  background-color: color-mix(in srgb, var(--m3p) 13%, transparent) !important;
}
body[data-m3-skin] [data-slot=sidebar] :is(button, a, [role=button], [role=option], [role=treeitem], [role=link]):active {
  transform: scale(.98);
}
body[data-m3-skin] [data-slot=sidebar] :is([aria-current=true], [aria-current=page], [aria-current=location], [data-active=true], [data-selected=true]) {
  background-color: var(--m3p) !important;
  background-image: linear-gradient(135deg, var(--m3p) 0%, color-mix(in srgb, var(--m3p) 58%, var(--m3t)) 100%) !important;
  color: var(--m3onp) !important;
  box-shadow: 0 14px 30px -14px color-mix(in srgb, var(--m3p) 85%, transparent) !important;
}
body[data-m3-skin] [data-slot=sidebar] :is(h1, h2, h3, h4, [role=heading]) {
  letter-spacing: .02em;
  color: var(--m3onsurfv);
}
body[data-m3-skin] :is([data-pane=conversation], [data-side=rightbar], [data-sidebar-right-panel]) {
  background-color: transparent !important;
}

body[data-m3-skin] [data-slot="conversation.header"] {
  background: linear-gradient(100deg, color-mix(in srgb, var(--m3pc) 92%, transparent), color-mix(in srgb, var(--m3sc) 72%, transparent)) !important;
  border-bottom: 0 !important;
  border-radius: 0 0 32px 32px;
  box-shadow: 0 24px 50px -42px var(--m3p);
  backdrop-filter: blur(24px) saturate(1.2);
}
body[data-m3-skin] [data-slot="conversation.header"] :is(h1, h2, h3) {
  color: var(--m3onsurf);
  font-weight: 650;
}

body[data-m3-skin] [data-chat-flow] {
  padding: 18px 22px 28px;
  background: transparent !important;
}
${ROW} {
  margin: 16px 0;
  padding: 20px 24px;
  border: 1px solid color-mix(in srgb, var(--m3p) 14%, transparent);
  border-radius: 32px;
  background: linear-gradient(135deg, var(--m3surf-lowest) 0%, color-mix(in srgb, var(--m3pc) 42%, var(--m3surf-lowest)) 100%) !important;
  box-shadow: 0 22px 50px -40px rgba(0,0,0,.5);
  transition:
    background-color var(--m3-dur-medium) var(--m3-ease-emphasized),
    box-shadow var(--m3-dur-medium) var(--m3-ease-emphasized),
    transform var(--m3-dur-short) var(--m3-ease-spring);
}
${ROW}:hover {
  box-shadow: 0 28px 60px -40px rgba(0,0,0,.55);
}
${ROW}[data-chat-flow-kind=assistant-step] {
  border-left: 4px solid var(--m3t);
}
${ROW}[data-chat-flow-kind=user] {
  max-width: 84%;
  margin-left: auto;
  background: linear-gradient(135deg, var(--m3p) 0%, color-mix(in srgb, var(--m3p) 55%, var(--m3t)) 100%) !important;
  color: var(--m3onp) !important;
  border: 0 !important;
  border-radius: 36px 36px 12px 36px;
  box-shadow: 0 24px 50px -24px color-mix(in srgb, var(--m3p) 75%, transparent);
}
${ROW}[data-chat-flow-kind=user] :is(p, span, div, li, h1, h2, h3, h4, strong, em, blockquote, td, th) {
  color: var(--m3onp) !important;
}
${ROW}[data-chat-flow-kind=user] a {
  color: var(--m3onp) !important;
  text-decoration-color: currentColor;
}
${ROW}[data-chat-flow-kind=user] code {
  background: rgba(255,255,255,.22) !important;
  color: var(--m3onp) !important;
}
${ROW}[data-chat-flow-kind=user] pre {
  background: rgba(0,0,0,.18) !important;
  border-color: rgba(255,255,255,.2) !important;
}
${ROW}[data-chat-flow-kind=user] pre code {
  background: transparent !important;
}
${ROW}[data-chat-flow-kind=tool-call],
${ROW}[data-chat-flow-kind=command],
${ROW}[data-chat-flow-kind=command-input],
${ROW}[data-chat-flow-kind=workflow-run] {
  background: linear-gradient(135deg, var(--m3sc) 0%, color-mix(in srgb, var(--m3sc) 55%, var(--m3surf-low)) 100%) !important;
  color: var(--m3onsc) !important;
  border: 0 !important;
  border-radius: 28px;
  box-shadow: 0 18px 42px -34px rgba(0,0,0,.45);
}
${ROW}[data-chat-flow-kind=turn-process],
${ROW}[data-chat-flow-kind=system-prompt] {
  background: color-mix(in srgb, var(--m3tc) 58%, transparent) !important;
  border: 1px dashed color-mix(in srgb, var(--m3t) 45%, var(--m3outlinev)) !important;
  box-shadow: none;
}
${ROW}[data-chat-flow-kind=turn-error],
${ROW}[data-chat-flow-kind=turn-max-tokens] {
  background: var(--m3errc) !important;
  color: var(--m3onerr-c) !important;
  border: 0 !important;
  border-radius: 28px;
  box-shadow: none;
}
${ROW}[data-chat-flow-kind=user] > * {
  background-color: transparent !important;
}
body[data-m3-skin] [data-slot=sidebar] > *,
body[data-m3-skin] [data-slot="conversation.header"] > *,
body[data-m3-skin] [data-composer-card] > * {
  background-color: transparent !important;
}
body[data-m3-skin] :is([data-pane=main], [data-pane=content], [data-slot="conversation.content"], [data-slot="conversation"]) {
  background-color: transparent !important;
}

body[data-m3-skin] pre,
body[data-m3-skin] .md-code-block {
  border: 2px solid color-mix(in srgb, var(--m3p) 16%, var(--m3outlinev)) !important;
  border-radius: 22px !important;
  background: var(--m3surf-lowest) !important;
  box-shadow: none !important;
}
body[data-m3-skin] code:not(pre code) {
  border: 0 !important;
  border-radius: 9px !important;
  background: color-mix(in srgb, var(--m3p) 16%, transparent) !important;
  color: color-mix(in srgb, var(--m3p) 84%, var(--m3onsurf)) !important;
  padding: .1em .42em;
  font-weight: 550;
}
body[data-m3-skin] a {
  color: var(--m3p);
  font-weight: 550;
  text-underline-offset: 3px;
  text-decoration-color: color-mix(in srgb, var(--m3p) 45%, transparent);
}
body[data-m3-skin] :is(th, td) {
  border-color: var(--m3outlinev) !important;
}
body[data-m3-skin] thead :is(th, td) {
  background: color-mix(in srgb, var(--m3pc) 70%, var(--m3surf-low)) !important;
}
body[data-m3-skin] tbody tr:nth-child(even) {
  background: color-mix(in srgb, var(--m3p) 5%, transparent);
}
body[data-m3-skin] blockquote {
  border-left: 5px solid var(--m3t) !important;
  border-radius: 0 18px 18px 0;
  background: color-mix(in srgb, var(--m3tc) 46%, transparent);
  padding-left: 16px;
}
body[data-m3-skin] hr {
  border: 0 !important;
  border-top: 1px solid var(--m3outlinev) !important;
  height: 0;
}

body[data-m3-skin] [data-composer-card] {
  position: relative;
  border: 2px solid color-mix(in srgb, var(--m3p) 60%, transparent) !important;
  border-radius: 40px !important;
  background: var(--m3surf-lowest) !important;
  box-shadow:
    0 26px 60px -32px color-mix(in srgb, var(--m3p) 80%, transparent),
    0 8px 24px -16px rgba(0,0,0,.3) !important;
  transition:
    border-color var(--m3-dur-short) var(--m3-ease-emphasized),
    box-shadow var(--m3-dur-medium) var(--m3-ease-emphasized),
    transform var(--m3-dur-medium) var(--m3-ease-spring);
}
body[data-m3-skin] [data-composer-card]:focus-within {
  border-color: var(--m3p) !important;
  box-shadow:
    0 0 0 6px color-mix(in srgb, var(--m3p) 18%, transparent),
    0 30px 70px -34px color-mix(in srgb, var(--m3p) 85%, transparent) !important;
  transform: translateY(-2px);
}
body[data-m3-skin] [data-composer-input] {
  caret-color: var(--m3p) !important;
}
body[data-m3-skin] [data-composer-card] :is(button[type=submit], [data-composer-submit], [aria-label*="Send"], [aria-label*="发送"]) {
  width: 46px !important;
  height: 46px !important;
  min-width: 46px !important;
  border-radius: 50% !important;
  border: 0 !important;
  background: linear-gradient(135deg, var(--m3p) 0%, color-mix(in srgb, var(--m3p) 45%, var(--m3t)) 100%) !important;
  color: var(--m3onp) !important;
  box-shadow: 0 12px 26px -10px color-mix(in srgb, var(--m3p) 85%, transparent) !important;
}
body[data-m3-skin] [data-composer-card] :is(button[type=submit], [data-composer-submit]):hover {
  transform: translateY(-1px) scale(1.03);
}

body[data-m3-skin] [role=dialog] {
  border: 0 !important;
  border-radius: 34px !important;
  background: var(--m3surf-high) !important;
  box-shadow:
    0 0 0 1px color-mix(in srgb, var(--m3p) 14%, transparent),
    0 34px 90px -42px rgba(0,0,0,.65) !important;
  backdrop-filter: blur(24px) saturate(1.15);
}
body[data-m3-skin] :is([role=menu], [role=listbox], [data-menu-material]) {
  border: 1px solid color-mix(in srgb, var(--m3p) 14%, transparent) !important;
  border-radius: 24px !important;
  background: var(--m3surf-high) !important;
  box-shadow: 0 26px 70px -38px rgba(0,0,0,.55) !important;
}
body[data-m3-skin] [role=tooltip] {
  border: 0 !important;
  border-radius: 14px !important;
  background: var(--m3inv) !important;
  color: var(--m3oninv) !important;
  box-shadow: var(--m3-shadow-1) !important;
}

body[data-m3-skin] :is(button, [role=button]) {
  border-radius: 999px;
  transition:
    background-color var(--m3-dur-short) var(--m3-ease-emphasized),
    color var(--m3-dur-short) var(--m3-ease-emphasized),
    box-shadow var(--m3-dur-short) var(--m3-ease-emphasized),
    transform var(--m3-dur-short) var(--m3-ease-spring);
}
body[data-m3-skin] :is(button, [role=button]):active {
  transform: scale(.97);
}
body[data-m3-skin] :is([data-variant=primary], [data-tone=primary], [data-emphasis=primary]) {
  background: linear-gradient(135deg, var(--m3p) 0%, color-mix(in srgb, var(--m3p) 55%, var(--m3t)) 100%) !important;
  color: var(--m3onp) !important;
  border: 0 !important;
}
body[data-m3-skin] :focus-visible {
  outline: 3px solid var(--m3p) !important;
  outline-offset: 3px;
}
body[data-m3-skin] [role=tab][aria-selected=true] {
  background: var(--m3p) !important;
  color: var(--m3onp) !important;
  border-radius: 999px;
}
body[data-m3-skin] :is(input, textarea, select) {
  border-radius: 16px;
}
body[data-m3-skin] :is(input[type=checkbox], input[type=radio], progress) {
  accent-color: var(--m3p);
}
body[data-m3-skin] ::-webkit-scrollbar {
  width: 10px;
  height: 10px;
}
body[data-m3-skin] ::-webkit-scrollbar-track {
  background: transparent;
}
body[data-m3-skin] ::-webkit-scrollbar-thumb {
  border-radius: 999px;
  background: color-mix(in srgb, var(--m3p) 40%, transparent);
}
body[data-m3-skin] ::-webkit-scrollbar-thumb:hover {
  background: color-mix(in srgb, var(--m3p) 62%, transparent);
}

.m3-mark {
  display: block;
  flex: none;
  filter: drop-shadow(0 2px 2px rgba(0,0,0,.12));
}
.m3-mark-wrap {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  border-radius: 16px;
  background: var(--m3surf-lowest);
  box-shadow:
    inset 0 0 0 2px var(--m3p),
    0 14px 28px -14px color-mix(in srgb, var(--m3p) 70%, transparent);
}

.m3-palette {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 12px;
}
.m3-palette--compact {
  flex-wrap: nowrap;
  gap: 7px;
}
.m3-swatch {
  position: relative;
  width: 40px;
  height: 40px;
  padding: 0;
  border: 0;
  border-radius: 50%;
  cursor: pointer;
  background: conic-gradient(from 210deg, var(--m3-swatch-a), var(--m3-swatch-b), var(--m3-swatch-c), var(--m3-swatch-a));
  box-shadow: inset 0 0 0 1px rgba(0,0,0,.1), 0 6px 14px -8px rgba(0,0,0,.4);
  transition: transform var(--m3-dur-short) var(--m3-ease-spring), box-shadow var(--m3-dur-short) var(--m3-ease-emphasized);
}
.m3-swatch:hover {
  transform: scale(1.1) rotate(6deg);
}
.m3-swatch.is-active {
  box-shadow: 0 0 0 3px var(--m3surf), 0 0 0 6px var(--m3p), 0 10px 20px -10px rgba(0,0,0,.45);
}
.m3-swatch__core {
  position: absolute;
  inset: 10px;
  border-radius: 50%;
  background: var(--m3surf);
  opacity: .94;
}
.m3-swatch.is-active .m3-swatch__core {
  inset: 13px;
  background: var(--m3p);
  opacity: 1;
}
.m3-palette--compact .m3-swatch {
  width: 28px;
  height: 28px;
}
.m3-palette--compact .m3-swatch__core {
  inset: 7px;
}
.m3-palette--compact .m3-swatch.is-active {
  box-shadow: 0 0 0 2px var(--m3surf), 0 0 0 4px var(--m3p);
}
.m3-palette--compact .m3-swatch.is-active .m3-swatch__core {
  inset: 9px;
}

.m3-hero-palette {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  padding: 10px 18px 10px 20px;
  border: 0;
  border-radius: 999px;
  background: linear-gradient(135deg, var(--m3pc) 0%, var(--m3sc) 100%);
  box-shadow:
    0 18px 40px -24px color-mix(in srgb, var(--m3p) 75%, transparent),
    inset 0 0 0 1px color-mix(in srgb, var(--m3p) 18%, transparent);
}
.m3-hero-palette__label {
  font-size: 11px;
  font-weight: 750;
  letter-spacing: .08em;
  text-transform: uppercase;
  color: var(--m3onpc);
  white-space: nowrap;
}

.m3-seed-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  padding: 0;
  border: 0;
  border-radius: 50%;
  background: transparent;
  cursor: pointer;
}
.m3-seed-button__ring {
  display: grid;
  place-items: center;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: conic-gradient(from 210deg, var(--m3-swatch-a), var(--m3-swatch-b), var(--m3-swatch-c), var(--m3-swatch-a));
  box-shadow: 0 8px 18px -8px rgba(0,0,0,.35);
  transition: transform var(--m3-dur-short) var(--m3-ease-spring);
  animation: m3-breathe 5s var(--m3-ease-emphasized) infinite;
}
.m3-seed-button:hover .m3-seed-button__ring {
  transform: rotate(20deg) scale(1.08);
}
.m3-seed-button__core {
  display: grid;
  place-items: center;
  width: 22px;
  height: 22px;
  border-radius: 50%;
  background: var(--m3surf);
}
.m3-seed-button__core .m3-mark {
  width: 17px;
  height: 17px;
}
@keyframes m3-breathe {
  0%, 100% {
    box-shadow: 0 8px 18px -8px rgba(0,0,0,.35), 0 0 0 0 color-mix(in srgb, var(--m3p) 28%, transparent);
  }
  50% {
    box-shadow: 0 8px 18px -8px rgba(0,0,0,.35), 0 0 0 7px color-mix(in srgb, var(--m3p) 0%, transparent);
  }
}
body[data-m3-skin][data-m3-motion=off] .m3-seed-button__ring {
  animation: none;
}

.m3-settings {
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 6px 0 22px;
}
.m3-settings__head {
  display: flex;
  align-items: center;
  gap: 16px;
}
.m3-settings__title {
  margin: 0;
  font-size: 22px;
  line-height: 30px;
  font-weight: 700;
  letter-spacing: -.02em;
  color: var(--m3onsurf);
}
.m3-settings__hint {
  margin: 2px 0 0;
  font-size: 13px;
  line-height: 20px;
  color: var(--m3onsurfv);
}
.m3-card {
  display: flex;
  flex-direction: column;
  gap: 14px;
  padding: 20px 22px;
  border: 0;
  border-radius: 30px;
  background: linear-gradient(135deg, var(--m3surf-lowest) 0%, color-mix(in srgb, var(--m3pc) 46%, var(--m3surf-lowest)) 100%);
  box-shadow: 0 20px 50px -38px rgba(0,0,0,.5);
}
.m3-card__head {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 12px;
}
.m3-card__label {
  font-size: 15px;
  font-weight: 700;
  color: var(--m3onsurf);
}
.m3-card__value {
  padding: 4px 12px;
  border-radius: 999px;
  background: var(--m3p);
  color: var(--m3onp);
  font-size: 12px;
  font-weight: 700;
  box-shadow: 0 8px 18px -10px var(--m3p);
}
.m3-card__hint {
  margin: 0;
  font-size: 12px;
  line-height: 19px;
  color: var(--m3onsurfv);
}
.m3-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 18px;
}
.m3-row__label {
  font-size: 14px;
  font-weight: 650;
  color: var(--m3onsurf);
}
.m3-row__hint {
  margin-top: 2px;
  font-size: 12px;
  line-height: 19px;
  color: var(--m3onsurfv);
}
.m3-switch {
  position: relative;
  flex: none;
  width: 58px;
  height: 36px;
  padding: 0;
  border: 0;
  border-radius: 999px;
  background: var(--m3surf-highest);
  cursor: pointer;
  box-shadow: inset 0 0 0 1px color-mix(in srgb, var(--m3p) 14%, transparent);
  transition: background-color var(--m3-dur-short) var(--m3-ease-emphasized);
}
.m3-switch__thumb {
  position: absolute;
  top: 4px;
  left: 4px;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: var(--m3outline);
  box-shadow: 0 2px 6px rgba(0,0,0,.2);
  transition: transform var(--m3-dur-medium) var(--m3-ease-spring), background-color var(--m3-dur-short) var(--m3-ease-emphasized);
}
.m3-switch.is-on {
  background: var(--m3p);
}
.m3-switch.is-on .m3-switch__thumb {
  transform: translateX(22px);
  background: var(--m3onp);
}
.m3-divider {
  height: 1px;
  margin: 2px 0;
  background: color-mix(in srgb, var(--m3p) 14%, var(--m3outlinev));
}
.m3-text-button {
  align-self: flex-start;
  padding: 12px 22px;
  border: 0;
  border-radius: 999px;
  background: var(--m3p);
  color: var(--m3onp);
  font: inherit;
  font-size: 13px;
  font-weight: 700;
  cursor: pointer;
  box-shadow: 0 14px 28px -14px color-mix(in srgb, var(--m3p) 80%, transparent);
  transition: transform var(--m3-dur-short) var(--m3-ease-spring), background-color var(--m3-dur-short) var(--m3-ease-emphasized);
}
.m3-text-button:hover {
  background: var(--m3primary-hover, var(--m3p));
  transform: translateY(-1px);
}
.m3-preview {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 9px;
}
.m3-preview__tile {
  display: flex;
  align-items: flex-end;
  height: 64px;
  padding: 9px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 800;
  letter-spacing: -.01em;
  box-shadow: inset 0 0 0 1px rgba(0,0,0,.05);
}

.m3-ripple-host {
  position: relative;
  overflow: hidden;
}
.m3-ripple {
  position: absolute;
  border-radius: 50%;
  background: currentColor;
  opacity: .2;
  pointer-events: none;
  transform: translate(-50%, -50%) scale(0);
  animation: m3-ripple var(--m3-dur-long) var(--m3-ease-emphasized) forwards;
}
@keyframes m3-ripple {
  to {
    transform: translate(-50%, -50%) scale(1);
    opacity: 0;
  }
}

@media (prefers-reduced-motion: reduce) {
  body[data-m3-skin] *,
  body[data-m3-skin] *::before,
  body[data-m3-skin] *::after {
    animation-duration: .001ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: .001ms !important;
    scroll-behavior: auto !important;
  }
  .m3-ripple {
    display: none;
  }
}

/* ------------------------------------------------------------------ */
/* v3: one continuous color field + organic underlays                  */
/* ------------------------------------------------------------------ */

body[data-m3-skin] {
  --m3-wave-ink: color-mix(in srgb, var(--m3p) 16%, transparent);
}

body[data-m3-skin] :is(#root, #app, [data-slot=root]) {
  background-color: var(--m3surf) !important;
  background-image:
    url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='260' height='90' viewBox='0 0 260 90'%3E%3Cpath d='M0 45 Q32.5 15 65 45 T130 45 T195 45 T260 45' fill='none' stroke='%23ffffff' stroke-opacity='.18' stroke-width='2'/%3E%3C/svg%3E"),
    radial-gradient(62rem 42rem at 8% -12%, color-mix(in srgb, var(--m3pc) 78%, transparent) 0%, transparent 64%),
    radial-gradient(52rem 38rem at 108% 6%, color-mix(in srgb, var(--m3pc) 48%, transparent) 0%, transparent 62%),
    linear-gradient(180deg, var(--m3surf) 0%, color-mix(in srgb, var(--m3pc) 30%, var(--m3surf)) 100%) !important;
  background-size: 260px 90px, auto, auto, auto;
  background-attachment: fixed;
}
body[data-m3-skin][data-ds-dark-theme] :is(#root, #app, [data-slot=root]) {
  background-image:
    url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='260' height='90' viewBox='0 0 260 90'%3E%3Cpath d='M0 45 Q32.5 15 65 45 T130 45 T195 45 T260 45' fill='none' stroke='%23ffffff' stroke-opacity='.06' stroke-width='2'/%3E%3C/svg%3E"),
    radial-gradient(62rem 42rem at 8% -12%, color-mix(in srgb, var(--m3pc) 82%, transparent) 0%, transparent 64%),
    radial-gradient(52rem 38rem at 108% 6%, color-mix(in srgb, var(--m3pc) 55%, transparent) 0%, transparent 62%),
    linear-gradient(180deg, var(--m3surf) 0%, color-mix(in srgb, var(--m3pc) 24%, var(--m3surf)) 100%) !important;
  background-size: 260px 90px, auto, auto, auto;
}

/* the whole shell floats on the same sheet: no contrasting side/header bands */
body[data-m3-skin] :is([data-pane=sidebar], [data-side=sidebar], [data-slot=sidebar], .dshDesktopSidebarSurface) {
  background: transparent !important;
  background-image: none !important;
  border-right: 0 !important;
  border-radius: 0 !important;
  box-shadow: none !important;
  backdrop-filter: none !important;
}
body[data-m3-skin] [data-slot="conversation.header"] {
  background: transparent !important;
  background-image: none !important;
  border-bottom: 0 !important;
  border-radius: 0 !important;
  box-shadow: none !important;
  backdrop-filter: none !important;
  position: relative;
}
body[data-m3-skin] [data-slot="conversation.header"]::after {
  content: '';
  position: absolute;
  left: 28px;
  right: 28px;
  bottom: 0;
  height: 14px;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='14' viewBox='0 0 120 14'%3E%3Cpath d='M0 7 Q15 1 30 7 T60 7 T90 7 T120 7' fill='none' stroke='%23ffffff' stroke-opacity='.7' stroke-width='2.5'/%3E%3C/svg%3E");
  background-repeat: repeat-x;
  background-size: 120px 14px;
  opacity: .7;
  pointer-events: none;
}
body[data-m3-skin][data-ds-dark-theme] [data-slot="conversation.header"]::after {
  opacity: .22;
}
body[data-m3-skin] :is([data-pane=conversation], [data-pane=main], [data-pane=content], [data-side=rightbar], [data-sidebar-right-panel], [data-slot="conversation.content"], [data-slot="conversation"]) {
  background-color: transparent !important;
}

/* cards: one paper stock, only the hue changes */
${ROW} {
  background: var(--m3surf-lowest) !important;
  background-image: none !important;
  border: 1px solid color-mix(in srgb, var(--m3p) 12%, transparent) !important;
  border-radius: 28px !important;
  box-shadow: 0 10px 30px -24px rgba(0,0,0,.38) !important;
}
${ROW}[data-chat-flow-kind=assistant-step] {
  border-left: 4px solid var(--m3p) !important;
}
${ROW}[data-chat-flow-kind=user] {
  background: var(--m3pc) !important;
  background-image: none !important;
  color: var(--m3onpc) !important;
  border: 1px solid color-mix(in srgb, var(--m3p) 14%, transparent) !important;
  border-radius: 30px 34px 8px 30px / 30px 30px 8px 34px !important;
  box-shadow: 0 10px 24px -20px rgba(0,0,0,.3) !important;
}
${ROW}[data-chat-flow-kind=user] :is(p, span, div, li, h1, h2, h3, h4, strong, em, blockquote, td, th) {
  color: var(--m3onpc) !important;
}
${ROW}[data-chat-flow-kind=user] a {
  color: var(--m3onpc) !important;
  text-decoration-color: currentColor;
}
${ROW}[data-chat-flow-kind=user] code {
  background: rgba(0,0,0,.08) !important;
  color: var(--m3onpc) !important;
}
${ROW}[data-chat-flow-kind=user] pre {
  background: rgba(0,0,0,.06) !important;
  border-color: color-mix(in srgb, var(--m3p) 18%, transparent) !important;
}
${ROW}[data-chat-flow-kind=user] pre code {
  background: transparent !important;
}
${ROW}[data-chat-flow-kind=tool-call],
${ROW}[data-chat-flow-kind=command],
${ROW}[data-chat-flow-kind=command-input],
${ROW}[data-chat-flow-kind=workflow-run] {
  background: color-mix(in srgb, var(--m3p) 7%, var(--m3surf-lowest)) !important;
  color: var(--m3onsurf) !important;
  border: 1px solid color-mix(in srgb, var(--m3p) 10%, transparent) !important;
  box-shadow: none !important;
}
${ROW}[data-chat-flow-kind=turn-process],
${ROW}[data-chat-flow-kind=system-prompt] {
  background: color-mix(in srgb, var(--m3p) 5%, transparent) !important;
  border: 1px dashed color-mix(in srgb, var(--m3p) 24%, transparent) !important;
  color: var(--m3onsurf) !important;
  box-shadow: none !important;
}

/* code and inline marks stay in the same hue family */
body[data-m3-skin] pre,
body[data-m3-skin] .md-code-block {
  background: var(--m3surf-lowest) !important;
  border: 1px solid color-mix(in srgb, var(--m3p) 14%, transparent) !important;
}

/* sidebar selection: a light tonal pill, not a dark block */
body[data-m3-skin] [data-slot=sidebar] :is([aria-current=true], [aria-current=page], [aria-current=location], [data-active=true], [data-selected=true]) {
  background: var(--m3pc) !important;
  background-image: none !important;
  color: var(--m3onpc) !important;
  box-shadow: 0 8px 20px -16px rgba(0,0,0,.35) !important;
}

/* composer: a white paper capsule with an organic underlay */
body[data-m3-skin] [data-composer-card] {
  background: var(--m3surf-lowest) !important;
  border: 1.5px solid color-mix(in srgb, var(--m3p) 22%, transparent) !important;
  border-radius: 36px !important;
  box-shadow: 0 18px 50px -30px rgba(0,0,0,.42) !important;
}
body[data-m3-skin] [data-composer-card]::before {
  content: '';
  position: absolute;
  inset: -18px -14px 16px 42px;
  z-index: -1;
  background: color-mix(in srgb, var(--m3pc) 72%, var(--m3p));
  border-radius: 46% 54% 58% 42% / 48% 42% 58% 52%;
  opacity: .5;
  transform: rotate(-1.6deg);
  pointer-events: none;
}
body[data-m3-skin] [data-composer-card]::after {
  content: '';
  position: absolute;
  left: 28px;
  right: 28px;
  top: -19px;
  height: 12px;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='12' viewBox='0 0 120 12'%3E%3Cpath d='M0 6 Q15 0 30 6 T60 6 T90 6 T120 6' fill='none' stroke='%23ffffff' stroke-opacity='.75' stroke-width='2.5'/%3E%3C/svg%3E");
  background-repeat: repeat-x;
  background-size: 120px 12px;
  opacity: .65;
  pointer-events: none;
}
body[data-m3-skin][data-ds-dark-theme] [data-composer-card]::after {
  opacity: .28;
}
body[data-m3-skin] [data-composer-card]:focus-within {
  border-color: var(--m3p) !important;
  box-shadow:
    0 0 0 5px color-mix(in srgb, var(--m3p) 14%, transparent),
    0 18px 50px -30px rgba(0,0,0,.42) !important;
  transform: none;
}

/* hero palette: a white pill on the sheet */
.m3-hero-palette {
  position: relative;
  background: var(--m3surf-lowest) !important;
  background-image: none !important;
  border: 1px solid color-mix(in srgb, var(--m3p) 12%, transparent) !important;
  box-shadow: 0 10px 28px -22px rgba(0,0,0,.35) !important;
}
.m3-hero-palette::before {
  content: '';
  position: absolute;
  inset: -9px -12px -10px -8px;
  z-index: -1;
  background: var(--m3pc);
  border-radius: 46% 54% 58% 42% / 48% 42% 58% 52%;
  opacity: .65;
  transform: rotate(2deg);
  pointer-events: none;
}
.m3-hero-palette__label {
  color: var(--m3p) !important;
}

/* organic cloud behind the brand flower */
.m3-mark-wrap {
  position: relative;
  isolation: isolate;
}
.m3-mark-wrap::before {
  content: '';
  position: absolute;
  inset: -7px;
  z-index: -1;
  background: var(--m3pc);
  border-radius: 46% 54% 58% 42% / 48% 42% 58% 52%;
  transform: rotate(-10deg);
  pointer-events: none;
}

/* settings cards: same paper, same hue */
.m3-card {
  background: var(--m3surf-lowest) !important;
  background-image: none !important;
  border: 1px solid color-mix(in srgb, var(--m3p) 12%, transparent) !important;
  box-shadow: 0 10px 30px -24px rgba(0,0,0,.35) !important;
}

/* a soft scalloped edge for the sidebar, drawn as a wave rather than a border */
body[data-m3-skin] [data-slot=sidebar] {
  position: relative;
}
body[data-m3-skin] [data-slot=sidebar]::after {
  content: '';
  position: absolute;
  top: 0;
  right: -1px;
  bottom: 0;
  width: 10px;
  background-image: radial-gradient(circle at 0 8px, transparent 7px, color-mix(in srgb, var(--m3p) 12%, transparent) 8px, transparent 9px);
  background-size: 10px 18px;
  background-repeat: repeat-y;
  opacity: .7;
  pointer-events: none;
}

/* ------------------------------------------------------------------ */
/* v4: one sheet, no seams, live wave progress, cloud send             */
/* ------------------------------------------------------------------ */

body[data-m3-skin] {
  --dsw-alias-bg-base: var(--m3-surface) !important;
  --dsw-specific-sidebar-fill: var(--m3-surface) !important;
  --m3-busy: 0;
}

/* The sheet is painted once, on the document itself. Nothing above it paints. */
html[data-m3-skin],
body[data-m3-skin] {
  background-color: var(--m3surf) !important;
  background-image:
    url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='260' height='90' viewBox='0 0 260 90'%3E%3Cpath d='M0 45 Q32.5 15 65 45 T130 45 T195 45 T260 45' fill='none' stroke='%23ffffff' stroke-opacity='.18' stroke-width='2'/%3E%3C/svg%3E"),
    radial-gradient(62rem 42rem at 8% -12%, color-mix(in srgb, var(--m3pc) 78%, transparent) 0%, transparent 64%),
    radial-gradient(52rem 38rem at 108% 6%, color-mix(in srgb, var(--m3pc) 48%, transparent) 0%, transparent 62%),
    linear-gradient(180deg, var(--m3surf) 0%, color-mix(in srgb, var(--m3pc) 30%, var(--m3surf)) 100%) !important;
  background-size: 260px 90px, auto, auto, auto;
  background-attachment: fixed;
  background-repeat: repeat, no-repeat, no-repeat, no-repeat;
}

body[data-m3-skin]:has([data-chat-running]),
body[data-m3-skin]:has([data-streaming]),
body[data-m3-skin]:has([data-state=running]) {
  --m3-busy: 1;
}

/* Every shell surface — ours, the shell's, and the claude skin's — is a window
   into that one sheet: no fill, no border, no lift. */
body[data-m3-skin] :is(
  #root,
  #app,
  [data-slot=root],
  .PIRFFq_frame,
  .PIRFFq_centerCol,
  .PIRFFq_sidebarCol,
  .PIRFFq_rightbarCol,
  .PIRFFq_bottomRow,
  [data-pane=sidebar],
  [data-pane=conversation],
  [data-dsh-claude-part~=sidebar-column],
  [data-dsh-claude-part~=center-column],
  .dshDesktopSidebarSurface,
  .kB3qhq_root,
  .kiGsTW_root,
  .kiGsTW_body,
  .kiGsTW_scrollBody,
  .kiGsTW_viewArea,
  .kiGsTW_composerSeat,
  [data-conversation-region],
  [data-conversation-content],
  [data-conversation-scroll],
  [data-composer-seat]
) {
  background: transparent !important;
  background-image: none !important;
  border: 0 !important;
  border-radius: 0 !important;
  box-shadow: none !important;
}
body[data-m3-skin] :is(.PIRFFq_frame, .PIRFFq_centerCol, .PIRFFq_sidebarCol, .PIRFFq_bottomRow)::before,
body[data-m3-skin] :is(.PIRFFq_frame, .PIRFFq_centerCol, .PIRFFq_sidebarCol, .PIRFFq_bottomRow)::after {
  background: transparent !important;
  background-image: none !important;
  border: 0 !important;
  box-shadow: none !important;
}

body[data-m3-skin] .kiGsTW_header,
body[data-m3-skin] [data-dsh-claude-part~=conversation-header] {
  position: relative;
  background: transparent !important;
  border-bottom: 0 !important;
  box-shadow: none !important;
}

/* The hero palette is a small white pill on the sheet, not a blob. */
body[data-m3-skin] .m3-hero-palette {
  border: 0 !important;
  margin-bottom: 22px !important;
}
body[data-m3-skin] .m3-hero-palette::before {
  content: none !important;
}

/* Cards are paper, not outlined boxes: no seams, only a soft lift. */
${ROW} {
  border: 0 !important;
  box-shadow: 0 12px 30px -24px rgba(0,0,0,.38) !important;
}
${ROW}[data-chat-flow-kind=assistant-step] {
  border-left: 0 !important;
}
${ROW}[data-chat-flow-kind=user] {
  border: 0 !important;
}
${ROW}[data-chat-flow-kind=tool-call],
${ROW}[data-chat-flow-kind=command],
${ROW}[data-chat-flow-kind=command-input],
${ROW}[data-chat-flow-kind=workflow-run],
${ROW}[data-chat-flow-kind=turn-process],
${ROW}[data-chat-flow-kind=system-prompt] {
  border: 0 !important;
  box-shadow: none !important;
}

body[data-m3-skin] [data-composer-card] {
  border: 0 !important;
  box-shadow: 0 20px 50px -30px rgba(0,0,0,.45) !important;
}
.m3-hero-palette,
.m3-card {
  border: 0 !important;
}
body[data-m3-skin] pre,
body[data-m3-skin] .md-code-block {
  border: 0 !important;
}

/* The sidebar scallop was a seam; remove it. */
body[data-m3-skin] [data-slot=sidebar]::after {
  content: none !important;
}

/* Header progress wave: unchanged from v3 shape, still only while working. */
body[data-m3-skin] [data-slot="conversation.header"],
body[data-m3-skin] .kiGsTW_header {
  position: relative;
}
body[data-m3-skin] [data-slot="conversation.header"]::before,
body[data-m3-skin] .kiGsTW_header::before {
  content: none !important;
}
body[data-m3-skin] [data-slot="conversation.header"]::after,
body[data-m3-skin] .kiGsTW_header::after {
  content: '';
  position: absolute;
  left: 28px;
  right: 28px;
  bottom: 0;
  height: 7px;
  background-color: var(--m3p);
  background-image: linear-gradient(90deg, var(--m3p), var(--m3t), var(--m3p)) !important;
  -webkit-mask-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='7' viewBox='0 0 120 7'%3E%3Cpath d='M0 3.5 Q15 0 30 3.5 T60 3.5 T90 3.5 T120 3.5' fill='none' stroke='%23fff' stroke-opacity='.95' stroke-width='1.6'/%3E%3C/svg%3E");
  mask-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='7' viewBox='0 0 120 7'%3E%3Cpath d='M0 3.5 Q15 0 30 3.5 T60 3.5 T90 3.5 T120 3.5' fill='none' stroke='%23fff' stroke-opacity='.95' stroke-width='1.6'/%3E%3C/svg%3E");
  -webkit-mask-repeat: repeat-x;
  mask-repeat: repeat-x;
  -webkit-mask-size: 120px 7px;
  mask-size: 120px 7px;
  background-size: 120px 7px;
  opacity: calc(var(--m3-busy) * .85);
  animation: m3-wave-mask-flow 1.15s linear infinite;
  pointer-events: none;
}

/* ---------------------------------------------------------------------------
   Composer progress: the gif form — a pale track with a dot at the far end,
   and a short thick squiggle that runs along it while the model works.
   --------------------------------------------------------------------------- */
body[data-m3-skin] [data-composer-card] {
  margin-top: 15px;
}
body[data-m3-skin] [data-composer-card]::before {
  content: '';
  position: absolute;
  inset: auto;
  top: -19px;
  left: 30px;
  right: 30px;
  height: 10px;
  z-index: auto;
  border-radius: 0;
  background-color: transparent;
  background-image:
    radial-gradient(circle at calc(100% - 5px) 50%, var(--m3p) 0 4.4px, transparent 4.6px),
    linear-gradient(90deg, color-mix(in srgb, var(--m3p) 12%, transparent), color-mix(in srgb, var(--m3p) 12%, transparent));
  background-size: auto, 100% 3px;
  background-position: 0 0, 0 50%;
  background-repeat: no-repeat, no-repeat;
  opacity: var(--m3-busy);
  transform: none;
  pointer-events: none;
}

body[data-m3-skin] [data-composer-card]::after {
  content: '';
  position: absolute;
  top: -22px;
  left: 30px;
  right: 30px;
  width: auto;
  height: 16px;
  background-color: var(--m3p);
  background-image: linear-gradient(90deg, var(--m3p), var(--m3s), var(--m3p)) !important;
  background-repeat: no-repeat !important;
  background-size: 96px 16px !important;
  -webkit-mask-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='96' height='16' viewBox='0 0 96 16'%3E%3Cpath d='M6 9 Q12 2 18 9 T30 9 T42 9 T54 9 T66 9 T78 9 T90 9' fill='none' stroke='%23fff' stroke-width='6' stroke-linecap='round'/%3E%3C/svg%3E");
  mask-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='96' height='16' viewBox='0 0 96 16'%3E%3Cpath d='M6 9 Q12 2 18 9 T30 9 T42 9 T54 9 T66 9 T78 9 T90 9' fill='none' stroke='%23fff' stroke-width='6' stroke-linecap='round'/%3E%3C/svg%3E");
  -webkit-mask-repeat: no-repeat;
  mask-repeat: no-repeat;
  -webkit-mask-size: 96px 16px;
  mask-size: 96px 16px;
  opacity: var(--m3-busy);
  animation: m3-squiggle-run 1.7s cubic-bezier(.45,.05,.55,.95) infinite;
  pointer-events: none;
}

/* Send: the gif form — a tonal circle holding one dark expressive ellipse. */
body[data-m3-skin] [data-composer-card] :is(button[type=submit], button[class*="_primary"]) {
  position: relative;
  isolation: isolate;
  overflow: visible !important;
  background: transparent !important;
  background-image: none !important;
  border: 0 !important;
  border-radius: 50% !important;
  box-shadow: none !important;
  color: var(--m3pc) !important;
  transition: transform .28s cubic-bezier(.2,0,0,1.3);
}
body[data-m3-skin] [data-composer-card] :is(button[type=submit], button[class*="_primary"])::before {
  content: '';
  position: absolute;
  inset: 0;
  z-index: -2;
  background: radial-gradient(circle at 34% 26%, color-mix(in srgb, #fff 38%, var(--m3pc)), var(--m3pc) 70%);
  border-radius: 50%;
  pointer-events: none;
}
body[data-m3-skin] [data-composer-card] :is(button[type=submit], button[class*="_primary"])::after {
  content: '';
  position: absolute;
  left: 27%;
  top: 13%;
  width: 48%;
  height: 66%;
  z-index: -1;
  background: var(--m3onpc);
  border-radius: 50%;
  transform: rotate(-32deg);
  transition: transform .3s cubic-bezier(.2,0,0,1.25), border-radius .3s ease;
  pointer-events: none;
}
body[data-m3-skin] [data-composer-card] :is(button[type=submit], button[class*="_primary"]):hover {
  transform: scale(1.05);
}
body[data-m3-skin] [data-composer-card] :is(button[type=submit], button[class*="_primary"]):hover::after {
  transform: rotate(-14deg) scale(1.05);
}
body[data-m3-skin] [data-composer-card] :is(button[type=submit], button[class*="_primary"]):active::after {
  border-radius: 46% 54% 52% 48% / 54% 48% 52% 46%;
}
body[data-m3-skin] [data-composer-card] :is(button[type=submit], button[class*="_primary"]) svg {
  position: relative;
  z-index: 1;
  width: 15px;
  height: 15px;
  color: inherit;
}

@keyframes m3-wave-mask-flow {
  from { -webkit-mask-position: 0 0; mask-position: 0 0; }
  to { -webkit-mask-position: 120px 0; mask-position: 120px 0; }
}
@keyframes m3-squiggle-run {
  0% { -webkit-mask-position: -96px 0; mask-position: -96px 0; }
  100% { -webkit-mask-position: 100% 0; mask-position: 100% 0; }
}

@media (prefers-reduced-motion: reduce) {
  body[data-m3-skin] [data-slot="conversation.header"]::after,
  body[data-m3-skin] .kiGsTW_header::after,
  body[data-m3-skin] [data-composer-card]::after {
    animation: none !important;
  }
  body[data-m3-skin] [data-composer-card] :is(button[type=submit], button[class*="_primary"])::before {
    transition: none !important;
  }
}
`;


    /* ------------------------------------------------------------------ */
    /* Components                                                         */
    /* ------------------------------------------------------------------ */

    function Mark(props) {
      const size = props && props.size ? props.size : 24;
      return h('svg', {
        className: 'm3-mark',
        width: size,
        height: size,
        viewBox: '0 0 64 64',
        'aria-hidden': 'true',
        focusable: 'false',
      },
        h('g', { transform: 'translate(32 32)' },
          h('path', { d: 'M0 -25C11 -25 16 -12 0 0C-16 -12 -11 -25 0 -25Z', style: { fill: 'var(--m3p)' } }),
          h('path', { d: 'M0 -25C11 -25 16 -12 0 0C-16 -12 -11 -25 0 -25Z', style: { fill: 'var(--m3s)' }, transform: 'rotate(90)' }),
          h('path', { d: 'M0 -25C11 -25 16 -12 0 0C-16 -12 -11 -25 0 -25Z', style: { fill: 'var(--m3t)' }, transform: 'rotate(180)' }),
          h('path', { d: 'M0 -25C11 -25 16 -12 0 0C-16 -12 -11 -25 0 -25Z', style: { fill: 'var(--m3pc)' }, transform: 'rotate(270)' }),
          h('circle', { cx: 0, cy: 0, r: 5.5, style: { fill: 'var(--m3surf)' } })
        )
      );
    }

    function PalettePicker(props) {
      return h('div', {
        className: 'm3-palette' + (props.compact ? ' m3-palette--compact' : ''),
        role: 'group',
        'aria-label': translate('palette'),
      },
        SEEDS.map(function (seed) {
          const active = props.value === seed.id;
          return h('button', {
            key: seed.id,
            type: 'button',
            className: 'm3-swatch' + (active ? ' is-active' : ''),
            style: {
              '--m3-swatch-a': seed.swatch[0],
              '--m3-swatch-b': seed.swatch[1],
              '--m3-swatch-c': seed.swatch[2],
            },
            title: seedLabel(seed),
            'aria-label': seedLabel(seed),
            'aria-pressed': active,
            onClick: function () {
              props.onPick(seed.id);
            },
          },
            h('span', { className: 'm3-swatch__core' })
          );
        })
      );
    }

    function ToggleRow(props) {
      const on = props.value === 'on';
      return h('div', { className: 'm3-row' },
        h('div', { className: 'm3-row__text' },
          h('div', { className: 'm3-row__label' }, translate(props.label)),
          h('div', { className: 'm3-row__hint' }, translate(props.hint))
        ),
        h('button', {
          type: 'button',
          role: 'switch',
          className: 'm3-switch' + (on ? ' is-on' : ''),
          'aria-checked': on,
          'aria-label': translate(props.label),
          onClick: function () {
            props.onChange(on ? 'off' : 'on');
          },
        },
          h('span', { className: 'm3-switch__thumb' })
        )
      );
    }

    function SettingsSection() {
      const current = usePrefs();
      const seed = seedById(current.seed);
      return h('section', { className: 'm3-settings' },
        h('header', { className: 'm3-settings__head' },
          h('span', { className: 'm3-mark-wrap' }, h(Mark, { size: 32 })),
          h('div', null,
            h('h2', { className: 'm3-settings__title' }, translate('panel')),
            h('p', { className: 'm3-settings__hint' }, translate('panelHint'))
          )
        ),
        h('div', { className: 'm3-card' },
          h('div', { className: 'm3-card__head' },
            h('span', { className: 'm3-card__label' }, translate('color')),
            h('span', { className: 'm3-card__value' }, seedLabel(seed))
          ),
          h('p', { className: 'm3-card__hint' }, translate('colorHint')),
          h(PalettePicker, {
            value: current.seed,
            onPick: function (id) {
              setPrefs({ seed: id });
            },
          }),
          h('div', { className: 'm3-preview' },
            h('span', { className: 'm3-preview__tile', style: { background: 'var(--m3p)', color: 'var(--m3onp)' } }, 'Aa'),
            h('span', { className: 'm3-preview__tile', style: { background: 'var(--m3pc)', color: 'var(--m3onpc)' } }, 'Aa'),
            h('span', { className: 'm3-preview__tile', style: { background: 'var(--m3sc)', color: 'var(--m3onsc)' } }, 'Aa'),
            h('span', { className: 'm3-preview__tile', style: { background: 'var(--m3tc)', color: 'var(--m3ontc)' } }, 'Aa')
          )
        ),
        h('div', { className: 'm3-card' },
          h(ToggleRow, {
            label: 'motion',
            hint: 'motionHint',
            value: current.motion,
            onChange: function (value) {
              setPrefs({ motion: value });
            },
          }),
          h('div', { className: 'm3-divider' }),
          h(ToggleRow, {
            label: 'ambient',
            hint: 'ambientHint',
            value: current.ambient,
            onChange: function (value) {
              setPrefs({ ambient: value });
            },
          })
        ),
        h('div', { className: 'm3-settings__foot' },
          h('button', {
            type: 'button',
            className: 'm3-text-button',
            onClick: function () {
              setPrefs(DEFAULT_PREFS);
            },
          }, translate('reset'))
        )
      );
    }

    function HeroPalette() {
      const current = usePrefs();
      return h('div', { className: 'm3-hero-palette' },
        h('span', { className: 'm3-hero-palette__label' }, translate('panel')),
        h(PalettePicker, {
          compact: true,
          value: current.seed,
          onPick: function (id) {
            setPrefs({ seed: id });
          },
        })
      );
    }

    function SeedButton() {
      const current = usePrefs();
      const seed = seedById(current.seed);
      const label = translate('nextPalette') + ' · ' + seedLabel(seed);
      return h('button', {
        type: 'button',
        className: 'm3-seed-button',
        title: label,
        'aria-label': label,
        onClick: function () {
          let index = 0;
          for (let cursor = 0; cursor < SEEDS.length; cursor += 1) {
            if (SEEDS[cursor].id === current.seed) index = cursor;
          }
          setPrefs({ seed: SEEDS[(index + 1) % SEEDS.length].id });
        },
      },
        h('span', {
          className: 'm3-seed-button__ring',
          style: {
            '--m3-swatch-a': seed.swatch[0],
            '--m3-swatch-b': seed.swatch[1],
            '--m3-swatch-c': seed.swatch[2],
          },
        },
          h('span', { className: 'm3-seed-button__core' }, h(Mark, { size: 14 }))
        )
      );
    }

    function BrandMark() {
      return h('span', { className: 'm3-mark-wrap' }, h(Mark, { size: 32 }));
    }

    function HeroMark() {
      return h(Mark, { size: 48 });
    }

    /* ------------------------------------------------------------------ */
    /* DOM effects                                                        */
    /* ------------------------------------------------------------------ */

    function stamp() {
      const body = document.body;
      const root = document.documentElement;
      body.setAttribute('data-m3-skin', '');
      body.setAttribute('data-m3-seed', prefs.seed);
      body.setAttribute('data-m3-motion', prefs.motion);
      body.setAttribute('data-m3-ambient', prefs.ambient);
      body.setAttribute('data-m3-version', '2');
      if (root) {
        root.setAttribute('data-m3-skin', '');
        root.setAttribute('data-m3-version', '2');
      }
    }

    function unstamp() {
      const body = document.body;
      ['data-m3-skin', 'data-m3-seed', 'data-m3-motion', 'data-m3-ambient', 'data-m3-version'].forEach(function (name) {
        body.removeAttribute(name);
      });
      const root = document.documentElement;
      if (root) {
        root.removeAttribute('data-m3-skin');
        root.removeAttribute('data-m3-version');
      }
    }

    function installRipple() {
      const reduce = window.matchMedia ? window.matchMedia('(prefers-reduced-motion: reduce)') : null;
      const onPointerDown = function (event) {
        if (event.button !== 0) return;
        if (prefs.motion === 'off' || (reduce && reduce.matches)) return;
        const node = event.target;
        if (!node || !node.closest) return;
        const target = node.closest('button, [role=button], [role=tab], [role=option], [role=menuitem], [role=switch]');
        if (!target || target.disabled || target.getAttribute('aria-disabled') === 'true') return;
        const rect = target.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height) * 1.7;
        target.classList.add('m3-ripple-host');
        const ripple = document.createElement('span');
        ripple.className = 'm3-ripple';
        ripple.style.width = size + 'px';
        ripple.style.height = size + 'px';
        ripple.style.left = (event.clientX - rect.left) + 'px';
        ripple.style.top = (event.clientY - rect.top) + 'px';
        target.appendChild(ripple);
        const cleanup = function () {
          ripple.remove();
          target.classList.remove('m3-ripple-host');
        };
        ripple.addEventListener('animationend', cleanup, { once: true });
        window.setTimeout(cleanup, 900);
      };
      document.addEventListener('pointerdown', onPointerDown, true);
      return function () {
        document.removeEventListener('pointerdown', onPointerDown, true);
      };
    }

    /* ------------------------------------------------------------------ */
    /* Plugin                                                             */
    /* ------------------------------------------------------------------ */

    return {
      inject: ['slots', 'theme', 'locale'],
      apply(ctx) {
        ctx.effect(function () {
          return ctx.locale.register(NS, 'en', EN);
        }, 'material-you: en dictionary');
        ctx.effect(function () {
          return ctx.locale.register(NS, 'zh', ZH);
        }, 'material-you: zh dictionary');

        const t = ctx.locale.bind(NS);
        translate = function (key) {
          return t(key);
        };

        let tokenDispose = null;
        applyTokens = function () {
          const next = ctx.theme.overrideTokens(PKG, tokenPairs(prefs.seed));
          if (tokenDispose) tokenDispose();
          tokenDispose = next;
        };
        stampBody = stamp;

        ctx.effect(function () {
          applyTokens();
          return function () {
            if (tokenDispose) {
              tokenDispose();
              tokenDispose = null;
            }
          };
        }, 'material-you: token layer');

        ctx.effect(function () {
          const tag = document.createElement('style');
          tag.id = 'material-you-skin';
          tag.dataset.plugin = PKG;
          tag.dataset.pluginCss = PKG + '/skin.css';
          tag.dataset.pluginVersion = '1';
          tag.textContent = CSS;
          document.head.appendChild(tag);
          stamp();
          return function () {
            tag.remove();
            unstamp();
          };
        }, 'material-you: stylesheet and body state');

        ctx.effect(function () {
          return installRipple();
        }, 'material-you: pointer ripple');

        ctx.slots.inject('settings.section', function () {
          return ctx.slots.register({
            name: 'settings.section',
            id: 'material-you',
            order: 95,
            label: function () {
              return t('panel');
            },
            locale: NS,
          }, SettingsSection);
        });

        ctx.slots.inject('conversation.hero.options', function () {
          return ctx.slots.register({
            name: 'conversation.hero.options',
            id: 'material-you-palette',
            order: 10,
            locale: NS,
          }, HeroPalette);
        });

        ctx.slots.inject('conversation.input.right', function () {
          return ctx.slots.register({
            name: 'conversation.input.right',
            id: 'material-you-seed',
            order: 40,
            locale: NS,
          }, SeedButton);
        });

        ctx.slots.inject('sidebar.brand.mark', function () {
          return ctx.slots.register({ name: 'sidebar.brand.mark' }, BrandMark);
        });

        ctx.slots.inject('conversation.hero.brand.mark', function () {
          return ctx.slots.register({ name: 'conversation.hero.brand.mark' }, HeroMark);
        });
      },
    };
  },
});