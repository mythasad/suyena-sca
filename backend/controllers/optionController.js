import Student from '../models/studentSchema.model.js';

export const getAllOptions = async (req, res) => {
    try {
        // Validate schema paths exist
        const requiredPaths = ['className', 'version', 'residency', 'gender', 'batch', 'transport'];
        for (const path of requiredPaths) {
            if (!Student.schema.path(path)) {
                throw new Error(`Schema path ${path} not found`);
            }
        }

        const options = {
            classes: Student.schema.path('className').enumValues || [],
            versions: Student.schema.path('version').enumValues || [],
            residencies: Student.schema.path('residency').enumValues || [],
            genders: Student.schema.path('gender').enumValues || [],
            batches: Student.schema.path('batch').enumValues || [],
            transports: Student.schema.path('transport').enumValues || [],
        };
        
        // Validate we have values
        if (Object.values(options).some(arr => !arr.length)) {
            console.warn('Some options are empty:', options);
        }

        console.log('Sending options:', options);
        res.json(options);
    } catch (error) {
        console.error('Error in getAllOptions:', error);
        res.status(500).json({ 
            message: 'Error fetching options',
            error: error.message 
        });
    }
};
