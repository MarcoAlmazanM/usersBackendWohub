<template>
  <v-container>
    <v-row dense align="center" justify="center" class="fill-height">
      <v-col cols="8">
        <p class="blueTec--text text-center text-h4 font-weight-bold">Interests survey</p>
        <v-form v-model="isFormValid">
          <v-select :items="athletic_level" @change="athl" label="Nivel Atlético" :rules="[rules.required]" solo> </v-select>
          <v-select :items="favorite_exercise" @change="fav" label="Tipo de Ejercicio Favorito" :rules="[rules.required]" solo></v-select>
          <v-select :items="improvements" @change="imp" label="¿Qué buscas mejorar?" :rules="[rules.required]" solo></v-select>
          <v-select :items="exercise_location" @change="loc" label="¿Dónde haces ejercicio?" :rules="[rules.required]" solo></v-select>
          <v-select :items="available_time" @change="tim" label="Tiempo disponible para hacer ejercicio" :rules="[rules.required]" solo></v-select>
          <v-text-field label="Deportes de interés (enlistalos) " v-model="sports_interests" :rules="[rules.required]" solo></v-text-field>
        </v-form>
        <v-btn block color="blueTec" class="whiteTec--text" @click="setInterests" :disabled="!isFormValid">Actualizar intereses</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import firebase from "firebase";
import 'firebase/storage';

  export default {
    name: "Survey",
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
      isFormValid:false,
      rules: {
        required: value => !!value || 'Field Required',
      }
    }
    ),
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

      setInterests() {

        const interestsMap = new Map();

        interestsMap.set('Level', this.level);
        interestsMap.set('Favorite exercise', this.favorite);
        interestsMap.set('Improvements', this.improvement);
        interestsMap.set('Location', this.location);
        interestsMap.set('Availability', this.time);
        interestsMap.set('Sport Interests', this.sports_interests.split(","));

        const interests = Object.fromEntries(interestsMap);

        //updates interests
        firebase.firestore().collection('Users').doc(firebase.auth().currentUser.email).update({
          interests:interests,
        })
          .then(() => {
            this.$router.push('/home');
          });
      }
    }
  }
</script>

<style scoped>

</style>