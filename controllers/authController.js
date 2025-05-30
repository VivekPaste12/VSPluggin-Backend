
import User from '../models/User.js';
import { generateToken } from '../utils/jwt.js';

export const signup=async(req,res)=>{
            console.log('SIGNUP API CALLED');

    try{
        console.log('SIGNUP API CALLED');
        const {email}=req.body;
        if (!email ) {
            return res.status(400).json({ error: 'Email and API key are required.' });
        }
        ;
        let user = await User.findOne({ email });

        if (user) {
            // user.apiKey = apiKey;
            await user.save();
        } else {
            console.error('Signup error:', 'User not found. Creating new user.');
            res.status(400).json({ error: 'User not found. Please sign up first.' });
            return;
        }        
        console.log('apiKey:', process.env.API_KEY);
        const sessionToken=generateToken({userId:user._id,email:user.email ,apiKey:process.env.API_KEY});
        res.status(201).json({ message: 'User signed up', sessionToken });

    }
    catch (error) {
        console.error('Signup error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}
export const trackUsage = async (req, res) => {
    try {
        const { email } = req.user;
        let { usage, tokenCount } = req.body;

        console.log('Tracking usage for email:', email, 'Usage:', usage, 'Token Count:', tokenCount);

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        if (typeof usage !== 'number' || usage < 1) {
            usage = 0; // Set to 0 if invalid
        }

        if (typeof tokenCount !== 'number' || tokenCount < 0) {
            tokenCount = 0; // Set to 0 if invalid
        }

        // Update both prompt count and token count
        const updateFields = {};
        if (usage > 0) {
            updateFields.promptCount = usage;
        }
        if (tokenCount > 0) {
            updateFields.tokenCount = tokenCount;
        }

        await User.findByIdAndUpdate(user._id, { $inc: updateFields });

        // Get updated user data
        const updatedUser = await User.findById(user._id);

        res.json({ 
            message: 'Usage tracked successfully',
            currentPromptCount: updatedUser.promptCount,
            currentTokenCount: updatedUser.tokenCount,
            threshold: 10 // This can be made configurable or stored in the database
        });
    } catch (error) {
        console.error('Error tracking usage:', error);
        res.status(500).json({ error: 'Failed to track usage' });
    }
};
