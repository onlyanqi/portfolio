// ===== Theme Manager =====
class ThemeManager {
    constructor() {
        this.currentTheme = 'day';
        this.storageKey = 'portfolio-theme-preference';
        this.init();
    }

    init() {
        // Load saved preference or default to day mode
        this.loadSavedTheme();
        // Apply initial theme
        this.applyTheme(this.currentTheme);
        // Set up event listeners for theme changes
        this.setupEventListeners();
    }

    loadSavedTheme() {
        try {
            const savedTheme = localStorage.getItem(this.storageKey);
            if (savedTheme && (savedTheme === 'day' || savedTheme === 'night')) {
                this.currentTheme = savedTheme;
            }
        } catch (error) {
            console.warn('Could not access localStorage for theme preference:', error);
            // Fallback to day mode if localStorage is unavailable
            this.currentTheme = 'day';
        }
    }

    toggleTheme() {
        // Switch between day and night modes
        this.currentTheme = this.currentTheme === 'day' ? 'night' : 'day';
        
        // Apply the new theme
        this.applyTheme(this.currentTheme);
        
        // Save preference
        this.saveThemePreference();
        
        // Trigger content adaptation
        this.triggerContentAdaptation();
    }

    applyTheme(theme) {
        const body = document.body;
        const html = document.documentElement;
        
        // Remove existing theme classes
        body.classList.remove('theme-day', 'theme-night');
        html.classList.remove('theme-day', 'theme-night');
        
        // Apply new theme class
        const themeClass = `theme-${theme}`;
        body.classList.add(themeClass);
        html.classList.add(themeClass);
        
        // Update current theme
        this.currentTheme = theme;
        
        // Update toggle switch state if it exists
        this.updateToggleState();
        
        // Trigger transition animations
        this.triggerTransitionAnimations();
    }

    saveThemePreference() {
        try {
            localStorage.setItem(this.storageKey, this.currentTheme);
        } catch (error) {
            console.warn('Could not save theme preference to localStorage:', error);
        }
    }

    setupEventListeners() {
        // Listen for toggle switch clicks
        document.addEventListener('click', (event) => {
            if (event.target.matches('.theme-toggle, .theme-toggle *')) {
                event.preventDefault();
                this.handleToggleInteraction(event);
            }
        });

        // Listen for keyboard events for accessibility
        document.addEventListener('keydown', (event) => {
            const toggleElement = document.querySelector('.theme-toggle');
            if (toggleElement && document.activeElement === toggleElement) {
                if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault();
                    this.handleToggleInteraction(event);
                }
            }
        });
    }

    updateToggleState() {
        const toggleElement = document.querySelector('.theme-toggle');
        if (toggleElement) {
            // Update ARIA attributes for accessibility
            toggleElement.setAttribute('aria-pressed', String(this.currentTheme === 'night'));
            toggleElement.setAttribute('aria-label', 
                `Switch to ${this.currentTheme === 'day' ? 'night' : 'day'} mode`);
        }
    }

    handleToggleInteraction(event) {
        // Add visual feedback for the interaction
        this.addInteractionFeedback(event);
        
        // Perform the theme toggle
        this.toggleTheme();
    }

    addInteractionFeedback(event) {
        const toggleElement = document.querySelector('.theme-toggle');
        if (toggleElement) {
            // Add a temporary class for interaction feedback
            toggleElement.classList.add('toggle-active');
            
            // Remove the class after a short duration
            setTimeout(() => {
                toggleElement.classList.remove('toggle-active');
            }, 150);
        }
    }

    triggerTransitionAnimations() {
        // Add transition class to body for smooth animations
        document.body.classList.add('theme-transitioning');
        
        // Remove transition class after animation completes
        setTimeout(() => {
            document.body.classList.remove('theme-transitioning');
        }, 400); // Match --transition-duration from CSS
    }

    triggerContentAdaptation() {
        // Dispatch custom event for content adaptation (will be used by ContentAdapter)
        const themeChangeEvent = new CustomEvent('themeChanged', {
            detail: {
                theme: this.currentTheme,
                previousTheme: this.currentTheme === 'day' ? 'night' : 'day'
            }
        });
        document.dispatchEvent(themeChangeEvent);
    }

    // Public method to get current theme
    getCurrentTheme() {
        return this.currentTheme;
    }

    // Public method to check if theme is night mode
    isNightMode() {
        return this.currentTheme === 'night';
    }

    // Public method to check if theme is day mode
    isDayMode() {
        return this.currentTheme === 'day';
    }
}

