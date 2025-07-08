const PgModel = require('../models/PgModel');
const { imageUpload ,multipleImageUpload} = require('../utils/imageUpload');

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




// async function uploadImageController(req,res){
//   try {
//     console.log(req.files);
//     if (!req.files || !req.files.imageFiles) {
//           return res.status(400).json({
//             success:false,
//             message:'file not get from incoming request!!!',
//             data:{}
//           })
//     }

//     const url=await imageUpload(req);

//     res.status(200).json({
//       success:true,
//       message:'image uploaded Successfully',
//       data:{
//         Url:url
//       }
//     });

//   } catch (error) {
//     console.log(error.message);
//     res.status(500).json({
//       success:false,
//       message:'Internal server Error!!!!!!!!',
//       data:{}
//     })
//   }
// }

async function uploadImageController(req, res) {
  try {
    console.log(req.files);

    if (!req.files || !req.files.imageFiles) {
      return res.status(400).json({
        success: false,
        message: 'No image files received from the request!',
        data: {}
      });
    }

    const urls = await multipleImageUpload(req);

    res.status(200).json({
      success: true,
      message: 'Images uploaded successfully!',
      data: {
        urls
      }
    });

  } catch (error) {
    console.log("Upload Controller Error:", error.message);
    res.status(500).json({
      success: false,
      message: 'Internal Server Error',
      data: {}
    });
  }
}



module.exports = {
  getAllPGs,
  getPGById,
  createPG,
  uploadImageController
};
