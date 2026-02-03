(function () {
  if (typeof window === 'undefined' || typeof document === 'undefined') {
    return;
  }

  var SCRIPT_DATA_WIDGET = 'cavbot-widget';
  var WIDGET_ROOT_ID = 'cavbot-widget-root';
  var CSS_PATHS = {
    badge: {
      inline: '/sdk/ui/v1/cavbot-badge-inline.css',
      ring: '/sdk/ui/v1/cavbot-badge-ring.css'
    },
    head: {
      orbit: '/sdk/ui/v1/cavbot-head-orbit.css'
    },
    body: {
      full: '/sdk/ui/v1/cavbot-full-body.css'
    }
  };
  var SNIPPETS = {
    badge: [
      '<div class="cavbot-dm-avatar" data-cavbot-head="dm">',
      '  <div class="cavbot-dm-avatar-core">',
      '    <div class="cavbot-dm-face">',
      '      <div class="cavbot-eyes-row">',
      '        <div class="cavbot-eye">',
      '          <div class="cavbot-eye-inner">',
      '            <div class="cavbot-eye-pupil"></div>',
      '          </div>',
      '          <div class="cavbot-eye-glow"></div>',
      '          <div class="cavbot-blink"></div>',
      '        </div>',
      '',
      '        <div class="cavbot-eye">',
      '          <div class="cavbot-eye-inner">',
      '            <div class="cavbot-eye-pupil"></div>',
      '          </div>',
      '          <div class="cavbot-eye-glow"></div>',
      '          <div class="cavbot-blink"></div>',
      '        </div>',
      '      </div>',
      '    </div>',
      '  </div>',
      '</div>'
    ].join('\n'),
    head: [
      '<!-- CavBot Head Only — Floating avatar with eye tracking -->',
      '<div class="cavbot-head-avatar" data-cavbot-head>',
      '  <div class="cavbot-head-avatar-inner">',
      '    <div class="cavbot-antenna">',
      '      <div class="cavbot-antenna-tip"></div>',
      '    </div>',
      '',
      '    <div class="cavbot-head">',
      '      <div class="cavbot-face">',
      '       <div class="cavbot-eyes-row">',
      '  <div class="cavbot-eye">',
      '    <div class="cavbot-eye-inner">',
      '      <div class="cavbot-eye-track">',
      '        <div class="cavbot-eye-pupil"></div>',
      '      </div>',
      '    </div>',
      '    <div class="cavbot-eye-glow"></div>',
      '    <div class="cavbot-blink"></div>',
      '  </div>',
      '',
      '  <div class="cavbot-eye">',
      '    <div class="cavbot-eye-inner">',
      '      <div class="cavbot-eye-track">',
      '        <div class="cavbot-eye-pupil"></div>',
      '      </div>',
      '    </div>',
      '    <div class="cavbot-eye-glow"></div>',
      '    <div class="cavbot-blink"></div>',
      '  </div>',
      '</div>',
      '',
      '        <div class="cavbot-scan" aria-hidden="true">',
      '          <div class="cavbot-scan-bar"></div>',
      '          <div class="cavbot-scan-dots">',
      '            <span>CAV</span>',
      '            <span>BOT</span>',
      '            <span>404</span>',
      '          </div>',
      '        </div>',
      '      </div>',
      '    </div>',
      '  </div>',
      '</div>'
    ].join('\n'),
    body: [
      '<div class="cavbot-shell">',
      '  <div class="cavbot-orbit">',
      '    <div class="cavbot">',
      '      <div class="cavbot-inner">',
      '        <div class="cavbot-antenna">',
      '          <div class="cavbot-antenna-tip"></div>',
      '        </div>',
      '',
      '        <div class="cavbot-head">',
      '          <div class="cavbot-face">',
      '           <div class="cavbot-eyes-row">',
      '  <div class="cavbot-eye">',
      '    <div class="cavbot-eye-inner">',
      '      <div class="cavbot-eye-track">',
      '        <div class="cavbot-eye-pupil"></div>',
      '      </div>',
      '    </div>',
      '    <div class="cavbot-eye-glow"></div>',
      '    <div class="cavbot-blink"></div>',
      '  </div>',
      '',
      '  <div class="cavbot-eye">',
      '    <div class="cavbot-eye-inner">',
      '      <div class="cavbot-eye-track">',
      '        <div class="cavbot-eye-pupil"></div>',
      '      </div>',
      '    </div>',
      '    <div class="cavbot-eye-glow"></div>',
      '    <div class="cavbot-blink"></div>',
      '  </div>',
      '</div>',
      '',
      '            <div class="cavbot-scan" aria-hidden="true">',
      '              <div class="cavbot-scan-bar"></div>',
      '              <div class="cavbot-scan-dots">',
      '                <span>CAV</span>',
      '                <span>BOT</span>',
      '                <span>404</span>',
      '              </div>',
      '            </div>',
      '          </div>',
      '        </div>',
      '',
      '        <div class="cavbot-body">',
      '          <div class="cavbot-body-core">',
      '            <div class="cavbot-body-top">',
      '              <div class="cavbot-led-row">',
      '                <div class="cavbot-led cavbot-led--blue"></div>',
      '                <div class="cavbot-led cavbot-led--lime"></div>',
      '                <div class="cavbot-led cavbot-led--purple"></div>',
      '              </div>',
      '              <div class="cavbot-body-label-main">CavBot</div>',
      '            </div>',
      '',
      '            <div class="cavbot-body-mid">',
      '              <div class="cavbot-body-meter-track">',
      '                <div class="cavbot-body-meter-fill"></div>',
      '              </div>',
      '            </div>',
      '          </div>',
      '        </div>',
      '',
      '        <div class="cavbot-base">',
      '          <div class="cavbot-foot"></div>',
      '          <div class="cavbot-foot"></div>',
      '          <div class="cavbot-shadow"></div>',
      '        </div>',
      '      </div>',
      '    </div>',
      '  </div>',
      '</div>'
    ].join('\n')
  };
  var STYLE_OPTIONS = {
    badge: ['inline', 'ring'],
    head: ['orbit'],
    body: ['full']
  };
  var POSITION_OPTIONS = [
    'bottom-right',
    'bottom-left',
    'top-right',
    'top-left',
    'center',
    'center-left',
    'center-right',
    'inline'
  ];
  var DEFAULTS = {
    widget: 'badge',
    style: 'inline',
    position: 'bottom-right',
    theme: 'auto',
    motion: '0',
    zIndex: 9999,
    debug: '0'
  };
  var POSITION_STYLES = {
    'bottom-right': {
      position: 'fixed',
      bottom: '24px',
      right: '24px'
    },
    'bottom-left': {
      position: 'fixed',
      bottom: '24px',
      left: '24px'
    },
    'top-right': {
      position: 'fixed',
      top: '24px',
      right: '24px'
    },
    'top-left': {
      position: 'fixed',
      top: '24px',
      left: '24px'
    },
    center: {
      position: 'fixed',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)'
    },
    'center-left': {
      position: 'fixed',
      top: '50%',
      left: '24px',
      transform: 'translateY(-50%)'
    },
    'center-right': {
      position: 'fixed',
      top: '50%',
      right: '24px',
      transform: 'translateY(-50%)'
    },
    inline: null
  };

  function safeString(value) {
    return typeof value === 'string' ? value.trim() : '';
  }

  function normalizeWidget(value) {
    var normalized = safeString(value).toLowerCase();
    return SNIPPETS[normalized] ? normalized : DEFAULTS.widget;
  }

  function normalizeStyle(widget, value) {
    var normalized = safeString(value).toLowerCase();
    var validStyles = STYLE_OPTIONS[widget];
    if (!validStyles) {
      return DEFAULTS.style;
    }
    return validStyles.indexOf(normalized) !== -1 ? normalized : validStyles[0];
  }

  function normalizePosition(value) {
    var normalized = safeString(value).toLowerCase();
    return POSITION_OPTIONS.indexOf(normalized) !== -1 ? normalized : DEFAULTS.position;
  }

  function normalizeTheme(value) {
    var normalized = safeString(value).toLowerCase();
    return normalized === 'light' || normalized === 'dark' ? normalized : DEFAULTS.theme;
  }

  function normalizeNumber(value, fallback) {
    var parsed = parseInt(value, 10);
    if (!isNaN(parsed)) {
      return parsed;
    }
    return fallback;
  }

  function getScriptElement() {
    if (document.currentScript) {
      return document.currentScript;
    }
    var scripts = document.getElementsByTagName('script');
    for (var i = scripts.length - 1; i >= 0; i--) {
      var candidate = scripts[i];
      if (!candidate) {
        continue;
      }
      var dataset = candidate.dataset;
      if (dataset && dataset[SCRIPT_DATA_WIDGET]) {
        return candidate;
      }
      var src = candidate.getAttribute('src');
      if (src && src.indexOf('cavbot-widget') !== -1) {
        return candidate;
      }
    }
    return null;
  }

  function readAttribute(script, name) {
    if (!script || !script.getAttribute) {
      return '';
    }
    var dataName = 'data-' + name;
    var value = script.getAttribute(dataName);
    if (value !== null) {
      return value;
    }
    if (script.dataset) {
      if (script.dataset[name]) {
        return script.dataset[name];
      }
      var camelName = name.replace(/-([a-z])/g, function (_, letter) {
        return letter.toUpperCase();
      });
      if (camelName !== name && script.dataset[camelName]) {
        return script.dataset[camelName];
      }
    }
    return '';
  }

  function resolveUrl(path, baseOrigin) {
    if (!path) {
      return '';
    }
    if (path.indexOf('http://') === 0 || path.indexOf('https://') === 0) {
      return path;
    }
    var base = baseOrigin;
    if (!base) {
      base = document.location.protocol + '//' + document.location.host;
    }
    if (base.slice(-1) === '/') {
      base = base.slice(0, -1);
    }
    if (path.charAt(0) !== '/') {
      path = '/' + path;
    }
    return base + path;
  }

  function buildBaseOrigin(script) {
    if (!script) {
      return document.location.protocol + '//' + document.location.host;
    }
    try {
      var src = script.getAttribute('src');
      if (src) {
        var parsed = new window.URL(src, document.location.href);
        return parsed.origin;
      }
    } catch (error) {
      // fall through
    }
    return document.location.protocol + '//' + document.location.host;
  }

  function ensureCssInjection(href) {
    if (!href) {
      return;
    }
    var cssCache = window.__cavbotWidgetCssLoaded;
    if (!cssCache) {
      cssCache = [];
      window.__cavbotWidgetCssLoaded = cssCache;
    }
    if (cssCache.indexOf(href) !== -1) {
      return;
    }
    cssCache.push(href);
    var head = document.head || document.getElementsByTagName('head')[0];
    if (!head) {
      return;
    }
    var link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = href;
    link.crossOrigin = 'anonymous';
    head.appendChild(link);
  }

  function getPositionStyles(position) {
    return POSITION_STYLES.hasOwnProperty(position) ? POSITION_STYLES[position] : POSITION_STYLES[DEFAULTS.position];
  }

  function applyRootPosition(root, position) {
    var styles = getPositionStyles(position);
    if (!styles) {
      return;
    }
    for (var key in styles) {
      if (styles.hasOwnProperty(key)) {
        root.style[key] = styles[key];
      }
    }
  }

  function debugLog(enabled) {
    if (!enabled || typeof window.console === 'undefined') {
      return function () {};
    }
    return function () {
      var args = Array.prototype.slice.call(arguments);
      args.unshift('[CavBot widget]');
      window.console.debug.apply(window.console, args);
    };
  }

  function createRootElement(config, snippet) {
    var root = document.createElement('div');
    root.id = WIDGET_ROOT_ID;
    root.className = 'cavbot-widget-root cavbot-widget-position cavbot-widget-position-' + config.position;
    root.setAttribute('aria-label', 'CavBot widget');
    root.setAttribute('role', 'region');
    root.setAttribute('data-theme', config.theme);
    root.setAttribute('data-widget', config.widget);
    root.setAttribute('data-position', config.position);
    root.setAttribute('data-motion', config.motionEnabled ? '1' : '0');
    root.dataset.motion = config.motionEnabled ? '1' : '0';
    root.tabIndex = 0;
    if (config.theme === 'auto') {
      root.className += ' cavbot-widget-theme-auto';
    }
    if (snippet) {
      root.innerHTML = snippet;
    }
    var zIndex = config.zIndex;
    if (typeof zIndex === 'number') {
      root.style.zIndex = String(zIndex);
    }
    if (config.position !== 'inline') {
      applyRootPosition(root, config.position);
    }
    return root;
  }

  function mountRoot(root, config, script) {
    if (!root) {
      return;
    }
    if (config.position === 'inline' && script && script.parentNode) {
      script.parentNode.insertBefore(root, script);
      return;
    }
    var target = document.body || document.documentElement;
    if (target) {
      target.appendChild(root);
    }
  }

  function onReady(callback) {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', function handler() {
        document.removeEventListener('DOMContentLoaded', handler);
        callback();
      });
      return;
    }
    callback();
  }

  function shouldRespectReducedMotion() {
    if (typeof window.matchMedia !== 'function') {
      return false;
    }
    try {
      return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    } catch (error) {
      return false;
    }
  }

  function shouldLoadBrain(config, motionRequested) {
    if (!config) return false;
    if (config.widget === 'head' || config.widget === 'body') return true;
    return motionRequested;
  }

  function resolveConfigOrigin(script) {
    var attr = readAttribute(script, 'config-origin');
    if (attr) return attr;
    if (window && window.CAVBOT_APP_ORIGIN) return window.CAVBOT_APP_ORIGIN;
    return 'https://app.cavbot.io';
  }

  function fetchWidgetConfig(configOrigin, config, projectKey, siteId) {
    var params = new URLSearchParams({
      widget: config.widget,
      style: config.style,
      position: config.position,
      theme: config.theme
    });
    var trimmedOrigin = configOrigin.replace(/\/+$/, '');
    var url = trimmedOrigin + '/api/embed/widget/config?' + params.toString();
    return fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-cavbot-project-key': projectKey,
        'x-project-key': projectKey,
        'x-cavbot-site': siteId,
      },
      cache: 'no-store'
    }).then(function (response) {
      if (!response.ok) {
        return response.text().then(function (raw) {
          var payload = null;
          try {
            payload = JSON.parse(raw || '');
          } catch (error) {
            payload = null;
          }
          var code = payload && payload.code ? payload.code : 'WIDGET_DENIED';
          throw new Error(code);
        });
      }
      return response.json();
    });
  }

  function applyResolvedConfig(resolved, config, script, baseOrigin, log, motionRequested, motionEnabled) {
    if (!resolved) return;
    if (document.getElementById(WIDGET_ROOT_ID)) {
      log('Widget already mounted; aborting duplicate initialization.');
      return;
    }
    var cssPath =
      CSS_PATHS[resolved.widget] && CSS_PATHS[resolved.widget][resolved.style];
    if (cssPath) {
      ensureCssInjection(resolveUrl(cssPath, baseOrigin));
    }
    var snippet = SNIPPETS[resolved.widget] || SNIPPETS[config.widget];
    var root = createRootElement(
      {
        widget: resolved.widget,
        position: resolved.position,
        theme: resolved.theme,
        zIndex: typeof resolved.zIndex === 'number' ? resolved.zIndex : config.zIndex,
        motionEnabled: motionEnabled
      },
      snippet
    );
    onReady(function () {
      mountRoot(root, { position: resolved.position }, script);
    });
    if (shouldLoadBrain(resolved, motionRequested)) {
      loadBrainScript(baseOrigin);
    }
  }

  function loadBrainScript(baseOrigin) {
    if (!document) {
      return;
    }
    if (window.__cavaiGen1Loaded) {
      return;
    }
    if (window.__cavaiGen1Loading) {
      return;
    }
    var script = document.createElement('script');
    var brainPath = '/sdk/brain/v1/cavai.min.js';
    script.async = true;
    script.defer = true;
    script.src = resolveUrl(brainPath, baseOrigin);
    window.__cavaiGen1Loading = true;
    script.onload = function () {
      window.__cavaiGen1Loaded = true;
    };
    script.onerror = function () {
      window.__cavaiGen1Loading = false;
    };
    var parent = document.head || document.body || document.documentElement;
    if (parent) {
      parent.appendChild(script);
    }
  }

  function run() {
    var script = getScriptElement();
    var debugFlag = readAttribute(script, 'debug');
    var debug = debugFlag === '1' || debugFlag === 'true';
    var log = debugLog(debug);
    var config = {
      widget: normalizeWidget(readAttribute(script, SCRIPT_DATA_WIDGET) || DEFAULTS.widget),
      style: DEFAULTS.style,
      position: DEFAULTS.position,
      theme: DEFAULTS.theme,
      zIndex: DEFAULTS.zIndex,
      motionRequested: false,
      motionEnabled: false
    };
    config.style = normalizeStyle(config.widget, readAttribute(script, 'style') || DEFAULTS.style);
    config.position = normalizePosition(readAttribute(script, 'position') || DEFAULTS.position);
    config.theme = normalizeTheme(readAttribute(script, 'theme') || DEFAULTS.theme);
    config.zIndex = normalizeNumber(readAttribute(script, 'z'), DEFAULTS.zIndex);
    var motionValue = safeString(readAttribute(script, 'motion'));
    config.motionRequested = motionValue === '1' || motionValue === 'true';
    var reducedMotion = shouldRespectReducedMotion();
    var motionEnabled = config.motionRequested && !reducedMotion;
    var baseOrigin = buildBaseOrigin(script);
    var projectKey = safeString(readAttribute(script, 'project-key'));
    var siteId = safeString(readAttribute(script, 'site'));
    if (!projectKey || !siteId) {
      if (debug) log('Widget missing project key or site identifier; aborting initialization.');
      return;
    }
    var configOrigin = resolveConfigOrigin(script);
    return fetchWidgetConfig(configOrigin, config, projectKey, siteId)
      .then(function (body) {
        if (!body || body.allowed !== true || !body.config) {
          throw new Error(body && body.code ? body.code : 'WIDGET_DENIED');
        }
        applyResolvedConfig(
          body.config,
          config,
          script,
          baseOrigin,
          log,
          config.motionRequested,
          motionEnabled
        );
      })
      .catch(function (error) {
        if (debug) {
          log('Widget initialization blocked:', error && error.message ? error.message : error);
        }
      });
  }

  try {
    var handleInitError = function (error) {
      if (typeof window.console !== 'undefined' && window.console.error) {
        window.console.error('[CavBot widget] Initialization failed', error);
      }
    };
    var promise = run();
    if (promise && typeof promise.catch === 'function') {
      promise.catch(handleInitError);
    }
  } catch (error) {
    if (typeof window.console !== 'undefined' && window.console.error) {
      window.console.error('[CavBot widget] Initialization failed', error);
    }
  }
})();
