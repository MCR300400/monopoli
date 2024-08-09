<template>
    <div v-if="isVisible" class="popup" :class="popupClass">
      <p>{{ message }}</p>
      <button @click="closePopup">Close</button>
    </div>
  </template>
  
  <script>
  export default {
    name: 'PopupComponent',
    props: {
      message: {
        type: String,
        required: true
      },
      type: {
        type: String,
        default: 'info'
      }
    },
    data() {
      return {
        isVisible: true
      };
    },
    computed: {
      popupClass() {
        return {
          'popup-info': this.type === 'info',
          'popup-success': this.type === 'success',
          'popup-error': this.type === 'error'
        };
      }
    },
    methods: {
      closePopup() {
        this.isVisible = false;
        this.$emit('close'); // Emit an event when the popup is closed
      }
    }
  };
  </script>
  
  <style scoped>
  .popup {
    position: fixed;
    top: 1rem;
    right: 1rem;
    padding: 1rem;
    border-radius: 5px;
    color: #fff;
    background-color: #333;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
    z-index: 1000;
  }
  
  .popup-info {
    background-color: #3498db;
  }
  
  .popup-success {
    background-color: #2ecc71;
  }
  
  .popup-error {
    background-color: #e74c3c;
  }
  
  .popup button {
    margin-top: 0.5rem;
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  
  .popup button:hover {
    opacity: 0.8;
  }
  </style>
  