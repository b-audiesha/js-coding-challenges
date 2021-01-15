var messagesWrapper = document.getElementById("messagesWrapper");

var app = new Vue({
  el: "#app",

  data: {
    menu: false,
    chat: {
      name: '@andreuscafe',
      messages: dummyMessages,
      messageInput: ''
    }
  },

  methods: {
    sendMessage (event) {
      if (this.chat.messageInput) {
        const hour = new Date().toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });

        fromWhich = event.shiftKey ? false : true;

        let newMessage = {
          text: this.chat.messageInput,
          fromUser: fromWhich,
          hour: hour
        }

        this.chat.messages.push(newMessage);
        this.chat.messageInput = "";

        this.$nextTick(function() {
          var element = document.getElementById("messagesWrapper");
          element.scrollTop = element.scrollHeight;

          var input = document.getElementById("messageInput");
          input.focus();
        });
      }
    },

    removeLastMessage () {
      this.chat.messages.pop()
    },

    focusInput () {
      var input = document.getElementById("messageInput");
      input.focus();
    }
  }
});

document.addEventListener("DOMContentLoaded", function() {
  let headerMenuButton = document.getElementById("headerMenuButton");
  let headerMenu = document.getElementById("headerMenu");
  let fullScreenButton = document.getElementById("fullScreen");
  let phone = document.getElementById("phone");

  // if (typeof window.orientation === 'undefined') {
  //   // Minibar plugin for a nice looking scrollbar, non-mobile only
  //   new MiniBar('#messagesWrapper', {
  //     minBarSize: 10
  //   });
  // }

  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);

  window.addEventListener('resize', () => {
    // We execute the same script as before
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  });

  phone.addEventListener("click", () => {toggleMenu('close')}, false);

  // Header menu button - Listener
  headerMenuButton.addEventListener("click", e => {e.stopPropagation(); toggleMenu()}, false);

  // Header menu - Listener
  headerMenu.addEventListener("click", e => {e.stopPropagation()}, false);

  // Fullscreen button - Listener
  fullScreenButton.addEventListener("click", () => {toggleFullScreen(); toggleMenu()}, false);

  // Functions

  function toggleMenu (state) {
    if (state) {
      if (state === 'close') headerMenu.setAttribute('data-show', "false");
      if (state === 'open') headerMenu.setAttribute('data-show', "true");
    } else {
      if (headerMenu.getAttribute('data-show') === "true") {
        headerMenu.setAttribute('data-show', "false");
      } else {
        headerMenu.setAttribute('data-show', "true");
      }
    }
  }

  function toggleFullScreen () {
    if (screenfull.enabled) {
      screenfull.toggle();
    } else {
      document.body.requestFullscreen();
    }
  }
});