// ===== Content Adapter =====
class ContentAdapter {
    constructor() {
        this.currentTheme = 'day';
        this.isTransitioning = false;
        this.transitionDuration = 300; // milliseconds
        this.staggerDelay = 50; // milliseconds between element transitions
        
        // Define content variants for each section
        this.contentVariants = {
            day: {
                intro: {
                    title: "DIGITAL",
                    typewriterPhrases: [
                        'Hello, I\'m a creative developer.',
                        'I craft visual experiences.',
                        'Welcome to my digital playground.'
                    ],
                    subtext: "Visual experiments and interactive design — somewhere between <strong>imagination</strong> and <strong>pixels</strong>.",
                    buttonText: "SEE WHAT I'M CREATING",
                    focus: "visual-experiments"
                },
                about: {
                    headline: "I enjoy building digital spaces that feel calm, gentle, and slightly <span class=\"accent-text\">unexpected.</span>",
                    subheadline: "Minimal on the surface, thoughtful underneath.",
                    columns: [
                        {
                            title: "THE INFLUENCE",
                            text: "Inspired by soft symmetry, pastel worlds, quiet music, and stories that unfold slowly. I'm drawn to things that don't ask for attention — but reward it."
                        },
                        {
                            title: "THE INTENTION", 
                            text: "This space isn't a showcase of finished work. It's a collection of ideas, experiments, and moments I care about."
                        }
                    ],
                    personality: "playful",
                    emphasis: "visual-design"
                }
            },
            night: {
                intro: {
                    title: "SYSTEMS",
                    typewriterPhrases: [
                        'Hello, I\'m a systems architect.',
                        'I build scalable infrastructure.',
                        'Welcome to my technical workshop.'
                    ],
                    subtext: "Robust architecture and performance optimization — somewhere between <strong>algorithms</strong> and <strong>infrastructure</strong>.",
                    buttonText: "EXPLORE MY TECHNICAL WORK",
                    focus: "technical-depth"
                },
                about: {
                    headline: "I focus on building systems that are reliable, performant, and elegantly <span class=\"accent-text\">architected.</span>",
                    subheadline: "Simple interfaces, complex engineering underneath.",
                    columns: [
                        {
                            title: "THE APPROACH",
                            text: "Driven by clean code principles, scalable design patterns, and performance optimization. I believe great systems should be invisible to users but robust under the hood."
                        },
                        {
                            title: "THE PHILOSOPHY",
                            text: "This space showcases technical depth, architectural decisions, and the reasoning behind complex systems. Every line of code has a purpose."
                        }
                    ],
                    personality: "analytical",
                    emphasis: "backend-systems"
                }
            }
        };
        
        this.init();
    }

    init() {
        // Listen for theme change events from ThemeManager
        document.addEventListener('themeChanged', (event) => {
            this.handleThemeChange(event.detail.theme);
        });
        
        // Set initial content based on current theme
        setTimeout(() => {
            if (window.themeManager) {
                this.currentTheme = window.themeManager.getCurrentTheme();
            }
        }, 50);
    }

    handleThemeChange(newTheme) {
        if (this.isTransitioning || newTheme === this.currentTheme) {
            return;
        }
        
        this.isTransitioning = true;
        this.currentTheme = newTheme;
        
        // Adapt content with smooth transitions
        this.adaptContent(newTheme);
    }

