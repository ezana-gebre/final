const hamburger = document.getElementById('hamburger');
const menu = document.getElementById('menu');

hamburger.addEventListener('click', () => {
  menu.classList.toggle('active');
});



document.addEventListener('DOMContentLoaded', function() {
  const faqQuestions = document.querySelectorAll('.faq-question');
  
  faqQuestions.forEach(function(question) {
    question.addEventListener('click', function() {
      // Toggle active class on clicked question
      this.classList.toggle('active');
      
      // Get associated answer
      const answer = this.nextElementSibling;
      
      // Toggle active class on answer
      answer.classList.toggle('active');
      
      // Close other open answers
      const otherQuestions = Array.from(faqQuestions).filter(function(q) {
        return q !== question;
      });
      
      otherQuestions.forEach(function(q) {
        q.classList.remove('active');
        q.nextElementSibling.classList.remove('active');
      });
    });
  });
});








// Initialize Swiper carousel
const swiper = new Swiper('.swiper-container', {
  loop: true,
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
});

// Variables to store user selections
let selectedAmount = null;
let selectedCampaign = null;

// Handle amount selection
document.querySelectorAll('input[name="amount"]').forEach(input => {
  input.addEventListener('change', () => {
    selectedAmount = input.value;
  });
});

// Handle campaign selection
document.querySelectorAll('.carousel-item').forEach(item => {
  item.addEventListener('click', () => {
    document.querySelectorAll('.carousel-item').forEach(i => i.classList.remove('selected'));
    item.classList.add('selected');
    selectedCampaign = item.getAttribute('data-campaign-id');
  });
});

// Handle direct debit setup button
document.getElementById('setup-debit').addEventListener('click', () => {
  if (selectedAmount && selectedCampaign) {
    alert(`You’ve set up a £${selectedAmount} monthly direct debit for Campaign ${selectedCampaign}. This qualifies you for bank switch bonuses, and your funds will support your chosen GoFundMe campaign! (Setup process coming soon.)`);
  } else {
    alert('Please select an amount and a GoFundMe campaign first.');
  }
});







// Add smooth scroll for footer links
document.querySelectorAll('.site-footer a').forEach(link => {
  link.addEventListener('click', (e) => {
  e.preventDefault();
  const href = link.getAttribute('href');
  if(href === '#') {
  window.scrollTo({
  top: 0,
  behavior: 'smooth'
  });
  }
  });
  });