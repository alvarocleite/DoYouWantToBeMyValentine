/**
 * CLEAN ARCHITECTURE IMPLEMENTATION
 * 
 * Layer 1: Domain (Entities & Business Rules)
 * Layer 2: Adapters (Gateways & Presenters)
 * Layer 3: Frameworks & Drivers (DOM & Browser APIs)
 */

// --- Layer 1: Domain (Entities) ---
const THEMES = {
    VALENTINE: 'valentine',
    MARRY: 'marry'
};

const PARAMS = {
    NAME: 'name',
    TYPE: 'type'
};

const DEFAULTS = {
    NAME: 'Sweetheart',
    TYPE: THEMES.VALENTINE
};

// --- Layer 1: Domain (Business Rules / Game Logic) ---
const GAME_CONFIG = {
    GROWTH_THRESHOLD: 6,
    GROWTH_RATE: 0.05,
    PROXIMITY_THRESHOLD: 100,
    SAFE_PADDING: 20,
    MIN_DISTANCE_PERCENT: 0.6,
    MAX_DISTANCE_PX: 500,
    MAX_SEARCH_ATTEMPTS: 100
};

const GameRules = {
    calculateScale(moveCount) {
        if (moveCount <= GAME_CONFIG.GROWTH_THRESHOLD) return 1;
        return 1 + (moveCount - GAME_CONFIG.GROWTH_THRESHOLD) * GAME_CONFIG.GROWTH_RATE;
    },

    findBestPosition(cursor, btnSize, viewport) {
        const padding = GAME_CONFIG.SAFE_PADDING;
        const limits = {
            maxLeft: viewport.w - btnSize.w - padding,
            maxTop: viewport.h - btnSize.h - padding
        };

        const minRequiredDist = Math.min(
            GAME_CONFIG.MAX_DISTANCE_PX, 
            Math.min(viewport.w, viewport.h) * GAME_CONFIG.MIN_DISTANCE_PERCENT
        );

        let bestPos = { left: padding, top: padding };
        let maxFoundDist = -1;

        for (let i = 0; i < GAME_CONFIG.MAX_SEARCH_ATTEMPTS; i++) {
            const tempLeft = Math.max(padding, Math.random() * limits.maxLeft);
            const tempTop = Math.max(padding, Math.random() * limits.maxTop);
            
            let dist;
            if (cursor.x !== undefined && cursor.y !== undefined) {
                const centerX = tempLeft + btnSize.w / 2;
                const centerY = tempTop + btnSize.h / 2;
                dist = Math.hypot(centerX - cursor.x, centerY - cursor.y);
            } else {
                dist = minRequiredDist + 1;
            }

            if (dist > maxFoundDist) {
                maxFoundDist = dist;
                bestPos = { left: tempLeft, top: tempTop };
            }

            if (maxFoundDist >= minRequiredDist) break;
        }

        return bestPos;
    }
};

// --- Layer 2: Adapters (Gateways) ---

const UrlGateway = {
    getParams() {
        const searchParams = new URLSearchParams(window.location.search);
        return {
            name: searchParams.get(PARAMS.NAME) || DEFAULTS.NAME,
            type: searchParams.get(PARAMS.TYPE) || DEFAULTS.TYPE,
            raw: searchParams
        };
    },

    createUrl(base, params) {
        const queryString = params.toString();
        return queryString ? `${base}?${queryString}` : base;
    }
};

// --- Layer 2: Adapters (Presenters) ---

const ProposalPresenter = {
    getQuestionText(name, type) {
        return type === THEMES.MARRY 
            ? `${name}, Will You Marry Me?` 
            : `${name}, Do You Want to Be My Valentine?`;
    },

    getThemeClass(type) {
        return type === THEMES.MARRY ? 'theme-marry' : '';
    }
};

// --- Layer 3: Frameworks & Drivers (View) ---

const ViewManager = {
    applyTheme(type) {
        const themeClass = ProposalPresenter.getThemeClass(type);
        document.body.classList.remove('theme-marry'); 
        if (themeClass) document.body.classList.add(themeClass);
    },

    updateText(selector, text) {
        const el = document.querySelector(selector);
        if (el) el.innerText = text;
    },

    setElementPosition(el, left, top) {
        if (!el) return;
        el.style.position = 'fixed';
        el.style.left = `${left}px`;
        el.style.top = `${top}px`;
    },

    setElementScale(el, scale) {
        if (!el) return;
        el.style.transform = `scale(${scale})`;
        el.style.transition = 'transform 0.2s ease';
    },

    preserveParamsInLinks(searchParams) {
        const linkIds = ['instructions-link', 'creator-link', 'back-link', 'home-link'];
        linkIds.forEach(id => {
            const el = document.getElementById(id);
            if (el && el.tagName === 'A') {
                const baseHref = el.getAttribute('href').split('?')[0];
                el.href = UrlGateway.createUrl(baseHref, searchParams);
            }
        });
    }
};

// --- Application (Use Cases) ---

const PageInitializer = {
    run() {
        const params = UrlGateway.getParams();
        ViewManager.applyTheme(params.type);
        ViewManager.preserveParamsInLinks(params.raw);
        return params;
    }
};