    adaptContent(theme) {
        const content = this.contentVariants[theme];
        
        if (!content) {
            console.warn(`No content variant found for theme: ${theme}`);
            this.isTransitioning = false;
            return;
        }

        // Adapt each section with staggered animations
        const sections = ['intro', 'about'];
        
        sections.forEach((section, index) => {
            setTimeout(() => {
                this.adaptSection(section, content[section], theme);
                
                // Mark transition as complete after last section
                if (index === sections.length - 1) {
                    setTimeout(() => {
                        this.isTransitioning = false;
                    }, this.transitionDuration);
                }
            }, index * this.staggerDelay);
        });
    }

    adaptSection(sectionName, sectionContent, theme) {
        switch (sectionName) {
            case 'intro':
                this.adaptIntroSection(sectionContent, theme);
                break;
            case 'about':
                this.adaptAboutSection(sectionContent, theme);
                break;
        }
    }

    adaptIntroSection(content, theme) {
        const section = document.getElementById('intro');
        if (!section) return;

        // Update main title with fade transition
        const titleElement = section.querySelector('.intro-title');
        if (titleElement) {
            this.fadeTransition(titleElement, () => {
                titleElement.textContent = content.title;
            });
        }

        // Update typewriter phrases (will take effect on next cycle)
        if (window.typewriterPhrases) {
            window.typewriterPhrases = content.typewriterPhrases;
        }

        // Update subtext
        const subtextElement = section.querySelector('.intro-subtext');
        if (subtextElement) {
            this.fadeTransition(subtextElement, () => {
                subtextElement.innerHTML = content.subtext;
            });
        }

        // Update button text
        const buttonElement = section.querySelector('.discover-btn span:last-child');
        if (buttonElement) {
            this.fadeTransition(buttonElement, () => {
                buttonElement.textContent = content.buttonText;
            });
        }
    }

    adaptAboutSection(content, theme) {
        const section = document.getElementById('about');
        if (!section) return;

        // Update headline
        const headlineElement = section.querySelector('.mindset-headline');
        if (headlineElement) {
            this.fadeTransition(headlineElement, () => {
                headlineElement.innerHTML = content.headline;
            });
        }

        // Update subheadline
        const subheadlineElement = section.querySelector('.mindset-subheadline');
        if (subheadlineElement) {
            this.fadeTransition(subheadlineElement, () => {
                subheadlineElement.textContent = content.subheadline;
            });
        }

        // Update columns
        const columns = section.querySelectorAll('.column');
        content.columns.forEach((columnContent, index) => {
            if (columns[index]) {
                const titleElement = columns[index].querySelector('.column-title');
                const textElement = columns[index].querySelector('.column-text');
                
                if (titleElement) {
                    this.fadeTransition(titleElement, () => {
                        titleElement.textContent = columnContent.title;
                    });
                }
                
                if (textElement) {
                    this.fadeTransition(textElement, () => {
                        textElement.textContent = columnContent.text;
                    });
                }
            }
        });

        // Update section styling based on personality
        section.classList.remove('personality-playful', 'personality-analytical');
        section.classList.add(`personality-${content.personality}`);
    }

    fadeTransition(element, updateCallback) {
        if (!element) return;

        // Add transition class for smooth animation
        element.style.transition = `opacity ${this.transitionDuration}ms ease-out, transform ${this.transitionDuration}ms ease-out`;
        
        // Fade out
        element.style.opacity = '0';
        element.style.transform = 'translateY(10px)';
        
        // Update content and fade in
        setTimeout(() => {
            updateCallback();
            
            // Fade in
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
            
            // Clean up transition styles
            setTimeout(() => {
                element.style.transition = '';
            }, this.transitionDuration);
        }, this.transitionDuration / 2);
    }

    // Public methods for external access
    getCurrentTheme() {
        return this.currentTheme;
    }

    getContentVariant(theme, section) {
        return this.contentVariants[theme]?.[section] || null;
    }

