function updateTime() {
  var dt = new Date();
  document.getElementById("datetime").innerHTML = (("0" + dt.getDate()).slice(-2)) + "-" + (("0" + (dt.getMonth() + 1)).slice(-2)) + "-" + (dt.getFullYear()) + " [" + (("0" + dt.getHours()).slice(-2)) + ":" + (("0" + dt.getMinutes()).slice(-2)) + ":" + (("0" + dt.getSeconds()).slice(-2)) +"]";//made by Aditya Jindal
}
  updateTime();
  setInterval(updateTime, 1000);

function increaseFontSize() {
  var rootElement = document.documentElement;
  var currentSize = parseFloat(window.getComputedStyle(rootElement, null).getPropertyValue('font-size'));
  rootElement.style.fontSize = (currentSize + 1) + "px";
}

function resetFontSize() {
    document.documentElement.style.fontSize = "16px"; // Set the default font size
}

function decreaseFontSize() {
    var rootElement = document.documentElement;
    var currentSize = parseFloat(window.getComputedStyle(rootElement, null).getPropertyValue('font-size'));
    rootElement.style.fontSize = (currentSize - 1) + "px";

  }

function toggleList(listId, buttonId) {
  var list = document.getElementById(listId);
  var button = document.getElementById(buttonId);
  
  // Close all other lists first
  var allLists = document.querySelectorAll('.hidden');
  var allButtons = document.querySelectorAll('[id^="button"]');
  
  var isCurrentlyOpen = list.style.display === "block";
  
  allLists.forEach(function(otherList) {
    otherList.style.display = "none";
    otherList.classList.remove('show');
  });
  
  allButtons.forEach(function(otherButton) {
    otherButton.textContent = "▾";
  });
  
  // Toggle current list
  if (!isCurrentlyOpen) {
    list.style.display = "block";
    list.classList.add('show');
    button.textContent = "▴";
  }
}

window.addEventListener("DOMContentLoaded", function() {
  var hiddenLists = document.getElementsByClassName("hidden");
  for (var i = 0; i < hiddenLists.length; i++) {
    hiddenLists[i].style.display = "none";
  }
  
  // Initialize Hindi button
  setTimeout(() => {
    const hindiBtn = document.querySelector('.hindi-btn');
    if (hindiBtn) {
      hindiBtn.onclick = toggleHindi;
    } else {
      // Find and add class to Hindi button
      const buttons = document.querySelectorAll('#links1 button');
      buttons.forEach(btn => {
        if (btn.textContent.includes('हिन्दी') || btn.textContent.includes('English')) {
          btn.classList.add('hindi-btn');
          btn.onclick = toggleHindi;
        }
      });
    }
  }, 100);
});

// Enhanced DISHA function with Hindi support
function openDISHA() {
  const modal = document.createElement('div');
  const title = isHindi ? '🤖 दिशा मोड चुनें' : '🤖 Choose DISHA Mode';
  const textChat = isHindi ? '💬 टेक्स्ट चैट' : '💬 Text Chat';
  const voiceCall = isHindi ? '🎤 वॉइस कॉल' : '🎤 Voice Call';
  const cancel = isHindi ? 'रद्द करें' : 'Cancel';
  
  modal.innerHTML = `
    <div style="position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.85);z-index:10000;display:flex;align-items:center;justify-content:center;backdrop-filter:blur(5px);">
      <div style="background:linear-gradient(135deg,#ffffff,#f8fafc);padding:2.5rem;border-radius:20px;text-align:center;max-width:420px;width:90%;box-shadow:0 25px 50px rgba(0,0,0,0.25);border:1px solid rgba(255,255,255,0.2);">
        <div style="background:linear-gradient(135deg,#3b82f6,#1e40af);width:80px;height:80px;border-radius:50%;margin:0 auto 1.5rem;display:flex;align-items:center;justify-content:center;box-shadow:0 10px 30px rgba(59,130,246,0.3);">
          <span style="font-size:2.5rem;">🤖</span>
        </div>
        <h3 style="margin-bottom:0.5rem;color:#1e40af;font-size:1.5rem;font-weight:700;">${title}</h3>
        <p style="color:#64748b;margin-bottom:2rem;font-size:0.9rem;">${isHindi ? 'अपना पसंदीदा मोड चुनें' : 'Choose your preferred interaction mode'}</p>
        <button onclick="window.location.href='./ask-disha.html'" style="width:100%;padding:1.2rem;margin:0.75rem 0;background:linear-gradient(135deg,#3b82f6,#1e40af);color:white;border:none;border-radius:12px;cursor:pointer;font-size:1.1rem;font-weight:600;box-shadow:0 4px 15px rgba(59,130,246,0.3);transition:all 0.3s ease;" onmouseover="this.style.transform='translateY(-2px)';this.style.boxShadow='0 8px 25px rgba(59,130,246,0.4)'" onmouseout="this.style.transform='translateY(0)';this.style.boxShadow='0 4px 15px rgba(59,130,246,0.3)'">${textChat}</button>
        <button onclick="startVoiceCall();document.body.removeChild(this.closest('div').parentElement)" style="width:100%;padding:1.2rem;margin:0.75rem 0;background:linear-gradient(135deg,#10b981,#059669);color:white;border:none;border-radius:12px;cursor:pointer;font-size:1.1rem;font-weight:600;box-shadow:0 4px 15px rgba(16,185,129,0.3);transition:all 0.3s ease;" onmouseover="this.style.transform='translateY(-2px)';this.style.boxShadow='0 8px 25px rgba(16,185,129,0.4)'" onmouseout="this.style.transform='translateY(0)';this.style.boxShadow='0 4px 15px rgba(16,185,129,0.3)'">${voiceCall}</button>
        <button onclick="document.body.removeChild(this.parentElement.parentElement)" style="width:100%;padding:0.8rem;margin-top:1rem;background:#f1f5f9;border:1px solid #e2e8f0;border-radius:10px;cursor:pointer;color:#64748b;font-weight:500;transition:all 0.3s ease;" onmouseover="this.style.background='#e2e8f0'" onmouseout="this.style.background='#f1f5f9'">✕ ${cancel}</button>
      </div>
    </div>`;
  document.body.appendChild(modal);
}

