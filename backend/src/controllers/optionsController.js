exports.getOptions = async (req, res) => {
  try {
    const options = {
      className: [
        { id: 1, name: 'Class 6' },
        { id: 2, name: 'Class 7' },
        { id: 3, name: 'Class 8' },
        { id: 4, name: 'Class 9' },
        { id: 5, name: 'Class 10' }
      ],
      version: [
        { id: 1, name: 'Bangla' },
        { id: 2, name: 'English' }
      ],
      residency: [
        { id: 1, name: 'Resident' },
        { id: 2, name: 'Non-Resident' }
      ],
      gender: [
        { id: 1, name: 'Male' },
        { id: 2, name: 'Female' }
      ],
      batch: [
        { id: 1, name: 'Morning' },
        { id: 2, name: 'Day' }
      ],
      transport: [
        { id: 1, name: 'School Bus' },
        { id: 2, name: 'Own Transport' }
      ]
    };
    
    res.json(options);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