    isCurrentlyTransitioning() {
        return this.isTransitioning;
    }

    // Method to manually trigger content adaptation (for testing)
    forceAdaptContent(theme) {
        if (this.contentVariants[theme]) {
            this.handleThemeChange(theme);
        }
    }
}

// ===== Hint System =====
class HintSystem {
    constructor() {
        this.storageKey = 'portfolio-hint-shown';
        this.hasShownHint = localStorage.getItem(this.storageKey) === 'true';
        this.hintElement = null;
        this.displayDuration = 4000; // 4 seconds
        this.init();
    }

    init() {
        // Hide the static hint element initially
        const staticHint = document.getElementById('themeHint');
        if (staticHint) {
            staticHint.style.display = 'none';
        }
    }

    showHintIfNeeded() {
        if (!this.hasShownHint) {
            const toggleContainer = document.querySelector('.theme-toggle-container');
            const toggleSwitch = document.querySelector('.theme-toggle');
            
            if (toggleContainer && toggleSwitch) {
                this.createHintElement();
                this.scheduleHintRemoval();
                this.markHintAsShown();
            } else {
                setTimeout(() => this.showHintIfNeeded(), 50);
            }
        }
    }

    createHintElement() {
        this.hintElement = document.createElement('div');
        this.hintElement.className = 'theme-hint dynamic-hint';
        this.hintElement.textContent = 'Two sides of how I build and think.';
        this.hintElement.setAttribute('aria-live', 'polite');
        
        this.hintElement.style.opacity = '0';
        this.hintElement.style.transform = 'translateX(-50%) translateY(10px)';

        const toggleContainer = document.querySelector('.theme-toggle-container');
        
        if (toggleContainer) {
            toggleContainer.appendChild(this.hintElement);
            this.hintElement.style.pointerEvents = 'none';
            this.hintElement.style.userSelect = 'none';
        }

        requestAnimationFrame(() => {
            this.hintElement.classList.add('show');
        });
    }

    scheduleHintRemoval() {
        setTimeout(() => {
            this.fadeOutHint();
        }, this.displayDuration);
    }

    fadeOutHint() {
        if (this.hintElement) {
            this.hintElement.classList.remove('show');
            this.hintElement.classList.add('fade-out');
            
            setTimeout(() => {
                if (this.hintElement && this.hintElement.parentNode) {
                    this.hintElement.parentNode.removeChild(this.hintElement);
                    this.hintElement = null;
                }
            }, 500);
        }
    }

    markHintAsShown() {
        try {
            localStorage.setItem(this.storageKey, 'true');
            this.hasShownHint = true;
        } catch (error) {
            console.warn('Could not save hint state to localStorage:', error);
        }
    }
}

// ===== Enhanced Music Player (SoundCloud Only) =====
const playlist = [
    // Amber Liu tracks (SoundCloud)
    {
        title: 'Make It Better',
        artist: 'Amber Liu',
        url: 'https://soundcloud.com/amberliuofficial/make-it-better',
        type: 'soundcloud'
    },
    {
        title: 'blue (feat. Junoflo)',
        artist: 'Amber Liu',
        url: 'https://soundcloud.com/amberliuofficial/blue-feat-junoflo',
        type: 'soundcloud'
    },
    {
        title: 'Stay Calm',
        artist: 'Amber Liu',
        url: 'https://soundcloud.com/amberliuofficial/stay-calm',
        type: 'soundcloud'
    },
    {
        title: 'Lifeline',
        artist: 'Amber Liu',
        url: 'https://soundcloud.com/amberliuofficial/lifeline',
        type: 'soundcloud'
    },
    {
        title: 'Other Side',
        artist: 'Amber Liu',
        url: 'https://soundcloud.com/amberliuofficial/other-side',
        type: 'soundcloud'
    },
    {
        title: 'Numb',
        artist: 'Amber Liu',
        url: 'https://soundcloud.com/amberliuofficial/numb',
        type: 'soundcloud'
    }
];

