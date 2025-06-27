const PgModel = require('../models/PgModel');

async function createPG(req, res) {
  try {
    console.log("🔥 POST /pg/create called");

    const {
      id_room,
      name,
      images,
      area,
      location,
      rent,
      seater,
      gender,
      isFeatured,
      soldOut,
      amenities,
      whatsIncluded,
      floor,
      roomNo,
      distanceFromAuto,
      distanceFromCollege,
      electricityPerUnit,
      isCoupleFriendly,
      isInternationalFriendly,
      isPetFriendly,
      ownerName,
      ownerNumber,
      caretakerName,
      caretakerNumber,
      description,
      note,
      isPublished,
      houseRules,
      listingDate,
      listedBy,
      commission,
    } = req.body;

    const newPG = new PgModel({
      id_room,
      name,
      images,
      area,
      location,
      rent,
      seater,
      gender,
      isFeatured,
      soldOut,
      amenities,
      whatsIncluded,
      floor,
      roomNo,
      distanceFromAuto,
      distanceFromCollege,
      electricityPerUnit,
      isCoupleFriendly,
      isInternationalFriendly,
      isPetFriendly,
      ownerName,
      ownerNumber,
      caretakerName,
      caretakerNumber,
      description,
      note,
      isPublished,
      houseRules,
      listingDate,
      listedBy,
      commission,
    });

    await newPG.save();

    res.status(201).json({
      message: 'PG listing created successfully',
      data: newPG,
      success: true,
    });

  } catch (error) {
    console.error('Error creating PG:', error);
    res.status(500).json({ message: 'Internal server error', success: false });
  }
}




async function getAllPGs(req, res) {
  try {
    const pgs = await PgModel.find();
    res.status(200).json({message: 'PGs fetched successfully', data: pgs,success: true});
  } catch (error) {
    console.error('Error fetching PGs:', error);
    res.status(500).json({ message: 'Internal server error', success: false  });
  }
}

async function getPGById(req, res) {
  try {
    const pg = await PgModel.findById(req.params.id);

    if (!pg) {
      return res.status(404).json({ message: 'PG not found', success: false });
    }
    res.status(200).json({ message: 'PG fetched successfully', data: pg, success: true });
  } catch (error) {
    console.error('Error fetching PG:', error);
    res.status(500).json({ message: 'Internal server error', success: false });
  }
}



module.exports = {
  getAllPGs,
  getPGById,
  createPG
};
