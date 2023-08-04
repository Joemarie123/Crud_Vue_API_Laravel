<template>
    <div class="data-table-container">
      <table class="data-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Address</th>
            <th>Mobile</th>
            <th>ACTIONS</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in users" :key="user.id">
            <td>{{ user.id }}</td>
            <td>{{ user.name }}</td>
            <td>{{ user.address }}</td>
            <td>{{ user.mobile }}</td>
            <td class="center">
               <!--  <v-btn class="mx-2" color="red"  @click="redirecttoHomeEventsViewList(row)"> -->
                    <v-btn @click="presentDeleteAlert(user.id)">Delete Grade</v-btn>
           <!--   <v-icon size="25">mdi-delete</v-icon>
         </v-btn> -->
              </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div>
        <v-text-field v-model="name" label="name"> </v-text-field>
        <v-text-field v-model="address" label="address"> </v-text-field>
        <v-text-field v-model="mobile" label="mobile"> </v-text-field>
    </div>
    <div>
        <v-btn type="submit"  color="primary" @click="register()"  class="ml-2 ">
                  SUBMIT
                </v-btn>
    </div>


  </template>
  
  <style>
  .data-table-container {
    max-width: 600px;
    margin: 0 auto;
  }
  
  .data-table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 20px;
  }
  
  .data-table th,
  .data-table td {
    border: 1px solid #ccc;
    padding: 10px;
    text-align: left;
  }
  
  .data-table th {
    background-color: #f0f0f0;
    font-weight: bold;
  }
  
  .data-table tbody tr:nth-child(even) {
    background-color: #f9f9f9;
  }
  
  .data-table tbody tr:hover {
    background-color: #e6e6e6;
    cursor: pointer;
  }
  </style>
  

  <script>

import { mapActions, mapGetters } from 'vuex';
export default {
    name: 'HomePage',
  data() {
    
    return {
        grade_id: null,
        name:'',
        address:'',
        mobile:'',
        rows: [],
    };
  },
  mounted() {
   /*  this.startCountdown(); */
  },


  computed: {
    ...mapGetters('users', {users: 'getUsers'
    }),
  },


 /*   created() {
    this.fetchUsers().then(() => {
        this.populateRows();
    }); 
  */

 /*     CODE FOR V-DATA-TABLE */
    created() {
    this.fetchUsers().then(() => {
        this.populateRows();
      this.users.forEach(user => {
        this.rows.push({
          id : user.id,
          name: user.name,
          address: user.address,
          mobile: user.mobile,
         
        });
      })
    });
 

  },

  methods: {

    ...mapActions('users', ['fetchUsers']),
    
      ...mapActions('users', ['registration']),

      ...mapActions('users', [ 'deleteemployee']),

      populateRows() {
      this.rows = this.users.map((user) => ({
        id: user.id,
        name: user.name,
        address: user.address,
        mobile: user.mobile,
      }));
    },

    async presentDeleteAlert(grade_id) {
      const alert = await alertController.create({
          header: 'Are you sure?',
          subHeader: 'This action is delete.',
          mode: "ios",
          buttons: [
            {
              text: 'Cancel',
              role: 'cancel',
              handler: () => {
                console.log("cancel delete=> ", grade_id);
              },
            },
            {
              text: 'OK',
              role: 'confirm',
              handler: () => {
                this.deleteGrade(grade_id)
                  .then(res => {
                    console.log('Res=> ', res);
                    this.fetchUsers();
                  }).catch( e => console.log("Error=> ", e));
                console.log("deleting=> ", grade_id);
              },
            },
          ],
        });

        await alert.present();
    },

    register() {
      console.log("register");

      let data = new FormData();
      data.append('name', this.name);
      data.append('address', this.address);
      data.append('mobile', this.mobile);
      this.registration(data).then(() => {
         
            this.name = '';
          this.address = '';
          this.mobile = '';
        


          this.navigateTo('/walup');
        }).catch(e => console.log(e.message));
    },
    
    navigateTo(path) {
      this.$router.push({ 'path': path });
    },



  },
};

</script>

