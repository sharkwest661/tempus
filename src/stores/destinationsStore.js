// src/stores/destinationsStore.js
import { create } from "zustand";

// Mock data for civilizations and destinations
const CIVILIZATIONS = [
  {
    id: "egypt",
    name: "Ancient Egypt",
    description:
      "The mysterious land of pyramids and pharaohs, where ancient wonders await.",
    longDescription: `Experience the majesty of one of the world's oldest civilizations along the timeless Nile River. Marvel at the architectural genius of the Great Pyramids, stand in awe before the enigmatic Sphinx, and wander through the magnificent temples of Luxor and Karnak. Explore the bustling markets of Alexandria, founded by Alexander the Great himself! From hieroglyphics to mummification, Egypt offers a journey through time that no Roman citizen should miss.`,
    regions: ["Giza", "Luxor", "Alexandria"],
    accentColor: "accentEgypt",
    keyAttractions: [
      "Great Pyramids",
      "Sphinx",
      "Temple of Karnak",
      "Library of Alexandria",
    ],
    localCurrency: "Deben",
    travelTimeFromRome: "3 weeks by sea",
    dangerLevel:
      "Low - Egypt is a Roman province with excellent roads and security",
    bestSeasonToVisit: "Winter (when the heat is tolerable)",
    image: "egypt.jpg",
  },
  {
    id: "greece",
    name: "Ancient Greece",
    description: "Birthplace of democracy, philosophy, and Olympic games.",
    longDescription: `Visit the cultural cradle of the Mediterranean where philosophy, democracy, and the Olympic games were born. Ascend the Acropolis to behold the architectural marvel of the Parthenon. Wander through Athens, where Socrates, Plato, and Aristotle once debated in the agora. Test your physical prowess in Olympia, birthplace of the sacred games. Experience the spiritual awe of the Oracle at Delphi. Though Greece is now part of our glorious Roman Empire, the unique cultural heritage remains intact and is a must-see for any educated citizen.`,
    regions: ["Athens", "Sparta", "Delphi", "Olympia"],
    accentColor: "accentGreece",
    keyAttractions: [
      "Parthenon",
      "Delphi Oracle",
      "Olympic Stadium",
      "Agora of Athens",
    ],
    localCurrency: "Drachma (though Roman coins accepted everywhere)",
    travelTimeFromRome: "2 weeks by sea, 3 weeks by land",
    dangerLevel: "Very Low - Roman presence ensures excellent safety",
    bestSeasonToVisit: "Spring or Autumn",
    image: "greece.jpg",
  },
  {
    id: "china",
    name: "Ancient China",
    description: "The mysterious Far East, land of silk and innovations.",
    longDescription: `Journey to the fabled land of Serica (as we Romans call it), the realm of silk at the very edge of the known world. This mysterious eastern empire rivals our own in grandeur and innovation. Marvel at the Great Wall, stretching across mountains and deserts. Witness the terracotta army of Emperor Qin Shi Huang, a legion of clay warriors buried to protect their emperor in the afterlife. Sample exotic delicacies and bring back treasured silks and spices that fetch astronomical prices in Roman markets. Note: This destination requires special travel permits and a certified guide from the Merchant Guild of Alexandria.`,
    regions: ["Chang'an", "Luoyang", "Silk Road Oases"],
    accentColor: "accentChina",
    keyAttractions: [
      "Great Wall",
      "Terracotta Army",
      "Imperial Palace",
      "Silk Markets",
    ],
    localCurrency: "Ban Liang coins (Bring silver for trade)",
    travelTimeFromRome: "8 months via Silk Road caravans",
    dangerLevel: "High - Requires armed escort and official permissions",
    bestSeasonToVisit: "Autumn (avoid monsoon season)",
    image: "china.jpg",
  },
  {
    id: "persia",
    name: "Persia",
    description:
      "Luxurious palaces and exotic gardens in the land of the Parthians.",
    longDescription: `Venture into the domain of Rome's greatest rival, the Parthian Empire. Through special diplomatic arrangements, Roman citizens can now explore the wonders of ancient Persia (with proper documentation). Visit the stunning capital of Ctesiphon with its enormous vaulted arch, the largest in the world. Wander through the ruins of Persepolis, the ceremonial capital of the former Achaemenid Empire. Travel the famed Royal Road and marvel at the sophisticated postal system. Experience Persian luxury with their elaborate gardens, intricate carpets, and legendary hospitality. A destination for the bold Roman traveler!`,
    regions: ["Ctesiphon", "Persepolis", "Ecbatana"],
    accentColor: "accentPersia",
    keyAttractions: [
      "Arch of Ctesiphon",
      "Persepolis Palace",
      "Royal Road",
      "Hanging Gardens",
    ],
    localCurrency: "Drachms (Roman gold solidi highly valued)",
    travelTimeFromRome: "2 months by land routes",
    dangerLevel: "Moderate - Requires special permits and escort",
    bestSeasonToVisit: "Spring, when the gardens are in bloom",
    image: "persia.jpg",
  },
  {
    id: "carthage",
    name: "Carthage",
    description:
      "Once Rome's greatest enemy, now a thriving Roman province in North Africa.",
    longDescription: `Visit the reborn city that once challenged Rome for Mediterranean supremacy! After being famously destroyed and rebuilt by Romans, Carthage is now a magnificent showcase of Roman urban planning while still preserving elements of its Punic heritage. Explore the busy harbor that once housed the mighty Carthaginian fleet, stroll through the unique tophet sanctuary, and enjoy the stunning Roman baths with views of the Mediterranean. The famous amphitheater hosts spectacular gladiatorial games, and the local cuisine offers a delicious blend of African, Roman, and Phoenician flavors. A historically significant destination just a short sea journey from Rome!`,
    regions: ["Carthage City", "Utica", "Cape Bon"],
    accentColor: "accentEgypt", // Using Egypt accent as fallback
    keyAttractions: [
      "Antonine Baths",
      "Byrsa Hill",
      "Amphitheater",
      "Punic Ports",
    ],
    localCurrency: "Roman currency (denarii and sestertii)",
    travelTimeFromRome: "5 days by sea in good weather",
    dangerLevel: "Very Low - Well-established Roman province",
    bestSeasonToVisit: "Spring or Autumn (summer is extremely hot)",
    image: "carthage.jpg",
  },
];

