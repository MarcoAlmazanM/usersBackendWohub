<template>
  <v-container>
    <v-row dense align="center" justify="center" class="fill-height">
      <v-col cols="8">
        <p class="blueTec--text text-center text-h4 font-weight-bold">Interests</p>
        <v-form v-model="isFormValid">
          <v-select :items="athletic_level" v-model="level" @change="athl" label="Nivel Atlético" :disabled="edit_mode == 0" :rules="[rules.required]" solo> </v-select>
          <v-select :items="favorite_exercise" v-model="favorite" @change="fav" label="Tipo de Ejercicio Favorito" :disabled="edit_mode == 0" :rules="[rules.required]" solo></v-select>
          <v-select :items="improvements" v-model="improvement" @change="imp" label="¿Qué buscas mejorar?" :disabled="edit_mode == 0"  :rules="[rules.required]" solo></v-select>
          <v-select :items="exercise_location" v-model="location" @change="loc" label="¿Dónde haces ejercicio?" :disabled="edit_mode == 0" :rules="[rules.required]" solo></v-select>
          <v-select :items="available_time" v-model="time" @change="tim" label="Tiempo disponible para hacer ejercicio" :disabled="edit_mode == 0" :rules="[rules.required]" solo></v-select>
          <v-text-field label="Deportes de interés (enlistalos) " v-model="sports_interests" :disabled="edit_mode == 0" :rules="[rules.required]" solo></v-text-field>
        </v-form>
        <v-btn block color="blueTec" class="whiteTec--text" @click="setInterests" v-model="buttonAction" :disabled="!isFormValid">{{ buttonAction }}</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import firebase from "firebase";
import 'firebase/storage';

  export default {
    name: "Interests",
    data() {
      return {
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
        isFormValid:false,
        rules: {
          required: value => !!value || 'Field Required',
        }
      }
    },
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