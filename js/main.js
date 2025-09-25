$(document).ready(function() {
    showLoadingScreen();
    initNavigation();
    initAnimations();
    initInteractiveElements();
    initParallaxEffects();
    initParticleEffects();
    initTextReveal();
    setActiveNavigation();
    initScrollEffects();
    $('body').prepend('<div class="scroll-progress"></div>');
});

function showLoadingScreen() {
    $('body').append(`
        <div id="loading-screen">
            <div class="loading-content">
                <div class="loading-spinner">
                    <div class="spinner-ring"></div>
                    <div class="spinner-ring"></div>
                    <div class="spinner-ring"></div>
                </div>
                <h3 class="loading-text">Memuat Website...</h3>
                <div class="loading-progress">
                    <div class="progress-bar"></div>
                </div>
            </div>
        </div>
    `);
    
    let progress = 0;
    const loadingInterval = setInterval(() => {
        progress += Math.random() * 15;
        if (progress >= 100) {
            progress = 100;
            $('.progress-bar').css('width', '100%');
            clearInterval(loadingInterval);
            
            setTimeout(() => {
                $('#loading-screen').fadeOut(800, function() {
                    $(this).remove();
                    $('body').addClass('loaded');
                });
            }, 500);
        } else {
            $('.progress-bar').css('width', progress + '%');
        }
    }, 100);
}

function initTextReveal() {
    if ($('.hero-title').length) {
        const title = $('.hero-title').text();
        $('.hero-title').text('').css('opacity', 1);
        
        let i = 0;
        const typeInterval = setInterval(() => {
            $('.hero-title').text(title.slice(0, i));
            i++;
            if (i > title.length) {
                clearInterval(typeInterval);
                $('.hero-subtitle').fadeIn(800);
            }
        }, 100);
    }
}
    $('.navbar-toggler').on('click', function() {
        $('.navbar-collapse').slideToggle(300);
        $(this).toggleClass('active');
    });

    $('.navbar-nav .nav-link').on('click', function() {
        if($(window).width() < 992) {
            $('.navbar-collapse').slideUp(300);
            $('.navbar-toggler').removeClass('active');
        }
    });

function initNavigation() {
    $('.navbar-toggler').on('click', function() {
        $('.navbar-collapse').slideToggle(300);
    });
    
    $(window).on('scroll', function() {
        if ($(window).scrollTop() > 100) {
            $('.navbar').addClass('scrolled');
        } else {
            $('.navbar').removeClass('scrolled');
        }
    });
}

function initAnimations() {
    $('.custom-card, .feature-card').addClass('loading');
    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('loaded');
                    // Add stagger effect
                    const delay = Array.from(entry.target.parentNode.children).indexOf(entry.target) * 100;
                    entry.target.style.animationDelay = delay + 'ms';
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '50px'
        });

        document.querySelectorAll('.loading').forEach(el => {
            observer.observe(el);
        });
    } else {
        // Fallback for browsers without IntersectionObserver
        $(window).on('scroll', function() {
            $('.loading').each(function() {
                var elementTop = $(this).offset().top;
                var elementBottom = elementTop + $(this).outerHeight();
                var viewportTop = $(window).scrollTop();
                var viewportBottom = viewportTop + $(window).height();
                
                if (elementBottom > viewportTop && elementTop < viewportBottom) {
                    $(this).addClass('loaded');
                }
            });
        });
    }

    // Trigger initial animation check
    $(window).trigger('scroll');
    
    // Add floating animation to hero elements
    $('.hero-image i').addClass('float-animation');
}

