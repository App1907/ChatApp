import React from 'react';
import { View, Text, Modal, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { Icons } from '../assets';

interface MessageOptionsModalProps {
  visible: boolean;
  onClose: () => void;
  onDelete: () => void;
  message: any;
  setMessages: React.Dispatch<React.SetStateAction<any[]>>;
  messages: any[];
}

const reactions = ['👍', '❤️', '😂', '🎉', '👎']; // Example reactions

const MessageOptionsModal: React.FC<MessageOptionsModalProps> = ({ visible, onClose, onDelete, message, setMessages, messages }) => {
  const handleReaction = (reaction: string) => {
    const updatedMessages = messages.map((msg) => {
      if (msg._id === message._id) {
        if (msg.reactions && msg.reactions.includes(reaction)) {
          msg.reactions = msg.reactions.filter((r: string) => r !== reaction);
        } else {
          msg.reactions = [...(msg.reactions || []), reaction];
        }
      }
      return msg;
    });
    setMessages(updatedMessages);
    onClose();
  };

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.modalBackground}>
        <View style={styles.modalContent}>
          {/* Reaction options */}
          <View style={styles.reactionsRow}>
            {reactions.map((reaction, index) => (
              <TouchableOpacity key={index} onPress={() => handleReaction(reaction)}>
                <Text style={styles.reaction}>{reaction}</Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Options */}
          <TouchableOpacity style={styles.option} onPress={onDelete}>
            <Image source={Icons.delete} style={styles.icon} />
            <Text style={styles.deleteText}>Delete</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.option} onPress={onClose}>
            <Text style={styles.cancelText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  reactionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  reaction: {
    fontSize: 28,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  icon: {
    width: 24,
    height: 24,
    marginRight: 12,
  },
  deleteText: {
    color: 'red',
    fontSize: 18,
  },
  cancelText: {
    color: 'blue',
    fontSize: 18,
    textAlign: 'center',
    marginTop: 10,
  },
});

export default MessageOptionsModal;