// Tour packages data
const TOURS = [
  // Egypt Tours
  {
    id: "egypt-1",
    civilizationId: "egypt",
    name: "Pyramids & Sphinx Expedition",
    description:
      "Witness the architectural marvels of Ancient Egypt on this 10-day journey.",
    longDescription: `Marvel at the only surviving Wonder of the World on this premium tour of Giza and Memphis. Your Roman guide, a former legion officer who served in the Egyptian province, will explain how these massive structures were built without modern machinery. You'll have exclusive access to chambers normally closed to the public, and a private audience with Egyptian priests who will explain their mysterious religion and customs. Tour includes a boat journey on the sacred Nile and accommodation in a luxury villa with Roman amenities.`,
    duration: 10,
    price: 1200, // in denarii
    difficulty: "Moderate",
    included: [
      "Luxury accommodation",
      "Local guides",
      "Meals",
      "Private riverboat tour",
      "Camel transportation",
    ],
    highlights: [
      "Private access to Pyramid chambers",
      "Sphinx viewing at sunset",
      "Meeting with Egyptian priests",
      "Traditional banquet",
    ],
    startingPoint: "Alexandria port",
    maxTravelers: 12,
    image: "egypt-tour-1.jpg",
    reviews: [
      {
        author: "Gaius Valerius",
        rating: 5,
        comment:
          "By Jupiter! These Egyptians build like they have the gods' assistance. Our guide Marcus knew everything about their strange animal gods. Worth every denarius!",
      },
      {
        author: "Livia Juliana",
        rating: 4,
        comment:
          "The Pyramids are truly impressive. One star deducted for the heat and sand that gets everywhere. Bring a good slave to fan you!",
      },
    ],
  },
  {
    id: "egypt-2",
    civilizationId: "egypt",
    name: "Alexandria Literary Tour",
    description:
      "Explore the intellectual capital of the Mediterranean and its Great Library.",
    longDescription: `Immerse yourself in the intellectual legacy of Alexandria, founded by Alexander the Great himself. The centerpiece of your tour will be VIP access to the Great Library of Alexandria, the largest repository of knowledge in the world. Meet with scholars and learn about papyrus-making, astronomy, and mathematics. This tour focuses on the Hellenistic and Roman influence in Egypt, with accommodations in a Greek-style villa near the famous Lighthouse. Perfect for philosophers, writers, and educated patricians looking for intellectual stimulation.`,
    duration: 7,
    price: 900,
    difficulty: "Easy",
    included: [
      "Scholar-led tours",
      "Papyrus-making workshop",
      "Luxury accommodation",
      "All meals",
      "Port transfers",
    ],
    highlights: [
      "Great Library of Alexandria",
      "Lighthouse viewing",
      "Philosophical banquet",
      "Ptolemaic palace tour",
    ],
    startingPoint: "Alexandria port",
    maxTravelers: 8,
    image: "egypt-tour-2.jpg",
    reviews: [
      {
        author: "Cicero Secundus",
        rating: 5,
        comment:
          "The Library is more impressive than the Senate archives! Brought back three scrolls of Egyptian medicine. Our philosophical discussions with local scholars were enlightening.",
      },
    ],
  },

  // Greece Tours
  {
    id: "greece-1",
    civilizationId: "greece",
    name: "Athenian Democracy Experience",
    description:
      "Walk in the footsteps of the great philosophers and statesmen of Athens.",
    longDescription: `Experience the birthplace of democracy and philosophy on this intellectual journey through Athens. Visit the Acropolis and Parthenon with an expert guide who will explain how these barbarians (albeit sophisticated ones) laid the groundwork for many Roman institutions. Participate in a recreated assembly debate on the Pnyx hill, visit the agora where Socrates taught, and enjoy symposium-style dinners with poetry and philosophical discussions. This tour is ideal for senators, lawyers, and educated citizens interested in the origins of our political systems.`,
    duration: 8,
    price: 800,
    difficulty: "Easy",
    included: [
      "4-star accommodation",
      "Philosophical guide",
      "Daily breakfast and dinner",
      "Symposium experience",
      "Theater performance",
    ],
    highlights: [
      "Acropolis and Parthenon",
      "Ancient Agora",
      "Mock assembly debate",
      "Olympic Stadium",
    ],
    startingPoint: "Piraeus port",
    maxTravelers: 15,
    image: "greece-tour-1.jpg",
    reviews: [
      {
        author: "Senator Gracchus",
        rating: 5,
        comment:
          'As a senator, I found their "democracy" quaint but fascinating. The guide was excellent at comparing Greek and Roman governance. The symposium was most enjoyable, though their wine needs work.',
      },
    ],
  },
  {
    id: "greece-2",
    civilizationId: "greece",
    name: "Spartan Military Training",
    description:
      "Test your strength and endurance in the ultimate warrior society.",
    longDescription: `Challenge yourself with this unique physical experience in the footsteps of Sparta's legendary warriors. This intensive tour includes daily training sessions led by former legionaries who have studied Spartan techniques, simplified battle reenactments, and tactical discussions. Visit the historic battlefields of Thermopylae and learn about the famous 300. Accommodations are intentionally austere (though with Roman baths available) to replicate the Spartan experience. Participants receive a replica Spartan shield (aspis) to take home.`,
    duration: 5,
    price: 650,
    difficulty: "Very Difficult",
    included: [
      "Military-style accommodation",
      "Training equipment",
      "All meals (authentically plain)",
      "Battlefield tours",
      "Replica shield",
    ],
    highlights: [
      "Daily training regimen",
      "Battle tactics workshop",
      "Thermopylae visit",
      "Warrior feast finale",
    ],
    startingPoint: "Gythio port",
    maxTravelers: 20,
    image: "greece-tour-2.jpg",
    reviews: [
      {
        author: "Centurion Maximus",
        rating: 4,
        comment:
          'Good physical challenge, though our Roman training is superior. The Spartan shield is a fine souvenir. One warning: the "authentic" sleeping arrangements are truly spartan!',
      },
    ],
  },

  // China Tours
  {
    id: "china-1",
    civilizationId: "china",
    name: "Silk Road Expedition",
    description:
      "Travel the legendary trade route to the edge of the known world.",
    longDescription: `Embark on the journey of a lifetime along the famous Silk Road, following in the footsteps of brave merchants who bring exotic goods to Rome. This premium caravan experience takes you through deserts, mountains, and oases to reach the western frontier of the mysterious Seres (China). Learn the art of silk trading, jade identification, and caravan diplomacy. Meet with actual merchants and diplomats. Due to the length and complexity of this journey, travelers must pass a health examination before booking. Includes comfortable accommodations at the finest inns and caravanserais along the route, with Roman-style bathing facilities installed where possible.`,
    duration: 90,
    price: 8000,
    difficulty: "Extreme",
    included: [
      "Luxury caravan transport",
      "Armed escort",
      "All accommodations",
      "Meals",
      "Trading permits",
      "Silk purchasing rights",
    ],
    highlights: [
      "Desert crossing",
      "Mountain passes",
      "Silk markets",
      "Diplomatic meetings with local officials",
    ],
    startingPoint: "Antioch",
    maxTravelers: 8,
    image: "china-tour-1.jpg",
    reviews: [
      {
        author: "Merchant Crassus",
        rating: 5,
        comment:
          "A life-changing journey! The profits from my silk purchases have already paid for the trip twice over. The Chinese technology is astonishing. Bring gifts for local officials to ensure smooth passage.",
      },
    ],
  },
  {
    id: "china-2",
    civilizationId: "china",
    name: "Terracotta Army & Imperial Wonders",
    description:
      "Witness the clay army of Emperor Qin and the splendors of the Han Dynasty.",
    longDescription: `This exclusive tour brings you to the heart of Serica (China), to witness wonders that few Romans have seen. The centerpiece is the awe-inspiring Terracotta Army - thousands of life-sized clay soldiers buried to protect Emperor Qin in the afterlife. Then visit the Han imperial capital of Chang'an, a city that rivals Rome in size and grandeur. Learn about Chinese engineering, including their paper-making technology, advanced metallurgy, and mysterious compass devices. This rare opportunity includes special diplomatic permissions and is led by a multilingual guide familiar with both Roman and Chinese customs. A truly once-in-a-lifetime experience for elite Roman travelers.`,
    duration: 120,
    price: 12000,
    difficulty: "Hard",
    included: [
      "Diplomatic escort",
      "Luxury accommodations",
      "Imperial banquets",
      "Private viewings",
      "Translation services",
      "Silk Road transport",
    ],
    highlights: [
      "Terracotta Army exclusive access",
      "Imperial palace visit",
      "Technology demonstrations",
      "Luxury silk workshop",
    ],
    startingPoint: "Antioch",
    maxTravelers: 6,
    image: "china-tour-2.jpg",
    reviews: [
      {
        author: "Senator Antonius",
        rating: 5,
        comment:
          "Worth every denarius of the considerable cost! The Terracotta Army left me speechless - their emperor must have been as powerful as our Caesar. The distant journey is arduous but well-managed by the tour company.",
      },
    ],
  },

  // Persia Tours
  {
    id: "persia-1",
    civilizationId: "persia",
    name: "Royal Persian Experience",
    description:
      "Live like Persian royalty amidst stunning palaces and legendary gardens.",
    longDescription: `Experience the luxurious lifestyle of our great rivals, the Parthians, with this diplomatic tour to the heart of Persia. Through special arrangements with Parthian authorities, Roman citizens can now visit Ctesiphon and other Persian cities with proper documentation. Stay in authentic Persian palaces, wander through the famous paradise gardens, and enjoy exotic cuisine including the strange "sugar" delicacy. Tour the massive Arch of Ctesiphon, the largest single-span arch in the world. Special diplomatic exemptions allow Romans to observe (but not participate in) Zoroastrian fire ceremonies. This tour requires signed diplomatic waivers and includes an armed escort throughout.`,
    duration: 14,
    price: 3000,
    difficulty: "Moderate",
    included: [
      "Palace accommodation",
      "Diplomatic escort",
      "Luxury meals",
      "Paradise garden tours",
      "Royal Road travel",
    ],
    highlights: [
      "Ctesiphon Arch",
      "Royal banquet",
      "Paradise gardens",
      "Carpet workshop",
    ],
    startingPoint: "Syrian border at Dura-Europos",
    maxTravelers: 10,
    image: "persia-tour-1.jpg",
    reviews: [
      {
        author: "Patricius Aurelius",
        rating: 4,
        comment:
          "Their luxury rivals anything in Rome! The arch at Ctesiphon is truly impressive. Constant reminders that we are in enemy territory were sobering, but the diplomatic arrangements worked smoothly. Try the strange iced fruit desserts!",
      },
    ],
  },

  // Carthage Tours
  {
    id: "carthage-1",
    civilizationId: "carthage",
    name: "Carthaginian Legacy Tour",
    description: "Explore the reborn city that once rivaled Rome.",
    longDescription: `Visit the famous city that once challenged Rome for Mediterranean dominance in this historically fascinating tour. See how Roman engineering and urban planning transformed the destroyed Punic city into a Roman masterpiece while still preserving elements of its unique heritage. Tour the famous harbor that once housed Hannibal's fleet, now serving Roman merchant vessels. Visit the stunning Antonine Baths, largest outside of Rome itself. Enjoy authentic Carthaginian cuisine with Roman influences. This tour offers a perfect introduction to Roman Africa and includes optional day trips to nearby Roman settlements. Comfortable villa accommodation with ocean views makes this an ideal introduction to foreign travel for Roman citizens.`,
    duration: 7,
    price: 600,
    difficulty: "Easy",
    included: [
      "Villa accommodation",
      "Harbor cruise",
      "Bath access",
      "All meals",
      "Local wine tasting",
    ],
    highlights: [
      "Antonine Baths",
      "Reconstructed harbor",
      "Byrsa Hill",
      "Punic ruins",
    ],
    startingPoint: "Ostia port",
    maxTravelers: 20,
    image: "carthage-tour-1.jpg",
    reviews: [
      {
        author: "Julia Tertia",
        rating: 5,
        comment:
          "A perfect first journey outside Italy! The baths are magnificent, and our guide's stories about the Punic Wars from the Carthaginian perspective were fascinating. The African sun is intense - bring a good hat!",
      },
    ],
  },
];