// Interactive elements
function initInteractiveElements() {
    // Enhanced card hover effects
    $('.custom-card, .feature-card').hover(
        function() {
            $(this).addClass('shadow-lg glow-hover');
            $(this).find('.card-icon').addClass('gradient-text');
        },
        function() {
            $(this).removeClass('shadow-lg glow-hover');
            $(this).find('.card-icon').removeClass('gradient-text');
        }
    );

    // Enhanced button click effects with ripple
    $('.btn').on('click', function(e) {
        var button = $(this);
        var ripple = $('<span class="ripple"></span>');
        
        var size = Math.max(button.outerWidth(), button.outerHeight());
        var x = e.pageX - button.offset().left - size / 2;
        var y = e.pageY - button.offset().top - size / 2;
        
        ripple.css({
            top: y + 'px',
            left: x + 'px',
            width: size + 'px',
            height: size + 'px'
        }).appendTo(button);
        
        setTimeout(function() {
            ripple.remove();
        }, 600);
    });

    // Image lazy loading with fade effect
    $('img[data-src]').each(function() {
        var img = $(this);
        img.attr('src', img.attr('data-src')).removeAttr('data-src')
           .on('load', function() {
               $(this).addClass('fade-in');
           });
    });

    // Typing effect for hero text
    if ($('.hero-content h1').length) {
        typewriterEffect('.hero-content h1');
    }

    // Magnetic hover effect for buttons
    $('.btn-hero, .btn-outline-custom').on('mousemove', function(e) {
        var button = $(this);
        var rect = this.getBoundingClientRect();
        var x = e.clientX - rect.left - rect.width / 2;
        var y = e.clientY - rect.top - rect.height / 2;
        
        button.css('transform', `translate(${x * 0.1}px, ${y * 0.1}px) scale(1.05)`);
    }).on('mouseleave', function() {
        $(this).css('transform', '');
    });
}

// Set active navigation based on current page
function setActiveNavigation() {
    var currentPage = window.location.pathname;
    var pageName = currentPage.split('/').pop().replace('.html', '') || 'index';
    
    // Remove active class from all nav links
    $('.navbar-nav .nav-link').removeClass('active');
    
    // Add active class to current page
    $('.navbar-nav .nav-link[href*="' + pageName + '"]').addClass('active');
    
    // Handle homepage
    if (pageName === 'index' || currentPage.endsWith('/quiz1') || currentPage.endsWith('/quiz1/')) {
        $('.navbar-nav .nav-link[href="index.html"], .navbar-nav .nav-link[href="/quiz1"], .navbar-nav .nav-link[href="./"]').addClass('active');
    }
}

// Utility functions
function showNotification(message, type = 'info') {
    var notification = $('<div class="notification notification-' + type + '">' + message + '</div>');
    $('body').append(notification);
    
    setTimeout(function() {
        notification.addClass('show');
    }, 100);
    
    setTimeout(function() {
        notification.removeClass('show');
        setTimeout(function() {
            notification.remove();
        }, 300);
    }, 3000);
}

// Page transition effects
function fadeInPage() {
    $('body').hide().fadeIn(500);
}

// Call page transition on load
$(window).on('load', function() {
    fadeInPage();
});

// Loading screen
$(window).on('load', function() {
    $('.loading-screen').fadeOut(500);
});

// Modern Back to Top Button
$(document).ready(function() {
    // Create the back to top button
    $('body').append('<div class="back-to-top" id="backToTop"><i class="fas fa-arrow-up"></i></div>');
    
    const $backToTop = $('#backToTop');
    
    // Show button immediately for testing - you can scroll to see it
    $backToTop.show();
    
    // Show/hide button on scroll
    $(window).scroll(function() {
        if ($(this).scrollTop() > 100) {
            $backToTop.fadeIn(400).addClass('pulse');
            // Remove pulse class after animation
            setTimeout(() => {
                $backToTop.removeClass('pulse');
            }, 2000);
        } else {
            $backToTop.fadeOut(400);
        }
    });
    
    // Smooth scroll to top on click
    $backToTop.on('click', function(e) {
        e.preventDefault();
        
        // Add click effect
        $(this).addClass('clicked');
        setTimeout(() => {
            $(this).removeClass('clicked');
        }, 200);
        
        // Smooth scroll animation
        $('html, body').animate({
            scrollTop: 0
        }, 1000);
        
        // Show notification
        console.log('Back to top clicked!');
    });
});

// Modern Back to Top styling is now in CSS file

// Add some CSS for notifications
$('<style>')
    .prop('type', 'text/css')
    .html(`
        .notification {
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 15px 20px;
            border-radius: 5px;
            color: white;
            z-index: 1001;
            transform: translateX(100%);
            transition: transform 0.3s ease;
        }
        
        .notification.show {
            transform: translateX(0);
        }
        
        .notification-info { background: var(--secondary-color); }
        .notification-success { background: #27ae60; }
        .notification-warning { background: #f39c12; }
        .notification-error { background: var(--accent-color); }
        
        .ripple {
            position: absolute;
            border-radius: 50%;
            background: rgba(255,255,255,0.3);
            transform: scale(0);
            animation: ripple-animation 0.6s linear;
            pointer-events: none;
        }
        
        @keyframes ripple-animation {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `)
    .appendTo('head');