let currentTrackIndex = 0;
let isPlaying = false;
let currentAudio = null;
let soundcloudEnabled = false;

function initMusicPlayer() {
    const playPauseBtn = document.getElementById('playPauseBtn');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const musicTrackName = document.getElementById('musicTrackName');
    const musicArtist = document.getElementById('musicArtist');
    const widget = document.querySelector('.now-playing-widget');
    
    if (!playPauseBtn) {
        console.warn('Music player elements not found');
        return;
    }
    
    // Ensure widget is visible
    if (widget) {
        widget.style.display = 'block';
        widget.style.visibility = 'visible';
        widget.style.opacity = '1';
    }
    
    // Initialize audio element
    currentAudio = document.getElementById('backgroundMusic');
    if (!currentAudio) {
        currentAudio = new Audio();
        currentAudio.id = 'backgroundMusic';
        document.body.appendChild(currentAudio);
    }
    
    // Set up event listeners
    currentAudio.addEventListener('ended', () => {
        playNext();
    });
    
    currentAudio.addEventListener('play', () => {
        updatePlayerState(true);
    });
    
    currentAudio.addEventListener('pause', () => {
        updatePlayerState(false);
    });
    
    currentAudio.addEventListener('error', (e) => {
        console.error('Audio error:', e);
        handleTrackError();
    });
    
    // Try to enable SoundCloud (required)
    initSoundCloudSupport();
    
    // Load first track
    loadTrack(0);
    
    // Button event listeners
    playPauseBtn.addEventListener('click', togglePlayPause);
    
    if (nextBtn) {
        nextBtn.addEventListener('click', playNext);
    }
    
    if (prevBtn) {
        prevBtn.addEventListener('click', playPrevious);
    }
    
    console.log('Music player initialized');
}

function initSoundCloudSupport() {
    // Try to load SoundCloud API dynamically (non-blocking)
    try {
        const script = document.createElement('script');
        script.src = 'https://w.soundcloud.com/player/api.js';
        script.onload = () => {
            soundcloudEnabled = true;
            console.log('SoundCloud support enabled');
            
            // Create invisible iframe for SoundCloud
            const iframe = document.createElement('iframe');
            iframe.id = 'soundcloud-widget';
            iframe.width = '0';
            iframe.height = '0';
            iframe.frameBorder = 'no';
            iframe.scrolling = 'no';
            iframe.allow = 'autoplay';
            iframe.style.display = 'none';
            document.body.appendChild(iframe);
        };
        script.onerror = () => {
            console.log('SoundCloud API not available, using local audio only');
            soundcloudEnabled = false;
        };
        document.head.appendChild(script);
    } catch (error) {
        console.log('SoundCloud initialization failed, using local audio only');
        soundcloudEnabled = false;
    }
}

function loadTrack(index) {
    if (index < 0 || index >= playlist.length) return;
    
    const track = playlist[index];
    currentTrackIndex = index;
    
    // Update UI
    const musicTrackName = document.getElementById('musicTrackName');
    const musicArtist = document.getElementById('musicArtist');
    
    if (musicTrackName) {
        musicTrackName.textContent = track.title;
    }
    if (musicArtist) {
        musicArtist.textContent = track.artist;
    }
    
    // Load audio based on type
    if (track.type === 'soundcloud' && soundcloudEnabled) {
        loadSoundCloudTrack(track);
    } else {
        // Fallback to next track if SoundCloud not available
        const nextIndex = (index + 1) % playlist.length;
        if (nextIndex !== index) {
            setTimeout(() => loadTrack(nextIndex), 1000);
        } else {
            // All tracks failed, show error
            if (musicTrackName) {
                musicTrackName.textContent = 'SoundCloud unavailable';
            }
        }
    }
}

