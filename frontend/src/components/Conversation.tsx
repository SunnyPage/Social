import React from 'react';
import { IConversation } from '../interfaces';
import { useDispatch } from 'react-redux';
import { deleteNotifications } from '../features/user/userSlice';
import { selectConversation } from '../features/conversations/conversationsSlice';
import { useAppSelector } from '../hooks';

type ConversationProps = {
  conversation: IConversation;
};

const Conversation: React.FC<ConversationProps> = ({ conversation }) => {
  const { user } = useAppSelector((state) => state.user);
  const { selectedConversation } = useAppSelector(
    (state) => state.conversations
  );
  const otherUser = conversation.members.find((m) => m._id !== user._id);
  const dispatch = useDispatch();

  return (
    <div
      className={`conversation ${
        selectedConversation &&
        selectedConversation?._id === conversation._id &&
        'conversation--active'
      }`}
      onClick={() => {
        dispatch(selectConversation(conversation));
        // @ts-ignore
        dispatch(deleteNotifications(otherUser._id));
      }}
    >
      <img
        src={
          otherUser?.profilePicture
            ? otherUser?.profilePicture
            : 'https://res.cloudinary.com/dxf7urmsh/image/upload/v1659264459/noAvatar_lyqqt7.png'
        }
        alt="conversation"
        className="conversation__image"
      />
      <span className="conversation__name">{otherUser?.username}</span>
    </div>
  );
};

export default Conversation;
