<template>
  <v-row  align="center" justify="center" >
    <v-col cols="12" md="6">
      <p class="blueTec--text text-center text-h4 font-weight-bold">INFORMACIÓN DEL ALUMNO</p>
      <div class="text-center">
        <v-avatar class="rounded-circle mb-5" size="164">
          <v-img src="https://firebasestorage.googleapis.com/v0/b/fir-ideentest.appspot.com/o/Perfil%2Fbond.jpeg?alt=media&token=02bc0f1d-82b8-468b-bb75-52b78e1d5d3d"></v-img>
        </v-avatar>
      </div>

      <v-row align="center" justify="center" justify-md="start" >
        <v-col  cols="4" md="8" sm="10" class="pa-md-2 mb-1"  justify="center" justify-md="start" v-for="(label, index) in profileInformationHeaderList" :key="index">
          <Profile :title="label" :info="userInfo[index]"></Profile>
        </v-col>
      </v-row>

    </v-col>
  </v-row>
</template>

<script>
import firebase from "firebase"
import Profile from "@/components/Forms/Profile";

export default {
  name: "UserProfile",
  components: {
    Profile,
  },
  data() {
    return {
      profileInformationHeaderList: [
        '',
        'Following: ',
        'Groups: ',
        'Miembro desde: ',
        'Tipo de cuenta: ',
      ],
      userInfo: []
    }
  },
  mounted() {
    //let user=result.toString().charAt(0).toUpperCase()+result.slice(1);
    this.getUserInfo(this.getUser());
  },
  methods: {
    async getUserInfo(user) {

      const student = await firebase.firestore().collection("Users").doc(user).get();
      let studentData = student.data();

      this.userInfo.push(student.data().name);
      this.userInfo.push(student.data().following_number);
      this.userInfo.push(student.data().groups_number);
      this.userInfo.push( new Date(student.data().member_since.seconds * 1000).toLocaleDateString());
      this.userInfo.push(student.data().account_type);


      console.log(studentData);
    },
    getUser(){
        let userEmail = firebase.auth().currentUser.email;
        return userEmail;
    },
  }
}
</script>

<style scoped>

</style>