// New functions for enhanced visual effects

// Parallax effects
function initParallaxEffects() {
    $(window).on('scroll', function() {
        var scrolled = $(window).scrollTop();
        var parallax = $('.hero-section');
        var speed = scrolled * 0.5;
        
        parallax.css('transform', 'translateY(' + speed + 'px)');
    });
}

// Particle effects for hero section
function initParticleEffects() {
    if ($('.hero-section').length) {
        createParticles();
    }
}

function createParticles() {
    const heroSection = document.querySelector('.hero-section');
    const particleCount = 50;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.cssText = `
            position: absolute;
            width: 2px;
            height: 2px;
            background: rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            animation: float ${3 + Math.random() * 4}s ease-in-out infinite;
            animation-delay: ${Math.random() * 2}s;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
        `;
        heroSection.appendChild(particle);
    }
}

// Scroll effects
function initScrollEffects() {
    $(window).on('scroll', function() {
        var scrollTop = $(window).scrollTop();
        var documentHeight = $(document).height();
        var windowHeight = $(window).height();
        var progress = scrollTop / (documentHeight - windowHeight);
        
        // Update progress bar if exists
        $('.scroll-progress').css('width', (progress * 100) + '%');
        
        // Parallax effect for section backgrounds
        $('.parallax').each(function() {
            var speed = $(this).data('speed') || 0.5;
            var yPos = -(scrollTop * speed);
            $(this).css('transform', 'translate3d(0, ' + yPos + 'px, 0)');
        });
    });
}

// Typewriter effect
function typewriterEffect(element) {
    const text = $(element).text();
    $(element).text('');
    let i = 0;
    
    function typeChar() {
        if (i < text.length) {
            $(element).text($(element).text() + text.charAt(i));
            i++;
            setTimeout(typeChar, 100);
        }
    }
    
    setTimeout(typeChar, 1000);
}

// Mouse cursor trail effect
function initCursorTrail() {
    const trail = [];
    const trailLength = 10;
    
    $(document).on('mousemove', function(e) {
        trail.push({ x: e.pageX, y: e.pageY });
        
        if (trail.length > trailLength) {
            trail.shift();
        }
        
        $('.cursor-trail').remove();
        
        trail.forEach((point, index) => {
            const trailDot = $('<div class="cursor-trail"></div>');
            trailDot.css({
                position: 'absolute',
                left: point.x + 'px',
                top: point.y + 'px',
                width: (trailLength - index) + 'px',
                height: (trailLength - index) + 'px',
                background: `rgba(52, 152, 219, ${(trailLength - index) / trailLength})`,
                borderRadius: '50%',
                pointerEvents: 'none',
                zIndex: 9999,
                transform: 'translate(-50%, -50%)',
                transition: 'all 0.1s ease'
            });
            $('body').append(trailDot);
            
            setTimeout(() => trailDot.remove(), 500);
        });
    });
}

// Text reveal animation
function initTextReveal() {
    $('.reveal-text').each(function() {
        const text = $(this).text();
        const words = text.split(' ');
        $(this).empty();
        
        words.forEach((word, index) => {
            const span = $('<span>').text(word + ' ').css({
                opacity: 0,
                transform: 'translateY(50px)',
                display: 'inline-block',
                transition: 'all 0.6s ease'
            });
            $(this).append(span);
            
            setTimeout(() => {
                span.css({
                    opacity: 1,
                    transform: 'translateY(0)'
                });
            }, index * 100);
        });
    });
}

// Enhanced loading screen
function showLoadingScreen() {
    const loader = $(`
        <div class="loading-screen" style="
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 10000;
            flex-direction: column;
        ">
            <div class="loading-spinner"></div>
            <p style="color: white; margin-top: 20px; font-size: 1.2rem;">Loading Amazing Content...</p>
        </div>
    `);
    
    $('body').prepend(loader);
    
    setTimeout(() => {
        loader.fadeOut(800, () => loader.remove());
    }, 2000);
}

// Cursor trail effect - DISABLED
function initCursorTrail() {
    // Cursor trail effect disabled for better performance and simplicity
    return;
}

// Initialize cursor trail on load
$(window).on('load', function() {
    // initCursorTrail(); // Disabled cursor trail
});