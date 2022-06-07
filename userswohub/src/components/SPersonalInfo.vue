<template>
  <v-container>
    <p class="blueTec--text text-center text-h4 font-weight-bold">Personal Info</p>
    <v-row
      :key="1"
      :class='mb-6'
      no-gutters
      dense align="center" justify="center" class="fill-height"
    >
      <v-col
        :key="1"
      >
        <v-card
          class="pa-2"
          outlined
          tile
        >
          <v-select :items="athletic_level" v-model="level" @change="athl" label="Nivel Atlético" :disabled="edit_mode == 0" solo> </v-select>
        </v-card>
        <v-card
          class="pa-2"
          outlined
          tile
        >
          <v-select :items="athletic_level" v-model="level" @change="athl" label="Nivel Atlético" :disabled="edit_mode == 0" solo> </v-select>
        </v-card>
      </v-col>
      <v-col
        :key="2"
      >
        <v-card
          class="pa-2"
          outlined
          tile
        >
          <v-select :items="athletic_level" v-model="level" @change="athl" label="Nivel Atlético" :disabled="edit_mode == 0" solo> </v-select>
        </v-card>
        <v-card
          class="pa-2"
          outlined
          tile
        >
          <v-select :items="athletic_level" v-model="level" @change="athl" label="Nivel Atlético" :disabled="edit_mode == 0" solo> </v-select>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import firebase from "firebase";
import 'firebase/storage';

  export default {
    name: "SPersonalInfo",
    data: () => ({
      athletic_level: ['Principiante', 'Intermedio', 'Avanzado'],
      favorite_exercise: ['Natación', 'Correr', 'Ciclismo'],
      improvements: ['Mejorar salud en general', 'Perder peso', 'Ganar musculatura'],
      exercise_location: ['Casa', 'Oficina', 'Gimnasio'],
      available_time: ['30 minutos', '1 hora', '2 horas'],
      level: '',
      favorite: '',
      improvement: '',
      location: '',
      time: '',
      sports_interests:'',
      edit_mode: 0,
      buttonAction: "Actualizar Intereses",
    }
    ),
    mounted() {
      this.getInterests();
    },
    methods:{

      athl(event) {
        this.level = event;
      },
      fav(event) {
        this.favorite = event;
      },
      imp(event) {
        this.improvement = event;
      },
      loc(event) {
        this.location = event;
      },
      tim(event) {
        this.time = event;
      },
      getUser(){
        let userEmail = firebase.auth().currentUser.email;
        return userEmail;
      },
      async getInterests(){
        let user = this.getUser();
        let userData = await firebase.firestore().collection("Users").doc(user).get();
        let interests = userData.data().interests;

        this.level = interests['Level'];
        this.favorite = interests['Favorite exercise'];
        this.improvement = interests['Improvements'];
        this.location = interests['Location'];
        this.time = interests['Availability'];
        this.sports_interests = interests['Sport Interests'];
      },
      setInterests() {
        if(this.edit_mode == 0){
          this.edit_mode = 1;
          this.buttonAction = "Guardar";
          return;
        }

        const interestsMap = new Map();

        interestsMap.set('Level', this.level);
        interestsMap.set('Favorite exercise', this.favorite);
        interestsMap.set('Improvements', this.improvement);
        interestsMap.set('Location', this.location);
        interestsMap.set('Availability', this.time);
        interestsMap.set('Sport Interests', this.sports_interests.split(","));

        const interests = Object.fromEntries(interestsMap);

        //updates interests
        firebase.firestore().collection('Users').doc(this.getUser()).update({
          interests:interests,
        })
          .then(() => {
          this.edit_mode = 0;
          this.buttonAction = "Actualizar Intereses";
          });
      }
      
    }
  }
</script>

<style scoped>

</style>