function loadSoundCloudTrack(track) {
    try {
        const iframe = document.getElementById('soundcloud-widget');
        if (iframe && typeof SC !== 'undefined') {
            iframe.src = `https://w.soundcloud.com/player/?url=${encodeURIComponent(track.url)}&auto_play=false&hide_related=true&show_comments=false&show_user=false&show_reposts=false&visual=false`;
            
            setTimeout(() => {
                try {
                    const widget = SC.Widget(iframe);
                    
                    widget.bind(SC.Widget.Events.READY, () => {
                        console.log('SoundCloud track ready:', track.title);
                    });
                    
                    widget.bind(SC.Widget.Events.PLAY, () => {
                        updatePlayerState(true);
                    });
                    
                    widget.bind(SC.Widget.Events.PAUSE, () => {
                        updatePlayerState(false);
                    });
                    
                    widget.bind(SC.Widget.Events.FINISH, () => {
                        playNext();
                    });
                    
                    widget.bind(SC.Widget.Events.ERROR, () => {
                        console.warn('SoundCloud track failed, falling back to local');
                        handleTrackError();
                    });
                    
                    // Store widget reference for play/pause
                    currentAudio.soundcloudWidget = widget;
                    
                } catch (widgetError) {
                    console.warn('SoundCloud widget error:', widgetError);
                    handleTrackError();
                }
            }, 1000);
            
        } else {
            console.warn('SoundCloud not available');
            handleTrackError();
        }
    } catch (error) {
        console.warn('SoundCloud loading error:', error);
        handleTrackError();
    }
}

function togglePlayPause() {
    if (!currentAudio) return;
    
    try {
        const currentTrack = playlist[currentTrackIndex];
        
        // Handle SoundCloud playback
        if (currentTrack.type === 'soundcloud' && currentAudio.soundcloudWidget) {
            currentAudio.soundcloudWidget.isPaused((paused) => {
                if (paused) {
                    currentAudio.soundcloudWidget.play();
                } else {
                    currentAudio.soundcloudWidget.pause();
                }
            });
        } else {
            // SoundCloud not available
            const musicTrackName = document.getElementById('musicTrackName');
            if (musicTrackName) {
                musicTrackName.textContent = 'SoundCloud required';
            }
        }
    } catch (error) {
        console.error('Toggle play/pause error:', error);
    }
}

function playNext() {
    const nextIndex = (currentTrackIndex + 1) % playlist.length;
    loadTrack(nextIndex);
    if (isPlaying) {
        setTimeout(() => {
            togglePlayPause();
        }, 1500);
    }
}

function playPrevious() {
    const prevIndex = (currentTrackIndex - 1 + playlist.length) % playlist.length;
    loadTrack(prevIndex);
    if (isPlaying) {
        setTimeout(() => {
            togglePlayPause();
        }, 1500);
    }
}

function handleTrackError() {
    console.log('Track error, trying next local track...');
    const musicTrackName = document.getElementById('musicTrackName');
    
    if (musicTrackName) {
        musicTrackName.textContent = 'Loading next track...';
    }
    
    // Find next local track
    const nextLocalIndex = playlist.findIndex((track, index) => 
        index > currentTrackIndex && track.type === 'local'
    );
    
    if (nextLocalIndex !== -1) {
        setTimeout(() => {
            loadTrack(nextLocalIndex);
        }, 1000);
    } else {
        // Start over with first local track
        const firstLocalIndex = playlist.findIndex(track => track.type === 'local');
        if (firstLocalIndex !== -1) {
            setTimeout(() => {
                loadTrack(firstLocalIndex);
            }, 1000);
        }
    }
}

function updatePlayerState(playing) {
    isPlaying = playing;
    const playPauseBtn = document.getElementById('playPauseBtn');
    const widget = document.querySelector('.now-playing-widget');
    
    if (playPauseBtn) {
        playPauseBtn.textContent = playing ? '⏸' : '▶';
        playPauseBtn.setAttribute('aria-label', playing ? 'Pause music' : 'Play music');
    }
    
    if (widget) {
        if (playing) {
            widget.style.transform = 'scale(1.05)';
            widget.style.boxShadow = '0 12px 40px rgba(192, 132, 252, 0.4)';
            widget.classList.add('playing');
        } else {
            widget.style.transform = 'scale(1)';
            widget.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.15)';
            widget.classList.remove('playing');
        }
    }
}

