const pgData = [
  {
    _id: "1",
    id_room: 1,
    name: "Sunrise PG",
    images: [
      "https://example.com/image1.jpg",
      "https://example.com/image2.jpg",
      "https://example.com/image3.jpg"
    ],
    area: "Law Gate",
    location: "LPU",
    rent: 7400,
    seater: "Double",
    gender: "Male",


    isFeatured: true,
    soldOut: true,
    amenities: {
      WiFi: true,
      AC: false,
      Locker: true,
      Cctv: true,
      Inverter: true,
      Kitchen: true,
      Parking: true,
      Balcony: false,
      Furnished: true,
      TV: true,
      FireSafety: true
    },

    whatsIncluded: {
      bedAndMattress: true,
      personalWardrobe: true,
      studyTable: true,
      cleaningService: true,
      geyser: true,
      highSpeedWifi: true,
      roPurifiedWater: true,
      cctv24x7: true,
      powerBackup: true
    },

    floor: 1,
    roomNo: 101,
    distanceFromAuto: 300,
    distanceFromCollege: 500,
    electricityPerUnit: 10,

    isCoupleFriendly: false,
    isInternationalFriendly: true,
    isPetFriendly: false,

    ownerName: "Rajesh Kumar",
    ownerNumber: "9876543210",
    caretakerName: "Suresh",
    caretakerNumber: "9123456789",

    description: "Well-maintained PG with essential amenities near the college.",
    note: "Needs repainting in corridor area.",

    isPublished: true,
    houseRules: {
      gateOpenTime: "6:00 AM",
      gateCloseTime: "11:00 PM",
      visitorAllowed: true,
      smokingAllowed: true,
      coupleFriendly: true
    },
    listingDate: new Date("2025-06-10"),
    listedBy: "PG Plus Brokers",
    commission: 2000
  },
  {
    _id: "2",
    id_room: 2,
    name: "Comfort Nest PG",
    images: [
      "https://example.com/pg2_img1.jpg",
      "https://example.com/pg2_img2.jpg",
      "https://example.com/pg2_img3.jpg"
    ],
    area: "Law Gate",
    location: "LPU",
    rent: 9500,
    seater: "Single",
    gender: "Female",
    isFeatured: true,
    soldOut: false,
    amenities: {
      WiFi: true,
      AC: false,
      Locker: true,
      Cctv: true,
      Inverter: true,
      Kitchen: true,
      Parking: true,
      Balcony: false,
      Furnished: true,
      TV: true,
      FireSafety: true
    },

    whatsIncluded: {
      bedAndMattress: true,
      personalWardrobe: true,
      studyTable: true,
      cleaningService: true,
      geyser: true,
      highSpeedWifi: true,
      roPurifiedWater: true,
      cctv24x7: true,
      powerBackup: true
    },

    floor: 2,
    roomNo: 205,
    distanceFromAuto: 150,
    distanceFromCollege: 800,
    electricityPerUnit: 12,

    isCoupleFriendly: false,
    isInternationalFriendly: true,
    isPetFriendly: true,

    ownerName: "Anita Sharma",
    ownerNumber: "9988776655",
    caretakerName: "Neha",
    caretakerNumber: "9001122334",

    description: "Premium ladies PG with balcony and AC rooms.",
    note: "Verify geyser servicing by 30th June.",

    isPublished: true,
    houseRules: {
      gateOpenTime: "6:00 AM",
      gateCloseTime: "11:00 PM",
      visitorAllowed: true,
      smokingAllowed: true,
      coupleFriendly: true
    },
    listingDate: new Date("2025-06-10"),
    listedBy: "PG Plus Brokers",
    commission: 2000
  }
];

export default pgData;