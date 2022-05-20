<template>
  <v-container>
    <v-row dense align="center" justify="center" class="fill-height">
      <v-col cols="8">
        <p class="blueTec--text text-center text-h4 font-weight-bold">Crea una Cuenta</p>
        <v-form v-model="isFormValid">
          <v-text-field label="Name" placeholder="Complete Name" type="text"  v-model="name" :rules="rules.required" outlined dense></v-text-field>
          <v-text-field label="Email" placeholder="ejemplo@wohub.com" type="text"  v-model="email" :rules="[rules.required,rules.email]" outlined dense></v-text-field>
          <v-text-field label="Username" placeholder="user_wohub" type="text"  v-model="username" :rules="[rules.required,rules.username]" outlined dense></v-text-field>
          <v-text-field label="Phone" placeholder="5512345678" type="text"  v-model="phone" :rules="[rules.required,rules.length(10)]" outlined dense></v-text-field>
          <v-text-field label="Password" placeholder="********"
                        :rules="[rules.required,rules.password]"
                        :append-icon="showPass ? 'mdi-eye' : 'mdi-eye-off'"
                        :type="showPass ? 'text' : 'password'"
                        name="input-pass"
                        class="input-group--focused"
                        @click:append="showPass = !showPass" v-model="password" outlined dense></v-text-field>
          <v-text-field label="Confirm Password" placeholder="********"
                        :rules="[rules.required,rules.password, (password === passwordconfirm) || 'Password must match']"
                        :append-icon="showConfirm ? 'mdi-eye' : 'mdi-eye-off'"
                        :type="showConfirm ? 'text' : 'password'"
                        name="input-pass2"
                        @click:append="showConfirm = !showConfirm" v-model="passwordconfirm" outlined dense></v-text-field>
          <v-checkbox class="align-center justify-center" v-model="checkbox1" :label="'Privacy Policies'"></v-checkbox>
          <v-checkbox class="align-center justify-center" v-model="checkbox2" :label="'Terms & Conditions'"></v-checkbox>
          <v-checkbox class="align-center justify-center" v-model="checkbox3" :label="'Conduct Code'"></v-checkbox>
        </v-form>
        <v-btn :disabled="!checkbox1 || !checkbox2 || !checkbox3 || !isFormValid" block color="blueTec" class="whiteTec--text" @click="registerAccount">Crear Cuenta</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import firebase from "firebase";
import 'firebase/storage'

export default {
  name: "NewAccount",
  data(){
    return{
      checkbox1:false,
      checkbox2:false,
      checkbox3:false,
      showPass: false,
      showConfirm:false,
      name:'',
      email:'',
      phone:'',
      password:'',
      passwordconfirm:'',
      username:"",
      isFormValid:false,
      rules: {
        required: value => !!value || 'Field Required',
        length: len => v => (v || '').length >= len || `Invalid phone length, required ${len}`,
        email: value => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return pattern.test(value) || 'Invalid Email.';
        },
        username: value=> {
          const pattern = /^[a-zA-Z0-9]([._-](?![._-])|[a-zA-Z0-9]){3,18}[a-zA-Z0-9]$/;
          return pattern.test(value) || 'The username can contain dots,underscore but not at the start or the end, alphabets, numbers and the length needs to be between 8 and 30 characters.';
        },
        password: value=> {
          const pattern = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
          return pattern.test(value) || 'The password need to have at least one : Upper Case Letter, Lower Case Letter , Digit, Special Character and Minimun 8 Characters';
        },
      },
    }
  },
  methods:{
    registerAccount() {
      const users={
        email: this.email.toString(),
        password: this.password.toString()
      }
      const account = {
        email: this.email.toString(),
        name: this.name.toString(),
        phone: this.phone.toString(),
        username: this.username.toString()
      }
      //registra la informacion
      firebase.auth().createUserWithEmailAndPassword(users["email"], users["password"])
          .then(() => {
            //alert('Registro hecho');
            firebase.firestore().collection('Users').doc(account["email"]).set(account).then(()=>{
              this.$router.push('/survey');
            });
          })
    },
  },
}
</script>

<style scoped>
.v-text-field--outlined >>> fieldset {
  border-color: #344FFE;
}
</style>