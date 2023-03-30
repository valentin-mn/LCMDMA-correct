<template>
  <a @click="signin" class="btn btn-social btn-google">
    <i class="fa fa-github"></i>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Se connecter avec {{name}}
  </a>
</template>

<script>
//import bcrypt from 'bcryptjs';
//générer un mdp crypté random


export default {
  props: {
    name: String
  },
  methods: {
    signin() {
      window.OAuth.initialize('BTfcjv51Sd9sJJrfLVp8QyIBZUM');

      window.OAuth.popup('github').then((github) => {
        console.log('github:', github);
        github.me().then((data) => {
          console.log("data: ", data);
          alert("Your Github email: " + data.email + ".\nCheck console logs for more info.");

          // Envoi de l'objet utilisateur à l'action Vuex registerUser
          this.$store.dispatch('registerUser', {
            login: data.alias,
            email: data.email,
            firstName: data.name.split(' ')[0],
            lastName: data.name.split(' ')[1],
            password: 'mot_de_passe' // Remplacer par le mot de passe de votre choix
          }).then(response => {
            if (response.error) {
              this.errorRequest(response.message)
            } else {
              this.successRequest(response.message)
            }
          });
        });
      });
    }
  },
}
</script>

<style scoped>

.btn-google {
  background-color: #333;
  color: #fff;
}

</style>
