<template>
  <div class="chat">
    <div class="chat-messages">
      <div v-for="(message, index) in messages" :key="index" class="message">
        <strong>{{ message.player }}:</strong> {{ message.text }}
      </div>
    </div>
    <div class="chat-input">
      <input v-model="newMessage" @keyup.enter="handleSendMessage" type="text" placeholder="Type your message..." />
      <button @click="handleSendMessage">Send</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ChatComponent',
  props: ['messages'],
  data() {
    return {
      newMessage: '',
    };
  },
  methods: {
    handleSendMessage() {
      if (this.newMessage.trim() !== '') {
        this.$emit('sendMessage', this.newMessage);
        this.newMessage = '';
      }
    },
  },
};
</script>

<style scoped>
.chat {
  display: flex;
  flex-direction: column;
  background-color: #fff;
  border: 3px solid #2c3e50;
  border-radius: 10px;
  padding: 10px;
  max-height: 400px;
  overflow-y: auto;
}

.chat-messages {
  flex: 1;
  overflow-y: auto;
  margin-bottom: 10px;
}

.message {
  margin-bottom: 8px;
  font-size: 1rem;
  color: #34495e;
}

.chat-input {
  display: flex;
}

.chat-input input {
  flex: 1;
  padding: 10px;
  border: 2px solid #3498db;
  border-radius: 5px 0 0 5px;
  outline: none;
}

.chat-input button {
  padding: 10px;
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 0 5px 5px 0;
  cursor: pointer;
  transition: background-color 0.3s;
}

.chat-input button:hover {
  background-color: #2980b9;
}
</style>