function startVoiceCall() {
  if (window.handleVoiceCall) {
    window.handleVoiceCall();
  } else {
    alert('Voice assistant loading... Please try again in a moment.');
  }
}

// Handle train search form
function handleSearch(event) {
  event.preventDefault();
  const from = document.getElementById('from').value || 'Mumbai Central';
  const to = document.getElementById('to').value || 'New Delhi';
  const dateInput = document.getElementById('date').value;
  const date = dateInput ? new Date(dateInput).toLocaleDateString('en-GB') : new Date().toLocaleDateString('en-GB');
  const classSelect = document.getElementById('class');
  const classType = classSelect.options[classSelect.selectedIndex].text || 'All Classes';
  
  window.location.href = `./train-results.html?from=${encodeURIComponent(from)}&to=${encodeURIComponent(to)}&date=${encodeURIComponent(date)}&class=${encodeURIComponent(classType)}`;
  return false;
}

// Enhanced Hindi Translation
let isHindi = false;

// Make toggleHindi globally available
window.toggleHindi = function() {
  isHindi = !isHindi;
  console.log('Hindi toggled:', isHindi);
  
  // Update button text
  const hindiBtn = document.querySelector('.hindi-btn');
  if (hindiBtn) {
    hindiBtn.textContent = isHindi ? 'English' : 'हिन्दी';
  }
  
  // Translate ALL header links including nested ones
  const allLinks = document.querySelectorAll('#links1 a, #links2 span, #links2 a');
  allLinks.forEach(el => {
    const text = el.textContent.trim();
    if (text && text !== '' && !text.includes('•')) {
      if (isHindi && translations[text]) {
        el.setAttribute('data-original', text);
        el.textContent = translations[text];
      } else if (!isHindi && el.getAttribute('data-original')) {
        el.textContent = el.getAttribute('data-original');
      }
    }
  });
};

const translations = {
  // Header elements
  'LOGIN': 'लॉगिन',
  'REGISTER': 'पंजीकरण',
  'AGENT LOGIN': 'एजेंट लॉगिन',
  'CONTACT US': 'संपर्क करें',
  'ASK DISHA': 'दिशा से पूछें',
  'ALERTS': 'अलर्ट',
  'PNR STATUS': 'पीएनआर स्थिति',
  'CHARTS/VACANCY': 'चार्ट/रिक्ति',
  
  // Navigation
  'IRCTC EXCLUSIVE': 'आईआरसीटीसी विशेष',
  'TRAINS': 'ट्रेनें',
  'BUSES': 'बसें',
  'FLIGHTS': 'फ्लाइट्स',
  'HOTELS': 'होटल',
  'HOLIDAYS': 'छुट्टियां',
  'LOYALTY': 'वफादारी',
  'MEALS': 'भोजन',
  
  // Booking form
  'BOOK TICKET': 'टिकट बुक करें',
  'From Station': 'प्रस्थान स्टेशन',
  'To Station': 'गंतव्य स्टेशन',
  'All Classes': 'सभी श्रेणियां',
  'GENERAL': 'सामान्य',
  'Search Trains': 'ट्रेन खोजें',
  'DISHA Assistant': 'दिशा सहायक',
  
  // Main headings
  'INDIAN RAILWAYS': 'भारतीय रेल',
  'Safety | Security | Punctuality': 'सुरक्षा | सुरक्षा | समयबद्धता',
  
  // Footer sections
  'IRCTC Trains': 'आईआरसीटीसी ट्रेनें',
  'How To': 'कैसे करें',
  'IRCTC eWallet': 'आईआरसीटीसी ई-वॉलेट',
  'For Newly Migrated Agents': 'नए माइग्रेटेड एजेंट्स के लिए',
  'General Information': 'सामान्य जानकारी',
  'IRCTC Official App': 'आईआरसीटीसी आफिशियल ऐप',
  'IRCTC Loyalty Program': 'आईआरसीटीसी वफादारी प्रोग्राम',
  'Mobile Zone': 'मोबाइल ज़ोन',
  'Important Information': 'महत्वपूर्ण जानकारी',
  'Advertise with us': 'हमारे साथ विज्ञापन',
  'IRCTC-iPAY Payment Gateway': 'आईआरसीटीसी-आईपे पेमेंट गेटवे',
  'Policies': 'नीतियां',
  'Agents': 'एजेंट्स',
  'Refund Rules': 'रिफंड नियम',
  'IRCTC Zone': 'आईआरसीटीसी ज़ोन',
  'Ask Disha ChatBot': 'दिशा चैटबॉट से पूछें',
  'Enquiries': 'पूछताछ',
  'Person With Disability Facilities': 'दिव्यांग सुविधाएं',
  'About us': 'हमारे बारे में'
};

