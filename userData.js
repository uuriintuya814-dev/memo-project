// Хэрэглэгчийн өгөгдөл хадгалах функцууд
const userDataManager = {
  // Хэрэглэгчийн өгөгдөл хадгалах
  saveUserData: (data) => {
    localStorage.setItem('userData', JSON.stringify(data));
  },
  
  // Хэрэглэгчийн өгөгдөл дуудах
  loadUserData: () => {
    const data = localStorage.getItem('userData');
    return data ? JSON.parse(data) : null;
  },
  
  // Анхны өгөгдөл үүсгэх
  initializeUserData: () => {
    const defaultData = {
      coin: 4892,
      diamond: 8219,
      point: 0,
      backgroundColor: 'rgb(255, 226, 234)',
      profileImage: 'images/pro.jpg',
      selectedHero: 'images/avatar (4).png'
    };
    userDataManager.saveUserData(defaultData);
    return defaultData;
  },
  
  // Coin шинэчлэх
  updateCoin: (amount) => {
    const data = userDataManager.loadUserData() || userDataManager.initializeUserData();
    data.coin = amount;
    userDataManager.saveUserData(data);
    return data;
  },
  
  // Diamond шинэчлэх
  updateDiamond: (amount) => {
    const data = userDataManager.loadUserData() || userDataManager.initializeUserData();
    data.diamond = amount;
    userDataManager.saveUserData(data);
    return data;
  },
  
  // Point шинэчлэх
  updatePoint: (amount) => {
    const data = userDataManager.loadUserData() || userDataManager.initializeUserData();
    data.point = amount;
    userDataManager.saveUserData(data);
    return data;
  },
  
  // Background color шинэчлэх
  updateBackgroundColor: (color) => {
    const data = userDataManager.loadUserData() || userDataManager.initializeUserData();
    data.backgroundColor = color;
    userDataManager.saveUserData(data);
    return data;
  },
  
  // Profile image шинэчлэх
  updateProfileImage: (imagePath) => {
    const data = userDataManager.loadUserData() || userDataManager.initializeUserData();
    data.profileImage = imagePath;
    userDataManager.saveUserData(data);
    return data;
  },
  
  // Сонгогдсон герой шинэчлэх
  updateSelectedHero: (heroPath) => {
    const data = userDataManager.loadUserData() || userDataManager.initializeUserData();
    data.selectedHero = heroPath;
    userDataManager.saveUserData(data);
    return data;
  }
};

// DOM бэлэн үед өгөгдөл ачаална
document.addEventListener('DOMContentLoaded', () => {
  // Хэрэглэгчийн өгөгдөл дуудах эсвэл анхны утгаар үүсгэх
  let userData = userDataManager.loadUserData();
  if (!userData) {
    userData = userDataManager.initializeUserData();
  }
  
  // UI шинэчлэх функц
  const updateUI = (data) => {
    // Currency хэсэг
    document.querySelector('.currency:nth-child(1) span').textContent = data.coin.toLocaleString();
    document.querySelector('.currency:nth-child(2) span').textContent = data.diamond.toLocaleString();
    
    // Background color
    document.body.style.backgroundColor = data.backgroundColor;
    
    // Profile image
    const profileImg = document.querySelector('.profile-img img');
    if (profileImg) {
      profileImg.src = data.profileImage;
    }
    
    // Main hero image
    const mainHero = document.querySelector('.hero img');
    if (mainHero) {
      mainHero.src = data.selectedHero;
    }
    
    // Сонгогдсон өнгө, геройг тодруулах
    const colorBoxes = document.querySelectorAll('.color');
    colorBoxes.forEach(box => {
      if (box.style.backgroundColor === data.backgroundColor) {
        box.classList.add('selected');
      }
    });
    
    const heroCards = document.querySelectorAll('.hero-card img');
    heroCards.forEach(card => {
      if (card.src.includes(data.selectedHero.split('/').pop())) {
        card.classList.add('selected');
      }
    });
  };
  
  // UI шинэчлэх
  updateUI(userData);
  
  // Герой сонгох event listener
  const heroCards = document.querySelectorAll('.hero-card img');
  const mainHero = document.querySelector('.hero img');
  const profileHero = document.querySelector('.profile-img img');
  
  heroCards.forEach(card => {
    card.addEventListener('click', () => {
      if (mainHero) mainHero.src = card.src;
      if (profileHero) profileHero.src = card.src;
      
      // Өгөгдөл шинэчлэх
      userDataManager.updateProfileImage(card.src);
      userDataManager.updateSelectedHero(card.src);
      
      // UI шинэчлэх
      heroCards.forEach(c => c.classList.remove('selected'));
      card.classList.add('selected');
    });
  });
  
  // Өнгө сонгох event listener
  const colorBoxes = document.querySelectorAll('.color');
  
  colorBoxes.forEach(box => {
    box.addEventListener('click', () => {
      const bgColor = box.style.backgroundColor;
      document.body.style.backgroundColor = bgColor;
      
      // Өгөгдөл шинэчлэх
      userDataManager.updateBackgroundColor(bgColor);
      
      // UI шинэчлэх
      colorBoxes.forEach(c => c.classList.remove('selected'));
      box.classList.add('selected');
    });
  });
});