// ===== Typewriter Effect =====
function initTypewriter() {
    const typewriterText = document.getElementById('typewriterText');
    
    if (!typewriterText) {
        console.error('Typewriter element not found');
        return;
    }
    
    let phrases = [
        'Hello, I\'m a digital builder.',
        'I craft code & creativity.',
        'Welcome to my daydream.'
    ];
    
    window.typewriterPhrases = phrases;
    
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;
    let typewriterTimeout;

    function typeText() {
        const currentPhrases = window.typewriterPhrases || phrases;
        const currentPhrase = currentPhrases[phraseIndex];
        
        if (isDeleting) {
            typewriterText.textContent = currentPhrase.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50;
        } else {
            typewriterText.textContent = currentPhrase.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100;
        }
        
        if (!isDeleting && charIndex === currentPhrase.length) {
            typingSpeed = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % currentPhrases.length;
            typingSpeed = 500;
        }
        
        typewriterTimeout = setTimeout(typeText, typingSpeed);
    }
    
    // Listen for theme changes to update phrases
    document.addEventListener('themeChanged', (event) => {
        if (window.contentAdapter) {
            const introContent = window.contentAdapter.contentVariants[event.detail.theme]?.intro;
            if (introContent && introContent.typewriterPhrases) {
                window.typewriterPhrases = introContent.typewriterPhrases;
                phraseIndex = 0;
                charIndex = 0;
                isDeleting = false;
                if (typewriterTimeout) {
                    clearTimeout(typewriterTimeout);
                }
                typewriterTimeout = setTimeout(typeText, 100);
            }
        }
    });
    
    typeText();
}

// ===== Initialize everything when DOM is ready =====
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeAll);
} else {
    initializeAll();
}

function initializeAll() {
    initThemeManager();
    initContentAdapter();
    initHintSystem();
    initTypewriter();
    initMusicPlayer();
    initScrollAnimations();
    initNavbar();
}

function initThemeManager() {
    window.themeManager = new ThemeManager();
}

function initContentAdapter() {
    window.contentAdapter = new ContentAdapter();
}

function initHintSystem() {
    window.hintSystem = new HintSystem();
    setTimeout(() => {
        window.hintSystem.showHintIfNeeded();
    }, 100);
}

// ===== Smooth Scrolling =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 100;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ===== Scroll Animations =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

function initScrollAnimations() {
    const animateElements = document.querySelectorAll(
        '.column, .beyond-content, .project-item'
    );
    
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(el);
    });
}

// ===== Navbar scroll effect =====
function initNavbar() {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        const isNightMode = document.body.classList.contains('theme-night');
        
        if (currentScroll > 50) {
            if (isNightMode) {
                navbar.style.background = 'rgba(15, 15, 35, 0.95)';
                navbar.style.backdropFilter = 'blur(20px)';
                navbar.style.borderBottom = '1px solid rgba(196, 181, 253, 0.2)';
            } else {
                navbar.style.background = 'rgba(252, 231, 243, 0.8)';
                navbar.style.backdropFilter = 'blur(10px)';
                navbar.style.borderBottom = 'none';
            }
        } else {
            if (isNightMode) {
                navbar.style.background = 'rgba(15, 15, 35, 0.85)';
                navbar.style.backdropFilter = 'blur(20px)';
                navbar.style.borderBottom = '1px solid rgba(196, 181, 253, 0.15)';
            } else {
                navbar.style.background = 'transparent';
                navbar.style.backdropFilter = 'none';
                navbar.style.borderBottom = 'none';
            }
        }
    });
}