const useDestinationsStore = create((set, get) => ({
  civilizations: CIVILIZATIONS,
  tours: TOURS,
  selectedCivilization: null,
  selectedTour: null,
  filteredTours: [],
  isLoading: false,
  error: null,

  // Get all civilizations
  getCivilizations: () => {
    return get().civilizations;
  },

  // Get a specific civilization by ID
  getCivilization: (id) => {
    return get().civilizations.find((civ) => civ.id === id);
  },

  // Set selected civilization
  setSelectedCivilization: (id) => {
    const civilization = get().civilizations.find((civ) => civ.id === id);
    set({
      selectedCivilization: civilization,
      filteredTours: get().tours.filter((tour) => tour.civilizationId === id),
    });
  },

  // Get all tours
  getTours: () => {
    return get().tours;
  },

  // Get tours for a specific civilization
  getToursByCivilization: (civilizationId) => {
    return get().tours.filter((tour) => tour.civilizationId === civilizationId);
  },

  // Get a specific tour by ID
  getTour: (id) => {
    return get().tours.find((tour) => tour.id === id);
  },

  // Set selected tour
  setSelectedTour: (id) => {
    const tour = get().tours.find((tour) => tour.id === id);
    set({ selectedTour: tour });
  },

  // Clear selections
  clearSelections: () => {
    set({
      selectedCivilization: null,
      selectedTour: null,
      filteredTours: [],
    });
  },

  // Get featured tours (can be customized based on criteria)
  getFeaturedTours: () => {
    return [
      get().tours.find((tour) => tour.id === "egypt-1"),
      get().tours.find((tour) => tour.id === "greece-2"),
      get().tours.find((tour) => tour.id === "china-1"),
    ].filter(Boolean); // Filter out any undefined values
  },

  // Search tours by name or description
  searchTours: (query) => {
    const searchTerm = query.toLowerCase();
    const results = get().tours.filter(
      (tour) =>
        tour.name.toLowerCase().includes(searchTerm) ||
        tour.description.toLowerCase().includes(searchTerm)
    );
    set({ filteredTours: results });
    return results;
  },

  // Filter tours by price range
  filterToursByPrice: (minPrice, maxPrice) => {
    const results = get().tours.filter(
      (tour) => tour.price >= minPrice && tour.price <= maxPrice
    );
    set({ filteredTours: results });
    return results;
  },

  // Filter tours by duration
  filterToursByDuration: (minDays, maxDays) => {
    const results = get().tours.filter(
      (tour) => tour.duration >= minDays && tour.duration <= maxDays
    );
    set({ filteredTours: results });
    return results;
  },

  // Reset filters
  resetFilters: () => {
    const civilizationId = get().selectedCivilization?.id;
    if (civilizationId) {
      set({
        filteredTours: get().tours.filter(
          (tour) => tour.civilizationId === civilizationId
        ),
      });
    } else {
      set({ filteredTours: [] });
    }
  },
}));

export default useDestinationsStore;
