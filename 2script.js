// DOM Elements
const carousel = document.getElementById('causes-carousel');
const prevBtn = document.querySelector('.carousel-arrow.prev');
const nextBtn = document.querySelector('.carousel-arrow.next');
const voteBtn = document.getElementById('vote-button');
const feedback = document.getElementById('feedback');
const voteCounter = document.getElementById('vote-counter');
const causeCards = document.querySelectorAll('.cause-card');
const radioInputs = document.querySelectorAll('input[type="radio"]');
const indicatorsContainer = document.getElementById('carousel-indicators');

// Variables
let currentIndex = 0;
let cardWidth;
let touchStartX = 0;
let touchEndX = 0;
let totalSlides = causeCards.length;

// Initialize the interface
function init() {
  loadGofundmeScript(); // Load GoFundMe script
  calculateCardWidth(); // Calculate card width initially
  createIndicators(); // Create slide indicators
  updateCarousel();
  addEventListeners();
}

// Create Instagram-like slide indicators
function createIndicators() {
  for (let i = 0; i < totalSlides; i++) {
    const indicator = document.createElement('div');
    indicator.className = 'indicator';
    if (i === 0) indicator.classList.add('active');
    indicator.dataset.index = i;
    indicator.addEventListener('click', () => {
      currentIndex = i;
      updateCarousel();
    });
    indicatorsContainer.appendChild(indicator);
  }
}

// Update active indicator
function updateIndicators() {
  const indicators = document.querySelectorAll('.indicator');
  indicators.forEach((indicator, index) => {
    if (index === currentIndex) {
      indicator.classList.add('active');
    } else {
      indicator.classList.remove('active');
    }
  });
}

// Load GoFundMe embed script
function loadGofundmeScript() {
  const script = document.createElement('script');
  script.defer = true;
  script.src = "https://www.gofundme.com/static/js/embed.js";
  document.body.appendChild(script);
}

// Calculate card width
function calculateCardWidth() {
  const containerWidth = document.querySelector('.carousel-container').offsetWidth;
  cardWidth = containerWidth;
}

// Update carousel position
function updateCarousel() {
  carousel.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
  updateIndicators();
}

// Add all event listeners
function addEventListeners() {
  // Navigation buttons
  prevBtn.addEventListener('click', navigateCarousel.bind(null, 'prev'));
  nextBtn.addEventListener('click', navigateCarousel.bind(null, 'next'));
  
  // Radio button selection
  radioInputs.forEach(input => {
    input.addEventListener('change', handleCauseSelection);
  });
  
  // Card selection (for better UX)
  causeCards.forEach(card => {
    card.addEventListener('click', function(e) {
      if (e.target.type !== 'radio' && !e.target.classList.contains('indicator')) {
        const radio = this.querySelector('input[type="radio"]');
        radio.checked = true;
        handleCauseSelection({ target: radio });
      }
    });
  });
  
  // Vote submission
  voteBtn.addEventListener('click', submitVote);
  
  // Touch events for swipe on mobile
  carousel.addEventListener('touchstart', handleTouchStart);
  carousel.addEventListener('touchend', handleTouchEnd);
  
  // Window resize event
  window.addEventListener('resize', handleResize);
}

// Handle cause selection
function handleCauseSelection(e) {
  // Remove selected class from all cards
  causeCards.forEach(card => card.classList.remove('selected'));
  
  // Add selected class to the card containing the checked radio
  e.target.closest('.cause-card').classList.add('selected');
  
  // Enable vote button
  voteBtn.disabled = false;
}

// Navigate the carousel with looping
function navigateCarousel(direction) {
  if (direction === 'prev') {
    currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
  } else {
    currentIndex = (currentIndex + 1) % totalSlides;
  }
  
  updateCarousel();
}

// Handle window resize
function handleResize() {
  calculateCardWidth(); // Recalculate card width on resize
  updateCarousel(); // Update carousel position
}

// Handle touch start event
function handleTouchStart(e) {
  touchStartX = e.changedTouches[0].screenX;
}

// Handle touch end event
function handleTouchEnd(e) {
  touchEndX = e.changedTouches[0].screenX;
  handleSwipe();
}

// Process swipe direction
function handleSwipe() {
  const swipeThreshold = 50; // Minimum distance to register as a swipe
  
  if (touchEndX < touchStartX - swipeThreshold) {
    // Swipe left - go next
    navigateCarousel('next');
  } else if (touchEndX > touchStartX + swipeThreshold) {
    // Swipe right - go prev
    navigateCarousel('prev');
  }
}

// Submit vote - modified to be frontend-only
function submitVote() {
  const selectedCause = document.querySelector('input[name="cause"]:checked');
  
  if (!selectedCause) {
    feedback.textContent = 'Please select a cause before voting.';
    feedback.className = 'feedback error';
    feedback.style.display = 'block';
    return;
  }
  
  // Show loading state
  voteBtn.disabled = true;
  const loadingSpinner = document.createElement('span');
  loadingSpinner.className = 'loading';
  voteBtn.appendChild(loadingSpinner);
  
  // Simulate vote submission
  setTimeout(() => {
    voteBtn.removeChild(loadingSpinner);
    voteBtn.textContent = 'Thank You for Voting!';
    
    feedback.textContent = 'Thanks! Your vote has been casted.';
    feedback.className = 'feedback success';
    feedback.style.display = 'block';
    
    // Disable further voting
    radioInputs.forEach(input => {
      input.disabled = true;
    });
    voteBtn.disabled = true;
    
    // Hide vote counter since we're not tracking
    voteCounter.style.display = 'none';
  }, 1000); // 1 second delay for realistic effect
}

// Initialize on load
document.addEventListener('DOMContentLoaded', init);




// Contact Form JavaScript - Using 'cf-' prefixed IDs to match HTML
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('cf-contactForm');
    
    if (contactForm) {
      contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = document.getElementById('cf-name').value;
        const email = document.getElementById('cf-email').value;
        const phone = document.getElementById('cf-phone').value;
        const message = document.getElementById('cf-message').value;
        const formMessage = document.getElementById('cf-formMessage');
        
        // Basic validation
        if (!name || !email || !message) {
          formMessage.textContent = 'Please fill in all required fields.';
          formMessage.className = 'cf-form-message error';
          return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
          formMessage.textContent = 'Please enter a valid email address.';
          formMessage.className = 'cf-form-message error';
          return;
        }
        
        // Here you would typically send the form data to your server
        // This is a simulation of a successful form submission
        formMessage.textContent = 'Thank you! Your message has been sent successfully.';
        formMessage.className = 'cf-form-message success';
        
        // Reset the form after successful submission
        contactForm.reset();
        
        // For demonstration, hide the success message after 5 seconds
        setTimeout(() => {
          formMessage.style.display = 'none';
        }, 5000);
      });
    }
  });