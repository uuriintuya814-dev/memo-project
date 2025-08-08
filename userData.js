// At the top of your script, add these variables
let coinsEarned = 0;
let diamondsEarned = 0;
const COIN_REWARD = 10; // Coins per correct answer
const DIAMOND_REWARD = 2; // Diamonds per correct answer
const userDataManager = {
  saveUserData: (data) => {
    localStorage.setItem("userData", JSON.stringify(data));
  },

  loadUserData: () => {
    const data = localStorage.getItem("userData");
    return data ? JSON.parse(data) : null;
  },

  initializeUserData: () => {
    const defaultData = {
      coin: 4892,
      diamond: 8219,
      point: 0,
      backgroundColor: "rgb(255, 226, 234)",
      profileImage: "images/avatar (4).png", // Default matches initial hero
      selectedHero: "images/avatar (4).png",
    };
    userDataManager.saveUserData(defaultData);
    return defaultData;
  },

  updateBackgroundColor: (color) => {
    const data =
      userDataManager.loadUserData() || userDataManager.initializeUserData();
    data.backgroundColor = color;
    userDataManager.saveUserData(data);
    return data;
  },

  updateSelectedHero: (heroPath) => {
    const data =
      userDataManager.loadUserData() || userDataManager.initializeUserData();
    data.selectedHero = heroPath;
    data.profileImage = heroPath; // Update both at the same time
    userDataManager.saveUserData(data);
    return data;
  },
};

document.addEventListener("DOMContentLoaded", () => {
  // Initialize or load data
  const userData =
    userDataManager.loadUserData() || userDataManager.initializeUserData();

  // Set initial background
  document.body.style.backgroundColor = userData.backgroundColor;

  // Get all necessary elements
  const profileImg = document.querySelector(".profile-img img");
  const mainHeroImg = document.querySelector(".hero img"); // Big middle hero
  const heroCards = document.querySelectorAll(".hero-card img");

  // Set initial state
  if (profileImg) profileImg.src = userData.profileImage;
  if (mainHeroImg) mainHeroImg.src = userData.selectedHero;

  // Highlight initially selected hero
  heroCards.forEach((card) => {
    if (card.src.includes(userData.selectedHero)) {
      card.classList.add("selected");
    }
  });

  // Background color selection
  document.querySelectorAll(".color").forEach((box) => {
    if (box.style.backgroundColor === userData.backgroundColor) {
      box.classList.add("selected");
    }

    box.addEventListener("click", () => {
      const bgColor = box.style.backgroundColor;
      document.body.style.backgroundColor = bgColor;
      userDataManager.updateBackgroundColor(bgColor);

      document
        .querySelectorAll(".color")
        .forEach((c) => c.classList.remove("selected"));
      box.classList.add("selected");
    });
  });

  // Hero selection - THIS IS THE FIXED PART
  heroCards.forEach((card) => {
    card.addEventListener("click", () => {
      const heroPath = card.src;

      // Update both profile and main hero
      if (profileImg) profileImg.src = heroPath;
      if (mainHeroImg) mainHeroImg.src = heroPath;

      // Update data storage
      userDataManager.updateSelectedHero(heroPath);

      // Update selection highlights
      heroCards.forEach((c) => c.classList.remove("selected"));
      card.classList.add("selected");
    });
  });
});
