import User from '../models/user';
import { BadRequestError, NotFoundError } from '../errors/index';
import { StatusCodes } from 'http-status-codes';
import { Request, Response } from 'express';

export const getUser = async (req: Request, res: Response) => {
  const user = await User.findById(req.params.id).populate(
    'friends',
    'username profilePicture'
  );
  // @ts-ignore
  const { password, updatedAt, ...other } = user._doc;
  res.status(StatusCodes.OK).json(other);
};

export const getUserInfo = async (req: Request, res: Response) => {
  const user = await User.findById(req.user.id)
    .populate('friends', 'username profilePicture')
    .populate('friendRequests', 'from to createdAt');
  let fullUser = await User.populate(user, {
    path: 'friendRequests.from',
    select: 'username profilePicture',
  });
  fullUser = await User.populate(user, {
    path: 'friendRequests.to',
    select: 'username profilePicture',
  });

  res.status(StatusCodes.OK).json(fullUser);
};

export const updateUser = async (req: Request, res: Response) => {
  const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  }).populate('following', 'profilePicture username');
  res.status(StatusCodes.OK).json(updatedUser);
};

export const deleteUser = async (req: Request, res: Response) => {
  if (req.user.id === req.params.id || req.body.isAdmin) {
    await User.findByIdAndDelete(req.params.id);
    return res
      .status(StatusCodes.OK)
      .json({ message: 'Account has been deleted' });
  } else {
    throw new BadRequestError('You can only delete your account');
  }
};

// export const followUser = async (req: Request, res: Response) => {
//   if (req.user.id !== req.params.id) {
//     const user = await User.findById(req.params.id);
//     let currentUser = await User.findById(req.user.id);
//     if (user) {
//       if (currentUser) {
//         // @ts-ignore
//         if (!user?.followers.includes(req.user.id)) {
//           // @ts-ignore
//           await user.updateOne({ $push: { followers: req.user.id } });
//           // @ts-ignore
//           currentUser = await User.findByIdAndUpdate(
//             currentUser._id,
//             {
//               // @ts-ignore
//               $push: { following: req.params.id },
//             },
//             {
//               new: true,
//               runValidators: true,
//             }
//           ).populate('following', 'username profilePicture');
//           return res.status(StatusCodes.OK).json(currentUser?.following);
//         } else {
//           throw new NotFoundError(`User with id ${req.params.id} not found`);
//         }
//       } else {
//         throw new NotFoundError(`User with id ${req.user.id} not found`);
//       }
//     } else {
//       throw new BadRequestError('You already follow this user');
//     }
//   } else {
//     throw new BadRequestError('You cant follow yourself');
//   }
// };

// export const unfollowUser = async (req: Request, res: Response) => {
//   if (req.user.id !== req.params.id) {
//     const user = await User.findById(req.params.id);
//     let currentUser = await User.findById(req.user.id);
//     // @ts-ignore
//     if (user?.followers.includes(req.user.id)) {
//       // @ts-ignore
//       await user.updateOne({ $pull: { followers: req.user.id } });
//       // @ts-ignore
//       currentUser = await User.findByIdAndUpdate(
//         currentUser?._id,
//         {
//           // @ts-ignore
//           $pull: { following: req.params.id },
//         },
//         {
//           new: true,
//           runValidators: true,
//         }
//       ).populate('following', 'username profilePicture');
//       return res.status(StatusCodes.OK).json(currentUser?.following);
//     } else {
//       throw new BadRequestError('You dont follow this user');
//     }
//   } else {
//     throw new BadRequestError('You cant unfollow yourself');
//   }
// };

export const getFriends = async (req: Request, res: Response) => {
  const user = await User.findById(req.params.id).populate(
    'friends',
    'username profilePicture'
  );
  if (!user) {
    throw new NotFoundError(`User with id ${req.params.id} doesnt exist`);
  } else {
    res.status(StatusCodes.OK).json(user.friends);
  }
};

export const searchUsers = async (req: Request, res: Response) => {
  const { search } = req.query;
  const username = new RegExp(search as string, 'i');
  const users = await User.find({
    username,
  }).find({ _id: { $ne: req.user.id } });
  res.status(StatusCodes.OK).json(users);
};

export const removeFriend = async (req: Request, res: Response) => {
  const user = await User.findByIdAndUpdate(
    req.user.id,
    {
      $pull: {
        // @ts-ignore
        friends: req.params.id,
      },
    },
    {
      new: true,
      runValidators: true,
    }
  );
  await User.findByIdAndUpdate(req.params.id, {
    $pull: {
      // @ts-ignore
      friends: req.user.id,
    },
  });
  res.status(StatusCodes.OK).json(user);
};
