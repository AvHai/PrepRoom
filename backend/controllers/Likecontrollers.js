import { handleError } from "../helpers/handleError.js"
import Like from "../models/likeModel.js"

export const doLike = async (req, res, next) => {
    try {
        const { userid, interviewid } = req.body;
        if (!userid || !interviewid) {
            return res.status(400).json({ message: "userid and interviewid required" });
        }

        let like = await Like.findOne({ userid, interviewid });

        if (!like) {
            like = await new Like({ userid, interviewid }).save();
        } else {
            await Like.findByIdAndDelete(like._id);
        }

       

        const likeCount = await Like.countDocuments({ interviewid });

        res.status(200).json({
            likeCount
        });

    } catch (error) {
        next(handleError(500, error.message));
    }
};

export const likeCount = async (req, res, next) => {
    try {
        const { interviewid } = req.params;
        const likeCount = await Like.countDocuments({ interviewid });
        res.status(200).json({
            likeCount
        })
    } catch (error) {
        next(handleError(500, error.message));
    }
};