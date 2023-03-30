<template>
  <v-row>
    <v-dialog
        v-model="dialog"
        scrollable
        fullscreen
        hide-overlay
        max-width="300px"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-container class="parent-open-chat">
          <v-btn
              color="primary"
              dark
              v-bind="attrs"
              v-on="on"
              class="open-chat"
              rounded
              @click="scrollDown"
          >
            <v-icon>mdi-comment</v-icon>
          </v-btn>
        </v-container>
      </template>


      <v-card tile>
        <v-toolbar
            flat
            dark
            color="primary"
        >
          <v-btn
              icon
              dark
              @click="dialog = false"
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>Discussion</v-toolbar-title>
          <v-spacer></v-spacer>

        </v-toolbar>
        <v-card-text>

          <v-container style=" max-height: 70%">

            <v-row v-for="mess in chatMessages" v-bind:key="mess.id">
              <v-row v-if="mess.userId!=$store.state.user.userId">
                <v-avatar
                    size="40"
                    color="grey"
                    style="margin: 10px"
                >
                  <v-icon>mdi-account</v-icon>
                </v-avatar>
                <v-col cols="8">
                  <p>{{mess.user.nom}} {{mess.user.prenom}}, {{ mess.date.split("T")[0] }} {{mess.date.split("T")[1].split(".")[0]}}</p>
                  <p style="color: black; font-size: 16px"> {{ mess.contenu }} </p>
                </v-col>
              </v-row>

              <v-row class="text-end"  v-if="mess.userId== $store.state.user.userId">
                <v-col>
                  <p>{{mess.user.nom}} {{mess.user.prenom}},  {{ mess.date.split("T")[0] }} {{mess.date.split("T")[1].split(".")[0]}}</p>
                  <p style="color: black; font-size: 16px"> {{ mess.contenu }} </p>
                </v-col>
                <v-avatar
                    size="40"
                    color="grey"
                    style="margin: 10px"
                >
                  <v-icon>mdi-account</v-icon>
                </v-avatar>

              </v-row>

            </v-row>


            <div class="chat-input">
              <v-row no-gutters>
                <v-col cols="11">
                  <v-text-field
                      outlined
                      dense
                      placeholder="Saisissez votre message ici..."
                      class="chat-text-field"
                      v-model="message"
                  />
                </v-col>
                <v-col cols="1">
                  <v-btn
                      color="primary"
                      dark
                      depressed
                      :disabled="!message.trim()"
                      @click="sendMessage"
                  >
                    Envoyer
                  </v-btn>
                </v-col>
              </v-row>
            </div>
          </v-container>


        </v-card-text>

        <div style="flex: 1 1 auto;"></div>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import io from "socket.io-client";

export default {
  name: "ChatComponent",
  data: () => ({
    dialog: false,
    message: "",
    socket: io("http://localhost:3000")
  }),
  created() {
    this.$store.dispatch("fetchChatMessages");
    this.socket.on("connect", () => {
      console.log("Connected to socket.io server");
    });
    this.socket.on("message", (msg) => {
      console.log("Received message: " + msg);
      this.$store.dispatch("fetchChatMessages");
      this.scrollDown();
    });
  },

  methods: {
    sendMessage() {
      //emmet un evenement message avec le contenu du message et l'id utilisateur
      console.log("Test")
      this.socket.emit("message", {
        contenu: this.message,
        userId: this.$store.state.user.userId,
      });
      this.message = "";
      this.scrollDown();

    },
    scrollDown() {
      setTimeout(() => {
        const chat = document.querySelector(".chat-input");
        chat.scrollIntoView({ behavior: "smooth" });
      }, 100);
    },
  },
  computed: {
    chatMessages() {
      return this.$store.state.chatMessages;
    },
  },



}
</script>

<style scoped>

.open-chat {
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 100;
}




</style>